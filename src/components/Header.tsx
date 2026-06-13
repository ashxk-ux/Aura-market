/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Search, 
  Sparkles, 
  Bell, 
  Menu, 
  ChevronDown, 
  Layers, 
  ShieldAlert,
  ArrowRight
} from "lucide-react";
import { Product } from "../data";

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, productId?: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenAIChat: () => void;
  onCategorySelect?: (categoryId: string) => void;
  onSearch?: (searchQuery: string) => void;
}

export default function Header({ 
  currentView, 
  onNavigate, 
  cartCount, 
  wishlistCount, 
  onOpenAIChat,
  onCategorySelect,
  onSearch 
}: HeaderProps) {
  const [searchVal, setSearchVal] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchVal);
      onNavigate("shop");
    }
  };

  const menuItems = [
    { label: "Home", view: "landing" },
    { label: "Shop All", view: "shop" },
    { label: "Style Assistant", action: onOpenAIChat, isSpecial: true },
    { label: "Admin Console", view: "admin", isAlert: true },
  ];

  const categoriesMegaList = [
    { id: "electronics", label: "Smart Devices & Audio", items: ["Headphones", "Wearables", "Keyboards", "Monitors"] },
    { id: "fashion", label: "Apparel & Shoes", items: ["Overcoats", "Luxury Dress", "Sneakers", "Suede Shoes"] },
    { id: "home-living", label: "Workspace & Artisan Design", items: ["Mesh Chairs", "Office Acoustics", "Coffee Stoneware", "Ambient Lamps"] },
    { id: "beauty", label: "Vitals & Cosmetics", items: ["Gold Restoration", "Squalane Oils", "Face Serums", "Verve"] },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-stone-150/80 shadow-sm">
      {/* Upper Micro-Ticker Alert Bar */}
      <div className="bg-stone-900 text-white text-[11px] font-medium py-2 px-4 shadow-inner flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          <span>Aura Exclusive: Dynamic AI Personal Styling has launched</span>
        </div>
        <div className="flex items-center gap-4 text-stone-300">
          <span className="hover:text-white transition-colors cursor-pointer">Free Express Global Delivery</span>
          <span>•</span>
          <span className="hover:text-white transition-colors cursor-pointer">Secure Guard Payments</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <div 
            id="brand-logo"
            onClick={() => onNavigate("landing")}
            className="flex items-center gap-2 cursor-pointer group select-none shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-stone-900 flex items-center justify-center text-white font-bold text-lg leading-none tracking-tight shadow-md transition-transform group-hover:scale-105">
              A
            </div>
            <div>
              <span className="font-serif font-semibold text-lg tracking-wide text-stone-950 group-hover:text-amber-600 transition-colors">
                A U R A
              </span>
              <span className="block text-[8px] tracking-[0.2em] text-stone-500 uppercase font-bold -mt-1 leading-none">
                M a r k e t
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button
              id="nav-home"
              onClick={() => onNavigate("landing")}
              className={`hover:text-stone-900 transition-colors ${currentView === "landing" ? "text-stone-900 font-semibold border-b-2 border-stone-900 pb-0.5" : "text-stone-500"}`}
            >
              Home
            </button>
            
            {/* Mega Categories Trigger */}
            <div 
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => setShowMegaMenu(false)}
              className="relative py-2"
            >
              <button
                id="mega-menu-trigger"
                onClick={() => onNavigate("shop")}
                className={`hover:text-stone-900 transition-colors flex items-center gap-1 ${currentView === "shop" ? "text-stone-900 font-semibold" : "text-stone-500"}`}
              >
                Categories
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </button>

              {/* Mega Dropdown Panel */}
              {showMegaMenu && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] bg-white border border-stone-200 rounded-2xl shadow-xl p-5 grid grid-cols-2 gap-6 z-50 animate-fade-in">
                  {categoriesMegaList.map((catSpec) => (
                    <div key={catSpec.id} className="space-y-2">
                      <h4 
                        onClick={() => {
                          if (onCategorySelect) onCategorySelect(catSpec.id);
                          onNavigate("shop");
                          setShowMegaMenu(false);
                        }}
                        className="text-xs font-bold text-stone-900 uppercase tracking-wider hover:text-amber-600 cursor-pointer flex items-center gap-1 group/item"
                      >
                        {catSpec.label}
                        <ArrowRight className="w-3 h-3 text-stone-300 opacity-0 group-hover/item:opacity-100 group-hover/item:text-amber-600 translate-x-0 group-hover/item:translate-x-0.5 transition-all shrink-0" />
                      </h4>
                      <ul className="grid grid-cols-2 gap-1 text-xs text-stone-500">
                        {catSpec.items.map((sub, sIdx) => (
                          <li 
                            key={sIdx} 
                            onClick={() => {
                              if (onCategorySelect) onCategorySelect(catSpec.id);
                              onNavigate("shop");
                              setShowMegaMenu(false);
                            }}
                            className="hover:text-stone-900 cursor-pointer py-1 block hover:underline"
                          >
                            {sub}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="col-span-2 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 bg-stone-50 p-2.5 rounded-lg">
                    <span>Looking for something else? Discuss with Aura Luxe</span>
                    <button
                      id="mega-menu-ai-btn"
                      onClick={() => {
                        onOpenAIChat();
                        setShowMegaMenu(false);
                      }}
                      className="text-amber-700 font-semibold hover:underline flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Start Assistant
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              id="nav-shop"
              onClick={() => onNavigate("shop")}
              className={`hover:text-stone-900 transition-colors ${currentView === "shop" ? "text-stone-900 font-semibold border-b-2 border-stone-900 pb-0.5" : "text-stone-500"}`}
            >
              Shop
            </button>
            <button
              id="nav-style-assistant"
              onClick={onOpenAIChat}
              className="text-amber-700 font-semibold hover:text-amber-800 transition-colors flex items-center gap-1 bg-amber-500/10 px-2.5 py-1.5 rounded-lg"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              AI Stylist
            </button>
            <button
              id="nav-admin"
              onClick={() => onNavigate("admin")}
              className={`hover:text-stone-900 transition-colors text-stone-500 flex items-center gap-1 ${currentView === "admin" ? "text-stone-900 font-semibold" : "text-stone-500"}`}
            >
              <ShieldAlert className="w-4 h-4 text-stone-400" />
              Admin
            </button>
          </nav>

          {/* Center-Right Search Bar */}
          <form 
            id="header-search-form"
            onSubmit={handleSearchSubmit}
            className="hidden lg:flex items-center max-w-sm w-full relative mx-4 shrink"
          >
            <input
              id="header-search-input"
              type="text"
              placeholder="Search products or ask AI..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full px-3.5 py-2 pl-9 bg-stone-50 border border-stone-200 rounded-full text-xs text-stone-850 focus:outline-none focus:border-stone-900 focus:bg-white transition-all shadow-inner"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3" />
            <button
              id="header-search-ai-dot"
              type="button"
              onClick={onOpenAIChat}
              title="Activate AI Intelligent Search"
              className="absolute right-2.5 p-1 rounded-full bg-amber-500/15 text-amber-700 hover:bg-amber-500/30 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Far Right Control Tray */}
          <div className="flex items-center gap-3.5 shrink-0">
            {/* Search toggler for small screens */}
            <button 
              id="btn-search-trigger"
              onClick={() => onNavigate("shop")} 
              className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 lg:hidden transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button 
                id="btn-notifications"
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-1.5 rounded-full hover:bg-stone-50 text-stone-600 hover:text-stone-900 transition-colors relative"
              >
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-stone-205 rounded-xl shadow-xl h-auto p-3.5 z-50 animate-fade-in space-y-3">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-1.5">
                    <span className="text-xs font-semibold text-stone-900">Alert Center</span>
                    <span className="text-[10px] text-stone-400 hover:underline cursor-pointer">Clear All</span>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <div className="p-2 bg-stone-50 rounded-lg space-y-0.5">
                      <p className="font-semibold text-stone-900">System Shipment</p>
                      <p className="text-stone-500">Order #AU-9281 has departed London warehouse!</p>
                    </div>
                    <div className="p-2 bg-stone-50 rounded-lg space-y-0.5">
                      <p className="font-semibold text-stone-900">Style Assistant Update</p>
                      <p className="text-stone-500">Aura Luxe added 2 custom coat recommendations.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <button 
              id="btn-wishlist"
              onClick={() => onNavigate("dashboard")}
              className="p-1.5 rounded-full hover:bg-stone-50 text-stone-600 hover:text-stone-900 transition-colors relative"
              title="My Saved Items"
            >
              <Heart className="w-4.5 h-4.5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-stone-900 text-white font-semibold text-[8px] w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart */}
            <button 
              id="btn-cart"
              onClick={() => onNavigate("cart")}
              className="p-1.5 rounded-full hover:bg-stone-50 text-stone-600 hover:text-stone-900 transition-colors relative"
              title="Cart Inventory"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white font-semibold text-[8px] w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                id="btn-profile"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-1 p-1 rounded-full hover:bg-stone-100 transition-colors focus:outline-none"
              >
                <div className="w-7 h-7 rounded-full bg-stone-200 border border-stone-300 overflow-hidden flex items-center justify-center">
                  <User className="w-4 h-4 text-stone-600" />
                </div>
                <ChevronDown className="w-3 h-3 text-stone-400 hidden sm:block" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2.5 w-48 bg-white border border-stone-200 rounded-xl shadow-xl py-1.5 z-50 animate-fade-in font-medium divide-y divide-stone-100">
                  <div className="px-3.5 py-2">
                    <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Logged In As</p>
                    <p className="text-xs font-semibold text-stone-900 truncate">Ashok Kumar</p>
                  </div>
                  <div className="py-1">
                    <button
                      id="profile-dropdown-home"
                      onClick={() => {
                        onNavigate("landing");
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-xs text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors"
                    >
                      Aura Home Screen
                    </button>
                    <button
                      id="profile-dropdown-dashboard"
                      onClick={() => {
                        onNavigate("dashboard");
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-xs text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors font-medium text-stone-900"
                    >
                      My Order Dashboard
                    </button>
                    <button
                      id="profile-dropdown-cart"
                      onClick={() => {
                        onNavigate("cart");
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-xs text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors"
                    >
                      My Shopping Cart ({cartCount})
                    </button>
                  </div>
                  <div className="py-1">
                    <button
                      id="profile-dropdown-admin"
                      onClick={() => {
                        onNavigate("admin");
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-xs text-amber-700 hover:bg-amber-50 font-bold transition-all flex items-center gap-1.5"
                    >
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                      Admin Console
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Hamburger menu for small screens */}
            <button
              id="hamburger-menu"
              onClick={() => onNavigate("shop")}
              className="p-1.5 rounded-full hover:bg-stone-50 text-stone-500 md:hidden transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
