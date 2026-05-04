import { AnimatePresence, motion } from 'motion/react';

const categories = ['All', 'Action', 'Puzzle', 'Sports', 'Arcade', 'Retro'];

export default function Sidebar({ activeCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`relative px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
            activeCategory === category
              ? 'text-[#0a0a0b]'
              : 'text-slate-400 hover:text-white border border-[#1e1e21] hover:border-slate-700'
          }`}
        >
          <span className="relative z-10">{category}</span>
          <AnimatePresence>
            {activeCategory === category && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 bg-[#22d3ee] rounded-2xl neon-glow z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </AnimatePresence>
        </button>
      ))}
    </div>
  );
}
