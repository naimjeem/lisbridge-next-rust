import { NextRequest, NextResponse } from 'next/server';
import { addCorsHeaders, handleOptionsRequest } from '@/lib/cors';

export async function OPTIONS(request: NextRequest) {
  return handleOptionsRequest(request.headers.get('origin'));
}

export async function POST(request: NextRequest) {
  // In a real application, this would invalidate the session/token
  const response = NextResponse.json({ message: 'Logged out successfully' });
  return addCorsHeaders(response, request.headers.get('origin'));
}

