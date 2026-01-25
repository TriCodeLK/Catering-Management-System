import React from 'react';
import { LayoutDashboard, FileText, Utensils, Calendar, Settings, LogOut } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: FileText },
    { id: 'menu', label: 'Menu Packages', icon: Utensils },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-72 bg-gray-900 text-white hidden md:flex flex-col h-screen fixed left-0 top-0 z-50 shadow-2xl">
      {/* Logo Area */}
      <div className="p-8 pb-4 flex items-center gap-3">
        <div className="bg-gradient-to-br from-orange-400 to-red-600 p-2.5 rounded-xl text-white shadow-lg shadow-orange-500/20">
          <Utensils size={24} strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">CaterPro</h1>
          <p className="text-xs text-gray-400 font-medium">Management System</p>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Main Menu</p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                isActive 
                  ? 'bg-gradient-to-r from-primary to-orange-600 text-white shadow-lg shadow-orange-500/25' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={20} className={isActive ? 'animate-pulse' : ''} />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white/20 rounded-l-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 mx-4 mb-4 bg-gray-800/50 rounded-2xl border border-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg">
            AD
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-white">Admin User</p>
            <p className="text-xs text-gray-400">View Profile</p>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;