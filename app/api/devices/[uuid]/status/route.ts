import { NextRequest, NextResponse } from 'next/server';
import { deviceStore } from '@/lib/store';
import { DeviceStatus } from '@/types/device';
import { z } from 'zod';

const updateStatusSchema = z.object({
  status: z.enum(['online', 'offline'] as const),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ uuid: string }> }
) {
  try {
    const { uuid } = await params;
    const body = await request.json();

    // Validate request body
    const validationResult = updateStatusSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.issues },
        { status: 400 }
      );
    }

    const updatedDevice = deviceStore.updateStatus(uuid, validationResult.data.status);
    
    if (!updatedDevice) {
      return NextResponse.json(
        { error: 'Device not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedDevice);
  } catch (error) {
    console.error('Error updating device status:', error);
    return NextResponse.json(
      { error: 'Failed to update device status' },
      { status: 500 }
    );
  }
}

