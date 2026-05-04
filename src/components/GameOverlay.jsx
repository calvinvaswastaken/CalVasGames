import { Expand, Maximize2, Minimize2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export default function GameOverlay({ game, onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!game) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-[#0a0a0b]/95 backdrop-blur-2xl"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className={`relative bg-[#111113] border border-[#1e1e21] rounded-3xl overflow-hidden flex flex-col shadow-2xl ${
            isFullscreen ? 'w-full h-full' : 'w-full max-w-6xl aspect-video'
          }`}
        >
          {/* Controls Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e21] bg-[#111113]">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#22d3ee] rounded-full animate-pulse" />
              <h2 className="font-bold text-white uppercase italic tracking-wider flex items-center gap-2">
                {game.title}
                <span className="text-[10px] font-mono text-slate-500 font-normal">[{game.id}]</span>
              </h2>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 text-slate-400 hover:text-white hover:bg-[#1e1e21] rounded-xl transition-all"
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
              <button 
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Iframe Container */}
          <div className="flex-1 bg-black relative">
            <iframe
              src={game.iframeUrl}
              className="w-full h-full border-none"
              title={game.title}
              allow="fullscreen; autoplay; encrypted-media; picture-in-picture"
              loading="lazy"
            />
          </div>

          {/* Info Footer */}
          <div className="px-6 py-3 border-t border-[#1e1e21] bg-[#0a0a0b]/50 text-[10px] uppercase font-mono tracking-[0.2em] text-slate-600 flex justify-between items-center">
            <div className="flex gap-4">
              <span>CATEGORY: {game.category}</span>
              <span>RENDER_MODE: WEBGL_POWERED</span>
            </div>
            <div className="flex items-center gap-2">
              <Expand className="w-3 h-3" />
              <span>ACTIVE_SESSION_STABLE</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
