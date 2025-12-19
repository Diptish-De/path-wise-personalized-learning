import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      )
    }

    // TODO: In production, you would:
    // 1. Check if user exists in DB
    // 2. Verify password hash matches
    // 3. Return user info
    
    // For now, just create a session with the provided email
    // In a real app, you'd look up the user in the database
    
    const sessionPayload = {
      name: email.split("@")[0], // Use email prefix as name for demo
      email,
      role: "student",
      school: null,
      createdAt: new Date().toISOString(),
    }

    const cookieValue = Buffer.from(JSON.stringify(sessionPayload)).toString("base64")

    const res = NextResponse.json(
      { message: "Login successful", user: sessionPayload },
      { status: 200 }
    )

    res.cookies.set("session", cookieValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return res
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: "Login failed" }, { status: 500 })
  }
}
