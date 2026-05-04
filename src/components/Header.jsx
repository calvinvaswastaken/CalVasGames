import { Gamepad2, Search, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export default function Header({ onSearch, searchQuery }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0b]/80 backdrop-blur-xl border-b border-[#1e1e21] px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <motion.div
          initial={{ rotate: -15, scale: 0.9 }}
          animate={{ rotate: 0, scale: 1 }}
          className="p-2 bg-gradient-to-tr from-[#22d3ee] to-[#818cf8] rounded-xl neon-glow"
        >
          <Gamepad2 className="w-8 h-8 text-[#0a0a0b]" />
        </motion.div>
        <div>
          <h1 className="text-2xl font-bold tracking-tighter text-white uppercase italic">
            Arcade <span className="text-[#22d3ee]">Nova</span>
          </h1>
          <p className="text-[10px] text-[#818cf8] uppercase tracking-[0.2em] font-mono font-medium -mt-1 flex items-center gap-1">
            <Zap className="w-2.5 h-2.5 fill-current" /> System Online
          </p>
        </div>
      </div>

      <div className="flex-1 max-w-xl mx-8 relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-[#22d3ee] transition-colors">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Scan for available titles..."
          className="w-full bg-[#111113] border border-[#1e1e21] rounded-2xl py-3 pl-12 pr-6 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#22d3ee] focus:ring-1 focus:ring-[#22d3ee]/20 transition-all"
        />
        <div className="absolute inset-y-0 right-4 flex items-center">
           <span className="text-[10px] bg-[#1e1e21] px-2 py-1 rounded text-slate-500 font-mono">/SEARCH</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="hidden md:flex items-center gap-2 px-4 py-2 border border-[#1e1e21] rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-[#1e1e21] transition-all">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Server Status: High
        </button>
      </div>
    </header>
  );
}
