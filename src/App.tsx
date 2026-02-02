import { useState } from 'react';
import { PIZZAS } from './data';
import { PizzaCard } from './components/PizzaCard';
import { ShoppingBag, X, QrCode, Banknote, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  // --- States ---
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'UPI'>('CASH');
  const [isRolling, setIsRolling] = useState(false);
  const [orderFinished, setOrderFinished] = useState(false);

  // --- Calculations ---
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalPrice = PIZZAS.reduce((sum, p) => sum + (cart[p.id] || 0) * p.price, 0);

  // --- Functions ---
  const handlePlaceOrder = () => {
    setIsRolling(true); // Show orange rolling screen
    
    setTimeout(() => {
      setIsRolling(false); // Hide rolling screen
      setOrderFinished(true); // Show success screen
    }, 2000);
  };

  const resetApp = () => {
    setOrderFinished(false);
    setCart({});
    setCheckoutOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-[#0F172A] pb-24 font-sans">
      
      {/* 1. HEADER */}
      <header className="py-16 text-center">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }} 
          className="inline-block mb-4"
        >
          <img src="/veggie.png" className="w-16 h-16 rounded-full border-2 border-[#FF6B35] shadow-lg" alt="logo" />
        </motion.div>
        <h1 className="text-6xl font-black italic tracking-tighter text-[#0F172A]">PIZZY</h1>
      </header>

      {/* 2. PIZZA GRID */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {PIZZAS.map(p => (
          <PizzaCard 
            key={p.id} 
            pizza={p} 
            externalCount={cart[p.id] || 0} 
            onChange={(val) => setCart({...cart, [p.id]: val})} 
          />
        ))}
      </main>

      {/* 3. FLOATING CART BUTTON */}
      {totalItems > 0 && !isCheckoutOpen && !orderFinished && (
        <motion.button 
          initial={{ y: 100 }} 
          animate={{ y: 0 }} 
          onClick={() => setCheckoutOpen(true)}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#FF6B35] text-white px-10 py-5 rounded-full shadow-[0_20px_40px_rgba(255,107,53,0.3)] flex items-center gap-4 z-40 hover:scale-105 active:scale-95 transition-transform"
        >
          <ShoppingBag /> 
          <span className="font-bold">View Cart ({totalItems})</span>
        </motion.button>
      )}

      {/* 4. CHECKOUT SIDEBAR */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setCheckoutOpen(false)} 
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }} 
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[60] p-10 flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-4xl font-black italic">My Order</h2>
                <button onClick={() => setCheckoutOpen(false)} className="p-2 hover:bg-slate-100 rounded-full"><X /></button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6">
                <h3 className="font-bold text-slate-400 uppercase text-xs">Payment Method</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setPaymentMethod('CASH')} className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center ${paymentMethod === 'CASH' ? 'border-[#FF6B35] bg-orange-50 text-[#FF6B35]' : 'border-slate-100 bg-slate-50'}`}>
                    <Banknote className="mb-2"/> Cash
                  </button>
                  <button onClick={() => setPaymentMethod('UPI')} className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center ${paymentMethod === 'UPI' ? 'border-[#FF6B35] bg-orange-50 text-[#FF6B35]' : 'border-slate-100 bg-slate-50'}`}>
                    <QrCode className="mb-2"/> UPI
                  </button>
                </div>
              </div>

              <div className="pt-10 border-t border-slate-100">
                <div className="flex justify-between text-3xl font-black mb-8 text-[#0F172A]">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button 
                  onClick={handlePlaceOrder} 
                  className="w-full bg-[#FF6B35] text-white py-6 rounded-3xl font-black text-2xl hover:bg-[#e85a2a] transition-colors shadow-lg shadow-orange-200"
                >
                  CONFIRM ORDER
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 5. ROLLING LOADER */}
      <AnimatePresence>
        {isRolling && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#FF6B35] flex flex-col items-center justify-center text-white"
          >
            <motion.img 
              src="/image.png" 
              className="w-48 h-48 rounded-full shadow-2xl border-8 border-white" 
              animate={{ x: [-400, 400], rotate: [0, 1440] }} 
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }} 
            />
            <h2 className="mt-12 text-5xl font-black italic tracking-tighter">ROLLING TO YOU...</h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. SUCCESS SCREEN */}
      <AnimatePresence>
        {orderFinished && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-[110] bg-white flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div 
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}
              className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white mb-6 shadow-xl shadow-green-100"
            >
              <CheckCircle2 size={48} />
            </motion.div>
            <h2 className="text-5xl font-black text-[#0F172A] mb-4 italic">ORDER PLACED!</h2>
            <p className="text-slate-500 mb-10 max-w-xs text-lg font-medium">
              Sit tight! Your delicious Pizzy is being prepared.
            </p>
            <button 
              onClick={resetApp}
              className="bg-[#0F172A] text-white px-12 py-5 rounded-3xl font-bold text-xl hover:bg-black transition-all active:scale-95"
            >
              Back to Menu
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;