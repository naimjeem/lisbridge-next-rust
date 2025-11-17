import { NextRequest, NextResponse } from 'next/server';
import { deviceStore } from '@/lib/store';
import { DeviceStatus } from '@/types/device';
import { z } from 'zod';
import { addCorsHeaders, handleOptionsRequest } from '@/lib/cors';

const updateStatusSchema = z.object({
  status: z.enum(['online', 'offline'] as const),
});

export async function OPTIONS(request: NextRequest) {
  return handleOptionsRequest(request.headers.get('origin'));
}

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
      const response = NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.issues },
        { status: 400 }
      );
      return addCorsHeaders(response, request.headers.get('origin'));
    }

    const updatedDevice = deviceStore.updateStatus(uuid, validationResult.data.status);
    
    if (!updatedDevice) {
      const response = NextResponse.json(
        { error: 'Device not found' },
        { status: 404 }
      );
      return addCorsHeaders(response, request.headers.get('origin'));
    }

    const response = NextResponse.json(updatedDevice);
    return addCorsHeaders(response, request.headers.get('origin'));
  } catch (error) {
    console.error('Error updating device status:', error);
    const response = NextResponse.json(
      { error: 'Failed to update device status' },
      { status: 500 }
    );
    return addCorsHeaders(response, request.headers.get('origin'));
  }
}

