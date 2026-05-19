import { AlertCircle } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex items-center justify-center h-full min-h-[300px]">
      <div className="text-center">
        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-500 font-medium">No data available</p>
        <p className="text-gray-400 text-sm">Try adjusting your filters or check back later</p>
      </div>
    </div>
  );
}
