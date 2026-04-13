import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { LoginSchema } from '@/lib/validators'
import { signJWT } from '@/lib/jwt'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate input
    const result = LoginSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { message: 'Validation failed', errors: result.error.errors },
        { status: 400 }
      )
    }

    const { email, password } = result.data

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password
    const isPasswordValid = await bcryptjs.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate JWT
    const token = signJWT({
      id: user.id,
      email: user.email,
      role: user.role,
    })

    return NextResponse.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        profilePhotoUrl: user.profilePhotoUrl,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
