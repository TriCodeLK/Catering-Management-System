import React, { useState } from 'react';
import { Calendar, Users, DollarSign, Clock, Bell, Search, X, Trash2 } from 'lucide-react';
import Sidebar from './components/Sidebar';

// --- MOCK DATA FOR DASHBOARD ---
const EVENTS = [
  { id: 1, client: "Smith Wedding", date: "2026-02-15", guests: 150, status: "Confirmed", type: "Wedding", revenue: 5000 },
  { id: 2, client: "Tech Corp Annual", date: "2026-02-20", guests: 300, status: "Pending", type: "Corporate", revenue: 8500 },
  { id: 3, client: "Jenny's 18th", date: "2026-03-05", guests: 50, status: "Confirmed", type: "Birthday", revenue: 1200 },
];

// --- INITIAL PACKAGES DATA ---
const INITIAL_PACKAGES = [
  { 
    id: 1, 
    name: "Gold Wedding Buffet", 
    price: "45", 
    description: "Premium selection with 5 main courses, 3 desserts, and welcome drinks.", 
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1000",
    tag: "Popular"
  },
  { 
    id: 2, 
    name: "Corporate Lunch Box", 
    price: "20", 
    description: "Healthy mix of salads, grilled chicken, and fresh juice tailored for office events.", 
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000",
    tag: "Healthy"
  }
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
  const [packages, setPackages] = useState(INITIAL_PACKAGES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPackage, setNewPackage] = useState({ name: '', price: '', description: '' });

  const handleAddPackage = (e) => {
    e.preventDefault();
    const packageToAdd = {
      id: Date.now(),
      name: newPackage.name,
      price: newPackage.price,
      description: newPackage.description,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000",
      tag: "New"
    };
    setPackages([...packages, packageToAdd]);
    setIsModalOpen(false);
    setNewPackage({ name: '', price: '', description: '' });
  };

  // --- NEW: DELETE FUNCTION ---
  const handleDeletePackage = (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
        setPackages(packages.filter(pkg => pkg.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 md:ml-64 p-8 relative">
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard title="Total Revenue" value="$32,700" icon={DollarSign} colorClass="bg-emerald-500 shadow-emerald-500/20" />
              <StatCard title="Pending" value="5" icon={Clock} colorClass="bg-amber-500 shadow-amber-500/20" />
              <StatCard title="Events" value="12" icon={Calendar} colorClass="bg-blue-500 shadow-blue-500/20" />
              <StatCard title="Guests" value="1,240" icon={Users} colorClass="bg-purple-500 shadow-purple-500/20" />
            </div>
            
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
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-primary hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-lg shadow-primary/30"
              >
                <span>+ Create Package</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all group cursor-pointer relative">
                  <div className="h-48 bg-gray-100 rounded-xl mb-4 overflow-hidden relative">
                    <img 
                      src={pkg.image}
                      alt={pkg.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {pkg.tag && (
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-primary shadow-sm">
                        {pkg.tag}
                      </div>
                    )}
                  </div>
                  <div className="px-2">
                      <h4 className="font-bold text-lg text-gray-800">{pkg.name}</h4>
                      <p className="text-gray-500 text-sm mt-1 line-clamp-2">{pkg.description}</p>
                      
                      <div className="flex justify-between items-end border-t border-gray-100 pt-4 mt-4">
                        <div>
                            <p className="text-xs text-gray-400">Starting from</p>
                            <span className="font-bold text-xl text-primary">${pkg.price}<span className="text-xs text-gray-400 font-normal"> /head</span></span>
                        </div>
                        <div className="flex gap-2">
                            {/* Delete Button */}
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent card click
                                    handleDeletePackage(pkg.id);
                                }}
                                className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                                title="Delete Package"
                            >
                                <Trash2 size={18} />
                            </button>
                            <button className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors">
                                Edit
                            </button>
                        </div>
                      </div>
                  </div>
                </div>
              ))}

              <div 
                onClick={() => setIsModalOpen(true)}
                className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all cursor-pointer min-h-[400px]"
              >
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-white">
                    <span className="text-3xl">+</span>
                </div>
                <p className="font-medium">Add New Package</p>
              </div>
            </div>
          </div>
        )}

        {/* --- COMING SOON --- */}
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

      {/* --- POPUP MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Add New Package</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddPackage} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Package Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="e.g. Silver Dinner Set"
                  value={newPackage.name}
                  onChange={(e) => setNewPackage({...newPackage, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price per Head ($)</label>
                <input 
                  type="number" 
                  required
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="0.00"
                  value={newPackage.price}
                  onChange={(e) => setNewPackage({...newPackage, price: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  required
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary h-24"
                  placeholder="What is included in this package?"
                  value={newPackage.description}
                  onChange={(e) => setNewPackage({...newPackage, description: e.target.value})}
                ></textarea>
              </div>

              <div className="pt-2 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-primary/30"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}