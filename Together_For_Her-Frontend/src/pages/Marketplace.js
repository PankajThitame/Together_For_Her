import API_BASE_URL from "../apiConfig";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card, { CardBody } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { FaShoppingCart, FaStore, FaTag, FaBoxOpen, FaCheckCircle, FaShoppingBag } from "react-icons/fa";

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/admin/marketplace/all`);
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="flex flex-col gap-16 pb-20 animate-fadeIn text-slate-900 dark:text-white">
      {/* Premium Shop Header */}
      <div className="text-center space-y-6 relative py-12">
        <div className="inline-flex items-center gap-2 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.25em] border border-pink-100/50 dark:border-pink-900/30">
          The Essentials
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic leading-none">
          Hygiene <span className="text-pink-500">Boutique.</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-semibold text-lg md:text-xl leading-relaxed max-w-2xl mx-auto italic">
          "Curated with purpose. Every purchase fuels our mission to bring dignity to women in need."
        </p>
      </div>

      <div className="space-y-12">
        {/* Boutique Gallery */}
        <div className="w-full">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-16 h-16 border-[6px] border-pink-100 dark:border-pink-900/20 border-t-pink-500 rounded-full animate-spin mb-6" />
              <p className="text-slate-400 font-black text-xs uppercase tracking-widest italic">Curating best-of-class...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24 bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-[3.5rem] border border-pink-200/50 dark:border-slate-500/20">
              <FaStore className="text-5xl text-pink-200 mx-auto mb-6 opacity-30" />
              <p className="text-slate-400 font-black text-xs uppercase tracking-widest italic">Inventory currently in genesis...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((item, index) => (
                <div key={index} className="group bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-[3rem] border border-pink-200/50 dark:border-slate-500/20 overflow-hidden hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-square relative p-8 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                    />
                    <div className="absolute top-6 right-6 bg-white/90 dark:bg-slate-900/90 p-3 rounded-[3rem] shadow-lg">
                      <FaTag className="text-pink-600" size={14} />
                    </div>
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-black tracking-tight italic leading-tight">{item.productName}</h3>
                      <p className="text-pink-600 font-black text-xl italic leading-none">₹{item.price}</p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <FaBoxOpen className="text-pink-300" />
                        Stocked: {item.stock}
                      </div>
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 italic">
                        <FaCheckCircle className="text-rose-300" />
                        {item.availability}
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full h-14 bg-slate-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-pink-500 transition-all active:scale-95 shadow-xl"
                    >
                      Add to Collection
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* The Cart Summary Container */}
        <div className="w-full max-w-4xl mx-auto border-t border-slate-100 dark:border-slate-600/50 pt-16">
          <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl p-8 md:p-12 rounded-[3.5rem] border border-pink-200/50 dark:border-slate-500/20 shadow-2xl space-y-10">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-black italic tracking-tight">Your Collection Summary<span className="text-pink-500">.</span></h3>
              <div className="bg-pink-500 text-white text-[12px] font-black px-6 py-2 rounded-full uppercase tracking-widest">
                {cart.length} Products
              </div>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-16 bg-slate-50/50 dark:bg-slate-900/30 rounded-[3rem] space-y-4">
                <FaShoppingBag className="text-5xl text-slate-200 dark:text-slate-700 mx-auto" />
                <p className="text-xs text-slate-400 font-black uppercase tracking-[0.3em] italic">Your curations are pending...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-12 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800/50">
                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-pink-500/20 scrollbar-track-transparent">
                  {cart.map((item, index) => (
                    <div key={index} className="flex gap-6 items-center p-4 rounded-[3rem] hover:bg-white/40 dark:hover:bg-slate-900/40 transition-all">
                      <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-[3rem] p-3 shrink-0 shadow-lg">
                        <img src={item.imageUrl} alt="" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-black italic tracking-tight truncate">{item.productName}</h4>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-pink-600 font-black text-sm italic">₹{item.price}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest px-2 py-1 bg-slate-100 dark:bg-slate-900 rounded-[3rem]">Verified Item</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="md:pl-12 pt-8 md:pt-0 space-y-8 flex flex-col justify-center">
                  <div className="space-y-2">
                    <span className="text-[11px] font-black uppercase tracking-[0.25em] text-slate-400">Total Investment Amount</span>
                    <div className="text-5xl font-black italic tracking-tighter">₹{totalPrice}</div>
                  </div>

                  <div className="space-y-6">
                    <button className="w-full h-16 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-[1.8rem] font-black text-xs uppercase tracking-[0.25em] shadow-2xl shadow-pink-500/40 hover:scale-[1.02] transition-all transform active:scale-95 flex items-center justify-center gap-3">
                      <FaShoppingCart size={14} />
                      Finalise Your Order
                    </button>
                    <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 italic font-bold">
                      <FaCheckCircle className="text-rose-400" size={10} />
                      Secure checkout ensured by the Movement.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
