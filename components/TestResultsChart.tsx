'use client';

import { TestResult } from '@/types/device';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TestResultsChartProps {
  testResults: TestResult[];
}

export default function TestResultsChart({ testResults }: TestResultsChartProps) {
  // Group test results by test type
  const testTypes = Array.from(new Set(testResults.map((r) => r.testType)));
  
  // Transform data for chart
  const chartData = testResults
    .map((result) => ({
      timestamp: new Date(result.timestamp).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      [result.testType]: result.value,
      fullTimestamp: result.timestamp,
    }))
    .sort((a, b) => new Date(a.fullTimestamp).getTime() - new Date(b.fullTimestamp).getTime());

  // Color palette for different test types
  const colors = [
    '#3b82f6', // blue
    '#10b981', // green
    '#f59e0b', // amber
    '#ef4444', // red
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#f97316', // orange
  ];

  if (testResults.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No data available for chart
      </div>
    );
  }

  return (
    <div className="w-full h-80 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="timestamp" 
            angle={-45}
            textAnchor="end"
            height={80}
            style={{ fontSize: '12px' }}
          />
          <YAxis style={{ fontSize: '12px' }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
          />
          <Legend />
          {testTypes.slice(0, 4).map((testType, index) => (
            <Line
              key={testType}
              type="monotone"
              dataKey={testType}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      {testTypes.length > 4 && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          Showing first 4 test types. Total: {testTypes.length}
        </p>
      )}
    </div>
  );
}

