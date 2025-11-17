import { NextRequest, NextResponse } from 'next/server';
import { deviceStore } from '@/lib/store';
import { generateMockTestResults } from '@/lib/mock-data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ uuid: string }> }
) {
  try {
    const { uuid } = await params;

    // Verify device exists
    const device = deviceStore.findById(uuid);
    if (!device) {
      return NextResponse.json(
        { error: 'Device not found' },
        { status: 404 }
      );
    }

    // Generate 5-10 mock test results
    const count = Math.floor(Math.random() * 6) + 5; // Random between 5-10
    const testResults = generateMockTestResults(count);
    
    return NextResponse.json(testResults);
  } catch (error) {
    console.error('Error fetching device data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch device data' },
      { status: 500 }
    );
  }
}

