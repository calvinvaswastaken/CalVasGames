import { useState, useMemo } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import GameCard from './components/GameCard';
import GameOverlay from './components/GameOverlay';
import gamesData from './data/games.json';
import { AnimatePresence, motion } from 'motion/react';
import { Sparkles, Trophy, TrendingUp } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedGame, setSelectedGame] = useState(null);

  const filteredGames = useMemo(() => {
    return gamesData.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen pt-24 pb-20 cyber-grid relative overflow-x-hidden">
      {/* Decorative background elements */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#22d3ee]/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-[#818cf8]/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />

      <main className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <section className="mb-20 pt-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 px-3 py-1 bg-[#111113] border border-[#1e1e21] rounded-full w-fit mb-6"
              >
                <Sparkles className="w-3 h-3 text-[#22d3ee]" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#22d3ee]">Version 2.0 Deployment</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-8xl font-black text-white italic leading-[0.9] tracking-tighter mb-6 uppercase"
              >
                Unleash <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#818cf8]">Nova Core</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-slate-500 max-w-md mb-8 leading-relaxed"
              >
                Access the world's most popular titles directly in your browser. Encrypted, high-speed, and completely unblocked.
              </motion.p>
              
              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#111113] border border-[#1e1e21] rounded-2xl">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-white font-bold leading-none">1.2M+</p>
                    <p className="text-[10px] uppercase text-slate-500 font-mono tracking-wider">Players Daily</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#111113] border border-[#1e1e21] rounded-2xl">
                    <TrendingUp className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-white font-bold leading-none">99.9%</p>
                    <p className="text-[10px] uppercase text-slate-500 font-mono tracking-wider">Uptime Cluster</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hidden md:block relative">
               <motion.div
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.3 }}
                 className="relative z-10 aspect-square rounded-[40px] overflow-hidden border border-[#1e1e21] neon-glow"
               >
                 <img
                   src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop"
                   alt="Cyber Arcade"
                   className="w-full h-full object-cover"
                   referrerPolicy="no-referrer"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] to-transparent" />
                 <div className="absolute bottom-8 left-8 right-8">
                    <p className="text-[#22d3ee] font-mono text-xs uppercase tracking-[0.3em] mb-2">Featured Reality</p>
                    <h3 className="text-3xl font-black italic text-white uppercase italic">Hyper-Station Omega</h3>
                 </div>
               </motion.div>
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#22d3ee]/20 blur-[60px] rounded-full animate-pulse" />
            </div>
          </div>
        </section>
+
        {/* Categories & Filter */}
        <div className="flex items-center justify-between mb-8">
           <h3 className="text-lg font-bold text-white uppercase italic tracking-wider flex items-center gap-3">
             <span className="w-1.5 h-1.5 bg-[#22d3ee] rounded-full" />
             Game Selection
           </h3>
           <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">{filteredGames.length} Titles Available</span>
        </div>

        <Sidebar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

        {/* Game Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredGames.map((game) => (
              <GameCard 
                key={game.id} 
                game={game} 
                onSelect={() => setSelectedGame(game)} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredGames.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-[#111113] border border-[#1e1e21] rounded-3xl flex items-center justify-center mb-4">
              <span className="text-slate-600 font-mono text-xl">?</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">No results matching your query</h4>
            <p className="text-sm text-slate-500 max-w-xs">Our archives do not contain any titles with that signature. Please broad-scan or change sectors.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-[#1e1e21] bg-[#0a0a0b] py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
            <h1 className="text-xl font-bold tracking-tighter text-white uppercase italic">
              Arcade <span className="text-[#22d3ee]">Nova</span>
            </h1>
          </div>
          <div className="flex gap-8">
             <a href="#" className="text-[10px] uppercase font-mono tracking-widest text-slate-500 hover:text-[#22d3ee] transition-colors">Privacy Protcol</a>
             <a href="#" className="text-[10px] uppercase font-mono tracking-widest text-slate-500 hover:text-[#22d3ee] transition-colors">Security Patch Notes</a>
             <a href="#" className="text-[10px] uppercase font-mono tracking-widest text-slate-500 hover:text-[#22d3ee] transition-colors">Developer Portal</a>
          </div>
          <p className="text-[10px] uppercase font-mono text-slate-600 tracking-widest">
            © 2026 NOVA_OS. ALL RIGHTS FREELY ACCESSIBLE.
          </p>
        </div>
      </footer>

      {/* Game Viewer Modal */}
      <GameOverlay game={selectedGame} onClose={() => setSelectedGame(null)} />
    </div>
  );
}
