/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import ProductListingPage from "./components/ProductListingPage";
import ProductDetailPage from "./components/ProductDetailPage";
import CartPage, { CartItem } from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import AIChatModal from "./components/AIChatModal";
import { PRODUCTS, Product } from "./data";

export default function App() {
  // Navigation states: 'landing' | 'shop' | 'detail' | 'cart' | 'checkout' | 'dashboard' | 'admin'
  const [currentView, setCurrentView] = useState<string>("landing");
  const [activeProductId, setActiveProductId] = useState<string>("watch-v1");

  // Dynamic products list (synced with admin creations/deletions!)
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);

  // Cart & Wishlist state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Promo coupon
  const [appliedCoupon, setAppliedCoupon] = useState<any | null>(null);

  // Completed Orders list (for dashboards tracking!)
  const [orderHistory, setOrderHistory] = useState<any[]>([
    {
      id: "AU-92801",
      date: "Jun 12, 2026",
      items: [
        {
          id: "coat-m1",
          name: "Structured Melton Double-Breasted Trench Overcoat",
          price: 520,
          quantity: 1,
          color: "Slate Charcoal",
          size: "L",
          image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80"
        }
      ],
      total: 561.00,
      shippingAddress: "14 Kingsway Mansion Road, London, W2 1LA, United Kingdom",
      status: "Completed"
    }
  ]);

  // Shared Global search and department filter sync
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // Assistant chatbot overlay modal state
  const [isAIChatOpen, setIsAIChatOpen] = useState<boolean>(false);

  // Ensure scroll transitions gracefully to the top on page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentView, activeProductId]);

  const handleNavigate = (view: string, productId?: string) => {
    setCurrentView(view);
    if (productId) {
      setActiveProductId(productId);
    }
  };

  // CART LOGIC
  const handleAddToCart = (product: Product, quantity: number = 1, options?: any) => {
    setCart((prev) => {
      // Form structural unique identity based on selected variants
      const matchingIndex = prev.findIndex(
        (item) => 
          item.product.id === product.id && 
          item.selectedColor === (options?.color || "") && 
          item.selectedSize === (options?.size || "")
      );

      if (matchingIndex > -1) {
        const nextCart = [...prev];
        nextCart[matchingIndex].quantity += quantity;
        return nextCart;
      }

      return [
        ...prev,
        {
          product,
          quantity,
          selectedColor: options?.color || "",
          selectedSize: options?.size || ""
        }
      ];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number, options?: any) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId, options);
      return;
    }
    setCart((prev) => 
      prev.map((item) => 
        (item.product.id === productId && 
         item.selectedColor === (options?.color || "") && 
         item.selectedSize === (options?.size || "")) 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string, options?: any) => {
    setCart((prev) => 
      prev.filter(
        (item) => 
          !(item.product.id === productId && 
            item.selectedColor === (options?.color || "") && 
            item.selectedSize === (options?.size || ""))
      )
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // WISHLIST LOGIC
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleRemoveFromWishlist = (product: Product) => {
    setWishlist((prev) => prev.filter((p) => p.id !== product.id));
  };

  // INVENTORY EXPANSIONS & DELETIONS
  const handleAddProduct = (newProd: Product) => {
    setProductsList((prev) => [newProd, ...prev]);
  };

  const handleDeleteProduct = (productId: string) => {
    setProductsList((prev) => prev.filter((p) => p.id !== productId));
  };

  // ORDER LOGISTICS ACTIONS FOR ADMINS
  const handleUpdateOrderStatus = (orderId: string, status: string) => {
    setOrderHistory((prev) => 
      prev.map((order) => order.id === orderId ? { ...order, status } : order)
    );
  };

  const handleAddOrderToHistory = (newOrder: any) => {
    setOrderHistory((prev) => [newOrder, ...prev]);
  };

  // HEADER SEARCH ACTION TRIGGERS
  const handleSearchCommit = (query: string) => {
    setSearchQuery(query);
    setCategoryFilter(null);
    setCurrentView("shop");
  };

  const handleCategorySelect = (categoryId: string) => {
    setCategoryFilter(categoryId);
    setSearchQuery("");
    setCurrentView("shop");
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans select-none antialiased">
      
      {/* Upper Navigation Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onSearch={handleSearchCommit}
        onCategorySelect={handleCategorySelect}
        onOpenAIChat={() => setIsAIChatOpen(true)}
      />

      {/* Primary Section Renders */}
      <main className="flex-1">
        {currentView === "landing" && (
          <LandingPage
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlist.map(p => p.id)}
            onOpenAIChat={() => setIsAIChatOpen(true)}
            onCategorySelect={handleCategorySelect}
          />
        )}

        {currentView === "shop" && (
          <ProductListingPage
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlist.map(p => p.id)}
            initialCategoryFilter={categoryFilter}
            onResetCategoryFilter={() => { setCategoryFilter(null); }}
            initialSearchQuery={searchQuery}
            onResetSearchQuery={() => setSearchQuery("")}
          />
        )}

        {currentView === "detail" && (
          <ProductDetailPage
            productId={activeProductId}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlist.map(p => p.id)}
            onOpenAIChat={() => setIsAIChatOpen(true)}
          />
        )}

        {currentView === "cart" && (
          <CartPage
            cartItems={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onNavigate={handleNavigate}
            appliedCoupon={appliedCoupon}
            onApplyCoupon={setAppliedCoupon}
          />
        )}

        {currentView === "checkout" && (
          <CheckoutPage
            cartItems={cart}
            appliedCoupon={appliedCoupon}
            onClearCart={handleClearCart}
            onAddOrderToHistory={handleAddOrderToHistory}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === "dashboard" && (
          <UserDashboard
            orderHistory={orderHistory}
            wishlistProducts={wishlist}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === "admin" && (
          <AdminDashboard
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            productsList={productsList}
            orderHistoryList={orderHistory}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        )}
      </main>

      {/* Styled Assistant Chatbot Modal */}
      <AIChatModal
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        onAddToCart={(p) => handleAddToCart(p, 1)}
        onViewProduct={(id) => handleNavigate("detail", id)}
      />

    </div>
  );
}
