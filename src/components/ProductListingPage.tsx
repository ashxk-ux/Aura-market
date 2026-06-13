/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { 
  SlidersHorizontal, 
  Grid, 
  List, 
  Star, 
  ShoppingBag, 
  Heart, 
  X, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Search
} from "lucide-react";
import { PRODUCTS, CATEGORIES, Product } from "../data";

interface ProductListingPageProps {
  onNavigate: (view: string, productId?: string) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  initialCategoryFilter?: string | null;
  onResetCategoryFilter?: () => void;
  initialSearchQuery?: string;
  onResetSearchQuery?: () => void;
}

export default function ProductListingPage({
  onNavigate,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  initialCategoryFilter,
  onResetCategoryFilter,
  initialSearchQuery = "",
  onResetSearchQuery
}: ProductListingPageProps) {
  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryFilter || "all");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(1500);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("recommended");
  const [isListView, setIsListView] = useState<boolean>(false);
  const [localSearch, setLocalSearch] = useState<string>(initialSearchQuery);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Dynamic products parsing based on filters
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // 1. Category Filter
    if (selectedCategory !== "all") {
      result = result.filter(p => p.category === selectedCategory);
    } else if (initialCategoryFilter && initialCategoryFilter !== "all") {
      result = result.filter(p => p.category === initialCategoryFilter);
    }

    // 2. Search query matching name, brand, description
    const currentQuery = localSearch || initialSearchQuery;
    if (currentQuery.trim()) {
      const q = currentQuery.toLowerCase();
      result = result.filter(
        p => p.name.toLowerCase().includes(q) || 
             p.brand.toLowerCase().includes(q) || 
             p.description.toLowerCase().includes(q)
      );
    }

    // 3. Brands Selection
    if (selectedBrands.length > 0) {
      result = result.filter(p => {
        return selectedBrands.some(brandId => p.brand.toLowerCase().includes(brandId.toLowerCase()));
      });
    }

    // 4. Price Limit
    result = result.filter(p => p.price <= priceRange);

    // 5. Min Rating filter
    if (minRating !== null) {
      result = result.filter(p => p.rating >= minRating);
    }

    // 6. Sorting logic
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "reviews") {
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return result;
  }, [selectedCategory, selectedBrands, priceRange, minRating, sortBy, localSearch, initialSearchQuery, initialCategoryFilter]);

  // Pagination bounds (e.g., 6 items per page for gorgeous visual padding)
  const itemsPerPage = 8;
  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const toggleBrandFilter = (brandId: string) => {
    setSelectedBrands(prev => 
      prev.includes(brandId) 
        ? prev.filter(b => b !== brandId) 
        : [...prev, brandId]
    );
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedBrands([]);
    setPriceRange(1500);
    setMinRating(null);
    setSortBy("recommended");
    setLocalSearch("");
    if (onResetCategoryFilter) onResetCategoryFilter();
    if (onResetSearchQuery) onResetSearchQuery();
    setCurrentPage(1);
  };

  const brandsList = [
    { id: "aether", name: "Aether Labs" },
    { id: "apex", name: "Apex Sports" },
    { id: "lumina", name: "Lumina Home" },
    { id: "velvet", name: "Velvet Skin" },
    { id: "elemental", name: "Elemental Wear" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Search status summary header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div className="space-y-1">
          <h2 className="text-2xl font-serif font-semibold text-stone-950 tracking-tight">
            {selectedCategory === "all" ? "Explore Full Collection" : `${selectedCategory[0].toUpperCase() + selectedCategory.substring(1)} Designs`}
          </h2>
          <p className="text-xs text-stone-500">
            Showing <span className="font-semibold text-stone-900">{filteredProducts.length}</span> luxury articles ready for priority delivery
          </p>
        </div>

        {/* Search inside shop view */}
        <div className="flex items-center gap-3 w-full md:max-w-md">
          <div className="relative flex-1">
            <input
              id="shop-internal-search"
              type="text"
              placeholder="Search by keyword, brand..."
              value={localSearch || initialSearchQuery}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                if (onResetSearchQuery && e.target.value === "") {
                  onResetSearchQuery();
                }
                setCurrentPage(1);
              }}
              className="w-full px-3.5 py-2 pl-9 bg-white border border-stone-250 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-stone-900 transition-colors shadow-xs"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
          </div>

          <button
            id="reset-shop-filters"
            onClick={clearAllFilters}
            className="px-3.5 py-2 hover:bg-stone-100 rounded-xl border border-stone-200 text-stone-700 text-xs font-semibold shrink-0 transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* FILTERS SIDEBAR */}
        <div className="lg:col-span-1 border border-stone-200 rounded-2xl bg-white p-5 space-y-7 h-fit select-none">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs uppercase tracking-widest text-stone-905 flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-stone-500" />
              Advanced Filters
            </h3>
            <button 
              id="sidebar-clear-btn"
              onClick={clearAllFilters} 
              className="text-[10px] text-amber-700 font-bold hover:underline"
            >
              Clear All
            </button>
          </div>

          {/* Categories select list */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-stone-950">Active Collection</h4>
            <div className="space-y-1.5 flex flex-col">
              <button
                id="cat-all"
                onClick={() => { setSelectedCategory("all"); if (onResetCategoryFilter) onResetCategoryFilter(); setCurrentPage(1); }}
                className={`text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedCategory === "all" ? "bg-stone-900 text-white" : "hover:bg-stone-50 text-stone-600 hover:text-stone-950"}`}
              >
                All Departments
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  id={`cat-filter-btn-${cat.id}`}
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setCurrentPage(1); }}
                  className={`text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedCategory === cat.id ? "bg-stone-900 text-white" : "hover:bg-stone-50 text-stone-600 hover:text-stone-950"}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing slider */}
          <div className="space-y-3 pt-1">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-stone-950">
              <span>Upper Price Limit</span>
              <span className="font-mono bg-stone-100 px-2 py-0.5 rounded text-stone-700">${priceRange}</span>
            </div>
            <input
              id="price-range-slider"
              type="range"
              min="50"
              max="1500"
              step="25"
              value={priceRange}
              onChange={(e) => { setPriceRange(Number(e.target.value)); setCurrentPage(1); }}
              className="w-full accent-stone-900 bg-stone-150 h-1.5 rounded-full"
            />
            <div className="flex justify-between text-[9px] text-stone-400 font-semibold font-mono">
              <span>$50</span>
              <span>$1500</span>
            </div>
          </div>

          {/* Brand Checklist */}
          <div className="space-y-3 pt-1">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-stone-950">Licensed Vendors</h4>
            <div className="space-y-2">
              {brandsList.map((b) => (
                <label key={b.id} className="flex items-center gap-2 text-xs font-medium text-stone-650 cursor-pointer hover:text-stone-950">
                  <input
                    id={`brand-${b.id}`}
                    type="checkbox"
                    checked={selectedBrands.includes(b.id)}
                    onChange={() => toggleBrandFilter(b.id)}
                    className="rounded border-stone-300 accent-stone-900 text-stone-905 focus:ring-0 w-3.5 h-3.5"
                  />
                  <span>{b.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Minimum Rating checklist */}
          <div className="space-y-3 pt-1">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-stone-950">Elite Rating Standards</h4>
            <div className="space-y-1.5 flex flex-col">
              {[4.8, 4.6, 4.0].map((starVal) => (
                <button
                  id={`rating-filter-${starVal}`}
                  key={starVal}
                  onClick={() => { setMinRating(minRating === starVal ? null : starVal); setCurrentPage(1); }}
                  className={`text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between border transition-all ${minRating === starVal ? "bg-amber-500/10 border-amber-500/40 text-amber-800 font-bold" : "border-stone-100 hover:border-stone-200 text-stone-600 hover:text-stone-950"}`}
                >
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 shrink-0" />
                    {starVal} Stars & above
                  </span>
                  <span className="text-[10px] text-stone-400 font-normal">Min</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* LISTINGS & CONTROLS */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Sorting and Grid controls row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border border-stone-200 bg-white rounded-2xl select-none text-xs">
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-stone-400 font-medium">Sort by:</span>
              <select
                id="sorting-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-stone-900 font-semibold focus:outline-none border-b border-dashed border-stone-400 cursor-pointer pr-1"
              >
                <option value="recommended">Best Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Vitals Rating</option>
                <option value="reviews">Curator Review Volumes</option>
              </select>
            </div>

            {/* Layout view toggle */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden shrink-0 bg-stone-50">
                <button
                  id="view-grid"
                  onClick={() => setIsListView(false)}
                  className={`p-2 transition-colors ${!isListView ? "bg-stone-900 text-white" : "text-stone-400 hover:text-stone-700"}`}
                  title="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  id="view-list"
                  onClick={() => setIsListView(true)}
                  className={`p-2 transition-colors ${isListView ? "bg-stone-900 text-white" : "text-stone-400 hover:text-stone-700"}`}
                  title="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Product Items Render area */}
          {paginatedProducts.length === 0 ? (
            <div className="p-12 border border-stone-150 border-dashed rounded-2xl text-center space-y-4 bg-white">
              <span className="text-4xl">🔍</span>
              <h3 className="font-serif font-semibold text-lg text-stone-900">No Matching Articles Found</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto font-normal leading-relaxed">
                Adjust your price range, change brand flags, or clear search queries to discover related elite products.
              </p>
              <button
                id="no-results-clear"
                onClick={clearAllFilters}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold shadow-md inline-block"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className={isListView ? "space-y-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"}>
              {paginatedProducts.map((prod) => {
                const isWishlisted = wishlistIds.includes(prod.id);

                if (isListView) {
                  return (
                    <div 
                      key={prod.id}
                      className="bg-white border border-stone-200 rounded-2xl p-4 flex gap-5 hover:shadow-md transition-all group relative"
                    >
                      {/* Left Image column */}
                      <div 
                        onClick={() => onNavigate("detail", prod.id)}
                        className="w-36 h-36 rounded-xl bg-stone-50 shrink-0 overflow-hidden relative cursor-pointer"
                      >
                        <img 
                          src={prod.images[0]} 
                          alt={prod.name} 
                          className="w-full h-full object-cover rounded-lg group-hover:scale-103 transition-transform" 
                        />
                      </div>

                      {/* Right metadata Column */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between select-none">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] text-stone-400 font-semibold uppercase tracking-wider font-sans">
                            <span>{prod.brand}</span>
                            <span className="flex items-center gap-0.5 text-stone-700">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              {prod.rating}
                            </span>
                          </div>
                          
                          <h3 
                            onClick={() => onNavigate("detail", prod.id)}
                            className="font-semibold text-stone-900 text-sm sm:text-base cursor-pointer hover:text-amber-600 select-text"
                          >
                            {prod.name}
                          </h3>

                          <p className="text-[11px] text-stone-500 leading-normal line-clamp-2 select-text">{prod.description}</p>
                        </div>

                        {/* Buying trigger row */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-baseline gap-2">
                            <span className="font-bold text-stone-950 text-base">${prod.price}</span>
                            {prod.originalPrice && (
                              <span className="text-xs text-stone-400 line-through font-medium">${prod.originalPrice}</span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              id={`wishlist-btn-list-${prod.id}`}
                              onClick={() => onToggleWishlist(prod)}
                              className={`p-2 border rounded-xl hover:bg-stone-50 transition-colors ${isWishlisted ? "bg-red-50 text-red-500 border-red-100" : "bg-white text-stone-400"}`}
                              title="Wishlist"
                            >
                              <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500" : ""}`} />
                            </button>

                            <button
                              id={`cart-add-btn-list-${prod.id}`}
                              onClick={() => onAddToCart(prod)}
                              className="px-3.5 py-1.5 bg-stone-900 text-white hover:bg-stone-800 text-xs font-semibold rounded-xl flex items-center gap-1 shadow-xs transition-colors"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              Add To Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                // Grid View Card design (default look)
                return (
                  <div 
                    key={prod.id}
                    className="bg-white border border-stone-200/80 rounded-2xl p-4 flex flex-col justify-between hover:shadow-lg hover:border-amber-500/20 transition-all relative group select-none"
                  >
                    <button 
                      id={`wishlist-btn-grid-${prod.id}`}
                      onClick={() => onToggleWishlist(prod)}
                      className={`absolute top-6 right-6 z-10 p-2 rounded-full border border-stone-150 shadow-xs hover:scale-105 transition-all text-stone-500 ${isWishlisted ? "bg-red-50 text-red-500 border-red-100" : "bg-white hover:bg-stone-50"}`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-red-500" : ""}`} />
                    </button>

                    <div 
                      onClick={() => onNavigate("detail", prod.id)}
                      className="aspect-square w-full rounded-xl bg-stone-50 overflow-hidden relative cursor-pointer"
                    >
                      <img 
                        src={prod.images[0]} 
                        alt={prod.name} 
                        className="w-full h-full object-cover rounded-lg group-hover:scale-[1.03] transition-transform duration-550" 
                      />
                    </div>

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

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-baseline gap-2">
                          <span className="font-bold text-stone-950 text-sm sm:text-base">${prod.price}</span>
                          {prod.originalPrice && (
                            <span className="text-[10px] text-stone-400 line-through font-medium">${prod.originalPrice}</span>
                          )}
                        </div>

                        <button
                          id={`cart-add-btn-grid-${prod.id}`}
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
          )}

          {/* PAGINATION PANEL */}
          {pageCount > 1 && (
            <div className="flex items-center justify-between border-t border-stone-200 pt-6 mt-4 select-none">
              <button
                id="btn-prev-page"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold transition-all ${currentPage === 1 ? "text-stone-300 bg-stone-50 cursor-not-allowed" : "text-stone-700 bg-white hover:bg-stone-100"}`}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Page
              </button>

              <div className="flex items-center gap-1.5">
                {[...Array(pageCount)].map((_, i) => (
                  <button
                    id={`page-btn-${i + 1}`}
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-xl text-xs font-semibold rounded-lg flex items-center justify-center transition-all ${currentPage === i + 1 ? "bg-stone-950 text-white" : "border border-stone-200 hover:bg-stone-50 text-stone-700"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                id="btn-next-page"
                disabled={currentPage === pageCount}
                onClick={() => setCurrentPage(prev => Math.min(pageCount, prev + 1))}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold transition-all ${currentPage === pageCount ? "text-stone-300 bg-stone-50 cursor-not-allowed" : "text-stone-700 bg-white hover:bg-stone-100"}`}
              >
                Next Page
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
