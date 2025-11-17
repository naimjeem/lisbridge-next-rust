'use client';

import { Device, DeviceStatus } from '@/types/device';
import { useState } from 'react';

interface DeviceListProps {
  devices: Device[];
  onDeviceClick: (device: Device) => void;
  onStatusChange: (uuid: string, status: DeviceStatus) => void;
  loading?: boolean;
}

export default function DeviceList({
  devices,
  onDeviceClick,
  onStatusChange,
  loading,
}: DeviceListProps) {
  const [changingStatus, setChangingStatus] = useState<string | null>(null);

  const handleStatusToggle = async (device: Device) => {
    const newStatus: DeviceStatus = device.status === 'online' ? 'offline' : 'online';
    setChangingStatus(device.uuid);
    try {
      await onStatusChange(device.uuid, newStatus);
    } finally {
      setChangingStatus(null);
    }
  };

  const getStatusColor = (status: DeviceStatus) => {
    return status === 'online'
      ? 'bg-green-100 text-green-800 border-green-300'
      : 'bg-red-100 text-red-800 border-red-300';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (devices.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No devices found. Add a device to get started.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Device Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Device ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Updated
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {devices.map((device) => (
            <tr
              key={device.uuid}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onDeviceClick(device)}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {device.deviceName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {device.deviceId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {device.deviceType}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(
                    device.status
                  )}`}
                >
                  {device.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(device.lastUpdated).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusToggle(device);
                  }}
                  disabled={changingStatus === device.uuid}
                  className="text-blue-600 hover:text-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {changingStatus === device.uuid
                    ? 'Updating...'
                    : device.status === 'online'
                    ? 'Set Offline'
                    : 'Set Online'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

