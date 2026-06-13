/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  ShieldAlert, 
  TrendingUp, 
  DollarSign, 
  Users, 
  ShoppingBag, 
  Layers, 
  Plus, 
  Trash2, 
  Check, 
  Edit, 
  TrendingDown,
  Info,
  Truck,
  Grid,
  Filter
} from "lucide-react";
import { PRODUCTS, CATEGORIES, Product } from "../data";

interface AdminDashboardProps {
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  productsList: Product[];
  orderHistoryList: any[];
  onUpdateOrderStatus: (orderId: string, status: string) => void;
}

export default function AdminDashboard({
  onAddProduct,
  onDeleteProduct,
  productsList,
  orderHistoryList,
  onUpdateOrderStatus
}: AdminDashboardProps) {
  // Tabs: 'analytics' | 'products' | 'orders' | 'users'
  const [activeTab, setActiveTab] = useState<string>("analytics");

  // State for inventory creator form
  const [newProdForm, setNewProdForm] = useState({
    name: "",
    brand: "⚡ Aether Labs",
    category: "electronics",
    price: 199,
    description: "",
    imageUrl: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=800&q=80"
  });

  const [usersList, setUsersList] = useState([
    { id: "usr-1", name: "Ashok Kumar", email: "ashokkumar2006.k@gmail.com", role: "Elite Buyer", joined: "Jun 10, 2026", status: "Active" },
    { id: "usr-2", name: "Helena Rostova", email: "helena.r@luxury.co.uk", role: "Elite Buyer", joined: "Feb 14, 2026", status: "Active" },
    { id: "usr-3", name: "Devon Carter", email: "devon@carter-tech.io", role: "Contributor", joined: "May 28, 2026", status: "Suspended" },
    { id: "usr-4", name: "Yuki Tanaka", email: "ytanaka@tokyo-art.jp", role: "Elite Buyer", joined: "Jan 03, 2026", status: "Active" }
  ]);

  const handleAddNewProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdForm.name || !newProdForm.description) return;

    const uniqueId = `prod-new-${Date.now()}`;
    const newlyCreated: Product = {
      id: uniqueId,
      name: newProdForm.name,
      brand: newProdForm.brand,
      category: newProdForm.category,
      price: Number(newProdForm.price),
      rating: 4.5,
      reviewsCount: 1,
      images: [newProdForm.imageUrl],
      description: newProdForm.description,
      features: ["Certified high-grade dynamic design element.", "Sustainably checked packaging."],
      specs: { "Origin": "Aura Certified Licensing" }
    };

    onAddProduct(newlyCreated);
    alert("Dynamic Product Catalog Expansion Successful! Added item to active catalog.");
    setNewProdForm({
      name: "",
      brand: "⚡ Aether Labs",
      category: "electronics",
      price: 199,
      description: "",
      imageUrl: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=800&q=80"
    });
  };

  // SVGs charts data mappings
  const revenuePoints = [45, 52, 68, 72, 85, 98, 142]; // In thousands
  const salesMonths = ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">
      
      {/* Upper header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div className="space-y-1 text-left">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-serif font-semibold text-stone-950 tracking-tight">System Admin Console</h2>
            <span className="text-[10px] bg-red-500/10 border border-red-500/30 text-red-700 font-extrabold px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
              <ShieldAlert className="w-3 h-3 text-red-650 shrink-0" />
              Platform Owner Mode
            </span>
          </div>
          <p className="text-xs text-stone-500">Monitor multi-vendor transactions, catalogs, logistics and ledger status limits</p>
        </div>

        {/* Tab triggers */}
        <div className="flex flex-wrap gap-2 text-xs font-semibold select-none">
          {[
            { id: "analytics", label: "Financial Metrics" },
            { id: "products", label: "Inventory CRUD" },
            { id: "orders", label: `Logistics Orders (${orderHistoryList.length})` },
            { id: "users", label: "Platform Buyers" },
          ].map((tab) => (
            <button
              id={`admin-tab-btn-${tab.id}`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl border transition-all ${activeTab === tab.id ? "bg-stone-900 border-stone-900 text-white font-bold shadow-md" : "border-stone-200 hover:border-stone-400 bg-white text-stone-650"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-left">
        <div className="p-4 border border-stone-200 bg-white rounded-2xl flex items-center justify-between shadow-xs">
          <div className="space-y-1">
            <span className="text-[10px] text-stone-400 uppercase tracking-widest font-extrabold block">Estimated Earnings</span>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-stone-950">$142,500</span>
            <span className="text-[10px] text-emerald-600 font-semibold inline-flex items-center gap-0.5"><TrendingUp className="w-3 h-3 text-emerald-500" /> +12.4%</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center text-stone-700 shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 border border-stone-200 bg-white rounded-2xl flex items-center justify-between shadow-xs">
          <div className="space-y-1">
            <span className="text-[10px] text-stone-400 uppercase tracking-widest font-extrabold block">Active Buyers</span>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-stone-950">1,420</span>
            <span className="text-[10px] text-emerald-600 font-semibold inline-flex items-center gap-0.5"><TrendingUp className="w-3 h-3 text-emerald-500" /> +8.1%</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center text-stone-700 shrink-0">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 border border-stone-200 bg-white rounded-2xl flex items-center justify-between shadow-xs">
          <div className="space-y-1">
            <span className="text-[10px] text-stone-400 uppercase tracking-widest font-extrabold block">Catalog Size</span>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-stone-950">{productsList.length} Items</span>
            <span className="text-[10px] text-stone-405 font-medium block">Multi-department live catalog</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center text-stone-700 shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 border border-stone-200 bg-white rounded-2xl flex items-center justify-between shadow-xs">
          <div className="space-y-1">
            <span className="text-[10px] text-stone-400 uppercase tracking-widest font-extrabold block">Fulfillment Queue</span>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-stone-950">{orderHistoryList.filter(o => o.status === "Processing").length} orders</span>
            <span className="text-[10px] text-amber-600 font-bold block inline-flex items-center gap-0.5 animate-pulse">● Pending Dispatch</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center text-stone-700 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* DYNAMIC TAB COMPONENT VIEWS */}

      {/* ANALYTICS CHARTS SECTION */}
      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SVG Sales Line Chart */}
          <div className="lg:col-span-2 border border-stone-200 bg-white p-6 rounded-2xl space-y-6">
            <div className="flex justify-between items-baseline select-none">
              <div className="text-left space-y-0.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-905">Revenue velocity timeline</h4>
                <p className="text-[10px] text-stone-400">Monthly gross sales trends in thousands USD</p>
              </div>
              <span className="text-xs bg-stone-105 bg-stone-100 text-stone-800 font-bold px-2 py-0.5 rounded-md">$142K Peak</span>
            </div>

            {/* Custom Responsive SVG line plot graph */}
            <div className="aspect-video w-full rounded-xl bg-stone-50/50 p-2.5 relative select-none">
              <svg viewBox="0 0 500 200" className="w-full h-full">
                {/* Horizontal reference lines */}
                <line x1="40" y1="30" x2="480" y2="30" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3" />
                <line x1="40" y1="80" x2="480" y2="80" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3" />
                <line x1="40" y1="130" x2="480" y2="130" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3" />
                <line x1="40" y1="180" x2="480" y2="180" stroke="#e2e8f0" strokeWidth="1.5" />

                {/* Plot line curve path */}
                <path
                  d="M 40,165 L 113,155 L 186,132 L 259,121 L 332,105 L 405,92 L 478,50"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data point spheres */}
                <circle cx="40" cy="165" r="5.5" fill="#1c1917" stroke="#ffffff" strokeWidth="2" />
                <circle cx="113" cy="155" r="5.5" fill="#1c1917" stroke="#ffffff" strokeWidth="2" />
                <circle cx="186" cy="132" r="5.5" fill="#1c1917" stroke="#ffffff" strokeWidth="2" />
                <circle cx="259" cy="121" r="5.5" fill="#1c1917" stroke="#ffffff" strokeWidth="2" />
                <circle cx="332" cy="105" r="5.5" fill="#1c1917" stroke="#ffffff" strokeWidth="2" />
                <circle cx="405" cy="92" r="5.5" fill="#1c1917" stroke="#ffffff" strokeWidth="2" />
                <circle cx="478" cy="50" r="6" fill="#d97706" stroke="#ffffff" strokeWidth="2.5" />

                {/* X-axis Month annotations */}
                {salesMonths.map((m, idx) => (
                  <text
                    key={m}
                    x={40 + idx * 73}
                    y="195"
                    fontSize="8.5"
                    fontFamily="sans-serif"
                    fontWeight="600"
                    textAnchor="middle"
                    fill="#94a3b8"
                  >
                    {m}
                  </text>
                ))}

                {/* Y-axis values annotations */}
                <text x="30" y="32" fontSize="8" fill="#94a3b8" textAnchor="end">150K</text>
                <text x="30" y="82" fontSize="8" fill="#94a3b8" textAnchor="end">100K</text>
                <text x="30" y="132" fontSize="8" fill="#94a3b8" textAnchor="end">50K</text>
                <text x="30" y="182" fontSize="8" fill="#94a3b8" textAnchor="end">0</text>
              </svg>
            </div>
          </div>

          {/* Quick Platform status notification lists */}
          <div className="border border-stone-200 bg-white p-5 rounded-2xl space-y-4 text-left select-none text-xs leading-relaxed font-normal">
            <h4 className="font-bold text-stone-950 uppercase text-[10px] tracking-widest">Platform Telemetries</h4>
            
            <div className="space-y-3.5 pt-1">
              <div className="p-3 bg-stone-50 rounded-xl space-y-1 border border-stone-100">
                <p className="font-bold text-stone-900">API Key Connected</p>
                <p className="text-stone-500 text-[11px]">Gemini 3.5 AI is active. Core styling models initialized in escrow.</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl space-y-1 border border-stone-100">
                <p className="font-bold text-stone-900">Priority Deliver DHL API</p>
                <p className="text-stone-500 text-[11px]">Dynamic satellite maps handshakes are active inside London hubs.</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl space-y-1 border border-stone-100">
                <p className="font-bold text-stone-900">Multi-Vendor Sync Nodes</p>
                <p className="text-stone-500 text-[11px]">6 active vendors connected with zero transactional overhead.</p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* PRODUCTS INVENTORY CRUD LIST & CREATOR FORM */}
      {activeTab === "products" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Creator Form - Left Column */}
          <form 
            id="admin-product-creator"
            onSubmit={handleAddNewProductSubmit}
            className="lg:col-span-4 border border-stone-200 bg-white p-5 rounded-2xl shadow-sm space-y-4"
          >
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-955 pb-2 border-b border-stone-100 flex items-center gap-1.5">
              <Plus className="w-4.5 h-4.5 text-stone-400 shrink-0" />
              Dynamic Product Creator
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-stone-500">Product Title</label>
                <input
                  id="admin-new-name"
                  type="text"
                  required
                  placeholder="e.g. Aether Watch"
                  value={newProdForm.name}
                  onChange={(e) => setNewProdForm({ ...newProdForm, name: e.target.value })}
                  className="w-full px-3 py-1.5 bg-stone-50 border border-stone-250 rounded-xl focus:outline-none focus:border-stone-900 text-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-500">Brand</label>
                  <select
                    id="admin-new-brand"
                    value={newProdForm.brand}
                    onChange={(e) => setNewProdForm({ ...newProdForm, brand: e.target.value })}
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-250 rounded-xl focus:outline-none focus:border-stone-900 text-stone-900"
                  >
                    <option value="⚡ Aether Labs">Aether Labs</option>
                    <option value="👟 Apex Sports">Apex Sports</option>
                    <option value="💡 Lumina Home">Lumina Home</option>
                    <option value="🌸 Velvet Skin">Velvet Skin</option>
                    <option value="🌿 Elemental Wear">Elemental Wear</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-stone-500">Category</label>
                  <select
                    id="admin-new-cat"
                    value={newProdForm.category}
                    onChange={(e) => setNewProdForm({ ...newProdForm, category: e.target.value })}
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-250 rounded-xl focus:outline-none focus:border-stone-900 text-stone-905"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-500">Retail price ($)</label>
                <input
                  id="admin-new-price"
                  type="number"
                  required
                  value={newProdForm.price}
                  onChange={(e) => setNewProdForm({ ...newProdForm, price: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 bg-stone-50 border border-stone-250 rounded-xl focus:outline-none focus:border-stone-900 text-stone-900 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-500">Photo URL mockup</label>
                <input
                  id="admin-new-img"
                  type="text"
                  required
                  value={newProdForm.imageUrl}
                  onChange={(e) => setNewProdForm({ ...newProdForm, imageUrl: e.target.value })}
                  className="w-full px-3 py-1.5 bg-stone-50 border border-stone-250 rounded-xl focus:outline-none focus:border-stone-900 text-stone-500 font-mono text-[10px]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-500">Aura Editorial Description</label>
                <textarea
                  id="admin-new-desc"
                  rows={3}
                  required
                  placeholder="Summarize structural composition..."
                  value={newProdForm.description}
                  onChange={(e) => setNewProdForm({ ...newProdForm, description: e.target.value })}
                  className="w-full px-3 py-1.5 bg-stone-50 border border-stone-250 rounded-xl focus:outline-none focus:border-stone-900 text-stone-900"
                />
              </div>
            </div>

            <button
              id="admin-submit-new-product"
              type="submit"
              className="w-full h-10 bg-stone-900 hover:bg-stone-850 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add Product to Catalog
            </button>
          </form>

          {/* Catalog list - Right Column */}
          <div className="lg:col-span-8 border border-stone-200 bg-white p-5 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-955 pb-2 border-b border-stone-100">Live active Inventory checklist ({productsList.length} articles)</h3>
            
            <div className="h-96 overflow-y-auto space-y-3.5 pr-2">
              {productsList.map((prod) => (
                <div key={prod.id} className="p-3 border border-stone-150 rounded-xl flex items-center justify-between gap-4 bg-stone-50/50">
                  <div className="flex items-center gap-3">
                    <img src={prod.images[0]} alt="admin thumb" className="w-10 h-10 object-cover rounded-lg border shrink-0" />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-stone-900 truncate select-text">{prod.name}</h4>
                      <p className="text-[10px] text-stone-450 uppercase font-bold tracking-wider">{prod.brand} • <span className="text-amber-700 font-extrabold font-mono">${prod.price}</span></p>
                    </div>
                  </div>
                  <button
                    id={`delete-prod-btn-${prod.id}`}
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this product from active inventories?")) {
                        onDeleteProduct(prod.id);
                      }
                    }}
                    className="p-1.5 text-stone-400 hover:text-red-650 hover:bg-stone-100 rounded-lg transition-colors shrink-0"
                    title="Delete product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ORDERS LOGISTICS STATUS CHECKER */}
      {activeTab === "orders" && (
        <div className="border border-stone-200 bg-white p-5 rounded-2xl shadow-sm space-y-4 text-left">
          <h3 className="text-xs font-bold uppercase tracking-widest text-stone-955 pb-2 border-b border-stone-100">Pending logistics shipments orders ({orderHistoryList.length})</h3>
          
          {orderHistoryList.length === 0 ? (
            <div className="py-12 text-center text-stone-500 text-xs">
              <span className="text-3xl block">📦</span>
              <p className="font-semibold block mt-1.5 text-stone-700">All Order queues are empty</p>
              <p className="text-[10px] text-stone-400">Newly purchased orders will list dynamically here.</p>
            </div>
          ) : (
            <div className="space-y-4 select-none">
              {orderHistoryList.map((order) => (
                <div key={order.id} className="p-4 border border-stone-200 rounded-xl space-y-3.5 text-xs">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-stone-50 p-3 rounded-lg">
                    <span className="font-mono font-bold text-stone-900 bg-transparent">Invoices ID: {order.id}</span>
                    <span className="text-stone-500 bg-transparent font-medium">{order.date}</span>
                    <span className="font-extrabold text-stone-950 bg-transparent">Grand Estimated Pay: ${order.total}</span>
                    <span className="flex items-center gap-1 text-stone-800 font-bold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-lg text-[10px] uppercase">{order.status}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-stone-400 font-medium">
                      <span className="font-bold text-stone-900 uppercase text-[9px] block">SHIPPING COURIER DESTINATION:</span>
                      <span className="text-stone-600 block">{order.shippingAddress}</span>
                    </div>

                    {/* Transition actions */}
                    {order.status !== "Completed" && (
                      <div className="flex gap-2 shrink-0">
                        {order.status === "Processing" ? (
                          <button
                            id={`status-ship-btn-${order.id}`}
                            onClick={() => onUpdateOrderStatus(order.id, "Dispatched")}
                            className="bg-amber-600 hover:bg-amber-700 text-white font-bold p-2 px-3 rounded-lg flex items-center gap-1"
                          >
                            <Truck className="w-3.5 h-3.5" /> Dispatch Cargo
                          </button>
                        ) : (
                          <button
                            id={`status-complete-btn-${order.id}`}
                            onClick={() => onUpdateOrderStatus(order.id, "Completed")}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-2 px-3 rounded-lg flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" /> Complete Cargo Delivery
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* PLATFORM USERS TABLE */}
      {activeTab === "users" && (
        <div className="border border-stone-200 bg-white p-5 rounded-2xl shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-stone-955 pb-2 border-b border-stone-100 text-left">Active Site Buyers & Contributors</h3>
          
          <div className="overflow-x-auto text-left text-xs font-medium text-stone-600">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                  <th className="py-2.5 pb-3">User Profile</th>
                  <th className="py-2.5 pb-3">Contact Email</th>
                  <th className="py-2.5 pb-3">Platform Role</th>
                  <th className="py-2.5 pb-3">Deverify Date</th>
                  <th className="py-2.5 pb-3">Ledger Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-105">
                {usersList.map((user) => (
                  <tr key={user.id} className="hover:bg-stone-50/50">
                    <td className="py-3 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center font-bold text-stone-700">
                        {user.name[0]}
                      </div>
                      <span className="font-semibold text-stone-900 select-text">{user.name}</span>
                    </td>
                    <td className="py-3 font-mono text-[11px] select-text">{user.email}</td>
                    <td className="py-3 font-bold text-stone-850">{user.role}</td>
                    <td className="py-3 text-stone-500">{user.joined}</td>
                    <td className="py-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border ${user.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-red-50 text-red-700 border-red-100"}`}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
