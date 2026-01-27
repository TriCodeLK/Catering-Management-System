import React, { useState, useEffect } from 'react';
import { Calendar, Users, DollarSign, Clock, Bell, Search, X, Trash2, Edit2, Upload, Image as ImageIcon, ChevronRight, MapPin, TrendingUp, Utensils, Plus, ChevronDown } from 'lucide-react';
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
    { id: "ORD-001", customer: "Johnson Wedding Reception", date: "Jan 28, 2026", time: "6:00 PM", location: "Grand Ballroom, Hilton", package: "Grilled Salmon Fillet", pax: 150, status: "Confirmed", total: 6750 },
    { id: "ORD-002", customer: "Tech Corp Annual Gala", date: "Feb 02, 2026", time: "7:30 PM", location: "Convention Center", package: "Beef Wellington", pax: 300, status: "Confirmed", total: 8500 },
];

// --- COMPONENTS ---

const StatCard = ({ title, value, subValue, icon: Icon, isPrimary }) => (
  <div className={`p-6 rounded-3xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
    isPrimary 
      ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/30' 
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

const EventListItem = ({ order }) => (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group cursor-pointer">
        <div className="flex justify-between items-start mb-3">
            <div>
                <h4 className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors">{order.customer}</h4>
                <p className="text-sm text-gray-500">{order.package}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                order.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 
                order.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                'bg-orange-100 text-orange-700'
            }`}>
                {order.status}
            </span>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-500 mt-4 pt-4 border-t border-gray-50">
            <div className="flex items-center gap-2">
                <Calendar size={14} className="text-orange-500" />
                <span>{order.date}</span>
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

const PopularItem = ({ item, index }) => (
    <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
        <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
            {index + 1}
        </div>
        <div className="flex-1">
            <h5 className="font-bold text-gray-900">{item.name}</h5>
            <p className="text-xs text-gray-500">{item.tag || 'General'}</p>
        </div>
        <div className="text-right">
            <p className="font-bold text-gray-900">{item.sales || 0}</p>
            <p className="text-xs text-green-600 font-medium">${(item.earnings || 0).toLocaleString()}</p>
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

  // -- STATES --
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'MENU' or 'ORDER'
  
  // Menu Form State
  const [menuForm, setMenuForm] = useState({ name: '', price: '', description: '', image: '' });
  const [editingMenuId, setEditingMenuId] = useState(null);

  // Order Form State (NEW)
  const [orderForm, setOrderForm] = useState({ 
    customer: '', 
    date: '', 
    time: '', 
    location: '', 
    packageId: '', // We store ID to find price later
    pax: '', 
    status: 'Pending' 
  });

  useEffect(() => { localStorage.setItem('catering_packages', JSON.stringify(packages)); }, [packages]);
  useEffect(() => { localStorage.setItem('catering_orders', JSON.stringify(orders)); }, [orders]);

  // -- MENU HANDLERS --
  const handleSavePackage = (e) => {
    e.preventDefault();
    const finalImage = menuForm.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1000";
    if (editingMenuId) {
        setPackages(packages.map(p => p.id === editingMenuId ? { ...p, ...menuForm, image: finalImage } : p));
    } else {
        setPackages([...packages, { id: Date.now(), ...menuForm, image: finalImage, tag: "New", sales: 0, earnings: 0 }]);
    }
    setIsModalOpen(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setMenuForm({ ...menuForm, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePackage = (id) => {
    if(window.confirm("Delete this package?")) setPackages(packages.filter((pkg) => pkg.id !== id));
  };

  // -- ORDER HANDLERS --
  
  // Calculate Total Amount dynamically
  const calculateTotal = () => {
    if (!orderForm.packageId || !orderForm.pax) return 0;
    const selectedPkg = packages.find(p => p.id.toString() === orderForm.packageId.toString());
    if (!selectedPkg) return 0;
    return selectedPkg.price * orderForm.pax;
  };

  const handleSaveOrder = (e) => {
    e.preventDefault();
    const selectedPkg = packages.find(p => p.id.toString() === orderForm.packageId.toString());
    
    const newOrder = {
        id: `ORD-${Date.now().toString().slice(-4)}`, // Generate simple ID
        customer: orderForm.customer,
        date: orderForm.date,
        time: orderForm.time,
        location: orderForm.location,
        package: selectedPkg ? selectedPkg.name : 'Unknown Package',
        pax: parseInt(orderForm.pax),
        status: orderForm.status,
        total: calculateTotal()
    };

    setOrders([newOrder, ...orders]); // Add to top of list
    setIsModalOpen(false);
    // Reset form
    setOrderForm({ customer: '', date: '', time: '', location: '', packageId: '', pax: '', status: 'Pending' });
  };

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
  };

  const handleDeleteOrder = (id) => {
    if(window.confirm("Delete this order?")) setOrders(orders.filter((order) => order.id !== id));
  };

  // Helper to open correct modal
  const openMenuModal = (pkg = null) => {
    setModalType('MENU');
    if (pkg) {
        setEditingMenuId(pkg.id);
        setMenuForm(pkg);
    } else {
        setEditingMenuId(null);
        setMenuForm({ name: '', price: '', description: '', image: '' });
    }
    setIsModalOpen(true);
  };

  const openOrderModal = () => {
    setModalType('ORDER');
    setOrderForm({ customer: '', date: '', time: '', location: '', packageId: '', pax: '', status: 'Pending' });
    setIsModalOpen(true);
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

        {/* --- DASHBOARD --- */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard title="Upcoming Events" value={orders.length} subValue="8%" icon={Calendar} isPrimary={true} />
              <StatCard title="Total Revenue" value={`$${orders.reduce((acc, curr) => acc + curr.total, 0).toLocaleString()}`} subValue="12%" icon={DollarSign} />
              <StatCard title="Active Clients" value="38" subValue="15%" icon={Users} />
              <StatCard title="Menu Items" value={packages.length} subValue="4 New" icon={Utensils} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex justify-between items-end">
                        <h3 className="text-xl font-bold font-serif">Upcoming Events</h3>
                        <button onClick={() => setActiveTab('orders')} className="text-sm font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1">
                            View all <ChevronRight size={16} />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {orders.slice(0, 3).map(order => <EventListItem key={order.id} order={order} />)}
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm h-fit">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                            <TrendingUp size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold font-serif text-lg">Popular Items</h3>
                            <p className="text-xs text-gray-500">Top sellers</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {packages.map((item, index) => <PopularItem key={item.id} item={item} index={index} />)}
                    </div>
                </div>
            </div>
          </div>
        )}

        {/* --- MENU TAB --- */}
        {activeTab === 'menu' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-8">
               <h2 className="text-3xl font-serif font-medium">Menu Packages</h2>
               <button onClick={() => openMenuModal()} className="bg-gray-900 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:bg-black transition-all">
                  + Create Package
               </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-lg transition-all group cursor-pointer" onClick={() => openMenuModal(pkg)}>
                  <div className="h-48 bg-gray-100 rounded-xl mb-4 overflow-hidden relative">
                    <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h4 className="font-bold text-lg font-serif">{pkg.name}</h4>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">{pkg.description}</p>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                     <span className="font-bold text-lg text-orange-600">${pkg.price}</span>
                     <button onClick={(e) => {e.stopPropagation(); handleDeletePackage(pkg.id)}} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={16}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- ORDERS TAB (FULL) --- */}
        {activeTab === 'orders' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-serif font-medium">Event Management</h2>
                        <p className="text-gray-500 mt-1">Manage bookings and schedules</p>
                    </div>
                    <button onClick={openOrderModal} className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all flex items-center gap-2">
                        <Plus size={20} /> New Event
                    </button>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 border-b border-gray-100 text-gray-400 text-xs uppercase tracking-wider font-bold">
                                <tr>
                                    <th className="py-5 px-6">Customer</th>
                                    <th className="py-5 px-6">Date & Time</th>
                                    <th className="py-5 px-6">Package</th>
                                    <th className="py-5 px-6">Status</th>
                                    <th className="py-5 px-6 text-right">Total</th>
                                    <th className="py-5 px-6 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                        <td className="py-5 px-6">
                                            <p className="font-bold text-gray-900">{order.customer}</p>
                                            <p className="text-xs text-gray-400 flex items-center gap-1 mt-1"><MapPin size={10} /> {order.location}</p>
                                        </td>
                                        <td className="py-5 px-6 text-sm text-gray-600">
                                            <div className="flex flex-col">
                                                <span className="font-medium">{order.date}</span>
                                                <span className="text-xs text-gray-400">{order.time}</span>
                                            </div>
                                        </td>
                                        <td className="py-5 px-6">
                                            <span className="block font-medium text-gray-800">{order.package}</span>
                                            <span className="text-xs text-gray-500">{order.pax} Pax</span>
                                        </td>
                                        <td className="py-5 px-6">
                                            <div className="relative w-32">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                    className={`w-full appearance-none pl-3 pr-8 py-1.5 rounded-lg text-xs font-bold border-none cursor-pointer focus:ring-2 focus:ring-orange-500/20 ${
                                                        order.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 
                                                        order.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-orange-100 text-orange-700'
                                                    }`}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Confirmed">Confirmed</option>
                                                    <option value="Completed">Completed</option>
                                                </select>
                                                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />
                                            </div>
                                        </td>
                                        <td className="py-5 px-6 text-right font-bold text-gray-900">
                                            ${order.total.toLocaleString()}
                                        </td>
                                        <td className="py-5 px-6 text-center">
                                            <button onClick={() => handleDeleteOrder(order.id)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )}

        {/* --- UNIVERSAL MODAL --- */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl scale-100 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
              
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-serif">
                    {modalType === 'MENU' ? (editingMenuId ? 'Edit Item' : 'New Menu Item') : 'Create New Event'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={24} /></button>
              </div>

              {/* --- MENU FORM --- */}
              {modalType === 'MENU' && (
                  <form onSubmit={handleSavePackage} className="space-y-5">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                            {menuForm.image && <img src={menuForm.image} className="w-full h-full object-cover" />}
                        </div>
                        <label className="flex-1 cursor-pointer border-2 border-dashed border-gray-200 rounded-xl h-20 flex flex-col items-center justify-center hover:border-orange-500 hover:bg-orange-50 text-gray-500 transition-all">
                            <Upload size={16} /> <span className="text-xs font-bold mt-1">Upload Photo</span>
                            <input type="file" className="hidden" onChange={handleImageUpload} />
                        </label>
                    </div>
                    <input type="text" placeholder="Item Name" required className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500/20" value={menuForm.name} onChange={e => setMenuForm({...menuForm, name: e.target.value})} />
                    <input type="number" placeholder="Price ($)" required className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500/20" value={menuForm.price} onChange={e => setMenuForm({...menuForm, price: e.target.value})} />
                    <textarea placeholder="Description" required className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500/20 h-24" value={menuForm.description} onChange={e => setMenuForm({...menuForm, description: e.target.value})}></textarea>
                    <button type="submit" className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black">{editingMenuId ? 'Update Item' : 'Save Item'}</button>
                  </form>
              )}

              {/* --- ORDER FORM (NEW) --- */}
              {modalType === 'ORDER' && (
                  <form onSubmit={handleSaveOrder} className="space-y-5">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Client Details</label>
                        <input type="text" placeholder="Client Name" required className="w-full mt-1 p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500/20" value={orderForm.customer} onChange={e => setOrderForm({...orderForm, customer: e.target.value})} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Date</label>
                            <input type="date" required className="w-full mt-1 p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500/20" value={orderForm.date} onChange={e => setOrderForm({...orderForm, date: e.target.value})} />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Time</label>
                            <input type="time" required className="w-full mt-1 p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500/20" value={orderForm.time} onChange={e => setOrderForm({...orderForm, time: e.target.value})} />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Venue</label>
                        <input type="text" placeholder="Location / Address" required className="w-full mt-1 p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500/20" value={orderForm.location} onChange={e => setOrderForm({...orderForm, location: e.target.value})} />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Select Package</label>
                            <div className="relative">
                                <select required className="w-full mt-1 p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500/20 appearance-none" value={orderForm.packageId} onChange={e => setOrderForm({...orderForm, packageId: e.target.value})}>
                                    <option value="">Choose a Menu...</option>
                                    {packages.map(p => (
                                        <option key={p.id} value={p.id}>{p.name} - ${p.price}/head</option>
                                    ))}
                                </select>
                                <ChevronDown size={16} className="absolute right-3 top-1/2 mt-1 -translate-y-1/2 text-gray-400 pointer-events-none"/>
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Guests</label>
                            <input type="number" placeholder="Pax" required className="w-full mt-1 p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500/20" value={orderForm.pax} onChange={e => setOrderForm({...orderForm, pax: e.target.value})} />
                        </div>
                    </div>

                    {/* Auto Calculation Display */}
                    <div className="bg-orange-50 p-4 rounded-xl flex justify-between items-center border border-orange-100">
                        <span className="text-orange-800 font-bold text-sm">Estimated Total</span>
                        <span className="text-2xl font-serif font-bold text-orange-600">${calculateTotal().toLocaleString()}</span>
                    </div>

                    <button type="submit" className="w-full py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 shadow-lg shadow-orange-500/20">Confirm Booking</button>
                  </form>
              )}

            </div>
          </div>
        )}

      </main>
    </div>
  );
}