import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withRole, AuthenticatedRequest } from '@/middleware/auth'

// Protected route: only logged in members can see the directory
export const GET = withRole(['ADMIN', 'MEMBER'], async (req: AuthenticatedRequest) => {
  try {
    const members = await prisma.user.findMany({
      where: { 
        isProfilePublic: true,
        role: { in: ['MEMBER', 'ADMIN'] }
      },
      select: {
        id: true,
        name: true,
        profilePhotoUrl: true,
        bio: true,
        joinedDate: true,
        role: true
      },
      orderBy: { joinedDate: 'desc' }
    })

    return NextResponse.json(members)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 })
  }
})
