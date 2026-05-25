import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Read from leads.json at Next.js root
    const leadsFilePath = path.join(process.cwd(), 'leads.json');
    let leads = [];
    
    if (fs.existsSync(leadsFilePath)) {
      try {
        const fileData = fs.readFileSync(leadsFilePath, 'utf8');
        leads = JSON.parse(fileData);
      } catch (e) {
        leads = [];
      }
    }
    
    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error reading leads in Next.js api:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
