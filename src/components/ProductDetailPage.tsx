/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Sparkles as AI_Icon,
  ChevronRight,
  Info
} from "lucide-react";
import { PRODUCTS, Product } from "../data";

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (view: string, productId?: string) => void;
  onAddToCart: (product: Product, quantity?: number, options?: any) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onOpenAIChat: () => void;
}

export default function ProductDetailPage({
  productId,
  onNavigate,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onOpenAIChat
}: ProductDetailPageProps) {
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

  // Visual Interactive state
  const [activeImage, setActiveImage] = useState<string>(product.images[0]);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.variants?.colors?.[0]?.name || ""
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.variants?.sizes?.[0] || product.variants?.capacities?.[0] || ""
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("specifications");
  const [addedNotify, setAddedNotify] = useState(false);

  // Sync active image when product transitions
  useEffect(() => {
    setActiveImage(product.images[0]);
    setSelectedColor(product.variants?.colors?.[0]?.name || "");
    setSelectedSize(product.variants?.sizes?.[0] || product.variants?.capacities?.[0] || "");
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId]);

  const handleAddToCart = () => {
    onAddToCart(product, quantity, { color: selectedColor, size: selectedSize });
    setAddedNotify(true);
    setTimeout(() => setAddedNotify(false), 3000);
  };

  const isWishlisted = wishlistIds.includes(product.id);

  // Frequently Bought Together Calculations (e.g., this product + another related product in the catalog)
  const bundleProduct = PRODUCTS.find(p => p.id !== product.id && p.category === product.category) || PRODUCTS[1];
  const bundleDiff = 15; // Set a flat discount for buying together
  const bundleTotal = product.price + bundleProduct.price - bundleDiff;

  const handleAddBundleToCart = () => {
    onAddToCart(product, 1);
    onAddToCart(bundleProduct, 1);
    setAddedNotify(true);
    setTimeout(() => setAddedNotify(false), 3000);
  };

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 relative pb-24">
      {/* Upper breadcrumb navigations */}
      <div className="flex items-center justify-between text-xs text-stone-500 font-medium select-none">
        <button
          id="btn-back-to-shop"
          onClick={() => onNavigate("shop")}
          className="flex items-center gap-1.5 hover:text-stone-900 transition-colors bg-white border border-stone-200 px-3 py-1.5 rounded-xl h-9"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Shop
        </button>

        <div className="flex items-center gap-1">
          <span className="cursor-pointer hover:underline" onClick={() => onNavigate("landing")}>Aura HOME</span>
          <ChevronRight className="w-3 h-3 text-stone-350" />
          <span className="cursor-pointer hover:underline uppercase" onClick={() => onNavigate("shop")}>{product.category}</span>
          <ChevronRight className="w-3 h-3 text-stone-355" />
          <span className="text-stone-900 font-semibold truncate max-w-[120px] sm:max-w-xs">{product.name}</span>
        </div>
      </div>

      {/* Main product representation grids */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Image Galleries */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-square w-full rounded-2xl bg-white border border-stone-150 p-4 relative overflow-hidden select-none flex items-center justify-center">
            {product.isFlashSale && (
              <span className="absolute top-4 left-4 text-[10px] bg-amber-500 text-stone-950 font-bold px-2.5 py-1 rounded-md uppercase z-10 shadow-xs">
                FLASH DROPS SPECIAL
              </span>
            )}
            <img 
              src={activeImage} 
              alt={product.name} 
              className="max-h-[500px] w-auto object-contain rounded-lg transform hover:scale-[1.02] transition-transform duration-500 cursor-zoom" 
            />
          </div>

          {/* Thumbnails Row */}
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto py-1 scrollbar-none select-none">
              {product.images.map((img, idx) => (
                <button
                  id={`thumb-image-${idx}`}
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-xl border p-1 bg-white overflow-hidden shrink-0 transition-all ${activeImage === img ? "border-stone-900 ring-2 ring-stone-900/10" : "border-stone-200 hover:border-stone-400"}`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover rounded-lg" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Descriptions & Custom Variant configurations */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Header block */}
          <div className="space-y-2.5">
            <span className="text-[10px] uppercase tracking-widest text-amber-700 font-extrabold bg-amber-500/10 px-2.5 py-1 rounded-md inline-block">
              PLATFORM VERIFIED • {product.brand}
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-stone-950 leading-tight">
              {product.name}
            </h1>
            
            {/* Reviews summary */}
            <div className="flex items-center gap-3 text-xs select-none">
              <div className="flex items-center gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "fill-amber-500 text-amber-500" : "text-stone-300"}`} 
                  />
                ))}
                <span className="font-bold text-stone-900 ml-1">{product.rating}</span>
              </div>
              <span className="text-stone-400 font-medium">•</span>
              <span className="text-stone-500 hover:underline cursor-pointer font-medium">{product.reviewsCount} verified reviews</span>
            </div>
          </div>

          <hr className="border-stone-200" />

          {/* Price details */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold tracking-tight text-stone-950">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-stone-400 line-through text-sm font-medium">${product.originalPrice}</span>
                  <span className="text-xs text-emerald-600 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md">
                    Save ${product.originalPrice - product.price} Securely!
                  </span>
                </>
              )}
            </div>
            <p className="text-[10px] text-stone-400">Available with monthly interest-free financing schemes from $29/mo</p>
          </div>

          {/* Core Description block */}
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal select-text">
            {product.description}
          </p>

          <hr className="border-stone-200" />

          {/* Variants Block */}
          <div className="space-y-4 select-none">
            
            {/* Colors */}
            {product.variants?.colors && (
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Select Finish: <span className="text-stone-900">{selectedColor}</span></span>
                <div className="flex gap-2">
                  {product.variants.colors.map((c) => (
                    <button
                      id={`color-btn-${c.name}`}
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`p-1 rounded-full border-2 transition-all ${selectedColor === c.name ? "border-stone-900 scale-105" : "border-transparent"}`}
                      title={c.name}
                    >
                      <span className="block w-5 h-5 rounded-full border border-stone-200" style={{ backgroundColor: c.hex }}></span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizing options */}
            {(product.variants?.sizes || product.variants?.capacities) && (
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Select Dimension: <span className="text-stone-900">{selectedSize}</span></span>
                <div className="flex flex-wrap gap-2">
                  {(product.variants.sizes || product.variants.capacities || []).map((val) => (
                    <button
                      id={`size-btn-${val}`}
                      key={val}
                      onClick={() => setSelectedSize(val)}
                      className={`px-3 py-1.5 border rounded-xl text-xs font-semibold tracking-tight transition-all uppercase ${selectedSize === val ? "bg-stone-950 text-white border-stone-950" : "border-stone-200 bg-white hover:border-stone-400 text-stone-700"}`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Action Row */}
          <div className="flex gap-3 flex-wrap pt-2 select-none">
            <div className="flex items-center border border-stone-200 rounded-xl bg-white h-11">
              <button
                id="btn-qty-minus"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-3.5 hover:bg-stone-50 h-full text-stone-500 transition-colors text-sm font-semibold rounded-l-xl"
              >
                -
              </button>
              <span className="px-3 text-xs font-bold text-stone-900 font-mono w-10 text-center">{quantity}</span>
              <button
                id="btn-qty-plus"
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-3.5 hover:bg-stone-50 h-full text-stone-500 transition-colors text-sm font-semibold rounded-r-xl"
              >
                +
              </button>
            </div>

            <button
              id="detail-add-to-cart-btn"
              onClick={handleAddToCart}
              className="flex-1 px-5 h-11 bg-stone-900 hover:bg-stone-850 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 relative overflow-hidden active:scale-98"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              Add to Cart
            </button>

            <button
              id="detail-wishlist-btn"
              onClick={() => onToggleWishlist(product)}
              className={`p-3 h-11 rounded-xl border hover:bg-stone-50 transition-all text-stone-500 flex items-center justify-center ${isWishlisted ? "bg-red-50 text-red-500 border-red-100" : "bg-white border-stone-200"}`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500" : ""}`} />
            </button>
          </div>

          {/* Display Notification Box if added to cart */}
          {addedNotify && (
            <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fade-in select-none">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Perfect! Item added. Review your Shopping Cart checklist.</span>
            </div>
          )}

          {/* AI Advisor promo overlay inside detail page */}
          <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-center justify-between text-xs sm:text-sm text-stone-800 select-none">
            <div className="flex items-center gap-2 bg-transparent">
              <AI_Icon className="w-4.5 h-4.5 text-amber-600 animate-pulse" />
              <div className="bg-transparent">
                <span className="font-bold block text-stone-900">Need styling matching advice?</span>
                <span className="text-[10px] text-stone-500 block leading-tight">Ask Aura Luxe to design an aesthetic ensemble around this.</span>
              </div>
            </div>
            <button
              id="detail-ai-ask"
              onClick={onOpenAIChat}
              className="text-[10px] bg-stone-900 hover:bg-stone-800 text-white px-2.5 py-1.5 rounded-lg font-bold"
            >
              Ask AI Stylist
            </button>
          </div>

        </div>

      </div>

      {/* Product Information tabs - Specs, Highlights */}
      <section className="border border-stone-200 rounded-2xl bg-white p-6 sm:p-8 space-y-6 select-none">
        <div className="flex border-b border-stone-200 text-xs sm:text-sm font-semibold select-none">
          <button
            id="tab-specs"
            onClick={() => setActiveTab("specifications")}
            className={`pb-3 pr-6 text-stone-700 hover:text-stone-950 border-b-2 transition-all ${activeTab === "specifications" ? "border-stone-950 font-bold" : "border-transparent text-stone-400"}`}
          >
            Technical Specs
          </button>
          <button
            id="tab-features"
            onClick={() => setActiveTab("features")}
            className={`pb-3 px-6 text-stone-700 hover:text-stone-950 border-b-2 transition-all ${activeTab === "features" ? "border-stone-950 font-bold" : "border-transparent text-stone-400"}`}
          >
            Key Highlights
          </button>
          <button
            id="tab-ship"
            onClick={() => setActiveTab("shipping")}
            className={`pb-3 px-6 text-stone-700 hover:text-stone-950 border-b-2 transition-all ${activeTab === "shipping" ? "border-stone-950 font-bold" : "border-transparent text-stone-400"}`}
          >
            Shipping & Return policies
          </button>
        </div>

        {activeTab === "specifications" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs select-text">
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="flex py-2 border-b border-stone-100 flex-row">
                <span className="font-semibold text-stone-500 w-1/3 shrink-0">{key}</span>
                <span className="text-stone-900 w-2/3">{val}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "features" && (
          <ul className="space-y-3.5 text-xs select-text">
            {product.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <p className="text-stone-600 leading-normal">{feat}</p>
              </li>
            ))}
          </ul>
        )}

        {activeTab === "shipping" && (
          <div className="space-y-4 max-w-xl text-xs select-text leading-relaxed">
            <div className="flex gap-4">
              <Truck className="w-5 h-5 text-stone-450 shrink-0" />
              <div>
                <p className="font-bold text-stone-900">Complimentary Global Priority Shipping</p>
                <p className="text-stone-500 text-[11px] mt-0.5">Dispatched within 24 hours relative to order completion timestamp. Fully insured routing via premium courier alliances (DHL Express & FedEx).</p>
              </div>
            </div>
            <div className="flex gap-4">
              <RotateCcw className="w-5 h-5 text-stone-450 shrink-0" />
              <div>
                <p className="font-bold text-stone-900">Complimentary 30-Day Escrow Returns</p>
                <p className="text-stone-500 text-[11px] mt-0.5">All products can be returned within 30 calendar days for full transaction reversals or variant credits. Zero restocking levies apply.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <ShieldCheck className="w-5 h-5 text-stone-450 shrink-0" />
              <div>
                <p className="font-bold text-stone-900">Aura Certified Authenticity Guarantee</p>
                <p className="text-stone-500 text-[11px] mt-0.5">Vetted systematically for original licensing elements. Full escrow insurance refund bounds if item contains defect indicators or missing documentation.</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Frequently bought together combo section */}
      <section className="bg-stone-100/60 border border-stone-250/50 rounded-2xl p-6 sm:p-8 space-y-6">
        <h3 className="text-base font-serif font-bold text-stone-905 tracking-tight flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 animate-bounce" />
          Frequently Bought Together (Combo Option)
        </h3>
        
        <div className="flex flex-col lg:flex-row items-center gap-6 justify-between select-none">
          <div className="flex flex-wrap items-center gap-4 text-stone-450 text-xl font-bold">
            {/* Combo card 1 (Active) */}
            <div className="flex items-center gap-3 p-3 bg-white border border-stone-150 rounded-xl shadow-xs w-64">
              <img src={product.images[0]} alt="current" className="w-14 h-14 object-cover rounded-md" />
              <div className="min-w-0 text-left">
                <h4 className="text-xs font-semibold text-stone-900 truncate">{product.name}</h4>
                <p className="text-xs font-bold text-stone-950 mt-0.5">${product.price}</p>
              </div>
            </div>

            <span className="text-stone-400 font-normal">+</span>

            {/* Combo card 2 */}
            <div 
              onClick={() => onNavigate("detail", bundleProduct.id)}
              className="flex items-center gap-3 p-3 bg-white border border-stone-150 rounded-xl shadow-xs w-64 hover:border-amber-500 cursor-pointer transition-colors"
            >
              <img src={bundleProduct.images[0]} alt="combo companion" className="w-14 h-14 object-cover rounded-md" />
              <div className="min-w-0 text-left">
                <h4 className="text-xs font-semibold text-stone-900 truncate">{bundleProduct.name}</h4>
                <p className="text-xs font-bold text-stone-950 mt-0.5">${bundleProduct.price}</p>
              </div>
            </div>
          </div>

          {/* Pricing computation card */}
          <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-3.5 text-center min-w-[200px] shadow-sm">
            <div className="space-y-0.5">
              <p className="text-[10px] text-stone-400 uppercase tracking-widest font-extrabold">Instant Bundle Price</p>
              <p className="text-xl font-bold text-stone-950">${bundleTotal}</p>
              <p className="text-[10px] text-emerald-600 font-semibold">Bundle Promo: Save $15</p>
            </div>
            <button
              id="btn-buy-bundle"
              onClick={handleAddBundleToCart}
              className="w-full py-2 bg-stone-900 hover:bg-stone-850 text-white text-xs font-bold rounded-lg tracking-tight transition-colors flex items-center justify-center gap-1"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Buy Ensembles Together
            </button>
          </div>
        </div>
      </section>

      {/* Related Products carousel */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <h3 className="text-lg font-serif font-semibold text-stone-950 tracking-tight">People Also Viewed</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <div 
                key={p.id}
                className="bg-white border border-stone-200/80 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-all group cursor-pointer"
              >
                <div 
                  onClick={() => onNavigate("detail", p.id)}
                  className="aspect-square w-full rounded-xl bg-stone-50 overflow-hidden relative"
                >
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover rounded-lg group-hover:scale-103 transition-transform" />
                </div>
                <div className="mt-3 space-y-1 select-none text-left">
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-stone-400 block">{p.brand}</span>
                  <h4 
                    onClick={() => onNavigate("detail", p.id)}
                    className="text-xs font-bold text-stone-900 line-clamp-1 block select-text"
                  >
                    {p.name}
                  </h4>
                  <p className="text-xs font-semibold text-stone-950 mt-1">${p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sticky Bottom buying decisions utility */}
      <div className="fixed bottom-0 left-0 right-0 py-3 bg-white/80 backdrop-blur-md border-t border-stone-150 z-30 shadow-2xl flex items-center justify-center animate-fade-in sm:px-6">
        <div className="max-w-7xl w-full flex items-center justify-between gap-6 px-4">
          <div className="flex items-center gap-3 select-none">
            <img src={product.images[0]} alt={product.name} className="w-10 h-10 object-cover rounded-md border" />
            <div className="hidden sm:block">
              <h4 className="text-xs font-bold text-stone-950 line-clamp-1 max-w-xs">{product.name}</h4>
              <p className="text-[10px] text-stone-500 font-semibold uppercase">{product.brand}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold text-stone-950 text-base sm:text-lg">${product.price * quantity}</span>
            <button
              id="sticky-checkout-btn"
              onClick={handleAddToCart}
              className="px-6 py-2 bg-stone-900 hover:bg-stone-850 text-white font-bold text-xs rounded-lg shadow-md transition-colors active:scale-98"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
