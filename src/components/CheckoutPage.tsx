/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Check, 
  CreditCard, 
  MapPin, 
  ShoppingBag, 
  Lock, 
  ChevronRight, 
  Printer, 
  ArrowRight,
  ShieldCheck,
  Building
} from "lucide-react";
import { Product } from "../data";
import { CartItem } from "./CartPage";

interface CheckoutPageProps {
  cartItems: CartItem[];
  appliedCoupon: any | null;
  onClearCart: () => void;
  onAddOrderToHistory: (order: any) => void;
  onNavigate: (view: string) => void;
}

export default function CheckoutPage({
  cartItems,
  appliedCoupon,
  onClearCart,
  onAddOrderToHistory,
  onNavigate
}: CheckoutPageProps) {
  // Checkout progress steps: 'address' | 'payment' | 'review' | 'success'
  const [step, setStep] = useState<string>("address");

  // Address Form state
  const [address, setAddress] = useState({
    fullName: "Ashok Kumar",
    street: "14 Kingsway Mansion Road",
    city: "London",
    zip: "W2 1LA",
    country: "United Kingdom",
    phone: "+44 7123 456789"
  });

  // Card Payment states
  const [payment, setPayment] = useState({
    brand: "visa", // default
    number: "4111 2222 3333 4444",
    name: "ASHOK KUMAR",
    expiry: "09/30",
    cvv: "123"
  });

  // Invoice calculations helper
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  let discount = 0;
  if (appliedCoupon) {
    discount = appliedCoupon.isFixed ? appliedCoupon.discount : subtotal * appliedCoupon.discount;
  }
  discount = Math.min(discount, subtotal);
  const taxedSum = Math.max(0, subtotal - discount);
  const tax = taxedSum * 0.05;
  const shipping = 15; // Set express standard
  const grandTotal = taxedSum + tax + shipping;

  const [orderId, setOrderId] = useState<string>("");

  const handleCompleteOrder = () => {
    const generatedId = `AU-928${Math.floor(10 + Math.random() * 90)}`;
    setOrderId(generatedId);

    // Save newly compiled order into User Dashboard history!
    const newOrder = {
      id: generatedId,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      items: cartItems.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        color: item.selectedColor,
        size: item.selectedSize,
        image: item.product.images[0]
      })),
      total: grandTotal,
      shippingAddress: `${address.street}, ${address.city}, ${address.zip}, ${address.country}`,
      status: "Processing"
    };

    onAddOrderToHistory(newOrder);
    setStep("success");
    onClearCart();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">
      
      {/* 1. UPPER MULTI_STEP INDEX INDICATOR */}
      {step !== "success" && (
        <div className="flex items-center justify-between border border-stone-200 bg-white p-4 rounded-2xl shadow-xs text-xs font-semibold select-none">
          <div className="flex items-center gap-7">
            
            {/* Step address */}
            <div className={`flex items-center gap-2 ${step === "address" ? "text-stone-900 border-b-2 border-stone-900 font-bold pb-0.5" : "text-stone-400"}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step !== "address" ? "bg-stone-100 text-stone-550" : "bg-stone-900 text-white"}`}>1</div>
              <span>Delivery Address</span>
            </div>

            <ChevronRight className="w-3.5 h-3.5 text-stone-300 shrink-0" />

            {/* Step payment */}
            <div className={`flex items-center gap-2 ${step === "payment" ? "text-stone-950 border-b-2 border-stone-950 font-bold pb-0.5" : "text-stone-400"}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === "review" ? "bg-stone-100 text-green-600" : (step === "payment" ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-550")}`}>2</div>
              <span>Card Payment</span>
            </div>

            <ChevronRight className="w-3.5 h-3.5 text-stone-300 shrink-0" />

            {/* Step review */}
            <div className={`flex items-center gap-2 ${step === "review" ? "text-stone-950 border-b-2 border-stone-950 font-bold pb-0.5" : "text-stone-400"}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === "review" ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-550"}`}>3</div>
              <span>Final Review</span>
            </div>

          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-xl">
            <Lock className="w-3.5 h-3.5" />
            <span>SSL Certified 256-bit</span>
          </div>
        </div>
      )}

      {/* 2. DYNAMIC LAYOUT PER STEPS */}

      {/* ADDRESS VIEW */}
      {step === "address" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <form 
            id="address-form"
            onSubmit={(e) => { e.preventDefault(); setStep("payment"); }}
            className="md:col-span-7 border border-stone-200 bg-white p-5 rounded-2xl shadow-sm space-y-4"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900 pb-2 border-b border-stone-50 flex items-center gap-1.5">
              <MapPin className="w-4.5 h-4.5 text-stone-450 shrink-0" />
              Priority Delivery Address
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-stone-500">FullName</label>
                <input
                  id="addr-fullname"
                  type="text"
                  required
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-250 rounded-xl focus:outline-none focus:border-stone-900 text-stone-900 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-500">Street Address</label>
                <input
                  id="addr-street"
                  type="text"
                  required
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-250 rounded-xl focus:outline-none focus:border-stone-900 text-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-500">City</label>
                  <input
                    id="addr-city"
                    type="text"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-250 rounded-xl focus:outline-none focus:border-stone-900 text-stone-920"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-stone-500">ZIP Code</label>
                  <input
                    id="addr-zip"
                    type="text"
                    required
                    value={address.zip}
                    onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-250 rounded-xl focus:outline-none focus:border-stone-900 text-stone-920"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-500">Country</label>
                  <input
                    id="addr-country"
                    type="text"
                    required
                    value={address.country}
                    onChange={(e) => setAddress({ ...address, country: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-250 rounded-xl focus:outline-none focus:border-stone-900 text-stone-920"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-stone-500">Daytime Phone Contact</label>
                  <input
                    id="addr-phone"
                    type="tel"
                    required
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-250 rounded-xl focus:outline-none focus:border-stone-900 text-stone-920 font-mono"
                  />
                </div>
              </div>
            </div>

            <button
              id="submit-address-cta"
              type="submit"
              className="w-full h-11 bg-stone-900 hover:bg-stone-850 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              Configure Payment Details
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Right Invoice Recap panel */}
          <div className="md:col-span-5 p-4 bg-stone-100/60 rounded-2xl border border-stone-200 shadow-inner space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-950">Cart Items Recap</h4>
            <div className="divide-y divide-stone-200 text-xs">
              {cartItems.map((item, i) => (
                <div key={i} className="py-2.5 first:pt-0 last:pb-0 flex justify-between items-center bg-transparent">
                  <span className="truncate max-w-[150px] font-medium text-stone-700 bg-transparent">{item.product.name} ({item.quantity})</span>
                  <span className="font-bold text-stone-955 bg-transparent">${item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-stone-200 pt-3 flex justify-between items-baseline bg-transparent">
              <span className="text-xs font-semibold text-stone-500 bg-transparent">Estimated Pay</span>
              <span className="text-base font-bold text-stone-955 bg-transparent">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

        </div>
      )}

      {/* PAYMENT CARD DETAILS STEP WITH CREDIT CARD SKETCH */}
      {step === "payment" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <form 
            id="payment-form"
            onSubmit={(e) => { e.preventDefault(); setStep("review"); }}
            className="md:col-span-7 border border-stone-200 bg-white p-5 rounded-2xl shadow-sm space-y-5"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-905 pb-2 border-b border-stone-100 flex items-center gap-1.5">
              <CreditCard className="w-4.5 h-4.5 text-stone-450 shrink-0" />
              Secure Card Credit Entry
            </h3>

            {/* Micro Credit cards display */}
            <div className="bg-gradient-to-r from-stone-950 via-stone-905 to-stone-900 border border-stone-850 p-5 rounded-2xl text-white shadow-xl aspect-video w-full max-w-sm mx-auto flex flex-col justify-between select-none relative overflow-hidden">
              <div className="absolute right-0 bottom-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
              
              <div className="flex justify-between items-start bg-transparent">
                <div>
                  <span className="text-[10px] tracking-widest text-stone-400 font-bold block bg-transparent">AURA LUXE MEMBER</span>
                  <span className="text-[9px] text-amber-500 font-bold bg-transparent">EST. 2026</span>
                </div>
                <div className="font-serif italic font-extrabold text-white text-base tracking-widest bg-transparent">visa</div>
              </div>

              <div className="space-y-4 bg-transparent">
                <p className="text-base sm:text-lg font-mono font-bold tracking-[0.15em] text-white bg-transparent">
                  {payment.number || "•••• •••• •••• ••••"}
                </p>
                
                <div className="flex justify-between text-xs bg-transparent">
                  <div className="bg-transparent">
                    <span className="text-[8px] text-stone-450 block uppercase tracking-wider bg-transparent">HOLDER</span>
                    <span className="font-bold tracking-wide uppercase truncate max-w-[150px] block bg-transparent">{payment.name || "ASHOK KUMAR"}</span>
                  </div>
                  <div className="bg-transparent">
                    <span className="text-[8px] text-stone-450 block uppercase tracking-wider bg-transparent">EXPIRES</span>
                    <span className="font-mono font-bold block bg-transparent">{payment.expiry || "09/30"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-3.5 text-xs pt-1">
              <div className="space-y-1">
                <label className="font-semibold text-stone-500">Credit Card Number</label>
                <input
                  id="pay-card-no"
                  type="text"
                  required
                  placeholder="4111 2222 3333 4444"
                  value={payment.number}
                  onChange={(e) => setPayment({ ...payment, number: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-250 rounded-xl focus:outline-none focus:border-stone-900 text-stone-900 font-mono font-bold tracking-wider"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-500">Holder Complete Name</label>
                <input
                  id="pay-holder"
                  type="text"
                  required
                  placeholder="ASHOK KUMAR"
                  value={payment.name}
                  onChange={(e) => setPayment({ ...payment, name: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-250 rounded-xl focus:outline-none focus:border-stone-900 text-stone-900 font-semibold uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-500">Expiry (MM/YY)</label>
                  <input
                    id="pay-expiry"
                    type="text"
                    required
                    placeholder="09/30"
                    value={payment.expiry}
                    onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-250 rounded-xl focus:outline-none focus:border-stone-900 text-stone-900 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-stone-500">CVV Secure Pin</label>
                  <input
                    id="pay-cvv"
                    type="password"
                    maxLength={3}
                    required
                    placeholder="•••"
                    value={payment.cvv}
                    onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-250 rounded-xl focus:outline-none focus:border-stone-900 text-stone-900 font-mono font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                id="back-to-address-btn"
                type="button"
                onClick={() => setStep("address")}
                className="px-4 py-2 bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 text-xs font-semibold rounded-xl"
              >
                Back
              </button>
              <button
                id="submit-payment-cta"
                type="submit"
                className="flex-1 h-11 bg-stone-900 hover:bg-stone-850 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                Proceed to Final Summary
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Security details checklist info */}
          <div className="md:col-span-5 p-5 bg-stone-50 border border-stone-200 rounded-2xl flex flex-col justify-between h-56 text-xs text-stone-650 leading-relaxed font-normal">
            <div className="space-y-3.5 bg-transparent">
              <h4 className="font-bold text-stone-950 bg-transparent">Aura Escrow Commitments</h4>
              <p className="bg-transparent">Payments are nested inside smart escrow vaults. Funds are only triggered once the priority track departs warehouse blocks.</p>
              <div className="flex items-center gap-2 text-[10px] text-emerald-805 text-emerald-700 font-semibold bg-emerald-50 border border-emerald-100 p-2 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>3D Secure V2 Code Checks Ready</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* FINAL SUMMARY REVIEW STEP antes de execute */}
      {step === "review" && (
        <div className="border border-stone-200 bg-white p-6 sm:p-8 rounded-2xl shadow-sm space-y-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900 pb-2 border-b border-stone-200 flex items-center gap-1.5">
            <ShoppingBag className="w-4.5 h-4.5 text-stone-450 shrink-0" />
            Final Order Review Summary
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed font-normal">
            
            {/* Delivery address left summary */}
            <div className="space-y-2">
              <h4 className="font-bold uppercase text-[10px] tracking-wider text-stone-500">Shipping Directives:</h4>
              <p className="text-stone-900 font-bold">{address.fullName}</p>
              <p className="text-stone-600">{address.street}</p>
              <p className="text-stone-600">{address.city}, {address.zip}, {address.country}</p>
              <p className="text-stone-400">Phone: {address.phone}</p>
            </div>

            {/* Payment card right summary */}
            <div className="space-y-2">
              <h4 className="font-bold uppercase text-[10px] tracking-wider text-stone-500">Payment Account:</h4>
              <div className="flex items-center gap-2 text-stone-900 font-bold uppercase font-mono">
                <CreditCard className="w-4 h-4 text-stone-600" />
                <span>Visa Card ending in •••• {payment.number.slice(-4)}</span>
              </div>
              <p className="text-stone-400">Escrow validation holds are verified.</p>
            </div>

          </div>

          <hr className="border-stone-150" />

          {/* Invoice summary checklist details */}
          <div className="space-y-3.5 text-xs">
            <h4 className="font-bold uppercase text-[10px] tracking-wider text-stone-500">Bill Summary Details:</h4>
            <div className="space-y-2 bg-stone-50 p-4 rounded-xl text-stone-600">
              <div className="flex justify-between bg-transparent">
                <span className="bg-transparent">Department Subtotal</span>
                <span className="font-semibold text-stone-900 bg-transparent">${subtotal}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-600 font-semibold bg-transparent">
                  <span className="bg-transparent">Promo Coupon Reduction ({appliedCoupon.code})</span>
                  <span className="bg-transparent">-${discount}</span>
                </div>
              )}
              <div className="flex justify-between bg-transparent">
                <span className="bg-transparent">Express DHL Priority Air Cargo</span>
                <span className="font-semibold text-stone-900 bg-transparent">$15</span>
              </div>
              <div className="flex justify-between bg-transparent">
                <span className="bg-transparent">Estimated taxations (5% sales levy)</span>
                <span className="font-semibold text-stone-900 bg-transparent">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-stone-200 pt-3 flex justify-between items-baseline font-bold text-stone-950 text-sm sm:text-base bg-transparent">
                <span className="bg-transparent">Grand Estimated Valuation Due</span>
                <span className="text-amber-700 bg-transparent">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 select-none">
            <button
              id="back-to-payment-btn"
              onClick={() => setStep("payment")}
              className="px-4 py-2 border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold rounded-xl"
            >
              Adjust payment details
            </button>
            <button
              id="execute-secure-checkout"
              onClick={handleCompleteOrder}
              className="flex-1 h-11 bg-stone-900 hover:bg-stone-850 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              Authorize Transaction Escrow
              <ShieldCheck className="w-4 h-4 text-amber-500" />
            </button>
          </div>
        </div>
      )}

      {/* CONFIRMATION / SUCCESS PANEL PAGE VIEW */}
      {step === "success" && (
        <div className="max-w-md mx-auto p-6 sm:p-8 border border-stone-200 bg-white rounded-3xl text-center space-y-6 shadow-xl animate-fade-in my-8 select-none">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-105 flex items-center justify-center mx-auto text-emerald-600">
            <Check className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/25 text-emerald-750 text-emerald-800 font-extrabold px-3 py-1 rounded-full uppercase">
              TRANSACTION APPROVED
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-semibold text-stone-950">Grand Order Completed!</h2>
            <p className="text-xs text-stone-500 max-w-sm mx-auto font-normal leading-relaxed">
              Your priority escrow voucher has loaded successfully. Logistics dispatch maps are active inside the user portal.
            </p>
          </div>

          {/* Mock invoice metadata box */}
          <div className="p-4 bg-stone-50 rounded-xl space-y-2 text-xs text-stone-600 text-left font-normal border border-stone-100">
            <div className="flex justify-between bg-transparent">
              <span className="text-stone-400 bg-transparent">Billing ID:</span>
              <span className="font-mono font-bold text-stone-900 bg-transparent">{orderId}</span>
            </div>
            <div className="flex justify-between bg-transparent">
              <span className="text-stone-400 bg-transparent">Delivery ETA:</span>
              <span className="font-semibold text-stone-900 bg-transparent">Tommorrow, priority 24h Express</span>
            </div>
            <div className="flex justify-between bg-transparent">
              <span className="text-stone-400 bg-transparent">Direct Dispatch tracking:</span>
              <span className="text-amber-700 bg-transparent hover:underline cursor-pointer">Live Satellite Maps Active</span>
            </div>
          </div>

          <div className="flex gap-3 text-xs font-semibold">
            <button
              id="print-invoice-btn"
              onClick={() => alert("Printing payment voucher or ledger statement...")}
              className="flex-1 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4 text-stone-400" />
              Print Invoice
            </button>
            <button
              id="return-to-tracking-dashboard"
              onClick={() => onNavigate("dashboard")}
              className="flex-1 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-850 text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              Check My Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
