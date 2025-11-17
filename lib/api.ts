import { Device, DeviceStatus, TestResult, RegisterDeviceRequest } from '@/types/device';

const API_BASE = '/api/devices';

export async function registerDevice(data: RegisterDeviceRequest): Promise<Device> {
  const response = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to register device');
  }

  return response.json();
}

export async function getDevices(status?: DeviceStatus): Promise<Device[]> {
  const url = status ? `${API_BASE}?status=${status}` : API_BASE;
  const response = await fetch(url);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch devices');
  }

  return response.json();
}

export async function updateDeviceStatus(
  uuid: string,
  status: DeviceStatus
): Promise<Device> {
  const response = await fetch(`${API_BASE}/${uuid}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update device status');
  }

  return response.json();
}

export async function getDeviceData(uuid: string): Promise<TestResult[]> {
  const response = await fetch(`${API_BASE}/${uuid}/data`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch device data');
  }

  return response.json();
}

