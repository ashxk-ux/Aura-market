/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  description: string;
  features: string[];
  specs: { [key: string]: string };
  variants?: {
    colors?: { name: string; hex: string }[];
    sizes?: string[];
    capacities?: string[];
  };
  isFlashSale?: boolean;
  flashSalePrice?: number;
  isTrending?: boolean;
  isNewArrival?: boolean;
}

export const CATEGORIES = [
  { id: "electronics", name: "Electronics", icon: "Laptop" },
  { id: "fashion", name: "Fashion", icon: "Shirt" },
  { id: "home-living", name: "Home & Living", icon: "Home" },
  { id: "beauty", name: "Beauty & Wellness", icon: "Sparkles" },
  { id: "sports-fitness", name: "Sports", icon: "Activity" },
  { id: "books", name: "Books", icon: "BookOpen" },
  { id: "gaming", name: "Gaming", icon: "Gamepad2" },
];

export const BRANDS = [
  { id: "aether", name: "Aether Labs", logo: "⚡" },
  { id: "lumina", name: "Lumina Home", logo: "💡" },
  { id: "velvet", name: "Velvet Skin", logo: "🌸" },
  { id: "apex", name: "Apex Sports", logo: "👟" },
  { id: "chrono", name: "Chrono Luxury", logo: "⏳" },
  { id: "elemental", name: "Elemental Wear", logo: "🌿" },
];

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Aether SoundScan Max ANC Headphones",
    category: "electronics",
    brand: "⚡ Aether Labs",
    price: 349,
    originalPrice: 399,
    rating: 4.8,
    reviewsCount: 1420,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Experience absolute acoustic silence and master-grade sound purity. Powered by advanced hybrid active noise cancellation, customized titanium drivers, and up to 60 hours of wireless listening. Engineered for perfectionists.",
    features: [
      "Adaptive Hybrid Active Noise Cancelling up to -45dB",
      "High-Resolution Custom 40mm Dynamic Drivers",
      "Spatially-tuned audio with dynamic head-tracking",
      "Ultra-soft computational memory foam ear cushions",
      "60-Hour Long Battery with USB-C Instant Charge"
    ],
    specs: {
      "Driver Size": "40 mm Custom Dynamic",
      "Frequency Response": "4Hz - 40,000Hz",
      "Connectivity": "Bluetooth 5.3 & Ultra-Low Latency 2.4GHz",
      "Acoustic Depth": "45dB Maximum Suppression",
      "Weight": "250g",
      "Microphones": "8 Beamforming Array"
    },
    variants: {
      colors: [
        { name: "Obsidian Black", hex: "#1c1917" },
        { name: "Alabaster Silver", hex: "#e7e5e4" },
        { name: "Slate Teal", hex: "#115e59" }
      ]
    },
    isTrending: true,
    isFlashSale: true,
    flashSalePrice: 299
  },
  {
    id: "prod-2",
    name: "Aether ChronoSlate Active Smartwatch",
    category: "electronics",
    brand: "⚡ Aether Labs",
    price: 249,
    originalPrice: 299,
    rating: 4.6,
    reviewsCount: 812,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80"
    ],
    description: "An incredibly sleek, aerospace-grade aluminum smart timepiece optimized for deep athletic telemetry, modern heart diagnostics, and seamless day-to-day productivity.",
    features: [
      "Always-On Retina AMOLED Crystal Glass Screen",
      "All-day heart rate velocity and oxygen saturation indicators",
      "Precision dual-band GPS layout with global mapping",
      "10-Day premium battery with optimized power scheduling",
      "Waterproof chassis rating up to 50 Meters (5 ATM)"
    ],
    specs: {
      "Display Glass": "Retina AMOLED 410x502 resolution",
      "Chassis Material": "Aerospace-grade Aluminum Alloy",
      "Cell Life": "Up to 10 days in standard mode",
      "Sensors": "BioTracker 4.0 PPG, Multiaxial Compass, Altimeter",
      "Compatibility": "iOS & Android Companion Suites"
    },
    variants: {
      colors: [
        { name: "Space Grey", hex: "#4b5563" },
        { name: "Nordic Gold", hex: "#d97706" },
        { name: "Chalk", hex: "#f3f4f6" }
      ]
    },
    isTrending: true
  },
  {
    id: "prod-3",
    name: "Elemental Woolen Trench Coat",
    category: "fashion",
    brand: "🌿 Elemental Wear",
    price: 189,
    originalPrice: 249,
    rating: 4.9,
    reviewsCount: 520,
    images: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80"
    ],
    description: "An elegant slim-fit winter duster coat detailed in naturally temperature-regulated Italian merino virgin wool. Built to provide structural luxury and clean minimalist layering options.",
    features: [
      "100% certified fine merino structural virgin wool",
      "Engineered satin-silk internal frictionless lining",
      "Double-beveled tailored dynamic lapel collars",
      "Internal document storage safe-pockets",
      "Eco-harvested genuine horn premium details"
    ],
    specs: {
      "Composition": "90% Italian Virgin Wool, 10% Cashmere blend",
      "Weave Style": "Heavy diagonal dense twill",
      "Tailoring Fit": "Modern slim relaxed standard length",
      "Dry Care": "Strictly dry clean recommendations"
    },
    variants: {
      colors: [
        { name: "Camel", hex: "#b45309" },
        { name: "Classic Navy", hex: "#1e3a8a" },
        { name: "Charcoal Slate", hex: "#374151" }
      ],
      sizes: ["S", "M", "L", "XL"]
    },
    isTrending: true,
    isFlashSale: false
  },
  {
    id: "prod-4",
    name: "AeroSprint Suede White Sneakers",
    category: "fashion",
    brand: "👟 Apex Sports",
    price: 119,
    originalPrice: 159,
    rating: 4.7,
    reviewsCount: 345,
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Minimalist fashion performance shoes handmade using low-impact full-grain calf suede. Engineered with proprietary cloud foam impact absorbing rubber outsoles for endless city walking.",
    features: [
      "Selected buttery Italian full-grain calf suede",
      "Comfort-tuned micro-perforated aeration toe vents",
      "Supportive natural vegetable-dyed cork footbeds",
      "Hardwearing vulcanized anti-slip rubber traction caps"
    ],
    specs: {
      "Outer Details": "Italian Calf Suede",
      "Lining Base": "Soft natural cotton weave jersey",
      "Outsole Ring": "CloudFoam lightweight vulcanized rubber",
      "Sole Thickness": "28 mm heel platform offset"
    },
    variants: {
      sizes: ["US 8", "US 9", "US 10", "US 11"]
    },
    isNewArrival: true,
    isFlashSale: true,
    flashSalePrice: 95
  },
  {
    id: "prod-5",
    name: "Lumina ErgoPro Mesh Task Chair",
    category: "home-living",
    brand: "💡 Lumina Home",
    price: 499,
    originalPrice: 599,
    rating: 4.8,
    reviewsCount: 928,
    images: [
      "https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A signature piece of workspace health engineering, detailed to follow the spinal curve under dynamic weights. Combines premium elastomeric mesh ventilation with intuitive multi-angle shifts.",
    features: [
      "Adaptive self-weight responsive tilt control tensioning",
      "Highly breathable tensioned pixel elastomeric weave mesh",
      "Fully 4-Dimensional adjustable comfortable armrests",
      "Dynamic adaptive lumbar counter-support pillow core",
      "Reinforced mirror aluminum alloy load base"
    ],
    specs: {
      "Back Type": "High elastomeric flexible mesh suspension",
      "Cylinder Level": "Heavy class-4 commercial pneumatic lift",
      "Maximum Load": "300 lbs capacity threshold",
      "Caster Type": "Premium 65mm smooth polyurethane wheels"
    },
    variants: {
      colors: [
        { name: "Mineral Slate", hex: "#1e293b" },
        { name: "Polar Ice Light", hex: "#cbd5e1" }
      ]
    },
    isTrending: true
  },
  {
    id: "prod-6",
    name: "Artisan Ceramic Coffee Set",
    category: "home-living",
    brand: "💡 Lumina Home",
    price: 79,
    originalPrice: 99,
    rating: 4.9,
    reviewsCount: 228,
    images: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80"
    ],
    description: "An elegant, handmade pour-over ceramic carafe and twin insulated mug set. Finished with high-temperature volcanic basalt glaze that keeps cold and hot beverages optimally tempered.",
    features: [
      "Crafted individually from natural volcanic stoneware clays",
      "Dual-layered insulation wall details in mugs",
      "Optimal flow extraction beveled dripper ribs",
      "Oven, Microwave, and Dishwasher secure glaze integrity"
    ],
    specs: {
      "Clay Type": "Double-fired dense stoneware",
      "Capacity Rings": "Carafe 600ml / Cups 250ml each",
      "Glaze Safe": "Lead-free, certified food-grade minerals"
    },
    isNewArrival: true
  },
  {
    id: "prod-7",
    name: "Velvet Botanical Gold Restorative Serum",
    category: "beauty",
    brand: "🌸 Velvet Skin",
    price: 85,
    originalPrice: 110,
    rating: 4.7,
    reviewsCount: 412,
    images: [
      "https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Unlock natural luminous glass transparency. Crafted with high-fraction microencapsulated squalane, active wild orchid calluses, and 24K real gold dust suspensions.",
    features: [
      "Gold elements help accelerate cellular collagen revival",
      "Rich wild cold-pressed squalane binds hydration deeply",
      "Restores firmness elasticity parameters overnight",
      "100% Fragrance-free and vegan dermatological blend"
    ],
    specs: {
      "Volume Sizes": "50 mL (1.7 FL. OZ)",
      "Target Areas": "Dryness, Fine creases, Skin tone alignment",
      "Ph Balance": "Optimal 5.5 dermis balancing suite"
    },
    isTrending: false,
    isFlashSale: true,
    flashSalePrice: 68
  },
  {
    id: "prod-8",
    name: "Apex AeroFrame 24-Speed Gravel Bike",
    category: "sports-fitness",
    brand: "👟 Apex Sports",
    price: 1299,
    originalPrice: 1499,
    rating: 4.9,
    reviewsCount: 154,
    images: [
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Build speeds on roads or grit trails. A composite hybrid frame structured with extreme-light carbon composites, dual disc mechanical pressure brakes, and responsive Shimano drivetrain layout.",
    features: [
      "Carbon composite lightweight monocoque design structure",
      "Multi-terrain responsive drop-bar grip layouts",
      "Shimano GRX 24-speed custom gear configuration",
      "High-impact anti-puncture tubeless gravel tires"
    ],
    specs: {
      "Chassis Structural": "Apex T800 Carbon Monocoque Core",
      "Groupset Core": "Shimano GRX 810 Gravel Spec",
      "Total Weight": "8.4 kg elite weight profile",
      "Braking Setup": "Premium hydraulic dynamic mineral oil discs"
    },
    variants: {
      sizes: ["52cm", "54cm", "56cm"]
    },
    isNewArrival: true
  },
  {
    id: "prod-9",
    name: "Aether ProMechanical RGB Keyboard",
    category: "gaming",
    brand: "⚡ Aether Labs",
    price: 159,
    originalPrice: 199,
    rating: 4.8,
    reviewsCount: 618,
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80"
    ],
    description: "An absolute masterclass in tactical response. Crafted with pre-lubricated warm-linear switches, solid aluminum top framing, and dense structural poly-insulators that make every downstroke sound deeply premium.",
    features: [
      "Custom pre-lubricated SoundScan linear mechanical switches",
      "Gasket mounted chassis structure with triple foam absorption",
      "Durable double-shot PBT tactile textured cherry keycaps",
      "Wireless tri-mode: Bluetooth, Ultra Wireless, Type-C wired"
    ],
    specs: {
      "Layout Set": "Compact 75% Space Optimizing design",
      "Plate Frame": "CNC bead-blasted dynamic aluminum alloy",
      "Switch Life": "100 Million keystroke rated components"
    },
    variants: {
      colors: [
        { name: "Cosmic Charcoal", hex: "#1e293b" },
        { name: "Mercury Silver", hex: "#f1f5f9" }
      ]
    },
    isTrending: true,
    isFlashSale: true,
    flashSalePrice: 139
  }
];

export const TESTIMONIALS = [
  {
    id: "t-1",
    name: "Helena Rostova",
    role: "Verified Elite Buyer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment: "The shopping experience is completely in a class of its own. Shipping on the Aether SoundScan headphones took less than 24 hours. The interface is stunningly premium, transparent, and easy to navigate.",
    date: "2 days ago"
  },
  {
    id: "t-2",
    name: "Devon Carter",
    role: "Technical Designer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment: "I was highly skeptical of AI-driven recommendations, but Aura's AI Search Assistant pinpointed the exact style of merino coat and Apex white sneakers I needed for my design exhibition. Pure magic.",
    date: "1 week ago"
  },
  {
    id: "t-3",
    name: "Yuki Tanaka",
    role: "Collector & Creator",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment: "The multi-step checkout with instant address verification runs beautifully. Customer support responded in under a minute when I wanted to change the color of my dual mesh office task chair. Recommended!",
    date: "3 days ago"
  }
];

export const COUPONS = [
  { code: "AURA20", discount: 0.20, desc: "20% Exclusive Launch Discount" },
  { code: "SUPERDEAL", discount: 50, isFixed: true, desc: "$50 Flat Reduction" },
  { code: "PREMIUM10", discount: 0.10, desc: "10% Premium Member Bonus" }
];
