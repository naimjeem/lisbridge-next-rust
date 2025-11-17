import { NextRequest, NextResponse } from 'next/server';
import { deviceStore } from '@/lib/store';
import { DeviceStatus } from '@/types/device';
import { addCorsHeaders, handleOptionsRequest } from '@/lib/cors';

export async function OPTIONS(request: NextRequest) {
  return handleOptionsRequest(request.headers.get('origin'));
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') as DeviceStatus | null;

    // Validate status if provided
    if (status && status !== 'online' && status !== 'offline') {
      const response = NextResponse.json(
        { error: 'Invalid status parameter. Must be "online" or "offline"' },
        { status: 400 }
      );
      return addCorsHeaders(response, request.headers.get('origin'));
    }

    const devices = deviceStore.findAll(status || undefined);
    const response = NextResponse.json(devices);
    return addCorsHeaders(response, request.headers.get('origin'));
  } catch (error) {
    console.error('Error fetching devices:', error);
    const response = NextResponse.json(
      { error: 'Failed to fetch devices' },
      { status: 500 }
    );
    return addCorsHeaders(response, request.headers.get('origin'));
  }
}

