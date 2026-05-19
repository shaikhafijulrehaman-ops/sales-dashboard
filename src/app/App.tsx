import { useState, useCallback, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { KPICard } from './components/KPICard';
import { RevenueChart } from './components/RevenueChart';
import { SalesPieChart } from './components/SalesPieChart';
import { TopProductsTable } from './components/TopProductsTable';
import { FilterBar } from './components/FilterBar';
import { DollarSign, TrendingUp, ShoppingBag, Package } from 'lucide-react';

// Dummy data with full month names for consistency
const revenueData = [
  { month: 'January', monthShort: 'Jan', revenue: 45000, profit: 22000 },
  { month: 'February', monthShort: 'Feb', revenue: 52000, profit: 28000 },
  { month: 'March', monthShort: 'Mar', revenue: 48000, profit: 25000 },
  { month: 'April', monthShort: 'Apr', revenue: 61000, profit: 35000 },
  { month: 'May', monthShort: 'May', revenue: 55000, profit: 30000 },
  { month: 'June', monthShort: 'Jun', revenue: 67000, profit: 38000 },
  { month: 'July', monthShort: 'Jul', revenue: 72000, profit: 42000 },
  { month: 'August', monthShort: 'Aug', revenue: 68000, profit: 40000 },
  { month: 'September', monthShort: 'Sep', revenue: 75000, profit: 45000 },
  { month: 'October', monthShort: 'Oct', revenue: 82000, profit: 50000 },
  { month: 'November', monthShort: 'Nov', revenue: 90000, profit: 55000 },
  { month: 'December', monthShort: 'Dec', revenue: 95000, profit: 60000 },
];

// Format chart data to use short month names for display
const chartRevenueData = revenueData.map(d => ({
  month: d.monthShort,
  revenue: d.revenue,
  profit: d.profit,
  fullMonth: d.month
}));

const salesByCategory = [
  { name: 'Electronics', value: 35000 },
  { name: 'Clothing', value: 28000 },
  { name: 'Food', value: 22000 },
  { name: 'Books', value: 15000 },
  { name: 'Home', value: 18000 },
];

const topProducts = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', sales: 1234, revenue: '45,890', status: 'High' as const },
  { id: 2, name: 'Smart Watch', category: 'Electronics', sales: 987, revenue: '38,750', status: 'High' as const },
  { id: 3, name: 'Running Shoes', category: 'Clothing', sales: 856, revenue: '28,420', status: 'Medium' as const },
  { id: 4, name: 'Coffee Maker', category: 'Home', sales: 743, revenue: '22,290', status: 'Medium' as const },
  { id: 5, name: 'Best Seller Novel', category: 'Books', sales: 654, revenue: '15,650', status: 'Low' as const },
  { id: 6, name: 'Yoga Mat', category: 'Clothing', sales: 589, revenue: '12,340', status: 'Low' as const },
];

export default function App() {
  const [selectedMonth, setSelectedMonth] = useState('All Months');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isChartLoading, setIsChartLoading] = useState(false);

  // Memoized filter callbacks for performance
  const handleMonthChange = useCallback((month: string) => {
    setIsChartLoading(true);
    setSelectedMonth(month);
    // Simulate slight delay for loading animation
    setTimeout(() => setIsChartLoading(false), 150);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setIsChartLoading(true);
    setSelectedCategory(category);
    setTimeout(() => setIsChartLoading(false), 150);
  }, []);

  // Memoized filtered data calculations
  const filteredRevenueData = useMemo(() => {
    let data = chartRevenueData.map(d => ({ ...d }));

    // Apply category filter logic to revenue
    if (selectedCategory !== 'All Categories') {
      // Simulate filtering revenue down by roughly 20-35% based on category
      const multiplier = 0.3; 
      data = data.map(d => ({
        ...d,
        revenue: Math.round(d.revenue * multiplier),
        profit: Math.round(d.profit * multiplier)
      }));
    }

    if (selectedMonth !== 'All Months') {
      data = data.filter(d => d.fullMonth === selectedMonth);
    }
    
    return data;
  }, [selectedMonth, selectedCategory]);

  const filteredSalesByCategory = useMemo(() => {
    let data = salesByCategory.map(d => ({ ...d }));

    // Apply month filter logic to category sales
    if (selectedMonth !== 'All Months') {
      // Simulate filtering sales based on a specific month
      const multiplier = 0.85;
      data = data.map(d => ({
        ...d,
        value: Math.round(d.value * multiplier)
      }));
    }

    if (selectedCategory !== 'All Categories') {
      data = data.filter(d => d.name === selectedCategory);
    }
    
    return data;
  }, [selectedCategory, selectedMonth]);

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(topProducts)) return [];
    
    return topProducts.filter(p => {
      const matchCategory = selectedCategory === 'All Categories' || p.category === selectedCategory;
      return matchCategory;
    });
  }, [selectedCategory]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Sidebar />
      <Navbar />

      <main className="ml-64 pt-16">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sales & Revenue Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your business today.</p>
          </div>

          <FilterBar
            selectedMonth={selectedMonth}
            selectedCategory={selectedCategory}
            onMonthChange={handleMonthChange}
            onCategoryChange={handleCategoryChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KPICard
              title="Total Sales"
              value="810K"
              change="+12.5%"
              isPositive={true}
              icon={DollarSign}
              iconBg="bg-blue-100"
              iconColor="text-blue-600"
            />
            <KPICard
              title="Revenue"
              value="95K"
              change="+8.2%"
              isPositive={true}
              icon={TrendingUp}
              iconBg="bg-green-100"
              iconColor="text-green-600"
            />
            <KPICard
              title="Total Profit"
              value="460K"
              change="+15.3%"
              isPositive={true}
              icon={TrendingUp}
              iconBg="bg-purple-100"
              iconColor="text-purple-600"
            />
            <KPICard
              title="Total Orders"
              value="8,234"
              change="-2.4%"
              isPositive={false}
              icon={ShoppingBag}
              iconBg="bg-orange-100"
              iconColor="text-orange-600"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <RevenueChart data={filteredRevenueData} isLoading={isChartLoading} />
            </div>
            <div>
              <SalesPieChart data={filteredSalesByCategory} isLoading={isChartLoading} />
            </div>
          </div>

          <TopProductsTable products={filteredProducts} />
        </div>
      </main>
    </div>
  );
}