import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { type, stage, budget, name, email, company, description } = body

    if (!name || !email || !description) {
      return NextResponse.json(
        { error: 'Name, email, and description are required' },
        { status: 400 }
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // In production, integrate with:
    // - Resend for email
    // - Supabase for database
    // - Discord webhook for notifications
    // - CRM system

    console.log('Contact form submission:', {
      type,
      stage,
      budget,
      name,
      email,
      company,
      description,
      timestamp: new Date().toISOString(),
    })

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json(
      { success: true, message: 'Project received. We\'ll be in touch.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}