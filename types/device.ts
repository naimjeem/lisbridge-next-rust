export type DeviceStatus = 'online' | 'offline';

export type TestResultStatus = 'normal' | 'abnormal';

export interface Device {
  uuid: string;
  deviceId: string;
  deviceName: string;
  deviceType: string;
  status: DeviceStatus;
  lastUpdated: string;
}

export interface TestResult {
  timestamp: string;
  testType: string;
  value: number;
  unit: string;
  status: TestResultStatus;
}

export interface RegisterDeviceRequest {
  deviceName: string;
  deviceType: string;
  status: DeviceStatus;
}

export interface UpdateDeviceStatusRequest {
  status: DeviceStatus;
}

