import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withRole, AuthenticatedRequest } from '@/middleware/auth'
import { UpdateUserProfileSchema } from '@/lib/validators'

// Public or Authenticated GET
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        profilePhotoUrl: true,
        bio: true,
        isProfilePublic: true,
        joinedDate: true,
        role: true,
        email: true, // we might restrict email later, but returning for profile
        phone: true,
        address: true,
        preferredLanguage: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}

export const PUT = withRole(['ADMIN', 'MEMBER'], async (req: AuthenticatedRequest, { params }: { params: { id: string } }) => {
  try {
    if (req.user!.id !== params.id && req.user!.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const validatedData = UpdateUserProfileSchema.parse(body)

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: validatedData,
      select: {
        id: true,
        name: true,
        email: true,
        profilePhotoUrl: true,
        bio: true,
        phone: true,
        address: true,
        isProfilePublic: true,
        preferredLanguage: true,
        role: true
      }
    })

    return NextResponse.json(updatedUser)
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
})
