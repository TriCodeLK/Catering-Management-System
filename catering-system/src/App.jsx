import React, { useState } from 'react';
import { Calendar, Users, DollarSign, Clock, Bell, Search } from 'lucide-react';
import Sidebar from './components/Sidebar';

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
          <button className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-primary">
            <Bell size={20} />
          </button>
        </header>

        {/* Dashboard Content */}
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
                  <input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-primary" />
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

        {activeTab !== 'dashboard' && (
          <div className="flex flex-col items-center justify-center h-96 text-gray-400">
            <p>The {activeTab} module is coming soon.</p>
          </div>
        )}
      </main>
    </div>
  );
}