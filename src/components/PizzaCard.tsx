import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Info } from 'lucide-react';
import { type Pizza } from '../data';

interface Props {
  pizza: Pizza;
  externalCount: number;
  onChange: (val: number) => void;
}

export const PizzaCard: React.FC<Props> = ({ pizza, externalCount, onChange }) => {
  const [showNutri, setShowNutri] = useState(false);

  return (
    <div className="bg-white rounded-[40px] p-6 shadow-xl relative overflow-hidden group border border-slate-100">
      {/* Nutrition Button */}
      <button 
        onClick={() => setShowNutri(!showNutri)}
        className="absolute top-6 right-6 z-10 p-2 bg-slate-100 text-slate-500 rounded-full hover:bg-[#FF6B35] hover:text-white transition-colors"
      >
        <Info size={18} />
      </button>

      {/* Pizza Image with "Roll-in" animation */}
      <div className="flex justify-center mb-6">
        <motion.img 
          initial={{ x: -100, rotate: -180, opacity: 0 }}
          whileInView={{ x: 0, rotate: 0, opacity: 1 }}
          viewport={{ once: true }}
          animate={{ rotate: externalCount > 0 ? 12 : 0 }}
          src={pizza.image} 
          className="w-44 h-44 object-contain drop-shadow-2xl transition-transform"
          alt={pizza.name}
        />
      </div>

      {/* Nutrition Overlay */}
      <AnimatePresence>
        {showNutri && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#0F172A]/90 backdrop-blur-md text-white p-8 flex flex-col justify-center items-center z-20 text-center"
          >
            <h3 className="font-bold text-xl mb-4 text-[#FF6B35]">Nutritional Facts</h3>
            <p className="mb-1 font-medium">Calories: {pizza.calories}</p>
            <p className="mb-1 font-medium">Protein: {pizza.protein}</p>
            <button 
              onClick={() => setShowNutri(false)} 
              className="mt-6 text-sm bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-black text-[#0F172A] italic">{pizza.name}</h2>
          <span className="text-[#FF6B35] font-bold text-xl">${pizza.price}</span>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">{pizza.description}</p>
      </div>

      {/* Cart Interaction */}
      <div className="h-14 relative">
        <AnimatePresence mode="wait">
          {externalCount === 0 ? (
            <motion.button
              key="add" 
              layoutId={`btn-${pizza.id}`}
              onClick={() => onChange(1)}
              className="w-full h-full bg-[#FF6B35] text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-100"
              whileTap={{ scale: 0.98 }}
            >
              <Plus size={20} /> Add to Cart
            </motion.button>
          ) : (
            <motion.div
              key="count" 
              layoutId={`btn-${pizza.id}`}
              className="w-full h-full bg-[#0F172A] rounded-2xl flex items-center justify-between px-4 shadow-lg shadow-slate-200"
            >
              <button 
                onClick={() => onChange(externalCount - 1)} 
                className="text-white hover:bg-white/10 p-2 rounded-xl transition-colors"
              >
                <Minus size={20}/>
              </button>
              
              <motion.span 
                key={externalCount}
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-white font-bold text-xl"
              >
                {externalCount}
              </motion.span>

              <button 
                onClick={() => onChange(externalCount + 1)} 
                className="text-[#FF6B35] hover:bg-white/10 p-2 rounded-xl transition-colors"
              >
                <Plus size={20}/>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};