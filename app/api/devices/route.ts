import { NextRequest, NextResponse } from 'next/server';
import { deviceStore } from '@/lib/store';
import { DeviceStatus } from '@/types/device';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') as DeviceStatus | null;

    // Validate status if provided
    if (status && status !== 'online' && status !== 'offline') {
      return NextResponse.json(
        { error: 'Invalid status parameter. Must be "online" or "offline"' },
        { status: 400 }
      );
    }

    const devices = deviceStore.findAll(status || undefined);
    
    return NextResponse.json(devices);
  } catch (error) {
    console.error('Error fetching devices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch devices' },
      { status: 500 }
    );
  }
}

