import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withRole, AuthenticatedRequest } from '@/middleware/auth'
import { CreateAnnouncementSchema } from '@/lib/validators'

export async function GET(req: NextRequest) {
  try {
    const announcements = await prisma.announcement.findMany({
      where: { isPublic: true },
      orderBy: [
        { isPinned: 'desc' },
        { publishedDate: 'desc' }
      ],
      include: {
        _count: {
          select: { comments: true }
        }
      }
    })

    return NextResponse.json(announcements)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch announcements' }, { status: 500 })
  }
}

export const POST = withRole(['ADMIN'], async (req: AuthenticatedRequest) => {
  try {
    const body = await req.json()
    const validatedData = CreateAnnouncementSchema.parse(body)

    const announcement = await prisma.announcement.create({
      data: {
        ...validatedData,
        createdBy: req.user!.id
      }
    })

    return NextResponse.json(announcement, { status: 201 })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create announcement' }, { status: 500 })
  }
})
