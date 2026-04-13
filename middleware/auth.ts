import { NextRequest, NextResponse } from 'next/server'
import { extractTokenFromHeader, verifyJWT } from '@/lib/jwt'
import { UserRole } from '@prisma/client'

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string
    email: string
    role: UserRole
  }
}

export function withAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      const token = extractTokenFromHeader(req.headers.get('authorization'))

      if (!token) {
        return NextResponse.json(
          { error: 'Unauthorized: No token provided' },
          { status: 401 }
        )
      }

      const payload = verifyJWT(token)
      if (!payload) {
        return NextResponse.json(
          { error: 'Unauthorized: Invalid token' },
          { status: 401 }
        )
      }

      // Add user to request
      const authReq = req as AuthenticatedRequest
      authReq.user = payload

      return handler(authReq)
    } catch (error) {
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }
}

export function withRole(roles: UserRole[], handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return withAuth(async (req: AuthenticatedRequest) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return NextResponse.json(
        { error: 'Forbidden: Insufficient permissions' },
        { status: 403 }
      )
    }

    return handler(req)
  })
}
