import { NextRequest, NextResponse } from 'next/server';
import { deviceStore } from '@/lib/store';
import { generateMockTestResults } from '@/lib/mock-data';
import { addCorsHeaders, handleOptionsRequest } from '@/lib/cors';

export async function OPTIONS(request: NextRequest) {
  return handleOptionsRequest(request.headers.get('origin'));
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ uuid: string }> }
) {
  try {
    const { uuid } = await params;

    // Verify device exists
    const device = deviceStore.findById(uuid);
    if (!device) {
      const response = NextResponse.json(
        { error: 'Device not found' },
        { status: 404 }
      );
      return addCorsHeaders(response, request.headers.get('origin'));
    }

    // Generate 5-10 mock test results
    const count = Math.floor(Math.random() * 6) + 5; // Random between 5-10
    const testResults = generateMockTestResults(count);
    
    const response = NextResponse.json(testResults);
    return addCorsHeaders(response, request.headers.get('origin'));
  } catch (error) {
    console.error('Error fetching device data:', error);
    const response = NextResponse.json(
      { error: 'Failed to fetch device data' },
      { status: 500 }
    );
    return addCorsHeaders(response, request.headers.get('origin'));
  }
}

