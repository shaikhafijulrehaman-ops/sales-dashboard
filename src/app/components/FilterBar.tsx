import { Calendar, Filter } from 'lucide-react';

interface FilterBarProps {
  selectedMonth: string;
  selectedCategory: string;
  onMonthChange: (month: string) => void;
  onCategoryChange: (category: string) => void;
}

export function FilterBar({ selectedMonth, selectedCategory, onMonthChange, onCategoryChange }: FilterBarProps) {
  const months = [
    'All Months', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const categories = ['All Categories', 'Electronics', 'Clothing', 'Food', 'Books', 'Home'];

  const selectClassName = "px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 cursor-pointer";

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6 shadow-sm">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-600" />
          <span className="font-semibold text-gray-800">Filters:</span>
        </div>

        <div className="h-6 border-l border-gray-200"></div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className={selectClassName}
            aria-label="Select month"
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className={selectClassName}
            aria-label="Select category"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-3">Filters update charts instantly</p>
    </div>
  );
}
