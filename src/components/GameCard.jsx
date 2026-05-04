import { Play, Star, Users } from 'lucide-react';
import { motion } from 'motion/react';

export default function GameCard({ game, onSelect }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      className="group relative bg-[#111113] border border-[#1e1e21] rounded-3xl overflow-hidden cursor-pointer hover:border-[#22d3ee]/50 transition-colors"
      onClick={() => onSelect(game)}
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={game.thumbnailUrl}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/20 to-transparent" />
        
        <div className="absolute top-4 left-4">
          <span className="px-2.5 py-1 bg-[#0a0a0b]/80 backdrop-blur-md rounded-lg text-[10px] font-bold text-[#22d3ee] uppercase tracking-wider border border-[#22d3ee]/20">
            {game.category}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
           <div className="flex gap-1">
             <div className="p-2 bg-[#22d3ee] rounded-full text-[#0a0a0b] shadow-[0_0_20px_rgba(34,211,238,0.5)]">
               <Play className="w-4 h-4 fill-current" />
             </div>
           </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#22d3ee] transition-colors line-clamp-1 italic italic">
          {game.title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 h-10">
          {game.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-[#1e1e21]">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-xs font-bold text-slate-300">{game.rating}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <Users className="w-3 h-3" />
            <span className="text-[10px] uppercase font-mono tracking-wider">
              {Intl.NumberFormat('en', { notation: 'compact' }).format(game.playCount || 0)} plays
            </span>
          </div>
        </div>
      </div>
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 border-2 border-[#22d3ee] opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none rounded-3xl" />
    </motion.div>
  );
}
