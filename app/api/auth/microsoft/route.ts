import { NextResponse } from "next/server"

export async function GET() {
  const clientId = process.env.MICROSOFT_CLIENT_ID
  const base = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXTAUTH_URL || "http://localhost:3000"

  if (!clientId) {
    // Redirect to login with a friendly error so the browser doesn't show a 500 JSON response
    return NextResponse.redirect(`/login?error=missing_microsoft_config`)
  }

  const redirectUri = `${base}/api/auth/microsoft/callback`
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    response_mode: "query",
    scope: "openid profile email User.Read offline_access",
    prompt: "consent",
  })

  return NextResponse.redirect(`https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${params.toString()}`)
}
