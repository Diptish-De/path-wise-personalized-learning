import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Coins, BookOpen, Pen, Laptop, Gift } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface StoreHomeProps {
  navigateTo: (screen: string) => void;
  userTokens: number;
  setSelectedProduct: (product: any) => void;
}

const categories = [
  { id: 'all', label: 'All', icon: Gift },
  { id: 'books', label: 'Books', icon: BookOpen },
  { id: 'stationery', label: 'Stationery', icon: Pen },
  { id: 'digital', label: 'Digital', icon: Laptop },
];

const products = [
  { id: 1, name: 'Premium Notebook Set', price: 500, category: 'stationery', image: 'notebook stationery' },
  { id: 2, name: 'Mathematics Guide', price: 800, category: 'books', image: 'mathematics textbook' },
  { id: 3, name: 'Digital Course Access', price: 1200, category: 'digital', image: 'online course laptop' },
  { id: 4, name: 'Pen & Pencil Set', price: 300, category: 'stationery', image: 'pen pencil set' },
  { id: 5, name: 'Science Encyclopedia', price: 1000, category: 'books', image: 'science encyclopedia book' },
  { id: 6, name: 'Study Planner', price: 400, category: 'stationery', image: 'study planner journal' },
];

export default function StoreHome({ navigateTo, userTokens, setSelectedProduct }: StoreHomeProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-y-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl text-white" style={{ fontWeight: 700 }}>Rewards Store</h1>
            <p className="text-slate-400 text-sm">Redeem your tokens</p>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2 rounded-full">
            <Coins className="w-5 h-5 text-white" />
            <span className="text-white" style={{ fontWeight: 700 }}>{userTokens}</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-slate-800 text-white pl-12 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 py-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;

            return (
              <motion.button
                key={category.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl flex-shrink-0 transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span style={{ fontWeight: 600 }}>{category.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-6 pb-8">
        <div className="grid grid-cols-2 gap-4">
          {products.map((product, index) => {
            const canAfford = userTokens >= product.price;

            return (
              <motion.button
                key={product.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedProduct(product);
                  navigateTo('product-detail');
                }}
                className="bg-slate-800 rounded-2xl overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
                  <ImageWithFallback
                    src={`https://source.unsplash.com/400x400/?${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {!canAfford && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white text-sm" style={{ fontWeight: 600 }}>Not Enough Tokens</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <h3 className="text-white text-sm mb-2 line-clamp-2" style={{ fontWeight: 600 }}>
                    {product.name}
                  </h3>
                  <div
                    className={`flex items-center gap-1 ${
                      canAfford ? 'text-yellow-400' : 'text-slate-500'
                    }`}
                  >
                    <Coins className="w-4 h-4" />
                    <span style={{ fontWeight: 700 }}>{product.price}</span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
