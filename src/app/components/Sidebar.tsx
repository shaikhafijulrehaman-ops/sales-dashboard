import { useState } from 'react';
import { LayoutDashboard, ShoppingCart, Package, Users, Settings, BarChart3, TrendingUp, HelpCircle } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', description: 'View your sales dashboard' },
  { icon: BarChart3, label: 'Analytics', description: 'Detailed analytics and insights' },
  { icon: ShoppingCart, label: 'Orders', description: 'Manage your orders' },
  { icon: Package, label: 'Products', description: 'Product inventory' },
  { icon: Users, label: 'Customers', description: 'Customer management' },
  { icon: TrendingUp, label: 'Reports', description: 'Generate reports' },
  { icon: Settings, label: 'Settings', description: 'System settings' },
];

export function Sidebar() {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleMenuItemClick = (label: string) => {
    setActiveItem(label);
  };

  const handleViewDocs = () => {
    alert('Opening documentation in a new window...\n\nThis would normally open your help documentation.');
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl text-gray-800">SalesDash</span>
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => handleMenuItemClick(item.label)}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 relative group ${
                  activeItem === item.label
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                title={item.description}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
                
                {hoveredItem === item.label && (
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap pointer-events-none z-50">
                    {item.description}
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <p className="text-sm font-medium text-gray-800">Need Help?</p>
          </div>
          <p className="text-xs text-gray-600 mb-3">Check our documentation</p>
          <button 
            onClick={handleViewDocs}
            className="w-full bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            View Docs
          </button>
        </div>
      </div>
    </div>
  );
}
