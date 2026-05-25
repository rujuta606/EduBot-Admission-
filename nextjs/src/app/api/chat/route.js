import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    
    const response = await fetch('https://edubot-admission.onrender.com/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: body.message,
        history: body.history || []
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Backend error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Chat API Error:', error.message);
    
    if (error.name === 'AbortError') {
      return NextResponse.json(
        { reply: 'The server is waking up, please wait 30 seconds and try again.' },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { reply: 'Connection error. Please try again in a moment.' },
      { status: 500 }
    );
  }
}
