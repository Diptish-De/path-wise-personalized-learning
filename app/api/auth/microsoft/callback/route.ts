import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const code = url.searchParams.get("code")

    if (!code) {
      return NextResponse.redirect("/login?error=missing_code")
    }

    const clientId = process.env.MICROSOFT_CLIENT_ID
    const clientSecret = process.env.MICROSOFT_CLIENT_SECRET
    const base = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXTAUTH_URL || "http://localhost:3000"
    const redirectUri = `${base}/api/auth/microsoft/callback`

    if (!clientId || !clientSecret) {
      return NextResponse.json({ error: "Missing Microsoft client credentials" }, { status: 500 })
    }

    // Exchange code for tokens
    const tokenRes = await fetch("https://login.microsoftonline.com/common/oauth2/v2.0/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        scope: "openid profile email User.Read",
        code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
        client_secret: clientSecret,
      }),
    })

    const tokenData = await tokenRes.json()
    if (!tokenRes.ok) {
      console.error("Microsoft token exchange failed:", tokenData)
      return NextResponse.redirect("/login?error=oauth_failed")
    }

    // Fetch user info from Microsoft Graph
    let user: any = null
    try {
      if (tokenData.access_token) {
        const userRes = await fetch("https://graph.microsoft.com/v1.0/me", {
          headers: { Authorization: `Bearer ${tokenData.access_token}` },
        })
        if (userRes.ok) user = await userRes.json()
      }
    } catch (err) {
      console.error("Failed to fetch microsoft userinfo", err)
    }

    if (!user) {
      return NextResponse.redirect("/login?error=oauth_no_user")
    }

    const sessionPayload = { name: user.displayName, email: user.mail || user.userPrincipalName, id: user.id }
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
