import React, { useState, useEffect } from 'react';
import { Calendar, Users, DollarSign, Clock, Bell, Search, X, Trash2, Edit2, Upload, Image as ImageIcon, ChevronRight, MapPin, TrendingUp, Utensils } from 'lucide-react';
import Sidebar from './components/Sidebar';

// --- MOCK DATA ---
const INITIAL_PACKAGES = [
  { 
    id: 1, 
    name: "Grilled Salmon Fillet", 
    price: "45", 
    description: "Premium selection with 5 main courses.", 
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1000",
    sales: 245,
    earnings: 6125,
    tag: "Main Course"
  },
  { 
    id: 2, 
    name: "Beef Wellington", 
    price: "20", 
    description: "Healthy mix of salads and grilled chicken.", 
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000",
    sales: 189,
    earnings: 7560,
    tag: "Main Course"
  },
  { 
    id: 3, 
    name: "Caprese Salad", 
    price: "15", 
    description: "Fresh tomatoes and mozzarella.", 
    image: "https://images.unsplash.com/photo-1529312266912-b33cf6227e24?auto=format&fit=crop&q=80&w=1000",
    sales: 312,
    earnings: 2808,
    tag: "Appetizer"
  }
];

const INITIAL_ORDERS = [
    { id: "ORD-001", customer: "Johnson Wedding Reception", date: "Jan 28, 2026", time: "6:00 PM", location: "Grand Ballroom, Hilton", package: "Gold Wedding Buffet", pax: 150, status: "Confirmed", total: 6750 },
    { id: "ORD-002", customer: "Tech Corp Annual Gala", date: "Feb 02, 2026", time: "7:30 PM", location: "Convention Center", package: "Corporate Lunch Box", pax: 300, status: "Confirmed", total: 8500 },
    { id: "ORD-003", customer: "City Charity Fundraiser", date: "Feb 14, 2026", time: "5:00 PM", location: "City Hall Garden", package: "High Tea Special", pax: 500, status: "Pending", total: 15000 },
];

// --- COMPONENTS ---

// Design-Matching Stat Card
const StatCard = ({ title, value, subValue, icon: Icon, isPrimary }) => (
  <div className={`p-6 rounded-3xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
    isPrimary 
      ? 'bg-[#F97316] text-white shadow-xl shadow-orange-500/30' 
      : 'bg-white text-gray-800 border border-gray-100 shadow-sm'
  }`}>
    <div className="flex justify-between items-start mb-4">
        <div>
            <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${isPrimary ? 'text-orange-100' : 'text-gray-400'}`}>{title}</p>
            <h3 className="text-3xl font-bold font-serif">{value}</h3>
        </div>
        <div className={`p-3 rounded-2xl ${isPrimary ? 'bg-white/20 text-white' : 'bg-gray-50 text-gray-400'}`}>
            <Icon size={20} />
        </div>
    </div>
    
    <div className="flex items-center gap-2">
        <span className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
            isPrimary ? 'bg-white/20 text-white' : 'bg-green-50 text-green-600'
        }`}>
            <TrendingUp size={12} /> {subValue}
        </span>
        <span className={`text-xs ${isPrimary ? 'text-orange-100' : 'text-gray-400'}`}>vs last month</span>
    </div>
  </div>
);

// New Event List Item (Matching Design)
const EventListItem = ({ order }) => (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group cursor-pointer">
        <div className="flex justify-between items-start mb-3">
            <div>
                <h4 className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors">{order.customer}</h4>
                <p className="text-sm text-gray-500">{order.package}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                order.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
            }`}>
                {order.status}
            </span>
        </div>
        
        <div className="flex items-center gap-6 text-sm text-gray-500 mt-4 pt-4 border-t border-gray-50">
            <div className="flex items-center gap-2">
                <Calendar size={14} className="text-orange-500" />
                <span>{order.date} at {order.time}</span>
            </div>
            <div className="flex items-center gap-2">
                <MapPin size={14} className="text-orange-500" />
                <span>{order.location}</span>
            </div>
            <div className="flex items-center gap-2 ml-auto font-medium text-gray-700">
                <Users size={14} className="text-gray-400" />
                <span>{order.pax} guests</span>
            </div>
        </div>
    </div>
);

// Popular Item Row
const PopularItem = ({ item, index }) => (
    <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
        <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
            {index + 1}
        </div>
        <div className="flex-1">
            <h5 className="font-bold text-gray-900">{item.name}</h5>
            <p className="text-xs text-gray-500">{item.tag}</p>
        </div>
        <div className="text-right">
            <p className="font-bold text-gray-900">{item.sales}</p>
            <p className="text-xs text-green-600 font-medium">${item.earnings.toLocaleString()}</p>
        </div>
        <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 rounded-full" style={{ width: `${(item.sales / 350) * 100}%` }}></div>
        </div>
    </div>
);

export default function CateringApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // -- LOCAL STORAGE --
  const [packages, setPackages] = useState(() => {
    const saved = localStorage.getItem('catering_packages');
    return saved ? JSON.parse(saved) : INITIAL_PACKAGES;
  });
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('catering_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Modal & Form State (Same as before)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', price: '', description: '', image: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { localStorage.setItem('catering_packages', JSON.stringify(packages)); }, [packages]);
  useEffect(() => { localStorage.setItem('catering_orders', JSON.stringify(orders)); }, [orders]);

  // -- HANDLERS (Simplified for brevity, same functionality) --
  const handleSavePackage = (e) => {
    e.preventDefault();
    const finalImage = formData.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1000";
    if (editingId) {
        setPackages(packages.map(p => p.id === editingId ? { ...p, ...formData, image: finalImage } : p));
    } else {
        setPackages([...packages, { id: Date.now(), ...formData, image: finalImage, tag: "New" }]);
    }
    setIsModalOpen(false);
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex text-gray-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 md:ml-64 p-8 relative">
        {/* Top Header */}
        {activeTab === 'dashboard' && (
            <div className="mb-10">
                <div className="flex items-center gap-2 text-orange-600 font-medium text-sm mb-1">
                    <TrendingUp size={16} />
                    <span>Dashboard Overview</span>
                </div>
                <h2 className="text-4xl font-serif font-medium text-gray-900 mb-2">Welcome back, Chef</h2>
                <p className="text-gray-500">Here's what's happening with your catering business today.</p>
            </div>
        )}

        {/* --- DASHBOARD CONTENT --- */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard title="Upcoming Events" value="12" subValue="8%" icon={Calendar} isPrimary={true} />
              <StatCard title="Total Revenue" value="$48,250" subValue="12%" icon={DollarSign} />
              <StatCard title="Active Clients" value="38" subValue="15%" icon={Users} />
              <StatCard title="Menu Items" value="64" subValue="4 New" icon={Utensils} />
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Upcoming Events List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex justify-between items-end">
                        <h3 className="text-xl font-bold font-serif">Upcoming Events</h3>
                        <button className="text-sm font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1">
                            View all <ChevronRight size={16} />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {orders.slice(0, 3).map(order => <EventListItem key={order.id} order={order} />)}
                    </div>
                </div>

                {/* Right: Popular Items */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm h-fit">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                            <TrendingUp size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold font-serif text-lg">Popular Items</h3>
                            <p className="text-xs text-gray-500">Top sellers this month</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {packages.map((item, index) => <PopularItem key={item.id} item={item} index={index} />)}
                    </div>
                    <button className="w-full mt-6 py-3 border border-gray-100 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                        View Full Menu
                    </button>
                </div>
            </div>
          </div>
        )}

        {/* --- MENU TAB (Reused logic, just kept simpler for now) --- */}
        {activeTab === 'menu' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-8">
               <h2 className="text-3xl font-serif font-medium">Menu Packages</h2>
               <button onClick={() => { setIsModalOpen(true); setEditingId(null); setFormData({name:'', price:'', description:'', image:''}) }} className="bg-gray-900 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:bg-black transition-all">
                  + Create Package
               </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-lg transition-all group cursor-pointer" onClick={() => { setEditingId(pkg.id); setFormData(pkg); setIsModalOpen(true); }}>
                  <div className="h-48 bg-gray-100 rounded-xl mb-4 overflow-hidden relative">
                    <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h4 className="font-bold text-lg font-serif">{pkg.name}</h4>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">{pkg.description}</p>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                     <span className="font-bold text-lg text-orange-600">${pkg.price}</span>
                     <button className="text-xs font-bold uppercase tracking-wide text-gray-400 group-hover:text-gray-900">Edit Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- ORDERS TAB (Simplified for brevity) --- */}
        {activeTab === 'orders' && (
             <div className="flex flex-col items-center justify-center h-96 text-gray-400">
                <Calendar size={48} className="mb-4 opacity-20" />
                <p>Events Management Module</p>
             </div>
        )}

        {/* --- MODAL (Same as before) --- */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-in fade-in">
            <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl scale-100 animate-in zoom-in-95">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-serif">{editingId ? 'Edit Item' : 'New Menu Item'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={24} /></button>
              </div>
              <form onSubmit={handleSavePackage} className="space-y-5">
                 {/* Image Upload */}
                 <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                        {formData.image && <img src={formData.image} className="w-full h-full object-cover" />}
                    </div>
                    <label className="flex-1 cursor-pointer border-2 border-dashed border-gray-200 rounded-xl h-20 flex flex-col items-center justify-center hover:border-orange-500 hover:bg-orange-50 text-gray-500 transition-all">
                        <Upload size={16} /> <span className="text-xs font-bold mt-1">Upload Photo</span>
                        <input type="file" className="hidden" onChange={handleImageUpload} />
                    </label>
                 </div>
                 <input type="text" placeholder="Item Name" required className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500/20" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                 <input type="number" placeholder="Price ($)" required className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500/20" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                 <textarea placeholder="Description" required className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500/20 h-24" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                 <button type="submit" className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black">{editingId ? 'Update Item' : 'Save Item'}</button>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}