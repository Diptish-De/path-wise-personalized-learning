import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || ""
    const match = cookie.split(";").map((c) => c.trim()).find((c) => c.startsWith("session="))
    if (!match) return NextResponse.json({ authenticated: false })

    const cookieValue = match.split("=").slice(1).join("=")
    try {
      const decoded = Buffer.from(cookieValue, "base64").toString("utf-8")
      const user = JSON.parse(decoded)
      return NextResponse.json({ authenticated: true, user })
    } catch (err) {
      console.error("Failed to parse session cookie", err)
      return NextResponse.json({ authenticated: false })
    }
  } catch (err) {
    console.error(err)
    return NextResponse.json({ authenticated: false }, { status: 500 })
  }
}
