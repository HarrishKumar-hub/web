import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withRole, AuthenticatedRequest } from '@/middleware/auth'

export const POST = withRole(['ADMIN', 'MEMBER'], async (req: AuthenticatedRequest, { params }: { params: { id: string } }) => {
  try {
    const eventId = params.id
    const userId = req.user!.id

    const event = await prisma.event.findUnique({ where: { id: eventId } })
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    const existingRsvp = await prisma.eventRSVP.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId
        }
      }
    })

    if (existingRsvp) {
      // Toggle off / Cancel RSVP
      await prisma.eventRSVP.delete({
        where: { id: existingRsvp.id }
      })
      return NextResponse.json({ rsvped: false })
    } else {
      // RSVP
      await prisma.eventRSVP.create({
        data: {
          eventId,
          userId
        }
      })
      return NextResponse.json({ rsvped: true })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process RSVP' }, { status: 500 })
  }
})
