import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { name, email, password, school, role } = await req.json()

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, and password are required" },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters" },
        { status: 400 }
      )
    }

    // For demo: create a session without persisting to DB
    // In production, you would:
    // 1. Check if email already exists
    // 2. Hash password
    // 3. Save user to DB
    // 4. Create session record

    const sessionPayload = {
      name,
      email,
      role: role || "student",
      school: school || null,
      createdAt: new Date().toISOString(),
    }

    const cookieValue = Buffer.from(JSON.stringify(sessionPayload)).toString("base64")

    const res = NextResponse.json(
      { message: "Signup successful", user: sessionPayload },
      { status: 201 }
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
    return NextResponse.json({ message: "Signup failed" }, { status: 500 })
  }
}
