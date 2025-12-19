import { motion } from 'motion/react';
import { ChevronLeft, Coins, Check, Star } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useState } from 'react';

interface ProductDetailProps {
  navigateTo: (screen: string) => void;
  userTokens: number;
  setUserTokens: (tokens: number) => void;
  selectedProduct: any;
}

export default function ProductDetail({ navigateTo, userTokens, setUserTokens, selectedProduct }: ProductDetailProps) {
  const [purchased, setPurchased] = useState(false);

  const product = selectedProduct || {
    id: 1,
    name: 'Premium Notebook Set',
    price: 500,
    image: 'notebook stationery',
    description: 'High-quality notebook set perfect for your studies. Includes 3 premium notebooks with different ruling styles.',
    features: ['Premium paper quality', 'Durable binding', '3 different styles', 'Eco-friendly materials'],
    rating: 4.8,
    reviews: 124,
  };

  const canAfford = userTokens >= product.price;

  const handlePurchase = () => {
    if (canAfford) {
      setUserTokens(userTokens - product.price);
      setPurchased(true);
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-y-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 px-6 py-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigateTo('store')}>
            <ChevronLeft className="w-6 h-6 text-slate-400" />
          </button>
          <h1 className="text-xl text-white" style={{ fontWeight: 700 }}>Product Details</h1>
        </div>
      </div>

      {/* Product Image */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative h-80 bg-gradient-to-br from-slate-800 to-slate-700"
      >
        <ImageWithFallback
          src={`https://source.unsplash.com/800x800/?${product.image}`}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Product Info */}
      <div className="px-6 py-6">
        {/* Title & Price */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-2xl text-white flex-1" style={{ fontWeight: 700 }}>
              {product.name}
            </h2>
            <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2 rounded-full">
              <Coins className="w-5 h-5 text-white" />
              <span className="text-white text-lg" style={{ fontWeight: 700 }}>{product.price}</span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-slate-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-slate-400 text-sm">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h3 className="text-white mb-2" style={{ fontWeight: 700 }}>Description</h3>
          <p className="text-slate-300 leading-relaxed">{product.description}</p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h3 className="text-white mb-3" style={{ fontWeight: 700 }}>Features</h3>
          <div className="space-y-2">
            {product.features.map((feature: string, index: number) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-slate-300">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Purchase Success */}
        {purchased && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-500/30 rounded-2xl p-6 mb-6 text-center"
          >
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl text-white mb-2" style={{ fontWeight: 700 }}>Purchase Successful!</h3>
            <p className="text-green-400">Your order will be delivered soon</p>
          </motion.div>
        )}

        {/* Purchase Button */}
        {!purchased && (
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileTap={canAfford ? { scale: 0.98 } : {}}
            onClick={handlePurchase}
            disabled={!canAfford}
            className={`w-full py-4 rounded-2xl transition-all ${
              canAfford
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30'
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span className="text-lg" style={{ fontWeight: 600 }}>
              {canAfford ? 'Purchase with Tokens' : 'Not Enough Tokens'}
            </span>
          </motion.button>
        )}

        {!canAfford && !purchased && (
          <p className="text-center text-slate-400 mt-3">
            You need {product.price - userTokens} more tokens
          </p>
        )}
      </div>
    </div>
  );
}
