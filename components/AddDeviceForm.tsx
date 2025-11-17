'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DeviceStatus } from '@/types/device';
import { registerDevice } from '@/lib/api';
import { useState } from 'react';

const deviceSchema = z.object({
  deviceName: z.string().min(1, 'Device name is required'),
  deviceType: z.string().min(1, 'Device type is required'),
  status: z.enum(['online', 'offline'] as const),
});

type DeviceFormData = z.infer<typeof deviceSchema>;

interface AddDeviceFormProps {
  onSuccess: () => void;
}

export default function AddDeviceForm({ onSuccess }: AddDeviceFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DeviceFormData>({
    resolver: zodResolver(deviceSchema),
    defaultValues: {
      status: 'online',
    },
  });

  const onSubmit = async (data: DeviceFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await registerDevice(data);
      setSubmitSuccess(true);
      reset();
      setTimeout(() => {
        setIsOpen(false);
        setSubmitSuccess(false);
        onSuccess();
      }, 1500);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Failed to register device'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        + Add Device
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Add New Device</h2>
              <button
                onClick={() => {
                  setIsOpen(false);
                  reset();
                  setSubmitError(null);
                  setSubmitSuccess(false);
                }}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6">
              {submitSuccess && (
                <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">
                  Device registered successfully!
                </div>
              )}

              {submitError && (
                <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">
                  {submitError}
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Device Name *
                </label>
                <input
                  {...register('deviceName')}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Lab Analyzer Alpha"
                />
                {errors.deviceName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.deviceName.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Device Type *
                </label>
                <input
                  {...register('deviceType')}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Blood Analyzer"
                />
                {errors.deviceType && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.deviceType.message}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <select
                  {...register('status')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
                {errors.status && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.status.message}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    reset();
                    setSubmitError(null);
                    setSubmitSuccess(false);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Registering...' : 'Register Device'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

