import { Device, DeviceStatus } from '@/types/device';

// In-memory store for devices
class DeviceStore {
  private devices: Map<string, Device> = new Map();

  create(device: Omit<Device, 'uuid' | 'deviceId' | 'lastUpdated'>): Device {
    const uuid = crypto.randomUUID();
    const deviceId = crypto.randomUUID(); // Auto-generate deviceId as UUID
    const newDevice: Device = {
      ...device,
      deviceId,
      uuid,
      lastUpdated: new Date().toISOString(),
    };
    this.devices.set(uuid, newDevice);
    return newDevice;
  }

  findAll(status?: DeviceStatus): Device[] {
    const devices = Array.from(this.devices.values());
    if (status) {
      return devices.filter((device) => device.status === status);
    }
    return devices;
  }

  findById(uuid: string): Device | undefined {
    return this.devices.get(uuid);
  }

  updateStatus(uuid: string, status: DeviceStatus): Device | null {
    const device = this.devices.get(uuid);
    if (!device) {
      return null;
    }
    const updatedDevice: Device = {
      ...device,
      status,
      lastUpdated: new Date().toISOString(),
    };
    this.devices.set(uuid, updatedDevice);
    return updatedDevice;
  }
}

// Singleton instance
export const deviceStore = new DeviceStore();

