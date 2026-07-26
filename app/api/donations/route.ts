import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import Stripe from 'stripe'

// Initialize Stripe if key exists, otherwise it will remain undefined
const stripeApiKey = process.env.STRIPE_SECRET_KEY || ''
const stripe = stripeApiKey ? new Stripe(stripeApiKey, { apiVersion: '2023-10-16' }) : null

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { amount, currency = 'INR', isRecurring, recurringFrequency } = body

    if (!amount || amount < 1) {
      return NextResponse.json({ error: 'Valid amount is required' }, { status: 400 })
    }

    // Attempt to identify user if auth token provided
    let userId = null
    const authHeader = req.headers.get('Authorization')
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1]
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { userId: string }
        userId = decoded.userId
      } catch (e) {
        // Continue seamlessly as Guest donation if token is invalid
      }
    }

    // Standard Stripe Checkout flow
    if (stripe) {
      const sessionData: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency,
              unit_amount: amount * 100, // Convert to paise/cents
              product_data: {
                name: 'Kovil Community Support',
                description: isRecurring ? 'Monthly Recurring Contribution' : 'One-Time Donation',
              },
              ...(isRecurring ? { recurring: { interval: 'month' } } : {})
            },
            quantity: 1,
          },
        ],
        mode: isRecurring ? 'subscription' : 'payment',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/donations?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/donations?canceled=true`,
        metadata: {
          userId: userId || 'anonymous',
          type: 'DONATION'
        }
      }

      const session = await stripe.checkout.sessions.create(sessionData)
      
      return NextResponse.json({ url: session.url })
    }

    // MOCK RESPONSE if Stripe Key is not natively set
    // Record mock interaction into DB
    try {
      await prisma.donation.create({
        data: {
          amount,
          currency,
          status: 'COMPLETED',
          userId: userId,
          paymentMode: 'MOCK_STRIPE'
        }
      })
    } catch {
      // Don't fail if we can't write to DB in mock mode
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Donation processed in mock mode. Add STRIPE_SECRET_KEY to enable real transactions.' 
    })

  } catch (error: any) {
    console.error('Donation API Error:', error)
    return NextResponse.json({ error: 'Failed to process donation Request' }, { status: 500 })
  }
}
