import { NextRequest, NextResponse } from 'next/server'
import { extractTokenFromHeader, verifyJWT } from '@/lib/jwt'

export async function POST(req: NextRequest) {
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

    // Logout is handled by removing token on client side
    // This endpoint just verifies the token is valid and logs the action
    console.log(`User ${payload.email} logged out`)

    return NextResponse.json({
      message: 'Logged out successfully',
    })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
