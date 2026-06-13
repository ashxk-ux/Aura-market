/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  ShoppingBag, 
  Heart, 
  MapPin, 
  CreditCard, 
  Settings, 
  Bell, 
  User, 
  ArrowRight,
  Trash2,
  CheckCircle,
  Truck,
  Sparkles,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { Product } from "../data";

interface UserDashboardProps {
  orderHistory: any[];
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onNavigate: (view: string, productId?: string) => void;
}

export default function UserDashboard({
  orderHistory,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onNavigate
}: UserDashboardProps) {
  // Navigation inside dashboard: 'orders' | 'wishlist' | 'addresses' | 'cards' | 'settings'
  const [activeTab, setActiveTab] = useState<string>("orders");

  const [settingsForm, setSettingsForm] = useState({
    name: "Ashok Kumar",
    email: "ashokkumar2006.k@gmail.com",
    notifications: true,
    newsletter: false
  });

  const [savedAddresses, setSavedAddresses] = useState([
    { id: "addr-1", type: "Home Base", name: "Ashok Kumar", text: "14 Kingsway Mansion Road, London, W2 1LA, United Kingdom", isDefault: true },
    { id: "addr-2", type: "Design Studio", name: "Ashok Kumar", text: "55 Creative Hub Square, London, SE1 9SG, United Kingdom", isDefault: false }
  ]);

  const [savedCards, setSavedCards] = useState([
    { id: "card-1", type: "VISA Preferred", holder: "ASHOK KUMAR", lastFour: "4444", expiry: "09/30", isDefault: true },
    { id: "card-2", type: "AURA LUXE Black Card", holder: "ASHOK KUMAR", lastFour: "8821", expiry: "12/28", isDefault: false }
  ]);

  const handleMoveToCart = (p: Product) => {
    onAddToCart(p);
    onRemoveFromWishlist(p);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">
      
      {/* 1. STUNNING HERO USER WELCOME SEGMENT */}
      <div className="bg-stone-900 rounded-3xl overflow-hidden p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative shadow-lg">
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="flex items-center gap-4 bg-transparent z-10">
          <div className="w-16 h-16 rounded-full bg-stone-800 border border-stone-700 overflow-hidden flex items-center justify-center font-serif text-2xl font-bold text-amber-500">
            A
          </div>
          <div className="bg-transparent space-y-0.5">
            <div className="flex items-center gap-2 bg-transparent">
              <h2 className="text-xl sm:text-2xl font-serif font-semibold">{settingsForm.name}</h2>
              <span className="text-[9px] bg-amber-500/15 border border-amber-500/35 text-amber-400 font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                Aura VIP Member
              </span>
            </div>
            <p className="text-xs text-stone-400 font-normal">{settingsForm.email} • Verified Account</p>
          </div>
        </div>

        <div className="flex gap-4 shrink-0 font-medium text-xs z-10 bg-transparent flex-wrap font-sans">
          <div className="p-3 bg-stone-950/40 rounded-xl border border-stone-800 text-center min-w-[85px] h-fit bg-transparent">
            <span className="text-stone-400 text-[10px] block uppercase bg-transparent">Checkout history</span>
            <span className="text-lg font-bold text-white bg-transparent">{orderHistory.length} orders</span>
          </div>
          <div className="p-3 bg-stone-950/40 rounded-xl border border-stone-800 text-center min-w-[85px] h-fit bg-transparent">
            <span className="text-stone-400 text-[10px] block uppercase bg-transparent">Saved Wishlist</span>
            <span className="text-lg font-bold text-white bg-transparent">{wishlistProducts.length} items</span>
          </div>
        </div>
      </div>

      {/* 2. TABBED SIDEBAR SELECTIONS LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Navigation panel trigger lists */}
        <div className="lg:col-span-1 border border-stone-200 bg-white p-4 rounded-2xl flex flex-col gap-1.5 shadow-sm">
          <button
            id="tab-orders"
            onClick={() => setActiveTab("orders")}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${activeTab === "orders" ? "bg-stone-950 text-white font-bold" : "hover:bg-stone-50 text-stone-600 hover:text-stone-950"}`}
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            Order Histories ({orderHistory.length})
          </button>
          
          <button
            id="tab-wishlist"
            onClick={() => setActiveTab("wishlist")}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${activeTab === "wishlist" ? "bg-stone-950 text-white font-bold" : "hover:bg-stone-50 text-stone-600 hover:text-stone-950"}`}
          >
            <Heart className="w-4 h-4 shrink-0" />
            My Wishlist ({wishlistProducts.length})
          </button>

          <button
            id="tab-addresses"
            onClick={() => setActiveTab("addresses")}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${activeTab === "addresses" ? "bg-stone-950 text-white font-bold" : "hover:bg-stone-50 text-stone-600 hover:text-stone-950"}`}
          >
            <MapPin className="w-4 h-4 shrink-0" />
            Saved Addresses
          </button>

          <button
            id="tab-cards"
            onClick={() => setActiveTab("cards")}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${activeTab === "cards" ? "bg-stone-950 text-white font-bold" : "hover:bg-stone-50 text-stone-600 hover:text-stone-950"}`}
          >
            <CreditCard className="w-4 h-4 shrink-0" />
            Payment Passcards
          </button>

          <button
            id="tab-settings"
            onClick={() => setActiveTab("settings")}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${activeTab === "settings" ? "bg-stone-950 text-white font-bold" : "hover:bg-stone-50 text-stone-600 hover:text-stone-950"}`}
          >
            <Settings className="w-4 h-4 shrink-0" />
            Profile Settings
          </button>
        </div>

        {/* 3. DYNAMIC CONTENTS CONTAINER BOX */}
        <div className="lg:col-span-3 border border-stone-200 bg-white p-6 sm:p-8 rounded-2xl shadow-sm min-h-64 flex flex-col justify-between">
          
          {/* ORDERS HISTORY department */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-955 border-b border-stone-105 pb-3">Department Order History</h3>
              {orderHistory.length === 0 ? (
                <div className="py-12 text-center text-stone-500 space-y-4">
                  <span className="text-4xl text-stone-300 block">📦</span>
                  <p className="text-xs font-medium max-w-sm mx-auto leading-relaxed">No orders completed. Items you check out successfully will be mapped dynamically inside this display!</p>
                  <button
                    id="dash-shop-cta"
                    onClick={() => onNavigate("shop")}
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-850 text-white text-xs font-bold rounded-lg"
                  >
                    Examine Catalog
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="border border-stone-200 rounded-xl overflow-hidden p-4 space-y-4">
                      {/* Top status header */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-stone-50 p-3.5 rounded-xl text-xs">
                        <div className="space-y-0.5 bg-transparent">
                          <p className="text-stone-400 bg-transparent font-medium">VOUCHER ID</p>
                          <p className="font-mono font-bold text-stone-900 bg-transparent">{order.id}</p>
                        </div>
                        <div className="space-y-0.5 bg-transparent">
                          <p className="text-stone-400 bg-transparent font-medium">DISPATCH DATE</p>
                          <p className="font-bold text-stone-900 bg-transparent">{order.date}</p>
                        </div>
                        <div className="space-y-0.5 bg-transparent">
                          <p className="text-stone-400 bg-transparent font-medium">GRAND ESTIMATED PAY</p>
                          <p className="font-extrabold text-amber-700 bg-transparent">${order.total}</p>
                        </div>
                        <div className="flex items-center gap-1.5 bg-transparent shrink-0">
                          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span className="font-bold text-stone-900 bg-transparent">{order.status}</span>
                        </div>
                      </div>

                      {/* Purchased Item columns details */}
                      <div className="divide-y divide-stone-100 space-y-3">
                        {order.items.map((item: any, i: number) => (
                          <div key={i} className="pt-3 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <img src={item.image} alt="purchased article" className="w-12 h-12 object-cover rounded-lg border border-stone-100" />
                              <div className="min-w-0">
                                <h4 className="text-xs font-semibold text-stone-900 truncate select-text">{item.name}</h4>
                                <p className="text-[10px] text-stone-400 font-medium">QTY: {item.quantity} • {item.color ? `Finish: ${item.color}` : "Default"}</p>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-stone-900 shrink-0">${item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-stone-100 pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs leading-relaxed font-normal">
                        <div>
                          <span className="font-bold uppercase text-[9px] text-stone-400 block pb-0.5">ESTIMATED ADDRESS TARGET:</span>
                          <span className="text-stone-605 text-stone-500 text-[11px] block">{order.shippingAddress}</span>
                        </div>
                        {/* Fake Live tracking link */}
                        <button
                          id={`track-order-${order.id}`}
                          onClick={() => alert(`Connecting securely to real-time DHL Priority Satellite telemetry relative to invoice ${order.id}. Satellite coordinates is highly locked.`)}
                          className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-850 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 shrink-0"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          Track Satellite Delivery
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* WISHLIST SAVED ITEMS department */}
          {activeTab === "wishlist" && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-955 border-b border-stone-105 pb-3">My Saved Wishlist Content</h3>
              
              {wishlistProducts.length === 0 ? (
                <div className="py-12 text-center text-stone-500 space-y-4">
                  <span className="text-4xl text-stone-300 block">✨</span>
                  <p className="text-xs font-medium max-w-sm mx-auto leading-relaxed">No saved products. Click standard heart outlines inside our trending product list to populate saved assets.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistProducts.map((p) => (
                    <div key={p.id} className="p-3 border border-stone-200 bg-white rounded-xl flex gap-3 hover:border-stone-350 transition-all">
                      <img src={p.images[0]} alt={p.name} className="w-16 h-16 object-cover rounded-lg border border-stone-100 shrink-0" />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h4 
                            onClick={() => onNavigate("detail", p.id)}
                            className="text-xs font-bold text-stone-900 truncate hover:text-amber-605 hover:underline cursor-pointer select-text"
                          >
                            {p.name}
                          </h4>
                          <p className="text-xs font-bold text-stone-900 mt-0.5">${p.price}</p>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            id={`move-cart-wish-${p.id}`}
                            onClick={() => handleMoveToCart(p)}
                            className="px-2.5 py-1 text-[9px] bg-stone-900 text-white font-bold rounded-lg hover:bg-stone-850 transition-colors"
                          >
                            Move to Cart
                          </button>
                          <button
                            id={`delete-wish-${p.id}`}
                            onClick={() => onRemoveFromWishlist(p)}
                            className="p-1 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SAVED ADDRESSES department */}
          {activeTab === "addresses" && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-955 border-b border-stone-105 pb-3">Addresses Management</h3>
              <div className="space-y-4">
                {savedAddresses.map((addr) => (
                  <div key={addr.id} className="p-4 border border-stone-200 rounded-xl relative flex justify-between gap-4 items-start">
                    <div className="space-y-1.5 flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-stone-900">{addr.type}</span>
                        {addr.isDefault && (
                          <span className="text-[8px] font-bold text-emerald-700 bg-emerald-50 px-2.1 py-0.5 rounded-full uppercase border border-emerald-100">Default TARGET</span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 font-bold">{addr.name}</p>
                      <p className="text-xs text-stone-650 leading-relaxed font-normal">{addr.text}</p>
                    </div>
                    <button
                      id={`delete-addr-${addr.type.replace(/\s+/g, "-")}`}
                      onClick={() => setSavedAddresses(prev => prev.filter(a => a.id !== addr.id))}
                      className="p-1 rounded text-stone-400 hover:text-stone-900 hover:bg-stone-50 transition-colors shrink-0"
                      title="Delete profile address"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                id="add-addr-btn"
                onClick={() => alert("Form opened dynamically: Addresses entry ledger is active.")}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-stone-200 hover:bg-stone-50 text-stone-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-stone-405" />
                Add New Delivery Address
              </button>
            </div>
          )}

          {/* DEBIT/CREDIT CARDS department */}
          {activeTab === "cards" && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-955 border-b border-stone-105 pb-3">Security Passcards Vault</h3>
              <div className="space-y-4">
                {savedCards.map((card) => (
                  <div key={card.id} className="p-4 border border-stone-200 rounded-xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-7 rounded-md bg-stone-900 flex items-center justify-center text-[8px] font-bold font-mono text-white tracking-widest leading-none">
                        VISA
                      </div>
                      <div className="space-y-0.5 text-xs font-medium">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-stone-900">{card.type}</span>
                          {card.isDefault && (
                            <span className="text-[8px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full uppercase border border-amber-100">Default card</span>
                          )}
                        </div>
                        <p className="text-[10px] text-stone-450 uppercase font-bold tracking-wider">•••• •••• •••• {card.lastFour} • Holder: {card.holder}</p>
                      </div>
                    </div>
                    <button
                      id={`delete-card-${card.id}`}
                      onClick={() => setSavedCards(prev => prev.filter(c => c.id !== card.id))}
                      className="p-1 rounded text-stone-400 hover:text-stone-900 hover:bg-stone-50 transition-colors shrink-0"
                      title="Deverify passcard"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                id="add-card-btn"
                onClick={() => alert("Connecting securely to Stripe checkout ledger for Card authorization...")}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-stone-200 hover:bg-stone-50 text-stone-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                <CreditCard className="w-3.5 h-3.5 text-stone-405" />
                Deverify & Add Premium Passcard
              </button>
            </div>
          )}

          {/* SETTINGS FORMS */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-955 border-b border-stone-105 pb-3 font-semibold">User Profile & Subscriptions</h3>
              <form id="settings-submit-form" onSubmit={(e) => { e.preventDefault(); alert("Profile configurations altered successfully!"); }} className="space-y-4 text-xs font-medium">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-500">FullName</label>
                  <input
                    id="settings-name"
                    type="text"
                    value={settingsForm.name}
                    onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-250 rounded-xl focus:outline-none focus:border-stone-900 text-stone-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-stone-500">Email Address</label>
                  <input
                    id="settings-email"
                    type="email"
                    value={settingsForm.email}
                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-250 rounded-xl focus:outline-none focus:border-stone-900 text-stone-900"
                  />
                </div>
                
                <div className="space-y-2.5 pt-2 select-none">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">Aura Notifications Subscriptions</span>
                  <label className="flex items-center gap-2 text-stone-750 font-semibold cursor-pointer">
                    <input
                      id="opt-notifications"
                      type="checkbox"
                      checked={settingsForm.notifications}
                      onChange={() => setSettingsForm({ ...settingsForm, notifications: !settingsForm.notifications })}
                      className="rounded accent-stone-900 border-stone-300 w-3.5 h-3.5"
                    />
                    <span>Receive instant SMS/mail cellular priority logistics updates</span>
                  </label>

                  <label className="flex items-center gap-2 text-stone-750 font-semibold cursor-pointer">
                    <input
                      id="opt-newsletter"
                      type="checkbox"
                      checked={settingsForm.newsletter}
                      onChange={() => setSettingsForm({ ...settingsForm, newsletter: !settingsForm.newsletter })}
                      className="rounded accent-stone-900 border-stone-300 w-3.5 h-3.5"
                    />
                    <span>Join the premium editorial styling seasonal digest</span>
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    id="save-settings-btn"
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-850 text-white font-bold text-xs shadow-md transition-all h-10 flex items-center justify-center"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
