import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    let settings = await prisma.templeSettings.findFirst()
    
    // If no settings exist yet, return some defaults
    if (!settings) {
      return NextResponse.json({
        templeName: 'Kovil Community',
        templeNameTa: 'கோவில் சமூகம்',
        description: 'A community hub for temple events and services.',
        descriptionTa: 'கோவில் நிகழ்வுகள் மற்றும் சேவைகளுக்கான சமூக மையம்.',
        email: 'info@kovilcommunity.org',
        phone: '+91 98765 43210',
        aboutContent: 'Welcome to our beautiful temple. We are a community dedicated to preserving our heritage and serving everyone.',
        aboutContentTa: 'எங்கள் அழகான கோவிலுக்கு வரவேற்கிறோம். நமது பாரம்பரியத்தைப் பாதுகாக்கவும் அனைவருக்கும் சேவை செய்யவும் அர்ப்பணிக்கப்பட்ட சமூகம்.'
      })
    }

    return NextResponse.json(settings)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch temple settings' }, { status: 500 })
  }
}
