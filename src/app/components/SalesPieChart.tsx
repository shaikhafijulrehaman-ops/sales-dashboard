import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { LoadingSpinner } from './LoadingSpinner';
import { EmptyState } from './EmptyState';

interface SalesPieChartProps {
  data: Array<{ name: string; value: number }>;
  isLoading?: boolean;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

export function SalesPieChart({ data, isLoading = false }: SalesPieChartProps) {
  // Validate and filter data
  const validData = Array.isArray(data) ? data.filter(d => 
    d && typeof d === 'object' && d.name && typeof d.value === 'number' && d.value > 0
  ) : [];

  const hasData = validData.length > 0;

  return (
    <div className="relative bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Sales by Category</h3>
      
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
            <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Pie
                data={validData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                isAnimationActive={!isLoading}
              >
                {validData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
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
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
