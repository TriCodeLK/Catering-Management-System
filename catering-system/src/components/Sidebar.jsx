import React from 'react';
import { LayoutDashboard, FileText, Utensils, Calendar, Settings, ChevronLeft, Crown, List } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'All Orders', icon: List },        // List View එකට
    { id: 'calendar', label: 'Calendar', icon: Calendar },    // Calendar View එකට (අලුතින් දැම්මා)
    { id: 'menu', label: 'Menu Packages', icon: Utensils },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white hidden md:flex flex-col h-screen fixed left-0 top-0 z-50">
      {/* Logo Area */}
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Utensils size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-medium tracking-wide">CaterPro</h1>
          <p className="text-xs text-gray-400">Catering Management</p>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-5 py-3.5 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/20' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-sm ${isActive ? 'font-medium' : 'font-normal'}`}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Upgrade Card */}
      <div className="p-4 mx-4 mb-6 bg-gray-800 rounded-2xl border border-gray-700">
        <div className="flex items-center gap-2 text-orange-400 mb-2">
            <Crown size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Upgrade to Pro</span>
        </div>
        <p className="text-xs text-gray-400 mb-3 leading-relaxed">Unlock advanced features and analytics.</p>
        <button className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-colors">
            Upgrade Now
        </button>
      </div>

      {/* Collapse Button */}
      <button className="p-4 flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-medium border-t border-gray-800">
        <ChevronLeft size={18} />
        <span>Collapse</span>
      </button>
    </aside>
  );
};

export default Sidebar;