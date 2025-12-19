import { NextResponse } from "next/server"

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const base = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXTAUTH_URL || "http://localhost:3000"

  if (!clientId) {
    // Redirect to login with a friendly error instead of returning a 500 JSON response
    return NextResponse.redirect(`/login?error=missing_google_config`)
  }

  const redirectUri = `${base}/api/auth/google/callback`
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "consent",
  })

  return NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`)
}
