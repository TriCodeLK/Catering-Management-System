import React, { useState } from 'react';
import { Calendar, Users, DollarSign, Clock, Bell, Search } from 'lucide-react';
import Sidebar from './components/Sidebar';
import './index.css'

// --- MOCK DATA ---
const EVENTS = [
  { id: 1, client: "Smith Wedding", date: "2026-02-15", guests: 150, status: "Confirmed", type: "Wedding", revenue: 5000 },
  { id: 2, client: "Tech Corp Annual", date: "2026-02-20", guests: 300, status: "Pending", type: "Corporate", revenue: 8500 },
  { id: 3, client: "Jenny's 18th", date: "2026-03-05", guests: 50, status: "Confirmed", type: "Birthday", revenue: 1200 },
  { id: 4, client: "City Charity Gala", date: "2026-03-12", guests: 500, status: "Confirmed", type: "Gala", revenue: 15000 },
  { id: 5, client: "StartUp Launch", date: "2026-03-15", guests: 80, status: "Pending", type: "Corporate", revenue: 3000 },
];

// Helper Components
const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow">
    <div className={`p-4 rounded-xl ${colorClass} text-white shadow-lg`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    </div>
  </div>
);

const EventRow = ({ event }) => (
  <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
    <td className="py-4 px-6">
      <p className="font-medium text-gray-900">{event.client}</p>
      <p className="text-xs text-gray-400">{event.type}</p>
    </td>
    <td className="py-4 px-6 text-gray-500 text-sm">{event.date}</td>
    <td className="py-4 px-6 text-gray-500 text-sm flex items-center gap-2">
      <Users size={14} className="text-gray-400" /> {event.guests}
    </td>
    <td className="py-4 px-6">
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${event.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
        {event.status}
      </span>
    </td>
    <td className="py-4 px-6 font-bold text-gray-800 text-right">${event.revenue.toLocaleString()}</td>
  </tr>
);

export default function CateringApp() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 md:ml-64 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome back, Admin 👋</h2>
            <p className="text-gray-500 text-sm mt-1">Here is your business overview.</p>
          </div>
          <button className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-primary transition-colors">
            <Bell size={20} />
          </button>
        </header>

        {/* --- DASHBOARD TAB --- */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard title="Total Revenue" value="$32,700" icon={DollarSign} colorClass="bg-emerald-500 shadow-emerald-500/20" />
              <StatCard title="Pending" value="5" icon={Clock} colorClass="bg-amber-500 shadow-amber-500/20" />
              <StatCard title="Events" value="12" icon={Calendar} colorClass="bg-blue-500 shadow-blue-500/20" />
              <StatCard title="Guests" value="1,240" icon={Users} colorClass="bg-purple-500 shadow-purple-500/20" />
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-800">Recent Bookings</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary transition-colors" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="py-4 px-6">Client</th>
                      <th className="py-4 px-6">Date</th>
                      <th className="py-4 px-6">Guests</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-right">Value</th>
                    </tr>
                  </thead>
                  <tbody>{EVENTS.map(event => <EventRow key={event.id} event={event} />)}</tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- MENU PACKAGES TAB --- */}
        {activeTab === 'menu' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-xl text-gray-800">Catering Menu Packages</h3>
                <p className="text-sm text-gray-500">Manage your food packages and pricing</p>
              </div>
              <button className="bg-primary hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-lg shadow-primary/30">
                <span>+ Create Package</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sample Package Card 1 */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all group cursor-pointer">
                <div className="h-48 bg-gray-100 rounded-xl mb-4 overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1000" 
                    alt="Buffet" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-primary shadow-sm">
                    Most Popular
                  </div>
                </div>
                <div className="px-2">
                    <h4 className="font-bold text-lg text-gray-800">Gold Wedding Buffet</h4>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">Premium selection with 5 main courses, 3 desserts, and welcome drinks.</p>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">Min: 100 Pax</span>
                        <span className="px-2 py-1 bg-orange-50 text-orange-600 text-xs rounded-md">Asian/Western</span>
                    </div>

                    <div className="flex justify-between items-end border-t border-gray-100 pt-4 mt-4">
                    <div>
                        <p className="text-xs text-gray-400">Starting from</p>
                        <span className="font-bold text-xl text-primary">$45<span className="text-xs text-gray-400 font-normal"> /head</span></span>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors">
                        Edit
                    </button>
                    </div>
                </div>
              </div>

               {/* Sample Package Card 2 */}
               <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all group cursor-pointer">
                <div className="h-48 bg-gray-100 rounded-xl mb-4 overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000" 
                    alt="Salad" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="px-2">
                    <h4 className="font-bold text-lg text-gray-800">Corporate Lunch Box</h4>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">Healthy mix of salads, grilled chicken, and fresh juice tailored for office events.</p>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">Min: 20 Pax</span>
                        <span className="px-2 py-1 bg-green-50 text-green-600 text-xs rounded-md">Healthy</span>
                    </div>

                    <div className="flex justify-between items-end border-t border-gray-100 pt-4 mt-4">
                    <div>
                        <p className="text-xs text-gray-400">Starting from</p>
                        <span className="font-bold text-xl text-primary">$20<span className="text-xs text-gray-400 font-normal"> /head</span></span>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors">
                        Edit
                    </button>
                    </div>
                </div>
              </div>

              {/* Add New Placeholder */}
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all cursor-pointer min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-white">
                    <span className="text-3xl">+</span>
                </div>
                <p className="font-medium">Add New Package</p>
              </div>

            </div>
          </div>
        )}

        {/* --- COMING SOON FOR OTHER TABS --- */}
        {activeTab !== 'dashboard' && activeTab !== 'menu' && (
          <div className="flex flex-col items-center justify-center h-96 text-gray-400 animate-in fade-in duration-500">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
               <Clock size={32} className="text-gray-300"/>
            </div>
            <h3 className="text-lg font-bold text-gray-600">Coming Soon</h3>
            <p className="mt-2">The <span className="font-bold text-gray-500 capitalize">{activeTab}</span> module is currently under development.</p>
          </div>
        )}

      </main>
    </div>
  );
}