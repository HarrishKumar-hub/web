import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { RegisterSchema } from '@/lib/validators'
import { signJWT } from '@/lib/jwt'
import { UserRole } from '@prisma/client'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate input
    const result = RegisterSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { message: 'Validation failed', errors: result.error.errors },
        { status: 400 }
      )
    }

    const { email, password, name } = result.data

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10)

    // Create user with MEMBER role
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: UserRole.MEMBER,
        verifiedEmail: true, // Auto-verify for now (can add email verification later)
      },
    })

    // Generate JWT
    const token = signJWT({
      id: user.id,
      email: user.email,
      role: user.role,
    })

    return NextResponse.json({
      message: 'Registration successful',
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
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
