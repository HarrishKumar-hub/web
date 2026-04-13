import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withRole, AuthenticatedRequest } from '@/middleware/auth'
import { CreateEventSchema } from '@/lib/validators'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const upcoming = searchParams.get('upcoming') === 'true'

    const where: any = { isPublic: true }
    if (upcoming) {
      where.date = { gte: new Date() }
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: { date: 'asc' },
      include: {
        _count: {
          select: { rsvps: true }
        }
      }
    })

    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}

export const POST = withRole(['ADMIN', 'MEMBER'], async (req: AuthenticatedRequest) => {
  try {
    const body = await req.json()
    const validatedData = CreateEventSchema.parse(body)

    const event = await prisma.event.create({
      data: {
        ...validatedData,
        date: new Date(validatedData.date),
        createdBy: req.user!.id
      }
    })

    return NextResponse.json(event, { status: 201 })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
})
