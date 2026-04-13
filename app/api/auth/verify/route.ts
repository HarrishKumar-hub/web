import { NextRequest, NextResponse } from 'next/server'
import { extractTokenFromHeader, verifyJWT } from '@/lib/jwt'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const token = extractTokenFromHeader(req.headers.get('authorization'))

    if (!token) {
      return NextResponse.json(
        { message: 'No token provided' },
        { status: 401 }
      )
    }

    const payload = verifyJWT(token)

    if (!payload) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      )
    }

    // Fetch user details
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
    })

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        profilePhotoUrl: user.profilePhotoUrl,
      },
    })
  } catch (error) {
    console.error('Verify error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
