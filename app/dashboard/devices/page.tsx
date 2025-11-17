'use client';

import { useState, useEffect } from 'react';
import { Device, DeviceStatus } from '@/types/device';
import { getDevices, updateDeviceStatus } from '@/lib/api';
import DeviceList from '@/components/DeviceList';
import DeviceDetailsModal from '@/components/DeviceDetailsModal';
import AddDeviceForm from '@/components/AddDeviceForm';
import AuthGuard from '@/components/AuthGuard';
import { useRouter } from 'next/navigation';

export default function DevicesPage() {
  const router = useRouter();
  const [devices, setDevices] = useState<Device[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [statusFilter, setStatusFilter] = useState<DeviceStatus | 'all'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDevices = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDevices();
      setDevices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch devices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredDevices(devices);
    } else {
      setFilteredDevices(devices.filter((d) => d.status === statusFilter));
    }
  }, [devices, statusFilter]);

  const handleStatusChange = async (uuid: string, status: DeviceStatus) => {
    // Optimistic update: update UI immediately
    const previousDevices = [...devices];
    setDevices((prev) =>
      prev.map((d) =>
        d.uuid === uuid
          ? { ...d, status, lastUpdated: new Date().toISOString() }
          : d
      )
    );

    try {
      // Make API call
      const updatedDevice = await updateDeviceStatus(uuid, status);
      // Update with server response
      setDevices((prev) =>
        prev.map((d) => (d.uuid === uuid ? updatedDevice : d))
      );
    } catch (err) {
      // Rollback on error
      setDevices(previousDevices);
      setError(err instanceof Error ? err.message : 'Failed to update status');
      // Clear error after 5 seconds
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleDeviceClick = (device: Device) => {
    setSelectedDevice(device);
  };

  const handleCloseModal = () => {
    setSelectedDevice(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    router.push('/login');
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Device Status Dashboard
            </h1>
            <p className="text-gray-600">
              Monitor and manage your laboratory devices
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">
                Filter by Status:
              </label>
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as DeviceStatus | 'all')
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Devices</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>
            <AddDeviceForm onSuccess={fetchDevices} />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">
              {error}
            </div>
          )}

          <DeviceList
            devices={filteredDevices}
            onDeviceClick={handleDeviceClick}
            onStatusChange={handleStatusChange}
            loading={loading}
          />
        </div>
      </div>

      <DeviceDetailsModal
        device={selectedDevice}
        onClose={handleCloseModal}
      />
      </div>
    </AuthGuard>
  );
}

