import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    const response = await fetch('https://edubot-admission.onrender.com/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: body.message,
        history: body.history || []
      })
    });

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Chat API Error:', error.message);
    return NextResponse.json(
      { 
        reply: 'Sorry, there was a connection issue. Please try again.',
        leadCaptured: false,
        escalated: false,
        leadData: null
      },
      { status: 200 }
    );
  }
}
