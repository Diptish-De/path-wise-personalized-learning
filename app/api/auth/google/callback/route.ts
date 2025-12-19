import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const code = url.searchParams.get("code")

    if (!code) {
      return NextResponse.redirect("/login?error=missing_code")
    }

    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET
    const base = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXTAUTH_URL || "http://localhost:3000"
    const redirectUri = `${base}/api/auth/google/callback`

    if (!clientId || !clientSecret) {
      return NextResponse.json({ error: "Missing Google client credentials" }, { status: 500 })
    }

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    })

    const tokenData = await tokenRes.json()
    if (!tokenRes.ok) {
      console.error("Google token exchange failed:", tokenData)
      return NextResponse.redirect("/login?error=oauth_failed")
    }

    // Verify token and obtain user info
    let user: { name?: string; email?: string; picture?: string; sub?: string } | null = null

    try {
      if (tokenData.access_token) {
        const userRes = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
          headers: { Authorization: `Bearer ${tokenData.access_token}` },
        })
        if (userRes.ok) {
          user = await userRes.json()
        }
      }

      // Fallback: validate id_token via tokeninfo
      if (!user && tokenData.id_token) {
        const infoRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${tokenData.id_token}`)
        if (infoRes.ok) {
          const info = await infoRes.json()
          // tokeninfo doesn't return picture consistently; map fields conservatively
          user = { name: (info as any).name, email: (info as any).email, sub: (info as any).sub }
        }
      }
    } catch (err) {
      console.error("Failed to fetch userinfo:", err)
    }

    if (!user) {
      return NextResponse.redirect("/login?error=oauth_no_user")
    }

    // Basic audience check when possible
    if (tokenData.id_token) {
      try {
        const tokenInfoRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${tokenData.id_token}`)
        if (tokenInfoRes.ok) {
          const info = await tokenInfoRes.json()
          if (info.aud && info.aud !== clientId) {
            console.error("Token audience does not match client id", info)
            return NextResponse.redirect("/login?error=invalid_token_aud")
          }
        }
      } catch (e) {
        console.warn("Could not validate token audience", e)
      }
    }

    // Create a small session payload and set as httpOnly cookie (base64 JSON). In production use a signed session store.
    const sessionPayload = { name: user.name, email: user.email, picture: user.picture, sub: user.sub }
    const cookieValue = Buffer.from(JSON.stringify(sessionPayload)).toString("base64")

    const res = NextResponse.redirect("/")
    res.cookies.set("session", cookieValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: tokenData.expires_in ? Number(tokenData.expires_in) : 60 * 60 * 24 * 7,
    })

    return res
  } catch (err) {
    console.error(err)
    return NextResponse.redirect("/login?error=server_error")
  }
}
