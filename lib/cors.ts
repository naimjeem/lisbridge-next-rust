import { NextResponse } from 'next/server';

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:1420',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:1420',
];

export function addCorsHeaders(response: NextResponse, origin: string | null): NextResponse {
  // Check if origin is allowed
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  } else if (!origin) {
    // Allow requests with no origin (like from Tauri desktop app)
    response.headers.set('Access-Control-Allow-Origin', '*');
  }

  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Allow-Credentials', 'true');

  return response;
}

export function handleOptionsRequest(origin: string | null): NextResponse {
  const response = new NextResponse(null, { status: 204 });
  return addCorsHeaders(response, origin);
}

