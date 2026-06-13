/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  Tag, 
  Truck, 
  ShieldCheck, 
  ArrowLeft,
  Check,
  X
} from "lucide-react";
import { Product, COUPONS } from "../data";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, options?: any) => void;
  onRemoveItem: (productId: string, options?: any) => void;
  onNavigate: (view: string) => void;
  appliedCoupon: any | null;
  onApplyCoupon: (coupon: any | null) => void;
}

export default function CartPage({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
  appliedCoupon,
  onApplyCoupon
}: CartPageProps) {
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [shippingMethod, setShippingMethod] = useState<string>("express");

  // Sum cost computations
  const itemsSubtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Coupon calculations
  let discountValue = 0;
  if (appliedCoupon) {
    if (appliedCoupon.isFixed) {
      discountValue = appliedCoupon.discount;
    } else {
      discountValue = itemsSubtotal * appliedCoupon.discount;
    }
  }

  // Cap discount at subtotal cost
  discountValue = Math.min(discountValue, itemsSubtotal);

  // Shipping cost options
  const shippingLabels: { [key: string]: number } = {
    standard: 0, // Free
    express: 15,
    insurance: 25
  };
  const shippingCost = shippingLabels[shippingMethod];

  // Tax calculations (5% standard sales levy)
  const taxableSum = Math.max(0, itemsSubtotal - discountValue);
  const salesTax = taxableSum * 0.05;

  const grandTotal = taxableSum + shippingCost + salesTax;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const code = couponCode.trim().toUpperCase();
    
    if (!code) return;

    const matched = COUPONS.find(c => c.code === code);
    if (matched) {
      onApplyCoupon(matched);
      setCouponCode("");
    } else {
      setCouponError("Invalid promo coupon code. Try 'AURA20' or 'SUPERDEAL'.");
    }
  };

  const handleRemoveCoupon = () => {
    onApplyCoupon(null);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center space-y-5 select-none my-12 bg-white border border-stone-200 rounded-3xl shadow-sm">
        <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-500">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h2 className="font-serif font-semibold text-lg text-stone-900">Your Shopping Cart is Empty</h2>
          <p className="text-xs text-stone-500 font-normal leading-relaxed">
            Discover bespoke watches, cashmere overcoats, linear mechanical keyboards, or certified essential serums curated by Aura Luxe.
          </p>
        </div>
        <button
          id="cart-empty-shop-cta"
          onClick={() => onNavigate("shop")}
          className="px-6 py-2.5 bg-stone-900 hover:bg-stone-850 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
        >
          Begin Exploring Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">
      
      <div className="space-y-1 text-left">
        <h2 className="text-2xl font-serif font-semibold text-stone-950 tracking-tight">Shopping Cart Overview</h2>
        <p className="text-xs text-stone-500">Review your requested luxury catalog and configure checkout priorities</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Items List */}
        <div className="lg:col-span-8 space-y-4">
          
          <div className="border border-stone-200 bg-white rounded-2xl divide-y divide-stone-100 p-4 shadow-sm">
            {cartItems.map((item, idx) => (
              <div key={idx} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                {/* Image and name specs details */}
                <div className="flex items-center gap-4 flex-1">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name} 
                    className="w-16 h-16 object-cover rounded-xl border border-stone-100 shrink-0" 
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] uppercase tracking-wider text-amber-700 font-bold block">{item.product.brand}</span>
                    <h3 className="text-xs sm:text-sm font-semibold text-stone-900 truncate">{item.product.name}</h3>
                    
                    {/* Variants badge metadata */}
                    {(item.selectedColor || item.selectedSize) && (
                      <div className="flex gap-2 mt-1">
                        {item.selectedColor && (
                          <span className="text-[10px] text-stone-500 font-medium bg-stone-50 px-2 py-0.5 rounded-md border border-stone-100">
                            Finish: {item.selectedColor}
                          </span>
                        )}
                        {item.selectedSize && (
                          <span className="text-[10px] text-stone-500 font-medium bg-stone-50 px-2 py-0.5 rounded-md border border-stone-100">
                            Size: {item.selectedSize}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Pricing, Quantity adjustment, and trash delete triggers */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto shrink-0">
                  <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 h-9">
                    <button
                      id={`cart-minus-btn-${idx}`}
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1, { color: item.selectedColor, size: item.selectedSize })}
                      className="px-2.5 hover:bg-stone-50 text-stone-500 font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="px-2.5 text-xs font-bold text-stone-900 font-mono text-center w-8">{item.quantity}</span>
                    <button
                      id={`cart-plus-btn-${idx}`}
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, { color: item.selectedColor, size: item.selectedSize })}
                      className="px-2.5 hover:bg-stone-50 text-stone-500 font-bold text-xs"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right min-w-[70px]">
                    <span className="text-sm font-bold text-stone-950">${item.product.price * item.quantity}</span>
                  </div>

                  <button
                    id={`cart-remove-btn-${idx}`}
                    onClick={() => onRemoveItem(item.product.id, { color: item.selectedColor, size: item.selectedSize })}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-red-650 hover:bg-red-50 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Continue browse and safe security guarantees */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            <button
              id="cart-back-to-shop-cta"
              onClick={() => onNavigate("shop")}
              className="text-xs font-bold text-stone-905 hover:text-amber-700 flex items-center gap-1 w-fit group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Continue Browsing Collections
            </button>
            <div className="flex items-center gap-2 text-[11px] text-stone-450 font-medium">
              <ShieldCheck className="w-4.5 h-4.5 text-stone-400" />
              <span>Full dynamic pricing guarantee under active platform escrow</span>
            </div>
          </div>

        </div>

        {/* Right Side: Pricing Invoices & Coupon Codes */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Working Coupon System */}
          <div className="p-4 bg-white border border-stone-200 rounded-2xl shadow-sm space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-905">Active Promo Coupons</h4>
            
            {appliedCoupon ? (
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="text-left">
                    <span className="text-xs font-bold tracking-tight uppercase block leading-none">{appliedCoupon.code}</span>
                    <span className="text-[10px] text-emerald-600 font-medium">{appliedCoupon.desc}</span>
                  </div>
                </div>
                <button 
                  id="remove-coupon"
                  onClick={handleRemoveCoupon} 
                  className="p-1 text-emerald-600 hover:text-stone-900 hover:bg-emerald-100 rounded-full transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <form id="coupon-entry-form" onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  id="coupon-input"
                  type="text"
                  placeholder="Code (try AURA20, SUPERDEAL)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-stone-50 rounded-xl border border-stone-250 text-xs focus:outline-none focus:border-stone-900 focus:bg-white uppercase text-stone-900 transition-colors"
                />
                <button
                  id="apply-coupon-btn"
                  type="submit"
                  disabled={!couponCode.trim()}
                  className="px-3.5 py-1.5 text-xs text-white font-bold bg-stone-900 hover:bg-stone-850 hover:scale-101 rounded-xl transition-all"
                >
                  Apply
                </button>
              </form>
            )}

            {couponError && (
              <p className="text-[10px] text-red-650 font-medium bg-red-50 p-2 border border-red-100 rounded-lg leading-snug">{couponError}</p>
            )}
            {!appliedCoupon && !couponError && (
              <p className="text-[10px] text-stone-400 font-medium">✨ Enter <strong>AURA20</strong> for 20% off or <strong>SUPERDEAL</strong> for flat $50 discount.</p>
            )}
          </div>

          {/* Pricing Invoice Summary Card */}
          <div className="p-5 bg-white border border-stone-200 rounded-2xl shadow-sm space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-950 pb-2 border-b border-stone-100">Order Invoice Summary</h4>
            
            <div className="space-y-3.5 text-xs text-stone-600">
              
              <div className="flex justify-between">
                <span>Catalog Subtotal</span>
                <span className="font-semibold text-stone-950">${itemsSubtotal}</span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-emerald-600">
                  <span className="flex items-center gap-1">Applied Coupon Promo ({appliedCoupon.code})</span>
                  <span className="font-bold">-${discountValue}</span>
                </div>
              )}

              {/* Shipping estimators */}
              <div className="space-y-2 border-t border-stone-100 pt-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-905 block">Shipping Estimator & Priorities</span>
                <div className="space-y-1.5 flex flex-col">
                  {[
                    { id: "standard", label: "Free VIP Priority Ground", cost: 0 },
                    { id: "express", label: "FedEx Express (24h delivery)", cost: 15 },
                    { id: "insurance", label: "Insured Air Cargo (Secure Tracked)", cost: 25 },
                  ].map((ship) => (
                    <label key={ship.id} className="flex items-center justify-between p-2 rounded-lg border border-stone-150 bg-stone-50/50 hover:bg-white hover:border-amber-500 cursor-pointer text-[11px] font-semibold text-stone-650">
                      <div className="flex items-center gap-2">
                        <input
                          id={`ship-method-${ship.id}`}
                          type="radio"
                          name="shipping"
                          checked={shippingMethod === ship.id}
                          onChange={() => setShippingMethod(ship.id)}
                          className="accent-stone-900 border-stone-300 w-3.5 h-3.5 shrink-0"
                        />
                        <span>{ship.label}</span>
                      </div>
                      <span className="font-mono text-stone-900">{ship.cost === 0 ? "FREE" : `$${ship.cost}`}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-between border-t border-stone-100 pt-3">
                <span>ESTIMATED TAX (5% sales levy)</span>
                <span className="font-mono text-stone-900">${salesTax.toFixed(2)}</span>
              </div>

            </div>

            <div className="border-t border-stone-200 pt-4 flex justify-between items-baseline select-text">
              <span className="text-sm font-bold text-stone-950">Estimated Grand Total</span>
              <span className="text-xl font-bold tracking-tight text-amber-700">${grandTotal.toFixed(2)}</span>
            </div>

            {/* CTA checkout Proceed */}
            <button
              id="proceed-to-checkout"
              onClick={() => onNavigate("checkout")}
              className="w-full h-11 bg-stone-900 hover:bg-stone-850 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              Secure checkout sequence
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
