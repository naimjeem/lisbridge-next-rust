'use client';

import { Device, TestResult } from '@/types/device';
import { useEffect, useState } from 'react';
import { getDeviceData } from '@/lib/api';
import TestResultsChart from './TestResultsChart';

interface DeviceDetailsModalProps {
  device: Device | null;
  onClose: () => void;
}

export default function DeviceDetailsModal({
  device,
  onClose,
}: DeviceDetailsModalProps) {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (device) {
      setLoading(true);
      setError(null);
      getDeviceData(device.uuid)
        .then(setTestResults)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [device]);

  if (!device) return null;

  const getStatusColor = (status: string) => {
    return status === 'normal'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Device Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Device Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Device Name
                </label>
                <p className="text-gray-900">{device.deviceName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Device ID
                </label>
                <p className="text-gray-900">{device.deviceId}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Device Type
                </label>
                <p className="text-gray-900">{device.deviceType}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Status
                </label>
                <p className="text-gray-900 capitalize">{device.status}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Last Updated
                </label>
                <p className="text-gray-900">
                  {new Date(device.lastUpdated).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Recent Test Results
            </h3>
            {!loading && !error && testResults.length > 0 && (
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-700 mb-2">
                  Test Results Over Time
                </h4>
                <TestResultsChart testResults={testResults} />
              </div>
            )}
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="text-red-600 py-4">{error}</div>
            ) : testResults.length === 0 ? (
              <div className="text-gray-500 py-4">No test results available</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Timestamp
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Test Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Value
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Unit
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {testResults.map((result, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {new Date(result.timestamp).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          {result.testType}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          {result.value}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {result.unit}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                              result.status
                            )}`}
                          >
                            {result.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

