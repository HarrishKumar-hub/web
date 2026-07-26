import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withRole, AuthenticatedRequest } from '@/middleware/auth'
import { CreateAnnouncementSchema } from '@/lib/validators'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const announcement = await prisma.announcement.findUnique({
      where: { id: params.id },
      include: {
        creator: { select: { name: true, profilePhotoUrl: true } },
        _count: { select: { comments: true } }
      }
    })

    if (!announcement) {
      return NextResponse.json({ error: 'Announcement not found' }, { status: 404 })
    }

    return NextResponse.json(announcement)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch announcement' }, { status: 500 })
  }
}

export const PUT = withRole(['ADMIN'], async (req: AuthenticatedRequest, { params }: { params: { id: string } }) => {
  try {
    const announcement = await prisma.announcement.findUnique({ where: { id: params.id } })
    if (!announcement) {
      return NextResponse.json({ error: 'Announcement not found' }, { status: 404 })
    }

    const body = await req.json()
    const validatedData = CreateAnnouncementSchema.parse(body)

    const updatedAnnouncement = await prisma.announcement.update({
      where: { id: params.id },
      data: validatedData
    })

    return NextResponse.json(updatedAnnouncement)
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to update announcement' }, { status: 500 })
  }
})

export const DELETE = withRole(['ADMIN'], async (req: AuthenticatedRequest, { params }: { params: { id: string } }) => {
  try {
    await prisma.announcement.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete announcement' }, { status: 500 })
  }
})
