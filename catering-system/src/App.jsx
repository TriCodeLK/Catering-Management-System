import React, { useState, useEffect } from 'react';
import { Calendar, Users, DollarSign, Clock, Search, X, Trash2, Upload, ChevronRight, MapPin, TrendingUp, Utensils, Plus, ChevronDown, ChevronLeft, LogOut } from 'lucide-react';
import Sidebar from './components/Sidebar';

// --- 1. MOCK DATA (ආරම්භක ඩේටා) ---
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
  }
];

const INITIAL_ORDERS = [
    { id: "ORD-001", customer: "Johnson Wedding", date: "2026-01-28", time: "18:00", location: "Grand Ballroom", package: "Grilled Salmon Fillet", pax: 150, status: "Confirmed", total: 6750 },
    { id: "ORD-002", customer: "Tech Corp Gala", date: "2026-02-02", time: "19:30", location: "Convention Center", package: "Beef Wellington", pax: 300, status: "Confirmed", total: 8500 }
];

// --- 2. COMPONENTS (පොඩි කෑලි) ---

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
        <span className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${isPrimary ? 'bg-white/20 text-white' : 'bg-green-50 text-green-600'}`}>
            <TrendingUp size={12} /> {subValue}
        </span>
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
            <div className="flex items-center gap-2"><Calendar size={14} className="text-orange-500" /><span>{order.date}</span></div>
            <div className="flex items-center gap-2"><Users size={14} className="text-gray-400" /><span>{order.pax} guests</span></div>
        </div>
    </div>
);

const PopularItem = ({ item, index }) => (
    <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
        <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">{index + 1}</div>
        <div className="flex-1">
            <h5 className="font-bold text-gray-900">{item.name}</h5>
            <p className="text-xs text-gray-500">{item.tag || 'General'}</p>
        </div>
        <div className="text-right">
            <p className="font-bold text-gray-900">{item.sales || 0}</p>
        </div>
    </div>
);

// --- 3. MAIN APPLICATION ---
export default function CateringApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Local Storage (Data Saving)
  const [packages, setPackages] = useState(() => {
    const saved = localStorage.getItem('catering_packages');
    return saved ? JSON.parse(saved) : INITIAL_PACKAGES;
  });
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('catering_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // UI States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'MENU' or 'ORDER'
  
  // Forms
  const [menuForm, setMenuForm] = useState({ name: '', price: '', description: '', image: '' });
  const [editingMenuId, setEditingMenuId] = useState(null);
  const [orderForm, setOrderForm] = useState({ customer: '', date: '', time: '', location: '', packageId: '', pax: '', status: 'Pending' });

  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Auto Save
  useEffect(() => { localStorage.setItem('catering_packages', JSON.stringify(packages)); }, [packages]);
  useEffect(() => { localStorage.setItem('catering_orders', JSON.stringify(orders)); }, [orders]);

  // --- FUNCTIONS ---

  // Menu Functions
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

  const openMenuModal = (pkg = null) => {
    setModalType('MENU');
    if (pkg) { setEditingMenuId(pkg.id); setMenuForm(pkg); } 
    else { setEditingMenuId(null); setMenuForm({ name: '', price: '', description: '', image: '' }); }
    setIsModalOpen(true);
  };

  // Order Functions
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
        id: `ORD-${Date.now().toString().slice(-4)}`,
        customer: orderForm.customer,
        date: orderForm.date,
        time: orderForm.time,
        location: orderForm.location,
        package: selectedPkg ? selectedPkg.name : 'Unknown Package',
        pax: parseInt(orderForm.pax),
        status: orderForm.status,
        total: calculateTotal()
    };
    setOrders([newOrder, ...orders]);
    setIsModalOpen(false);
    setOrderForm({ customer: '', date: '', time: '', location: '', packageId: '', pax: '', status: 'Pending' });
  };

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
  };

  const handleDeleteOrder = (id) => {
    if(window.confirm("Delete this order?")) setOrders(orders.filter((order) => order.id !== id));
  };

  const openOrderModal = () => {
    setModalType('ORDER');
    setOrderForm({ customer: '', date: '', time: '', location: '', packageId: '', pax: '', status: 'Pending' });
    setIsModalOpen(true);
  };

  // Calendar Logic
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const changeMonth = (offset) => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} className="h-32 border border-gray-100 bg-gray-50/30"></div>);
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayOrders = orders.filter(o => o.date === dateStr);
        days.push(
            <div key={day} onClick={() => setSelectedDate(dateStr)} className={`h-32 border border-gray-100 p-2 relative group cursor-pointer transition-colors hover:bg-orange-50 ${selectedDate === dateStr ? 'bg-orange-50 ring-2 ring-orange-200' : 'bg-white'}`}>
                <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${dateStr === new Date().toISOString().split('T')[0] ? 'bg-orange-500 text-white' : 'text-gray-700'}`}>{day}</span>
                <div className="mt-2 space-y-1">
                    {dayOrders.map((order, idx) => (
                        <div key={idx} className="text-[10px] truncate px-1.5 py-0.5 rounded bg-orange-100 text-orange-700 font-medium">{order.time} - {order.customer}</div>
                    ))}
                </div>
            </div>
        );
    }
    return days;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex text-gray-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 md:ml-64 p-8 relative">
        
        {/* --- DASHBOARD TAB --- */}
        {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in">
                <div className="mb-8">
                    <h2 className="text-4xl font-serif font-medium text-gray-900 mb-2">Welcome back, Chef</h2>
                    <p className="text-gray-500">Dashboard Overview</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <StatCard title="Upcoming Events" value={orders.length} subValue="8%" icon={Calendar} isPrimary={true} />
                    <StatCard title="Total Revenue" value={`$${orders.reduce((acc, curr) => acc + curr.total, 0).toLocaleString()}`} subValue="12%" icon={DollarSign} />
                    <StatCard title="Active Clients" value="38" subValue="15%" icon={Users} />
                    <StatCard title="Menu Items" value={packages.length} subValue="4 New" icon={Utensils} />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-xl font-bold font-serif">Upcoming Events</h3>
                        {orders.slice(0, 3).map(order => <EventListItem key={order.id} order={order} />)}
                    </div>
                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm h-fit">
                        <h3 className="font-bold font-serif text-lg mb-4">Popular Items</h3>
                        {packages.map((item, index) => <PopularItem key={item.id} item={item} index={index} />)}
                    </div>
                </div>
            </div>
        )}

        {/* --- MENU TAB --- */}
        {activeTab === 'menu' && (
          <div className="animate-in fade-in">
            <div className="flex justify-between items-center mb-8">
               <h2 className="text-3xl font-serif font-medium">Menu Packages</h2>
               <button onClick={() => openMenuModal()} className="bg-gray-900 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:bg-black">+ Create Package</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-lg transition-all cursor-pointer" onClick={() => openMenuModal(pkg)}>
                  <div className="h-48 bg-gray-100 rounded-xl mb-4 overflow-hidden"><img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" /></div>
                  <h4 className="font-bold text-lg font-serif">{pkg.name}</h4>
                  <div className="flex justify-between items-center pt-3 mt-2 border-t border-gray-50">
                     <span className="font-bold text-lg text-orange-600">${pkg.price}</span>
                     <button onClick={(e) => {e.stopPropagation(); handleDeletePackage(pkg.id)}} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={16}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- ORDERS TAB --- */}
        {activeTab === 'orders' && (
            <div className="animate-in fade-in">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-serif font-medium">Event Management</h2>
                    <button onClick={openOrderModal} className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-orange-600 flex items-center gap-2"><Plus size={20} /> New Event</button>
                </div>
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100 text-gray-400 text-xs uppercase font-bold">
                            <tr><th className="py-5 px-6">Customer</th><th className="py-5 px-6">Date</th><th className="py-5 px-6">Package</th><th className="py-5 px-6">Status</th><th className="py-5 px-6 text-right">Total</th><th className="py-5 px-6 text-center">Action</th></tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                                    <td className="py-5 px-6 font-bold">{order.customer}</td>
                                    <td className="py-5 px-6 text-sm">{order.date}<br/><span className="text-gray-400">{order.time}</span></td>
                                    <td className="py-5 px-6">{order.package}</td>
                                    <td className="py-5 px-6">
                                        <select value={order.status} onChange={(e) => handleStatusChange(order.id, e.target.value)} className="bg-gray-100 rounded px-2 py-1 text-xs font-bold">
                                            <option value="Pending">Pending</option><option value="Confirmed">Confirmed</option><option value="Completed">Completed</option>
                                        </select>
                                    </td>
                                    <td className="py-5 px-6 text-right font-bold">${order.total.toLocaleString()}</td>
                                    <td className="py-5 px-6 text-center"><button onClick={() => handleDeleteOrder(order.id)} className="text-red-400 hover:text-red-600"><Trash2 size={18} /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* --- CALENDAR TAB --- */}
        {activeTab === 'calendar' && (
            <div className="animate-in fade-in flex flex-col h-[calc(100vh-8rem)]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-serif font-medium">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                    <div className="flex gap-2">
                        <button onClick={() => changeMonth(-1)} className="p-2 border rounded hover:bg-gray-50"><ChevronLeft size={20}/></button>
                        <button onClick={() => changeMonth(1)} className="p-2 border rounded hover:bg-gray-50"><ChevronRight size={20}/></button>
                    </div>
                </div>
                <div className="flex gap-6 h-full">
                    <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
                        <div className="grid grid-cols-7 border-b p-2 font-bold text-gray-400 text-center">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}</div>
                        <div className="grid grid-cols-7 flex-1 auto-rows-fr overflow-y-auto">{renderCalendar()}</div>
                    </div>
                    {selectedDate && (
                        <div className="w-80 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 overflow-y-auto">
                            <h3 className="text-lg font-bold font-serif mb-4">{selectedDate}</h3>
                            {orders.filter(o => o.date === selectedDate).length > 0 ? (
                                orders.filter(o => o.date === selectedDate).map(order => (
                                    <div key={order.id} className="p-4 mb-2 rounded-xl bg-gray-50 border">
                                        <div className="font-bold">{order.customer}</div>
                                        <div className="text-xs text-gray-500">{order.package}</div>
                                    </div>
                                ))
                            ) : (<p className="text-gray-400 text-center">No events.</p>)}
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* --- SETTINGS TAB (RESET) --- */}
        {activeTab === 'settings' && (
            <div className="animate-in fade-in max-w-xl">
                <h2 className="text-3xl font-serif font-medium mb-8">Settings</h2>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex gap-4">
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl"><LogOut size={24}/></div>
                    <div>
                        <h3 className="font-bold text-lg">Reset Application Data</h3>
                        <p className="text-sm text-gray-500 mb-4">Clear all saved orders and menu items.</p>
                        <button onClick={() => { if(window.confirm("Delete all data?")) { localStorage.removeItem('catering_packages'); localStorage.removeItem('catering_orders'); window.location.reload(); } }} className="px-4 py-2 bg-red-50 text-red-600 font-bold rounded-lg border border-red-100">Reset Data</button>
                    </div>
                </div>
            </div>
        )}

        {/* --- MODAL --- */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-serif">{modalType === 'MENU' ? 'Menu Item' : 'New Event'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={24} /></button>
              </div>

              {modalType === 'MENU' && (
                  <form onSubmit={handleSavePackage} className="space-y-4">
                    <div className="flex gap-4 items-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden">{menuForm.image && <img src={menuForm.image} className="w-full h-full object-cover"/>}</div>
                        <label className="flex-1 cursor-pointer border-2 border-dashed rounded-xl h-20 flex items-center justify-center hover:bg-gray-50"><Upload size={16}/> <span className="ml-2 text-xs font-bold">Upload</span><input type="file" className="hidden" onChange={handleImageUpload}/></label>
                    </div>
                    <input type="text" placeholder="Name" required className="w-full p-3 bg-gray-50 rounded-xl" value={menuForm.name} onChange={e => setMenuForm({...menuForm, name: e.target.value})} />
                    <input type="number" placeholder="Price" required className="w-full p-3 bg-gray-50 rounded-xl" value={menuForm.price} onChange={e => setMenuForm({...menuForm, price: e.target.value})} />
                    <textarea placeholder="Description" className="w-full p-3 bg-gray-50 rounded-xl" value={menuForm.description} onChange={e => setMenuForm({...menuForm, description: e.target.value})}></textarea>
                    <button type="submit" className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl">Save Item</button>
                  </form>
              )}

              {modalType === 'ORDER' && (
                  <form onSubmit={handleSaveOrder} className="space-y-4">
                    <input type="text" placeholder="Client Name" required className="w-full p-3 bg-gray-50 rounded-xl" value={orderForm.customer} onChange={e => setOrderForm({...orderForm, customer: e.target.value})} />
                    <div className="flex gap-4">
                        <input type="date" required className="w-full p-3 bg-gray-50 rounded-xl" value={orderForm.date} onChange={e => setOrderForm({...orderForm, date: e.target.value})} />
                        <input type="time" required className="w-full p-3 bg-gray-50 rounded-xl" value={orderForm.time} onChange={e => setOrderForm({...orderForm, time: e.target.value})} />
                    </div>
                    <input type="text" placeholder="Location" required className="w-full p-3 bg-gray-50 rounded-xl" value={orderForm.location} onChange={e => setOrderForm({...orderForm, location: e.target.value})} />
                    <div className="flex gap-4">
                        <select required className="w-full p-3 bg-gray-50 rounded-xl" value={orderForm.packageId} onChange={e => setOrderForm({...orderForm, packageId: e.target.value})}><option value="">Select Menu</option>{packages.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select>
                        <input type="number" placeholder="Pax" required className="w-full p-3 bg-gray-50 rounded-xl" value={orderForm.pax} onChange={e => setOrderForm({...orderForm, pax: e.target.value})} />
                    </div>
                    <div className="p-4 bg-orange-50 rounded-xl flex justify-between font-bold text-orange-600"><span>Total</span><span>${calculateTotal().toLocaleString()}</span></div>
                    <button type="submit" className="w-full py-3 bg-orange-500 text-white font-bold rounded-xl">Confirm Booking</button>
                  </form>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}