import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withRole, AuthenticatedRequest } from '@/middleware/auth'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')

    const where: any = { isPublic: true }
    if (category) {
      where.category = category
    }

    const media = await prisma.mediaFile.findMany({
      where,
      orderBy: { uploadedAt: 'desc' }
    })

    return NextResponse.json(media)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch media gallery' }, { status: 500 })
  }
}

export const POST = withRole(['ADMIN'], async (req: AuthenticatedRequest) => {
  // Simulating an image upload. In a real application, you'd use a service like AWS S3 or Cloudinary.
  try {
    const body = await req.json()
    // Simplified validation for demo purposes
    if (!body.fileUrl || !body.title || !body.type || !body.category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const media = await prisma.mediaFile.create({
      data: {
        title: body.title,
        titleTa: body.titleTa,
        type: body.type, // 'IMAGE' or 'VIDEO'
        fileUrl: body.fileUrl,
        thumbnailUrl: body.thumbnailUrl,
        description: body.description,
        descriptionTa: body.descriptionTa,
        category: body.category, // 'EVENT', 'CEREMONY', 'OTHER'
        isPublic: body.isPublic ?? true,
        uploadedBy: req.user!.id
      }
    })

    return NextResponse.json(media, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to upload media' }, { status: 500 })
  }
})
