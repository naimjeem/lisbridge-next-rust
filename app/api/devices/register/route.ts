import { NextRequest, NextResponse } from 'next/server';
import { deviceStore } from '@/lib/store';
import { RegisterDeviceRequest, DeviceStatus } from '@/types/device';
import { z } from 'zod';

const registerDeviceSchema = z.object({
  deviceName: z.string().min(1, 'Device name is required'),
  deviceType: z.string().min(1, 'Device type is required'),
  status: z.enum(['online', 'offline'] as const),
});

export async function POST(request: NextRequest) {
  try {
    const body: RegisterDeviceRequest = await request.json();
    
    // Validate request body
    const validationResult = registerDeviceSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const device = deviceStore.create(validationResult.data);
    
    return NextResponse.json(device, { status: 201 });
  } catch (error) {
    console.error('Error registering device:', error);
    return NextResponse.json(
      { error: 'Failed to register device' },
      { status: 500 }
    );
  }
}

