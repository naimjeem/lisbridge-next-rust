import { NextRequest, NextResponse } from 'next/server';
import { deviceStore } from '@/lib/store';
import { RegisterDeviceRequest, DeviceStatus } from '@/types/device';
import { z } from 'zod';
import { addCorsHeaders, handleOptionsRequest } from '@/lib/cors';

const registerDeviceSchema = z.object({
  deviceName: z.string().min(1, 'Device name is required'),
  deviceType: z.string().min(1, 'Device type is required'),
  status: z.enum(['online', 'offline'] as const),
});

export async function OPTIONS(request: NextRequest) {
  return handleOptionsRequest(request.headers.get('origin'));
}

export async function POST(request: NextRequest) {
  try {
    const body: RegisterDeviceRequest = await request.json();
    
    // Validate request body
    const validationResult = registerDeviceSchema.safeParse(body);
    if (!validationResult.success) {
      const response = NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.issues },
        { status: 400 }
      );
      return addCorsHeaders(response, request.headers.get('origin'));
    }

    const device = deviceStore.create(validationResult.data);
    const response = NextResponse.json(device, { status: 201 });
    return addCorsHeaders(response, request.headers.get('origin'));
  } catch (error) {
    console.error('Error registering device:', error);
    const response = NextResponse.json(
      { error: 'Failed to register device' },
      { status: 500 }
    );
    return addCorsHeaders(response, request.headers.get('origin'));
  }
}

