import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { LoadingSpinner } from './LoadingSpinner';
import { EmptyState } from './EmptyState';

interface RevenueChartProps {
  data: Array<{ month: string; revenue: number; profit: number }>;
  isLoading?: boolean;
}

export function RevenueChart({ data, isLoading = false }: RevenueChartProps) {
  // Validate and filter data
  const validData = Array.isArray(data) ? data.filter(d => 
    d && typeof d === 'object' && d.month && typeof d.revenue === 'number' && typeof d.profit === 'number'
  ) : [];

  const hasData = validData.length > 0;

  return (
    <div className="relative bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Revenue Overview</h3>
      
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 rounded-xl flex items-center justify-center z-10">
          <LoadingSpinner />
        </div>
      )}

      <div className="relative">
        {!hasData ? (
          <EmptyState />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={validData}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  padding: '8px 12px'
                }}
                formatter={(value: any) => {
                  if (typeof value === 'number') {
                    return `$${value.toLocaleString()}`;
                  }
                  return value;
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 5 }}
                activeDot={{ r: 7 }}
                name="Revenue"
                isAnimationActive={!isLoading}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 5 }}
                activeDot={{ r: 7 }}
                name="Profit"
                isAnimationActive={!isLoading}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
