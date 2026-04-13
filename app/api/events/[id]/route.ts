import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withRole, AuthenticatedRequest } from '@/middleware/auth'
import { CreateEventSchema } from '@/lib/validators'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: params.id },
      include: {
        creator: { select: { name: true, profilePhotoUrl: true } },
        _count: { select: { rsvps: true } }
      }
    })

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    return NextResponse.json(event)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 })
  }
}

export const PUT = withRole(['ADMIN', 'MEMBER'], async (req: AuthenticatedRequest, { params }: { params: { id: string } }) => {
  try {
    const event = await prisma.event.findUnique({ where: { id: params.id } })
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    // Only ADMIN or the creator can update the event
    if (req.user!.role !== 'ADMIN' && event.createdBy !== req.user!.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const validatedData = CreateEventSchema.parse(body)

    const updatedEvent = await prisma.event.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        date: new Date(validatedData.date)
      }
    })

    return NextResponse.json(updatedEvent)
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 })
  }
})

export const DELETE = withRole(['ADMIN', 'MEMBER'], async (req: AuthenticatedRequest, { params }: { params: { id: string } }) => {
  try {
    const event = await prisma.event.findUnique({ where: { id: params.id } })
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    if (req.user!.role !== 'ADMIN' && event.createdBy !== req.user!.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.event.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
  }
})
