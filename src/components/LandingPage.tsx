/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  ArrowRight, 
  Sparkles, 
  Star, 
  ShoppingBag, 
  Heart, 
  Clock, 
  Smartphone, 
  Check, 
  ShieldCheck, 
  RotateCcw,
  Headphones,
  Laptop,
  Shirt,
  Home,
  Sparkles as BeautyIcon,
  Activity,
  BookOpen,
  Gamepad2,
  Tv,
  ChevronLeft,
  ChevronRight,
  ThumbsUp
} from "lucide-react";
import { PRODUCTS, CATEGORIES, TESTIMONIALS, BRANDS, Product } from "../data";

interface LandingPageProps {
  onNavigate: (view: string, productId?: string) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onOpenAIChat: () => void;
  onCategorySelect?: (categoryId: string) => void;
}

export default function LandingPage({ 
  onNavigate, 
  onAddToCart, 
  onToggleWishlist, 
  wishlistIds,
  onOpenAIChat,
  onCategorySelect
}: LandingPageProps) {
  // Flash Sale Timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 32, seconds: 15 });
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  // Countdown effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset countdown
          return { hours: 4, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const heroBanners = [
    {
      title: "Absolute Audio Purity.",
      subtitle: "THE SOUNDSCAN PRO MAX EDITION",
      description: "Quiet your environment up to -45dB. Crafted with fine titanium drivers and memory foam cups config.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
      cta: "Experience Silence",
      productId: "prod-1",
      badge: "EXCLUSIVE EDITION"
    },
    {
      title: "Precision Athletic Telemetry.",
      subtitle: "AETHER CHRONOSLATE SPORT",
      description: "Track performance diagnostics, multi-axial compass readings and organic vitals.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
      cta: "Pre-Order Tech",
      productId: "prod-2",
      badge: "FUTURE RELEASE"
    }
  ];

  // Helper to map category IDs to lucide icons
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Laptop": return <Laptop className="w-5 h-5 text-stone-600" />;
      case "Shirt": return <Shirt className="w-5 h-5 text-stone-600" />;
      case "Home": return <Home className="w-5 h-5 text-stone-600" />;
      case "Sparkles": return <BeautyIcon className="w-5 h-5 text-stone-600" />;
      case "Activity": return <Activity className="w-5 h-5 text-stone-600" />;
      case "BookOpen": return <BookOpen className="w-5 h-5 text-stone-600" />;
      case "Gamepad2": return <Gamepad2 className="w-5 h-5 text-stone-600" />;
      default: return <Tv className="w-5 h-5 text-stone-600" />;
    }
  };

  const trendingProducts = PRODUCTS.filter(p => p.isTrending);
  const flashSaleProducts = PRODUCTS.filter(p => p.isFlashSale);

  return (
    <div className="space-y-16 pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative bg-stone-900 rounded-3xl overflow-hidden shadow-xl mx-4 sm:mx-6 lg:mx-8 my-6">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-stone-950 via-stone-900/90 to-transparent" />
        <div className="absolute -right-16 -top-16 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 sm:px-12 sm:py-24 lg:px-16 flex flex-col lg:flex-row items-center gap-12 justify-between">
          <div className="max-w-xl space-y-6">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-bold text-amber-500 uppercase tracking-widest leading-none">
              <Sparkles className="w-3.5 h-3.5" />
              {heroBanners[activeHeroSlide].badge}
            </span>
            <p className="text-stone-400 text-xs tracking-widest font-extrabold uppercase">
              {heroBanners[activeHeroSlide].subtitle}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-white tracking-tight leading-none">
              {heroBanners[activeHeroSlide].title}
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              {heroBanners[activeHeroSlide].description}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                id="hero-cta-direct"
                onClick={() => onNavigate("detail", heroBanners[activeHeroSlide].productId)}
                className="px-6 py-3 rounded-xl bg-white text-stone-950 hover:bg-stone-100 font-semibold text-sm transition-transform hover:scale-103 shadow-md flex items-center gap-2"
              >
                {heroBanners[activeHeroSlide].cta}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="hero-cta-assist"
                onClick={onOpenAIChat}
                className="px-6 py-3 rounded-xl bg-stone-800 border border-stone-700/80 hover:border-amber-500 text-white font-medium text-sm transition-all flex items-center gap-2 group"
              >
                <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
                Discuss with Style Guide
              </button>
            </div>
          </div>

          <div className="relative shrink-0 w-full max-w-md aspect-square bg-stone-950/40 rounded-2xl border border-stone-800 p-4 shadow-2xl overflow-hidden select-none">
            <div className="absolute inset-0 bg-radial-gradient from-stone-850/30 to-transparent"></div>
            <img 
              src={heroBanners[activeHeroSlide].image} 
              alt={heroBanners[activeHeroSlide].title}
              className="w-full h-full object-cover rounded-xl shadow-md transform transition-all duration-700 hover:scale-[1.03]" 
            />
            {/* Floating Info Pill */}
            <div className="absolute bottom-6 left-6 dark-glass-panel p-3.5 rounded-xl flex items-center gap-3 shadow-lg max-w-[85%]">
              <span className="text-[10px] text-amber-500 font-bold bg-amber-500/10 px-2 py-0.5 rounded-md uppercase">Hot Pick</span>
              <div>
                <p className="text-xs font-bold text-white truncate">Premium Quality Standards</p>
                <p className="text-[10px] text-stone-400 mt-0.5">Complimentary 2-yr Warranty coverage</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Slider Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
          {heroBanners.map((_, i) => (
            <button
              id={`hero-slide-dot-${i}`}
              key={i}
              onClick={() => setActiveHeroSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${activeHeroSlide === i ? "bg-amber-500 w-8" : "bg-stone-600 hover:bg-stone-500"}`}
            />
          ))}
        </div>
      </section>

      {/* 2. DYNAMIC CAMPAIGN CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-5 text-white flex flex-col justify-between shadow-md relative overflow-hidden group">
          <div className="space-y-1.5 z-10">
            <span className="text-[9px] uppercase tracking-widest line-clamp-1 bg-black/15 px-2 py-0.5 rounded-md font-bold inline-block leading-normal">Seasonal Promo</span>
            <h3 className="text-xl font-bold font-serif leading-tight">Artisan Living Drops</h3>
            <p className="text-xs text-amber-50">Collect basalt-glazed ceramic drippers and sensory thermal mugs.</p>
          </div>
          <button 
            id="campaign-1-shop"
            onClick={() => onNavigate("shop")}
            className="mt-6 text-xs text-stone-950 font-bold bg-white px-3.5 py-2 rounded-lg inline-flex items-center gap-1 hover:bg-stone-50 w-fit transition-transform group-hover:translate-x-0.5"
          >
            Explore Ceramic
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-stone-900 rounded-2xl p-5 text-white flex flex-col justify-between shadow-md relative overflow-hidden group">
          <div className="space-y-1.5 z-10">
            <span className="text-[9px] uppercase tracking-widest line-clamp-1 bg-white/10 px-2 py-0.5 rounded-md font-bold inline-block leading-normal">Technical Apparel</span>
            <h3 className="text-xl font-bold font-serif leading-tight">The Trench Editorial</h3>
            <p className="text-xs text-stone-300">Merino virgin wool coats tailored directly in Milan. Minimal layering options.</p>
          </div>
          <button 
            id="campaign-2-shop"
            onClick={() => onNavigate("shop")}
            className="mt-6 text-xs text-stone-950 font-bold bg-white px-3.5 py-2 rounded-lg inline-flex items-center gap-1 hover:bg-stone-50 w-fit transition-transform group-hover:translate-x-0.5"
          >
            Browse Tailoring
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-stone-100 rounded-2xl p-5 border border-stone-200 text-stone-900 flex flex-col justify-between shadow-xs relative overflow-hidden group">
          <div className="space-y-1.5 z-10">
            <span className="text-[9px] uppercase tracking-widest line-clamp-1 bg-stone-200 px-2 py-0.5 rounded-md font-bold inline-block leading-normal">Cosmetics Launch</span>
            <h3 className="text-xl font-bold font-serif leading-tight">24K Botanical Serum</h3>
            <p className="text-xs text-stone-500">Restore glassy dermatological luminescence with wild orchids.</p>
          </div>
          <button 
            id="campaign-3-shop"
            onClick={() => onNavigate("shop")}
            className="mt-6 text-xs text-white font-bold bg-stone-900 px-3.5 py-2 rounded-lg inline-flex items-center gap-1 hover:bg-stone-850 w-fit transition-transform group-hover:translate-x-0.5"
          >
            Revitalize Dermis
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 3. CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase text-amber-600 tracking-wider">Curated Collections</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-stone-950 tracking-tight">Browse by Master Categories</h2>
          </div>
          <button
            id="view-all-categories"
            onClick={() => onNavigate("shop")}
            className="text-xs font-bold text-stone-900 hover:text-amber-600 inline-flex items-center gap-1 border-b border-stone-900 pb-0.5"
          >
            Browse All Products
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {CATEGORIES.map((cat) => (
            <div 
              id={`category-card-${cat.id}`}
              key={cat.id}
              onClick={() => onCategorySelect ? onCategorySelect(cat.id) : onNavigate("shop")}
              className="group p-4 bg-white border border-stone-200/80 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer hover:border-amber-600 hover:shadow-md transition-all h-28 select-none"
            >
              <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center group-hover:bg-amber-50 group-hover:text-amber-500 transition-colors">
                {getCategoryIcon(cat.icon)}
              </div>
              <h3 className="text-xs font-semibold text-stone-800 mt-3 group-hover:text-stone-950 select-text">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FLASH SALE SECTION */}
      <section className="bg-stone-900 py-12 rounded-3xl mx-4 sm:mx-6 lg:mx-8 px-6 sm:px-12 relative overflow-hidden shadow-xl">
        <div className="absolute left-0 bottom-0 w-72 h-72 rounded-full bg-amber-500/5 blur-3xl"></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start justify-between z-10 relative">
          
          <div className="max-w-sm space-y-5">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-bold text-amber-500 uppercase tracking-widest leading-none">
              <Clock className="w-3.5 h-3.5 animate-spin-pulse" />
              IN PROGRESS
            </span>
            <h2 className="text-3xl font-serif font-semibold text-white tracking-tight leading-tight">
              Aura Flash Drops
            </h2>
            <p className="text-xs text-stone-300 leading-relaxed">
              Highly sought articles dropping live for strict multi-vendor window segments. Limit 1 per premier profile.
            </p>

            {/* Simulated Live Countdown */}
            <div className="flex gap-2 text-stone-900 pt-2 font-mono">
              <div className="flex flex-col items-center p-2 rounded-xl bg-white min-w-[62px]">
                <span className="text-lg font-bold">{timeLeft.hours.toString().padStart(2, '0')}</span>
                <span className="text-[9px] text-stone-500 font-sans font-bold uppercase tracking-wider">Hours</span>
              </div>
              <span className="text-lg font-bold text-white self-center">:</span>
              <div className="flex flex-col items-center p-2 rounded-xl bg-white min-w-[62px]">
                <span className="text-lg font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <span className="text-[9px] text-stone-500 font-sans font-bold uppercase tracking-wider font-semibold">Mins</span>
              </div>
              <span className="text-lg font-bold text-white self-center">:</span>
              <div className="flex flex-col items-center p-2 rounded-xl bg-white min-w-[62px]">
                <span className="text-lg font-bold text-stone-950">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                <span className="text-[9px] text-stone-500 font-sans font-bold uppercase tracking-wider font-semibold">Secs</span>
              </div>
            </div>
          </div>

          {/* Horizontal Product list */}
          <div className="flex-1 w-full overflow-x-auto whitespace-nowrap gap-4 flex pb-4 scrollbar-thin">
            {flashSaleProducts.map((prod) => (
              <div 
                key={prod.id} 
                className="w-56 shrink-0 bg-stone-950 border border-stone-800 p-3 rounded-2xl flex flex-col justify-between hover:border-amber-500/50 transition-all group relative select-none"
              >
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="text-[9px] bg-amber-600 text-white font-bold px-2 py-0.5 rounded-md uppercase">
                    -{Math.round(((prod.originalPrice! - prod.flashSalePrice!) / prod.originalPrice!) * 100)}% DROP
                  </span>
                </div>
                
                <div className="aspect-square w-full rounded-xl bg-stone-900 border border-stone-850 p-1 overflow-hidden relative">
                  <img 
                    src={prod.images[0]} 
                    alt={prod.name} 
                    className="w-full h-full object-cover rounded-lg group-hover:scale-103 transition-transform" 
                  />
                  <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-all"></div>
                </div>

                <div className="mt-3 space-y-1.5">
                  <span className="text-[9px] uppercase tracking-wider text-amber-500 font-extrabold">{prod.brand}</span>
                  <h4 
                    onClick={() => onNavigate("detail", prod.id)}
                    className="text-xs font-semibold text-white truncate hover:text-amber-500 cursor-pointer block select-text"
                  >
                    {prod.name}
                  </h4>

                  {/* Pricing block */}
                  <div className="flex items-baseline gap-2 pt-0.5">
                    <span className="text-sm font-bold text-white">${prod.flashSalePrice}</span>
                    <span className="text-[10px] text-stone-500 line-through font-medium">${prod.originalPrice}</span>
                  </div>

                  {/* stock indicator */}
                  <div className="space-y-1 pt-1.5">
                    <div className="flex justify-between text-[10px] text-stone-400">
                      <span>Live Stock</span>
                      <span className="font-semibold text-amber-500">Only 4 left</span>
                    </div>
                    <div className="w-full h-1 bg-stone-800 rounded-full overflow-hidden">
                      <div className="w-[82%] h-full bg-amber-500"></div>
                    </div>
                  </div>

                  <button
                    id={`flash-btn-add-${prod.id}`}
                    onClick={() => onAddToCart({ ...prod, price: prod.flashSalePrice! })}
                    className="w-full mt-2.5 py-1.5 rounded-lg bg-amber-605 bg-amber-600 text-white hover:bg-amber-700 font-bold text-[10px] transition-colors uppercase tracking-wider flex items-center justify-center gap-1"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Claim Drop
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. TRENDING PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase text-amber-600 tracking-wider">Curator Picks</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-stone-950 tracking-tight">Trending & Hot Releases</h2>
          </div>
          <button
            id="view-all-trending"
            onClick={() => onNavigate("shop")}
            className="text-xs font-bold text-stone-900 hover:text-amber-600 inline-flex items-center gap-1 border-b border-stone-900 pb-0.5"
          >
            View All Shopping
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((prod) => {
            const isWishlisted = wishlistIds.includes(prod.id);
            return (
              <div 
                key={prod.id} 
                className="bg-white border border-stone-200/80 rounded-2xl p-4 flex flex-col justify-between hover:shadow-lg hover:border-amber-500/20 transition-all relative group select-none"
              >
                {/* Badges / Wishlist trigger */}
                <div className="absolute top-6 left-6 z-10 flex flex-col gap-1.5">
                  {prod.isNewArrival && (
                    <span className="text-[9px] bg-stone-900 text-white font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wide">
                      NEW DESIGNS
                    </span>
                  )}
                  {prod.isFlashSale && (
                    <span className="text-[9px] bg-amber-500 text-white font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wide">
                      SALE
                    </span>
                  )}
                </div>

                <button 
                  id={`wishlist-btn-trending-${prod.id}`}
                  onClick={() => onToggleWishlist(prod)}
                  className={`absolute top-6 right-6 z-10 p-2 rounded-full border border-stone-150 shadow-xs hover:scale-105 transition-all text-stone-500 ${isWishlisted ? "bg-red-50 text-red-500 border-red-100" : "bg-white hover:bg-stone-50"}`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-red-500" : ""}`} />
                </button>

                {/* Primary dynamic image viewport with multi imagery carousel dots */}
                <div 
                  onClick={() => onNavigate("detail", prod.id)}
                  className="aspect-square w-full rounded-xl bg-stone-50 overflow-hidden relative cursor-pointer"
                >
                  <img 
                    src={prod.images[0]} 
                    alt={prod.name} 
                    className="w-full h-full object-cover rounded-lg group-hover:scale-[1.03] transition-transform duration-550" 
                  />
                  {prod.images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
                    </div>
                  )}
                </div>

                {/* Product spec data */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-stone-500 font-semibold font-sans uppercase tracking-wider">
                    <span>{prod.brand}</span>
                    <span className="flex items-center gap-0.5 text-stone-700">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {prod.rating}
                    </span>
                  </div>

                  <h3 
                    onClick={() => onNavigate("detail", prod.id)}
                    className="font-semibold text-stone-900 text-xs sm:text-sm line-clamp-1 hover:text-amber-600 cursor-pointer select-text"
                  >
                    {prod.name}
                  </h3>

                  {/* Bottom buy and pricing row */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-stone-950 text-sm sm:text-base">${prod.price}</span>
                      {prod.originalPrice && (
                        <span className="text-[10px] text-stone-400 line-through font-medium">${prod.originalPrice}</span>
                      )}
                    </div>

                    <button
                      id={`cart-btn-trending-${prod.id}`}
                      onClick={() => onAddToCart(prod)}
                      className="p-1.5 rounded-xl bg-stone-900 hover:bg-stone-850 text-white transition-colors"
                      title="Add to cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. RECOMMENDED FOR YOU (AI Personal Shopper Ad card) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel border-stone-200/80 p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden shadow-xs">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-amber-500/5 blur-2xl"></div>
          
          <div className="space-y-4 max-w-lg">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-stone-900/5 border border-stone-900/10 rounded-full text-[10px] font-bold text-stone-700 uppercase tracking-widest leading-none">
              <Sparkles className="w-3 h-3 text-amber-600" />
              INTELLIGENT SELECTION
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-stone-950 tracking-tight leading-tight">
              Bespoke recommendations generated dynamically
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
              Aura's personal styling guide parses global multi-vendor catalogs instantly to match articles that suit your lifestyle parameters. No algorithms—just pure design harmony.
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold text-stone-800">
              <span className="flex items-center gap-1"><Check className="w-4 h-4 text-emerald-500" /> Color Variants Matched</span>
              <span className="flex items-center gap-1"><Check className="w-4 h-4 text-emerald-500" /> Size Logic Sync</span>
            </div>
          </div>

          <div className="shrink-0 space-y-3.5 text-center bg-stone-900 text-white p-6 rounded-2xl border border-stone-800 w-full max-w-sm shadow-xl">
            <p className="font-serif font-medium text-lg leading-snug">Let us refine your daily look.</p>
            <p className="text-xs text-stone-400">Describe what you are dressing for and let our AI compile recommendations.</p>
            <button
              id="ai-recommend-cta"
              onClick={onOpenAIChat}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-950 font-bold text-xs transition-transform hover:scale-103 shadow-md flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              Activate Assistant Now
            </button>
          </div>
        </div>
      </section>

      {/* 7. FEATURED BRANDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-1.5 max-w-xl mx-auto">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">CREATIVE ALLIANCE</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-stone-950 tracking-tight">Our Premium Brand Roster</h2>
          <p className="text-xs text-stone-500">Securing dynamic licensing to bring multi-vendor authenticity on the cloud.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {BRANDS.map((brand) => (
            <div 
              key={brand.id}
              onClick={() => onNavigate("shop")}
              className="p-5 border border-stone-200/80 bg-white rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer hover:border-amber-500 hover:shadow-md transition-all select-none group"
            >
              <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">{brand.logo}</span>
              <span className="font-serif font-semibold text-stone-900 text-xs tracking-tight">{brand.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-1 max-w-xl mx-auto">
          <span className="text-xs font-extrabold uppercase text-stone-500 tracking-wider">AURA CRITIQUE</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-stone-950 tracking-tight">Verified Buyer Feedback</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div 
              key={t.id} 
              className="p-5 border border-stone-200 bg-white rounded-2xl space-y-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <img 
                  src={t.avatar} 
                  alt={t.name} 
                  className="w-10 h-10 rounded-full object-cover border border-stone-100 shrink-0" 
                />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">{t.name}</h4>
                  <p className="text-[10px] text-stone-500 font-medium">{t.role}</p>
                </div>
              </div>
              
              <div className="flex gap-0.5 text-amber-500">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                ))}
              </div>

              <blockquote className="text-stone-650 text-xs leading-relaxed font-normal italic select-text">
                "{t.comment}"
              </blockquote>

              <div className="flex items-center justify-between border-t border-stone-50 pt-3 text-[10px] text-stone-400">
                <span>{t.date}</span>
                <span className="flex items-center gap-1 cursor-pointer hover:text-stone-900 transition-colors">
                  <ThumbsUp className="w-3 h-3 text-stone-300" />
                  Was helpful
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. MOBILE APP PROMOTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-stone-900 rounded-3xl overflow-hidden py-10 relative shadow-xl">
        <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl"></div>
        <div className="flex flex-col lg:flex-row items-center gap-8 justify-between relative z-10 px-4 sm:px-8">
          <div className="space-y-4 max-w-lg text-white">
            <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest block">PREMIER APPLICATION</span>
            <h2 className="text-3xl font-serif font-semibold tracking-tight leading-tight">
              Aura Catalog in the Palm of Your Hand
            </h2>
            <p className="text-xs text-stone-300 leading-relaxed font-normal">
              Review logistics tracking, chat dynamically with style advisors, secure local biometric checkout locks, and explore spatial augmented reality showcases of Aether SoundScans. Available worldwide.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {/* Fake Apple App Store Badge */}
              <div className="px-3.5 py-1.5 rounded-xl bg-stone-950 border border-stone-850 hover:border-stone-700 transition-colors flex items-center gap-2 cursor-pointer select-none">
                <Smartphone className="w-4 h-4 text-stone-100" />
                <div className="text-left font-sans">
                  <p className="text-[8px] text-stone-400 uppercase leading-none font-bold">Download on the</p>
                  <p className="text-[11px] text-white font-bold tracking-tight leading-snug">Apple App Store</p>
                </div>
              </div>

              {/* Fake Google Play Badge */}
              <div className="px-3.5 py-1.5 rounded-xl bg-stone-950 border border-stone-850 hover:border-stone-700 transition-colors flex items-center gap-2 cursor-pointer select-none">
                <Smartphone className="w-4 h-4 text-amber-500" />
                <div className="text-left font-sans">
                  <p className="text-[8px] text-stone-400 uppercase leading-none font-bold">Get it on</p>
                  <p className="text-[11px] text-white font-bold tracking-tight leading-snug">Google Play Store</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative shrink-0 w-full max-w-sm aspect-video bg-stone-950/20 rounded-2xl flex items-center justify-center border border-stone-800 p-2 overflow-hidden shadow-2xl select-none">
            <div className="absolute inset-0 bg-stone-850/50 rounded-xl"></div>
            <div className="relative z-10 p-4 border border-stone-700 rounded-xl bg-stone-900 text-center space-y-2">
              <span className="text-xl">📱</span>
              <p className="text-xs font-bold text-white">AR Try-on Enabled</p>
              <p className="text-[10px] text-stone-400">Scan QR to connect matching variants instantly</p>
              <div className="w-20 h-20 bg-white mx-auto p-1.5 rounded-lg border border-stone-200">
                <div className="w-full h-full bg-stone-100 border border-stone-300 border-dashed rounded flex items-center justify-center font-mono text-[9px] text-stone-500 font-bold">
                  AURA QR
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. MULTI-COLUMN PREMIUM FOOTER */}
      <footer className="border-t border-stone-200 bg-white pt-12 pb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 select-none">
        
        {/* Upper Column Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-stone-950 flex items-center justify-center text-white font-bold text-base leading-none">
                A
              </div>
              <span className="font-serif font-semibold text-stone-950 tracking-wide text-base">AURA MARKET</span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed font-normal select-text">
              Exquisite multi-vendor shopping. Powered by advanced matching analytics and custom certified brand rosters. Curated for the discerning elite.
            </p>
            
            {/* Newsletter form */}
            <div className="space-y-1.5 pt-2">
              <label className="text-[10px] uppercase font-bold text-stone-900 tracking-wider block">Join The Aura Editorial</label>
              <form 
                id="newsletter-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Successfully subscribed to Aura newsletters and editorial drops!");
                }}
                className="flex items-center max-w-xs"
              >
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="w-full px-3 py-1.5 text-xs bg-stone-50 rounded-l-lg border border-stone-250 focus:outline-none focus:border-stone-900 focus:bg-white transition-colors"
                />
                <button
                  id="newsletter-submit"
                  type="submit"
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-stone-900 hover:bg-stone-850 rounded-r-lg transition-colors shrink-0"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-stone-900 uppercase tracking-widest">Platform Services</h4>
            <ul className="space-y-1.5 text-xs text-stone-500">
              <li onClick={() => onNavigate("shop")} className="hover:text-stone-900 cursor-pointer hover:underline">Explore Products</li>
              <li onClick={onOpenAIChat} className="hover:text-amber-700 cursor-pointer hover:underline flex items-center gap-1">AI Assistant <Sparkles className="w-3 h-3 text-amber-600 shrink-0" /></li>
              <li onClick={() => onNavigate("admin")} className="hover:text-stone-900 cursor-pointer hover:underline">Seller Registration</li>
              <li className="hover:text-stone-900 cursor-pointer hover:underline">Brand Collaborations</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-stone-900 uppercase tracking-widest">Customer Support</h4>
            <ul className="space-y-1.5 text-xs text-stone-500">
              <li onClick={() => onNavigate("dashboard")} className="hover:text-stone-900 cursor-pointer hover:underline">Secure Deliveries</li>
              <li className="hover:text-stone-900 cursor-pointer hover:underline">24-hr Chat Line</li>
              <li className="hover:text-stone-900 cursor-pointer hover:underline">Customs & Tariffs</li>
              <li className="hover:text-stone-900 cursor-pointer hover:underline">Carbon Offset Policy</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-stone-900 uppercase tracking-widest">Legal Details</h4>
            <ul className="space-y-1.5 text-xs text-stone-500">
              <li className="hover:text-stone-900 cursor-pointer hover:underline">Certified Authenticity</li>
              <li className="hover:text-stone-900 cursor-pointer hover:underline">Consumer Privacy</li>
              <li className="hover:text-stone-900 cursor-pointer hover:underline">Vendor Guidelines</li>
              <li className="hover:text-stone-900 cursor-pointer hover:underline">Cookie preferences</li>
            </ul>
          </div>

        </div>

        {/* Lower row */}
        <div className="border-t border-stone-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-stone-400">
          <p>© 2026 Aura Market. Under creative multi-vendor licensing. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <ShieldCheck className="w-4 h-4 text-stone-300" />
            <span className="text-[10px] font-medium tracking-tight text-stone-400 uppercase">SSL Guard Enforced Verified Checkout</span>
          </div>
        </div>

      </footer>
    </div>
  );
}
