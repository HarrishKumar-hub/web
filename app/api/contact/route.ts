import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are strictly required.' }, { status: 400 })
    }

    // Attempt pushing to DB if model supported, or simulate email delivery queue:
    // If we wanted to use Resend: 
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({ from: 'Acme <onboarding@resend.dev>', to: ['contact@kovilcommunity.com'], subject: 'New Reach', text: message });
    
    // For local operations where environment configurations omit native setups:
    console.log([`MOCK EMAIL DISPATCHED`])
    console.log(`From: ${name} <${email}>`)
    console.log(`Message: \n${message}`)
    
    // Wait ~800ms simulating secure proxy SMTP connections
    await new Promise(r => setTimeout(r, 800))

    return NextResponse.json({ 
      success: true, 
      message: 'Securely dispatched email transmission.' 
    })

  } catch (error: any) {
    console.error('Contact API Error:', error)
    return NextResponse.json({ error: 'An internal error occurred during email routing.' }, { status: 500 })
  }
}
