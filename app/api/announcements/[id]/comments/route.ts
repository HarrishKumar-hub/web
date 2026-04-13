import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withRole, AuthenticatedRequest } from '@/middleware/auth'
import { z } from 'zod'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const comments = await prisma.comment.findMany({
      where: { announcementId: params.id, isApproved: true },
      include: {
        user: { select: { name: true, profilePhotoUrl: true } }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(comments)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 })
  }
}

const CreateCommentSchema = z.object({
  content: z.string().min(1, 'Content is required').max(1000)
})

export const POST = withRole(['ADMIN', 'MEMBER'], async (req: AuthenticatedRequest, { params }: { params: { id: string } }) => {
  try {
    const body = await req.json()
    const { content } = CreateCommentSchema.parse(body)

    const comment = await prisma.comment.create({
      data: {
        content,
        userId: req.user!.id,
        announcementId: params.id,
        isApproved: true // Auto approve for now, or could check user role
      },
      include: {
        user: { select: { name: true, profilePhotoUrl: true } }
      }
    })

    return NextResponse.json(comment, { status: 201 })
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 })
  }
})
