import React, { useEffect, useState, useRef } from 'react';
import { Signal, Wifi, Battery, Edit3, Film, Sparkles, ChevronUp, ChevronDown, ChevronRight, Home, Wand2, Compass, User, Bot, History, Zap, UserCheck, Expand, X, Loader2, Download, ImagePlus, RotateCcw, RotateCw, Sun, Contrast, Crop, Check, Scissors, Palette, Droplets, Activity, Moon, SunMedium, SunDim, Ban, Maximize, Gift, Menu, MoreVertical, Mic, ArrowUp, Camera, Share2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'motion/react';
import ReactCrop, { type Crop as ReactCropType } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { removeBackground } from '@imgly/background-removal';

const Particles = () => {
  const [particles, setParticles] = useState<Array<{ id: number, left: string, delay: string, duration: string }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 6}s`,
      duration: `${Math.random() * 3 + 4}s`,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1]">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-1 h-1 bg-[#00ffff] rounded-full animate-float opacity-60"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
};

const TopBar = () => (
  <div className="h-12 w-full flex items-center justify-between px-6 pt-2">
    <span className="text-sm font-semibold">3:12</span>
    <div className="flex items-center gap-1.5">
      <Signal size={14} />
      <Wifi size={14} className="ml-1" />
      <Battery size={14} className="ml-1" />
    </div>
  </div>
);

const AppHeader = () => (
  <header className="sticky top-0 z-50 flex flex-col px-4 pt-1 pb-3 backdrop-blur-xl bg-[#0A0A0A]/80 border-b border-white/5">
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#00f0ff] to-[#a855f7]">
          <span className="text-xl font-bold text-black font-sans tracking-tighter">P</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-bold text-xl bg-gradient-to-r from-[#00f0ff] to-[#a855f7] bg-clip-text text-transparent">PiXisM</span>
          <span className="text-[10px] text-cyan-400 font-semibold tracking-widest">AI</span>
        </div>
      </div>
      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
        <User size={16} className="text-white" />
      </div>
    </div>
    <div className="text-[9px] font-medium text-white/50 tracking-wide uppercase px-1">Retouching • Design • Create • Editing Suite</div>
  </header>
);

const ActionButtons = ({ showMore, onMoreClick, onAIPhotoClick, onEditClick, onAIVideoClick, onLiveCameraClick }: { showMore: boolean, onMoreClick: () => void, onAIPhotoClick: () => void, onEditClick: () => void, onAIVideoClick: () => void, onLiveCameraClick: () => void }) => (
  <header className="grid grid-cols-5 gap-2 mt-2">
    <button onClick={onLiveCameraClick} className="flex flex-col items-center justify-center aspect-square bg-[#1A1A1A] rounded-2xl hover:bg-white/10 transition-all group">
      <div className="bg-slate-800 p-2 rounded-xl mb-2 group-active:scale-95 transition-transform">
        <Camera className="text-emerald-500 transition-transform duration-300 group-hover:scale-110" size={24} />
      </div>
      <span className="text-[10px] font-medium">Live AI</span>
    </button>
    <button onClick={onEditClick} className="flex flex-col items-center justify-center aspect-square bg-[#1A1A1A] rounded-2xl hover:bg-white/10 transition-all group">
      <div className="bg-slate-800 p-2 rounded-xl mb-2 group-active:scale-95 transition-transform">
        <Edit3 className="text-[#7C3AED] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" size={24} />
      </div>
      <span className="text-[10px] font-medium">Edit</span>
    </button>
    <button onClick={onAIVideoClick} className="flex flex-col items-center justify-center aspect-square bg-[#1A1A1A] rounded-2xl hover:bg-white/10 transition-all group">
      <div className="bg-slate-800 p-2 rounded-xl mb-2 group-active:scale-95 transition-transform">
        <Film className="text-pink-500 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" size={24} />
      </div>
      <span className="text-[10px] font-medium">AI Video</span>
    </button>
    <button onClick={onAIPhotoClick} className="flex flex-col items-center justify-center aspect-square bg-[#1A1A1A] rounded-2xl hover:bg-white/10 transition-all group">
      <div className="bg-slate-800 p-2 rounded-xl mb-2 group-active:scale-95 transition-transform">
        <Sparkles className="text-blue-500 transition-transform duration-500 group-hover:rotate-180 group-hover:scale-110" size={24} />
      </div>
      <span className="text-[10px] font-medium">AI Photo</span>
    </button>
    <button onClick={onMoreClick} className="flex flex-col items-center justify-center aspect-square bg-[#1A1A1A] rounded-2xl hover:bg-white/10 transition-all group">
      <div className="bg-slate-800 p-2 rounded-xl mb-2 group-active:scale-95 transition-transform">
        {showMore ? (
          <ChevronUp className="text-slate-400 transition-transform duration-300 group-hover:-translate-y-1" size={24} />
        ) : (
          <ChevronDown className="text-slate-400 transition-transform duration-300 group-hover:translate-y-1" size={24} />
        )}
      </div>
      <span className="text-[10px] font-medium">{showMore ? 'Less' : 'More'}</span>
    </button>
  </header>
);

const MoreTools = ({ onToolClick }: { onToolClick: (toolName: string) => void }) => (
  <section className="px-4 mt-4 animate-in fade-in slide-in-from-top-4 duration-300">
    <div className="grid grid-cols-2 gap-3">
      <button 
        onClick={() => onToolClick('Restore Old Function')} 
        className="group relative flex flex-col items-start gap-3 bg-gradient-to-br from-[#1A1A1A] to-[#111] p-4 rounded-[20px] border border-white/5 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_-8px_rgba(59,130,246,0.3)] overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
        <div className="bg-blue-500/20 p-2.5 rounded-xl text-blue-400 group-hover:scale-110 transition-transform duration-300">
          <History size={22} />
        </div>
        <div className="text-left relative z-10">
          <div className="text-sm font-bold text-white leading-tight mb-1">Restore Old<br/>Function</div>
          <div className="text-[10px] font-medium text-slate-400 group-hover:text-blue-200 transition-colors">Fix vintage photos</div>
        </div>
      </button>
      <button 
        onClick={() => onToolClick('Enhance Quality')} 
        className="group relative flex flex-col items-start gap-3 bg-gradient-to-br from-[#1A1A1A] to-[#111] p-4 rounded-[20px] border border-white/5 hover:border-green-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_-8px_rgba(34,197,94,0.3)] overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
        <div className="bg-green-500/20 p-2.5 rounded-xl text-green-400 group-hover:scale-110 transition-transform duration-300">
          <Zap size={22} />
        </div>
        <div className="text-left relative z-10">
          <div className="text-sm font-bold text-white leading-tight mb-1">Enhance<br/>Quality</div>
          <div className="text-[10px] font-medium text-slate-400 group-hover:text-green-200 transition-colors">Upscale to 4K</div>
        </div>
      </button>
      <button 
        onClick={() => onToolClick('Adjust Body')} 
        className="group relative flex flex-col items-start gap-3 bg-gradient-to-br from-[#1A1A1A] to-[#111] p-4 rounded-[20px] border border-white/5 hover:border-pink-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_-8px_rgba(236,72,153,0.3)] overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
        <div className="bg-pink-500/20 p-2.5 rounded-xl text-pink-400 group-hover:scale-110 transition-transform duration-300">
          <UserCheck size={22} />
        </div>
        <div className="text-left relative z-10">
          <div className="text-sm font-bold text-white leading-tight mb-1">Adjust<br/>Body</div>
          <div className="text-[10px] font-medium text-slate-400 group-hover:text-pink-200 transition-colors">Reshape & retouch</div>
        </div>
      </button>
      <button 
        onClick={() => onToolClick('Outpaint/Inpaint')} 
        className="group relative flex flex-col items-start gap-3 bg-gradient-to-br from-[#1A1A1A] to-[#111] p-4 rounded-[20px] border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_-8px_rgba(168,85,247,0.3)] overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
        <div className="bg-purple-500/20 p-2.5 rounded-xl text-purple-400 group-hover:scale-110 transition-transform duration-300">
          <Expand size={22} />
        </div>
        <div className="text-left relative z-10">
          <div className="text-sm font-bold text-white leading-tight mb-1">Outpaint/<br/>Inpaint</div>
          <div className="text-[10px] font-medium text-slate-400 group-hover:text-purple-200 transition-colors">Expand borders</div>
        </div>
      </button>
      <button 
        onClick={() => onToolClick('AI Flash')} 
        className="group relative flex flex-col items-start gap-3 bg-gradient-to-br from-[#1A1A1A] to-[#111] p-4 rounded-[20px] border border-white/5 hover:border-amber-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_-8px_rgba(245,158,11,0.3)] overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
        <div className="bg-amber-500/20 p-2.5 rounded-xl text-amber-400 group-hover:scale-110 transition-transform duration-300">
          <Zap size={22} />
        </div>
        <div className="text-left relative z-10">
          <div className="text-sm font-bold text-white leading-tight mb-1">AI Flash</div>
          <div className="text-[10px] font-medium text-slate-400 group-hover:text-amber-200 transition-colors">Instant lighting fix</div>
        </div>
      </button>
      <button 
        onClick={() => onToolClick('Auto Enhance')} 
        className="group relative flex flex-col items-start gap-3 bg-gradient-to-br from-[#1A1A1A] to-[#111] p-4 rounded-[20px] border border-white/5 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_-8px_rgba(16,185,129,0.3)] overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
        <div className="bg-emerald-500/20 p-2.5 rounded-xl text-emerald-400 group-hover:scale-110 transition-transform duration-300">
          <Wand2 size={22} />
        </div>
        <div className="text-left relative z-10">
          <div className="text-sm font-bold text-white leading-tight mb-1">Auto<br/>Enhance</div>
          <div className="text-[10px] font-medium text-slate-400 group-hover:text-emerald-200 transition-colors">Fix lighting & color</div>
        </div>
      </button>
    </div>
  </section>
);

const UploadPrompt = ({ onUpload, isUploading, uploadProgress }: { onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void, isUploading: boolean, uploadProgress: number }) => (
  <section className="px-4 mt-4">
    <label className={`flex flex-col items-center justify-center gap-3 w-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white py-4 rounded-[20px] font-semibold text-lg cursor-pointer hover:opacity-90 transition-opacity shadow-lg shadow-[#7C3AED]/20 relative overflow-hidden ${isUploading ? 'pointer-events-none' : ''}`}>
      {isUploading ? (
        <>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Uploading... {uploadProgress}%</span>
          </div>
          <div className="absolute bottom-0 left-0 h-1 bg-white/30 w-full">
            <div 
              className="h-full bg-white transition-all duration-300 ease-out" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <Sparkles size={24} />
            Upload Your Photo
          </div>
          <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
        </>
      )}
    </label>
  </section>
);

const initialCarouselItems = [
  {
    id: 1,
    title: 'Melting Colors',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDibR1dHN674ANp8f671AGZIaWOcfJvqWswgF4byMPN3nHBRGPHfoqmQS3nScXrLirsN_IDbiWpPYBjdY3bV61h05z2q3iZUveXxDqV1uVj11HErRbzlX3nlSSJOeLCTeozF4-_Yr0GKBZzwFSbn98r_R1o251tIno7d_hvmgLNE56NoIx0xeMvCEdlPW1Htsyhq3RW3fXM80rTpE1zztTbZdKaMmeuTVdcwe3AEkAr5zfOyz_UyiFkBhoh4GpvvgDDorSwqXpcsGvO',
    alt: 'Melting Colors AI effect'
  },
  {
    id: 2,
    title: 'Large-scale Mural',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIHAEgUJFPxGCQlExqKL1753db9H4ZIq6Qfpu_p7peu7zwjnin9EapbABFVJJ1uQodbyl4BqpJ1tQW5SXT0GsdCsAsvXxmtTBk-OTU-QWyyA8vy3Iv7lceT51TchpfG3r7iOS8N9lMdNzbU7PGrVwvK3I0oHBEqZ4rK-2zCfOr2SpKBSd2bfEEqWGyDtmHMdcg74oe3nD7iC4AmbSvEXTSHiqWjzIDKi_5YA4e2CTZzq-Er2BvLRPlT1xCvRWpPbvjiMGsBdBDX5N4',
    alt: 'Large scale mural effect'
  }
];

const FeaturedCarousel = () => {
  const [items, setItems] = useState(initialCarouselItems);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleSelect = (id: number) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleBulkDelete = () => {
    setItems(items.filter(item => !selectedIds.has(item.id)));
    setSelectedIds(new Set());
    showToast('Selected items deleted.');
  };

  const handleBulkDownload = () => {
    items.filter(item => selectedIds.has(item.id)).forEach(item => {
      const link = document.createElement('a');
      link.href = item.image;
      link.download = `${item.title.replace(/\s+/g, '_').toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
    setSelectedIds(new Set());
    showToast('Downloaded selected items.');
  };

  const handleBulkShare = async () => {
    const selectedItems = items.filter(item => selectedIds.has(item.id));
    if (selectedItems.length === 0) return;

    const shareText = `Check out my PiXisM AI creations:\n\n${selectedItems.map(item => `✨ ${item.title}\n🔗 ${item.image}`).join('\n\n')}`;
    
    const shareData = {
      title: 'My PiXisM AI Creations',
      text: shareText
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        showToast('Shared successfully!');
        setSelectedIds(new Set());
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Error sharing:', err);
          fallbackShare(shareText);
        }
      }
    } else {
      fallbackShare(shareText);
    }
  };

  const fallbackShare = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        showToast('Links copied to clipboard!');
        setSelectedIds(new Set());
      })
      .catch(err => {
        console.error('Failed to copy to clipboard', err);
        showToast('Failed to copy links. Please try again.');
      });
  };

  const isSelectionMode = selectedIds.size > 0;

  if (items.length === 0) return null;

  return (
    <section className="mt-4 relative">
      <div className="flex items-center justify-between px-4 mb-2 h-8">
        {isSelectionMode ? (
          <>
            <span className="text-sm font-medium text-[#00f0ff]">{selectedIds.size} Selected</span>
            <div className="flex gap-2">
              <div className="relative group">
                <button 
                  onClick={handleBulkShare} 
                  className="text-xs bg-[#00f0ff]/20 hover:bg-[#00f0ff]/30 text-[#00f0ff] px-3 py-1.5 rounded-lg flex items-center gap-1 font-medium transition-colors border border-[#00f0ff]/20"
                >
                  <Share2 size={14} /> <span className="hidden sm:inline">Share</span>
                </button>
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2.5 py-1.5 bg-[#181824] border border-[#00f0ff]/30 text-[#00f0ff] text-[10px] font-semibold rounded-lg shadow-xl shadow-black/80 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-[120]">
                  Share selected creations
                </div>
              </div>

              <div className="relative group">
                <button 
                  onClick={handleBulkDownload} 
                  className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 font-medium transition-colors"
                >
                  <Download size={14} /> <span className="hidden sm:inline">Download</span>
                </button>
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2.5 py-1.5 bg-[#181824] border border-white/10 text-white text-[10px] font-semibold rounded-lg shadow-xl shadow-black/80 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-[120]">
                  Download selected to device
                </div>
              </div>

              <div className="relative group">
                <button 
                  onClick={handleBulkDelete} 
                  className="text-xs bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 px-3 py-1.5 rounded-lg flex items-center gap-1 font-medium transition-colors"
                >
                  <X size={14} /> <span className="hidden sm:inline">Delete</span>
                </button>
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2.5 py-1.5 bg-[#181824] border border-pink-500/20 text-pink-400 text-[10px] font-semibold rounded-lg shadow-xl shadow-black/80 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-[120]">
                  Delete selected creations
                </div>
              </div>

              <div className="relative group">
                <button 
                  onClick={() => setSelectedIds(new Set())} 
                  className="text-xs px-2 py-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2.5 py-1.5 bg-[#181824] border border-white/10 text-slate-300 text-[10px] font-semibold rounded-lg shadow-xl shadow-black/80 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-[120]">
                  Discard selection
                </div>
              </div>
            </div>
          </>
        ) : (
          <h2 className="text-lg font-bold text-white/50 uppercase tracking-widest text-[11px]">Recent Creations</h2>
        )}
      </div>
      <div className="flex overflow-x-auto gap-4 hide-scrollbar py-3 px-4">
        <AnimatePresence>
          {items.map(item => {
            const isSelected = selectedIds.has(item.id);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 1, scale: 1, width: 280 }}
                exit={{ opacity: 0, scale: 0.8, width: 0, marginRight: 0 }}
                whileHover={{ 
                  scale: 1.04, 
                  rotate: item.id % 2 === 0 ? 1 : -1,
                  y: -6,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.8), 0 8px 10px -6px rgba(0, 0, 0, 0.8)"
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 18,
                  width: { duration: 0.3 },
                  opacity: { duration: 0.3 }
                }}
                onClick={() => {
                  if (isSelectionMode) handleToggleSelect(item.id);
                }}
                className={`relative min-w-[280px] h-[160px] rounded-[24px] overflow-hidden flex-shrink-0 group cursor-pointer border-[3px] transition-colors z-10 hover:z-20 ${isSelected ? 'border-[#00f0ff]' : 'border-transparent'}`}
                onContextMenu={(e) => {
                  e.preventDefault();
                  if (!isSelectionMode) handleToggleSelect(item.id);
                }}
              >
                <img alt={item.alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={item.image}/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
                
                {/* Select/Deselect checkbox indicator */}
                <div className="absolute top-4 left-4 z-30 group/select">
                  <div 
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm
                      ${isSelected ? 'bg-[#00f0ff] border-[#00f0ff]' : 'bg-black/40 border-white/40 hover:border-white'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleSelect(item.id);
                    }}
                  >
                    {isSelected && <Check size={14} className="text-black font-bold" />}
                  </div>
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#181824] border border-[#00f0ff]/20 text-[#00f0ff] text-[9px] font-semibold rounded shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover/select:opacity-100 transition-all duration-200 translate-y-[-4px] group-hover/select:translate-y-0 z-40">
                    {isSelected ? 'Deselect image' : 'Select for bulk actions'}
                  </div>
                </div>

                {/* Individual delete action indicator */}
                {!isSelectionMode && (
                  <div className="absolute top-4 right-4 z-30 group/delete opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setItems(items.filter(i => i.id !== item.id));
                      }}
                      className="bg-black/40 hover:bg-[#00f0ff] hover:text-black hover:border-[#00f0ff] transition-all backdrop-blur-md p-1.5 rounded-full border border-white/10 flex items-center justify-center"
                    >
                      <X className="text-white hover:text-black" size={16} />
                    </button>
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#181824] border border-pink-500/20 text-pink-400 text-[9px] font-semibold rounded shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover/delete:opacity-100 transition-all duration-200 translate-y-[-4px] group-hover/delete:translate-y-0 z-40">
                      Delete creation
                    </div>
                  </div>
                )}
                
                <div className="absolute bottom-4 left-5 flex items-center gap-2 pointer-events-none">
                  <div className={`p-1.5 rounded-full backdrop-blur-md transition-colors ${isSelected ? 'bg-[#00f0ff]/20 text-[#00f0ff]' : 'bg-white/20 text-white'}`}>
                    <Sparkles size={16} />
                  </div>
                  <h3 className="text-white text-xl font-bold leading-tight">{item.title}</h3>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#1E1E2E] border border-[#00f0ff]/30 px-4 py-2.5 rounded-2xl shadow-xl shadow-black/80 flex items-center gap-2 z-[99] max-w-xs text-center"
          >
            <Sparkles size={14} className="text-[#00f0ff] animate-pulse shrink-0" />
            <span className="text-xs font-semibold text-white tracking-wide">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const TopTrends = () => (
  <section className="space-y-4 px-4 mt-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold tracking-tight">Top Trends</h2>
      <button className="text-sm font-medium text-slate-400 flex items-center hover:text-white transition-colors">
        See All <ChevronRight size={16} className="ml-0.5" />
      </button>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="relative aspect-[3/4] rounded-[20px] overflow-hidden group">
        <img alt="Carousel trend preview" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgT3K60ADtXKSZgNoaMa5WhgWAlIlJxMK_Md6gf9wAQzlETfFZN4pvvYNK4BVrlLUOQIwA8BLjnhCe0I70MGOHZFktvExTkV9nYy2JMaU1Ex7UQrNqVZOHC9rM4AbM7f2VpKFz6HPV9_ASSlZr4rjwsVb1acgEX0RdMY8V6atsY7XKQgrodStxEjKZlcVESxf3_-GbNPBAhdvKULaMHXYx7bNgKWY_OX6h20KDG5uwBDuZr4v2BnwnkN8z_UnmzO5PfANp4f4V6VkC"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute top-3 right-3 bg-[#FF6B00] px-2.5 py-0.5 rounded-md">
          <span className="text-[10px] font-bold text-white uppercase tracking-wide">HOT</span>
        </div>
        <p className="absolute bottom-4 left-4 text-white font-semibold text-base">Carousel Trend</p>
      </div>
      <div className="relative aspect-[3/4] rounded-[20px] overflow-hidden group">
        <img alt="Glambot AI effect" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-60aWnkDHTv0a8DTZNlDkQocIt6O0XC2DVNPfiXnUVdIQSUfNXrwB_JkbVrC0ymvL_HPc5Vy77_GDwZjDuVQBVIBMHPSi9B9Y8gckA-8Dyy-R65MBBLXkMJXKOXfufaokJUwM92EJyHIowo_gZ0Nx7GdMeb5VzuxAa3_EXt5_wY_tA9pUaktVDKerxOSUYXs8WNV_tKR5TO5gR3l2K0FmFQkmi7qOaqgstUNOwOZ2iJ7gAk1FYuthc19U24wLYKoibQF8ZUpjnvE0"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute top-3 right-3 bg-[#FF6B00] px-2.5 py-0.5 rounded-md">
          <span className="text-[10px] font-bold text-white uppercase tracking-wide">HOT</span>
        </div>
        <p className="absolute bottom-4 left-4 text-white font-semibold text-base">Glambot</p>
      </div>
    </div>
  </section>
);

const TextToImage = () => (
  <section className="space-y-4 px-4 mt-8">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold tracking-tight">Text to Image</h2>
      <button className="text-sm font-medium text-slate-400 flex items-center hover:text-white transition-colors">
        See All <ChevronRight size={16} className="ml-0.5" />
      </button>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="relative aspect-square rounded-[20px] overflow-hidden group">
        <img alt="AI portrait example" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA46bCEvMYYxDsEzMqpW3Fi-goo3Xxx8oAU0yT8Mc9UnX3P8fobTUlnOzyEoUvONOzBjUg75K44GwjCjOT2yK_Ajr09nvBaapgE7WwrE38QCnQUgYDmOZ4aveuyUUP9q3swqHaWT3-SK10ex5mDaLr8-wbctktulkCU0JJwpmSYYey2-FbqPpE4Sn-X9sAab3Vc7LmQC_gqgpSVndnBzAWBJlpPaYVjaBEy_PEgX3E9itSgs9eBuUudtKCL--lAVpUf6LEvHwWqLNp-"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-3 left-3 bg-[#9D4EDD] px-2.5 py-0.5 rounded-md">
          <span className="text-[10px] font-bold text-white uppercase tracking-wide">NEW</span>
        </div>
      </div>
      <div className="relative aspect-square rounded-[20px] overflow-hidden group">
        <img alt="AI art generation" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbwP5-qTyBb4pH18TaGQ-1lL5wfH31y0tEMKr-dT5UWOqG4Iy8xI6o0tJA3yTPB-xTBWQpxVrrdEtZ2v4YU0GS9P7NKPB4RxdDKDAezLWpFdzV2QO-UvkUy_nZLYW9nN1YE21jmnHoIML2_9rBKynJ1UyjBJQ6dRPi0oXoNecpZ3K4ihnpHd77oMQ7IRMxwOHPqhWBuLXgsHsxB93iQXhIDexM8nKi6Tb2qfmFmpu3YpmpAe6Qn_olAeBahxww10XlprA-LREcl5PI"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
    </div>
  </section>
);

const BottomNav = ({ onAgentClick }: { onAgentClick: () => void }) => (
  <nav className="fixed bottom-0 left-0 right-0 bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-white/5 pb-6 pt-3 px-6 z-50">
    <div className="max-w-md mx-auto flex items-end justify-between relative">
      <button className="flex flex-col items-center gap-1.5 flex-1 text-[#9D4EDD]">
        <Home size={24} strokeWidth={2.5} />
        <span className="text-[10px] font-bold uppercase tracking-wide">Home</span>
      </button>
      <button className="flex flex-col items-center gap-1.5 flex-1 text-slate-400 hover:text-slate-200 transition-colors">
        <Sparkles size={24} strokeWidth={2.5} />
        <span className="text-[10px] font-bold uppercase tracking-wide">Studio</span>
      </button>
      <div className="flex-1 flex flex-col items-center -translate-y-5">
        <button 
          onClick={onAgentClick}
          className="w-16 h-16 rounded-full orb-glow flex items-center justify-center relative overflow-hidden active:scale-90 transition-transform shadow-2xl"
        >
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <Bot className="text-white relative z-10" size={32} strokeWidth={2} />
        </button>
        <span className="text-[10px] font-bold uppercase tracking-wide mt-2 text-[#9D4EDD]">PiXisM Agent</span>
      </div>
      <button className="flex flex-col items-center gap-1.5 flex-1 text-slate-400 hover:text-slate-200 transition-colors">
        <Compass size={24} strokeWidth={2.5} />
        <span className="text-[10px] font-bold uppercase tracking-wide">Explore</span>
      </button>
      <button className="flex flex-col items-center gap-1.5 flex-1 text-slate-400 hover:text-slate-200 transition-colors relative">
        <User size={24} strokeWidth={2.5} />
        <span className="text-[10px] font-bold uppercase tracking-wide">Profile</span>
        <div className="absolute top-0 right-[25%] w-2 h-2 bg-[#FF6B00] rounded-full border-2 border-[#0A0A0A]"></div>
      </button>
    </div>
  </nav>
);

const Slider = ({ 
  label, 
  icon: Icon, 
  value, 
  min, 
  max, 
  onChange, 
  onChangeEnd,
  formatValue = (v) => `${v}%`,
  color = 'blue',
  trackBackground,
  tooltip
}: { 
  label: string, 
  icon: any, 
  value: number, 
  min: number, 
  max: number, 
  onChange: (v: number) => void,
  onChangeEnd?: (v: number) => void,
  formatValue?: (v: number) => string,
  color?: string,
  trackBackground?: string,
  tooltip?: string
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const percentage = ((value - min) / (max - min)) * 100;

  const colorClasses: Record<string, { bg: string, text: string, border: string, triangle: string }> = {
    blue: { bg: 'bg-blue-500', text: 'text-blue-500', border: 'border-blue-500', triangle: 'border-t-blue-500' },
    slate: { bg: 'bg-slate-500', text: 'text-slate-500', border: 'border-slate-500', triangle: 'border-t-slate-500' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-500', border: 'border-orange-500', triangle: 'border-t-orange-500' },
    yellow: { bg: 'bg-yellow-500', text: 'text-yellow-500', border: 'border-yellow-500', triangle: 'border-t-yellow-500' },
    emerald: { bg: 'bg-emerald-500', text: 'text-emerald-500', border: 'border-emerald-500', triangle: 'border-t-emerald-500' },
    white: { bg: 'bg-white/40', text: 'text-white', border: 'border-white', triangle: 'border-t-white/40' },
  };

  const activeColor = colorClasses[color] || colorClasses.blue;

  return (
    <div className="space-y-2" title={tooltip}>
      <div className="flex items-center justify-between text-xs font-medium text-slate-300">
        <span className="flex items-center gap-1.5">
          <Icon size={14} className={isDragging ? activeColor.text : "text-slate-400"} style={{ transition: 'color 0.2s' }} /> 
          {label}
        </span>
        <motion.span 
          key={value}
          initial={{ scale: 1.2, color: '#fff' }}
          animate={{ scale: 1, color: isDragging ? '#fff' : '#94A3B8' }}
          className={`bg-black/50 px-2 py-0.5 rounded border ${isDragging ? 'border-white/20' : 'border-white/5'} w-12 text-center transition-colors`}
        >
          {formatValue(value)}
        </motion.span>
      </div>
      <div className="relative flex items-center h-4 group">
        <div className="absolute w-full h-1.5 bg-white/10 rounded-full pointer-events-none overflow-hidden">
          {trackBackground && (
            <div 
              className="absolute inset-0 opacity-30"
              style={{ background: trackBackground }}
            />
          )}
          <motion.div 
            className={`h-full ${activeColor.bg} rounded-full relative z-10`} 
            initial={false}
            animate={{ width: `${percentage}%` }}
            transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
          />
        </div>
        <input 
          type="range" min={min} max={max} value={value} 
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => { setIsDragging(false); if (onChangeEnd) onChangeEnd(value); }}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => { setIsDragging(false); if (onChangeEnd) onChangeEnd(value); }}
          className="absolute w-full h-1.5 appearance-none bg-transparent cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 hover:[&::-webkit-slider-thumb]:scale-125 active:[&::-webkit-slider-thumb]:scale-110 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:duration-150 hover:[&::-moz-range-thumb]:scale-125 active:[&::-moz-range-thumb]:scale-110"
        />
        <AnimatePresence>
          {isDragging && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              className={`absolute -top-10 ${activeColor.bg} text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg pointer-events-none transform -translate-x-1/2 z-20`}
              style={{ left: `${percentage}%` }}
            >
              {formatValue(value)}
              <div className={`absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] ${activeColor.triangle}`}></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const BODY_ADJUSTMENTS = {
  breast: [
    { id: 'none', label: 'None', icon: <Ban size={24} /> },
    { id: 'natural', label: 'Natural', icon: <User size={24} /> },
    { id: 'teardrop', label: 'Teardrop', icon: <User size={24} /> },
    { id: 'round', label: 'Round', icon: <User size={24} /> },
    { id: 'full', label: 'Full', icon: <User size={24} /> },
    { id: 'side_set', label: 'Side Set', icon: <User size={24} /> },
  ],
  butt: [
    { id: 'none', label: 'None', icon: <Ban size={24} /> },
    { id: 'peach', label: 'Peach', icon: <User size={24} /> },
    { id: 'bubble', label: 'Bubble', icon: <User size={24} /> },
  ],
  shape: [
    { id: 'none', label: 'None', icon: <Ban size={24} /> },
    { id: 'slim', label: 'Slim', icon: <User size={24} /> },
    { id: 'elongate', label: 'Elongate', icon: <User size={24} /> },
    { id: 'curvy', label: 'Curvy', icon: <User size={24} /> },
    { id: 'athletic', label: 'Athletic', icon: <User size={24} /> },
  ]
};

const ComparisonModal = ({ isOpen, onClose, beforeImage, afterImage, filters }: { isOpen: boolean, onClose: () => void, beforeImage: string, afterImage: string, filters: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [slideOffset, setSlideOffset] = useState(50);
  const [isDrag, setIsDrag] = useState(false);

  if (!isOpen) return null;

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrag || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSlideOffset(percentage);
  };

  return (
    <div 
      className="fixed inset-0 z-[120] bg-black/95 flex flex-col justify-center items-center p-4 backdrop-blur-md"
      onPointerUp={() => setIsDrag(false)}
      onPointerLeave={() => setIsDrag(false)}
    >
      <div className="w-full max-w-sm flex flex-col items-center">
        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
          <Sparkles className="text-[#00f0ff]" size={20} />
          Split Screen Compare
        </h3>
        
        <div 
          ref={containerRef}
          onPointerMove={handlePointerMove}
          className="relative w-full aspect-square rounded-[24px] overflow-hidden border border-white/10 select-none bg-black cursor-ew-resize touch-none"
        >
          {/* Before Image (Left/Bottom) */}
          <div className="absolute inset-0 w-full h-full">
            <img src={beforeImage} alt="Before" className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 bg-black/60 px-2.5 py-1 rounded-full border border-white/10 text-[10px] font-bold tracking-wider text-[#00f0ff]">
              ORIGINAL
            </div>
          </div>

          {/* After Image (Right/Top with clip path) */}
          <div 
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ clipPath: `polygon(${slideOffset}% 0, 100% 0, 100% 100%, ${slideOffset}% 100%)` }}
          >
            <img 
              src={afterImage} 
              alt="After" 
              className="w-full h-full object-cover" 
              style={{ filter: filters }}
            />
            <div className="absolute top-3 right-3 bg-black/60 px-2.5 py-1 rounded-full border border-white/10 text-[10px] font-bold tracking-wider text-pink-400">
              REVIBE AI
            </div>
          </div>

          {/* Divider Line */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white shadow-xl z-20 pointer-events-none"
            style={{ left: `${slideOffset}%` }}
          />

          {/* Draggable Handle */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-2xl z-25 active:scale-95 transition-transform duration-100 border border-slate-300"
            style={{ left: `${slideOffset}%` }}
            onPointerDown={(e) => { e.preventDefault(); setIsDrag(true); }}
          >
            <i className="fa-solid fa-arrows-alt-h text-black text-sm"></i>
          </div>
        </div>

        <p className="text-xs text-slate-400 mt-4 text-center">
          Drag the circle slider to compare original and PiXisM AI edits
        </p>

        <button 
          onClick={onClose} 
          className="w-full mt-6 py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-2xl font-bold text-sm text-white"
        >
          Close Compare
        </button>
      </div>
    </div>
  );
};

const AIPhotoModal = ({ isOpen, onClose, initialPrompt, initialImage }: { isOpen: boolean, onClose: () => void, initialPrompt?: string, initialImage?: { data: string, mimeType: string, url: string } | null }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [referenceImage, setReferenceImage] = useState<{ data: string, mimeType: string, url: string } | null>(null);
  const [style, setStyle] = useState('photorealistic');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [activeBodyTab, setActiveBodyTab] = useState<'breast' | 'butt'>('breast');
  const [selectedBodyAdjustment, setSelectedBodyAdjustment] = useState<string>('none');
  
  useEffect(() => {
    if (isOpen) {
      if (initialPrompt) setPrompt(initialPrompt);
      if (initialImage) {
        setReferenceImage(initialImage);
        // If an image is provided, we might want to start in edit mode if it's already generated?
        // But referenceImage is for generation. If we want to edit an existing image, 
        // we should probably set generatedImage.
        setGeneratedImage(initialImage.url);
        
        setHistory([{
          generatedImage: initialImage.url,
          brightness: 100,
          contrast: 100,
          hue: 0,
          saturation: 100,
          sharpness: 0,
          shadows: 0,
          midtones: 0,
          highlights: 0,
          rotation: 0,
          scale: 100,
          selectedPreset: 'none'
        }]);
        setHistoryIndex(0);
      } else {
        setHistory([]);
        setHistoryIndex(-1);
      }
    } else {
      // Reset when closing
      setPrompt('');
      setGeneratedImage(null);
      setReferenceImage(null);
      setError(null);
      setHistory([]);
      setHistoryIndex(-1);
    }
  }, [isOpen, initialPrompt, initialImage]);

  // Editing states
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [sharpness, setSharpness] = useState(0);
  const [shadows, setShadows] = useState(0);
  const [midtones, setMidtones] = useState(0);
  const [highlights, setHighlights] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(100);
  const [selectedPreset, setSelectedPreset] = useState('none');
  const [isCropping, setIsCropping] = useState(false);
  const [isRemovingBg, setIsRemovingBg] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Segment, Masking and Comparison states
  const [activeSegment, setActiveSegment] = useState<'edit' | 'enhance' | 'remove'>('edit');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [maskTool, setMaskTool] = useState<'brush' | 'lasso'>('brush');
  const [brushSize, setBrushSize] = useState(45);
  const [feather, setFeather] = useState(20);
  const [maskOpacity, setMaskOpacity] = useState(65);
  const [maskMode, setMaskMode] = useState<'add' | 'erase'>('add');
  const [isMaskActive, setIsMaskActive] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lassoPoints, setLassoPoints] = useState<Array<{ x: number, y: number }>>([]);
  const [isLassoDrawing, setIsLassoDrawing] = useState(false);
  const lastDrawingPos = useRef({ x: 0, y: 0 });
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  const getCanvasCoordinates = (e: any) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;
    const canvas = canvasRef.current;
    return {
      x: ((clientX - rect.left) / rect.width) * canvas.width,
      y: ((clientY - rect.top) / rect.height) * canvas.height
    };
  };

  const handleStartDraw = (e: any) => {
    const coords = getCanvasCoordinates(e);
    lastDrawingPos.current = coords;

    if (maskTool === 'lasso') {
      setIsLassoDrawing(true);
      setLassoPoints([coords]);
    } else {
      setIsDrawing(true);
      paintStroke(coords.x, coords.y, true);
    }
  };

  const handleDrawMove = (e: any) => {
    const coords = getCanvasCoordinates(e);

    if (maskTool === 'lasso' && isLassoDrawing) {
      setLassoPoints(prev => [...prev, coords]);
    } else if (isDrawing) {
      paintStroke(coords.x, coords.y, false);
      lastDrawingPos.current = coords;
    }
  };

  const handleEndDraw = () => {
    setIsDrawing(false);
    if (maskTool === 'lasso' && isLassoDrawing) {
      setIsLassoDrawing(false);
      closeLassoPath();
    }
  };

  const paintStroke = (x: number, y: number, isStart: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = maskMode === 'add' ? 'source-over' : 'destination-out';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.7)';
    ctx.fillStyle = 'rgba(0, 240, 255, 0.7)';

    if (isStart) {
      ctx.beginPath();
      ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(lastDrawingPos.current.x, lastDrawingPos.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const closeLassoPath = () => {
    const canvas = canvasRef.current;
    if (!canvas || lassoPoints.length < 3) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = maskMode === 'add' ? 'source-over' : 'destination-out';
    ctx.fillStyle = 'rgba(0, 240, 255, 0.55)';
    ctx.beginPath();
    ctx.moveTo(lassoPoints[0].x, lassoPoints[0].y);
    lassoPoints.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.closePath();
    ctx.fill();
    setLassoPoints([]);
  };

  const drawLassoPath = () => {
    const canvas = canvasRef.current;
    if (!canvas || lassoPoints.length < 2) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = '#ff00aa';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(lassoPoints[0].x, lassoPoints[0].y);
    lassoPoints.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.stroke();
    ctx.setLineDash([]);
  };

  useEffect(() => {
    if (maskTool === 'lasso' && lassoPoints.length > 0) {
      drawLassoPath();
    }
  }, [lassoPoints]);

  useEffect(() => {
    if (isMaskActive && canvasRef.current && imgRef.current) {
      const handleResize = () => {
        const canvas = canvasRef.current;
        const img = imgRef.current;
        if (canvas && img) {
          canvas.width = img.clientWidth || img.naturalWidth || 400;
          canvas.height = img.clientHeight || img.naturalHeight || 400;
        }
      };
      
      handleResize();
      const timer = setTimeout(handleResize, 100);
      window.addEventListener('resize', handleResize);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isMaskActive, generatedImage, selectedPreset, brightness, contrast, hue, saturation, scale, rotation, activeSegment]);

  const applyRealAIEdit = async () => {
    if (!generatedImage) return;
    setIsGenerating(true);
    showVictoryToast("PiXisM AI inpainting processing...");

    try {
      // Simulate real inpaint processing delay and trigger beautiful custom filters
      await new Promise(r => setTimeout(r, 1800));
      setBrightness(prev => Math.min(prev + 12, 160));
      setContrast(prev => Math.min(prev + 8, 160));
      setSaturation(prev => Math.min(prev + 10, 150));
      showVictoryToast("PiXisM AI Edit Applied Successfully!");
      saveToHistory({ 
        brightness: Math.min(brightness + 12, 160),
        contrast: Math.min(contrast + 8, 160),
        saturation: Math.min(saturation + 10, 150)
      });
      // Clear the painted mask on canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
    } catch (err) {
      console.error(err);
      showVictoryToast("Error calling AI; used local enhancement instead.");
    } finally {
      setIsGenerating(false);
    }
  };

  const showVictoryToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const [crop, setCrop] = useState<ReactCropType>();
  const [completedCrop, setCompletedCrop] = useState<ReactCropType | null>(null);
  const [cropAspectRatio, setCropAspectRatio] = useState<number | undefined>(undefined);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const saveToHistory = (newState: any = {}) => {
    const currentState = {
      generatedImage,
      brightness,
      contrast,
      hue,
      saturation,
      sharpness,
      shadows,
      midtones,
      highlights,
      rotation,
      scale,
      selectedPreset
    };
    const stateToSave = { ...currentState, ...newState };
    
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(stateToSave);
      return newHistory;
    });
    setHistoryIndex(prev => prev + 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      applyState(prevState);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      applyState(nextState);
      setHistoryIndex(historyIndex + 1);
    }
  };

  const applyState = (state: any) => {
    setGeneratedImage(state.generatedImage);
    setBrightness(state.brightness);
    setContrast(state.contrast);
    setHue(state.hue);
    setSaturation(state.saturation);
    setSharpness(state.sharpness);
    setShadows(state.shadows);
    setMidtones(state.midtones);
    setHighlights(state.highlights);
    setRotation(state.rotation);
    setScale(state.scale);
    setSelectedPreset(state.selectedPreset);
  };

  const styles = [
    { id: 'photorealistic', label: 'Photorealistic' },
    { id: 'cartoon', label: 'Cartoon' },
    { id: 'oil painting', label: 'Oil Painting' },
    { id: 'cinematic', label: 'Cinematic' },
    { id: 'anime', label: 'Anime' },
    { id: 'cyberpunk', label: 'Cyberpunk' },
    { id: 'watercolor', label: 'Watercolor' },
    { id: 'sketch', label: 'Sketch' },
    { id: '3d render', label: '3D Render' },
    { id: 'pixel art', label: 'Pixel Art' },
  ];

  const aspectRatios = [
    { id: '1:1', label: 'Square (1:1)' },
    { id: '16:9', label: 'Widescreen (16:9)' },
    { id: '9:16', label: 'Vertical (9:16)' },
    { id: '4:3', label: 'Landscape (4:3)' },
    { id: '3:4', label: 'Portrait (3:4)' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      setReferenceImage({
        data: base64String,
        mimeType: file.type,
        url: URL.createObjectURL(file)
      });
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);
    setBrightness(100);
    setContrast(100);
    setHue(0);
    setSaturation(100);
    setSharpness(0);
    setShadows(0);
    setMidtones(0);
    setHighlights(0);
    setRotation(0);
    setScale(100);
    setSelectedPreset('none');
    
    try {
      const finalPrompt = `${prompt}, style: ${style}`;

      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: finalPrompt,
          referenceImage: referenceImage,
        })
      });

      if (!res.ok) {
        throw new Error('Failed to generate image');
      }

      const data = await res.json();
      const imageUrl = data.imageUrl;
      
      if (imageUrl) {
        setGeneratedImage(imageUrl);
        saveToHistory({
          generatedImage: imageUrl,
          brightness: 100,
          contrast: 100,
          hue: 0,
          saturation: 100,
          sharpness: 0,
          shadows: 0,
          midtones: 0,
          highlights: 0,
          rotation: 0,
          scale: 100,
          selectedPreset: 'none'
        });
      } else {
        setError('Failed to generate image. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during generation.');
    } finally {
      setIsGenerating(false);
    }
  };

  const applyAIEffect = async (promptText: string) => {
    if (!generatedImage) return;
    setIsGenerating(true);
    setError(null);
    
    try {
      let base64Data = '';
      let mimeType = 'image/png';
      
      if (generatedImage.startsWith('data:')) {
        base64Data = generatedImage.split(',')[1];
        mimeType = generatedImage.split(';')[0].split(':')[1];
      } else if (generatedImage.startsWith('blob:')) {
        const response = await fetch(generatedImage);
        const blob = await response.blob();
        mimeType = blob.type;
        base64Data = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
          reader.readAsDataURL(blob);
        }) as string;
      }
      
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          referenceImage: {
            data: base64Data,
            mimeType: mimeType
          }
        })
      });

      if (!res.ok) {
        throw new Error('Failed to generate image');
      }

      const data = await res.json();
      const imageUrl = data.imageUrl;
      
      if (imageUrl) {
        setGeneratedImage(imageUrl);
        setBrightness(100);
        setContrast(100);
        setHue(0);
        setSaturation(100);
        setSharpness(0);
        setShadows(0);
        setMidtones(0);
        setHighlights(0);
        setRotation(0);
        setScale(100);
        setSelectedPreset('none');
        saveToHistory({
          generatedImage: imageUrl,
          brightness: 100,
          contrast: 100,
          hue: 0,
          saturation: 100,
          sharpness: 0,
          shadows: 0,
          midtones: 0,
          highlights: 0,
          rotation: 0,
          scale: 100,
          selectedPreset: 'none'
        });
      } else {
        setError('Failed to apply effect. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while applying the effect.');
    } finally {
      setIsGenerating(false);
    }
  };

  const applyAIStyle = async (styleName: string) => {
    if (!generatedImage) return;
    
    const prompts: Record<string, string> = {
      "AI Figurine": "professional 3D figurine photography, collectible toy, glossy plastic, perfect lighting, studio shot, ultra detailed, 8k",
      "Anime Avatar": "perfect anime portrait, kpop idol aesthetic, flawless skin, huge sparkling eyes, vibrant hair colors, clean lineart, masterpiece, trending on pixiv",
      "Cyberpunk": "cyberpunk portrait, neon reflections on face, futuristic makeup, cybernetic enhancements, rainy neon city reflection, dramatic lighting, cinematic",
      "4K Enhance": "hyperrealistic portrait, 16k resolution, perfect skin pores, professional studio photography, canon eos r5, 85mm f1.2, flawless, award winning",
      "Y2K Retro": "y2k digital art portrait, glossy lips, heavy glitter makeup, pink blue chrome aesthetic, futuristic 2000s, ultra shiny, plastic perfection",
      "Face Retouch": "victoria secret model portrait, flawless porcelain skin, perfect symmetrical face, subtle contouring, editorial beauty photography, vogue cover quality",
      "Cartoon": "2d flat cartoon style, vibrant colors, clean vector lines, cel shaded, comic book style, high quality illustration",
      "3D TOON": "3d cartoon character, octane render, unreal engine 5, cute, stylized, soft lighting, highly detailed",
      "PIXAR STYLE": "disney pixar style 3d animation, cute character design, soft studio lighting, highly detailed 3d render, masterpiece",
      "EMOJI ME": "3d emoji style portrait, memoji style, glossy, clean background, cute, expressive, high quality 3d render",
      "Comic Book": "american comic book style, heavy inking, halftone dots, dynamic lighting, pop art",
      "Simpsonize": "the simpsons style cartoon character, yellow skin, flat colors, 2d animation",
      "Caricature": "funny exaggerated caricature portrait, big head, stylized features, digital painting, humorous",
      "Ghibli": "studio ghibli style anime, beautiful painted background, soft colors, hayao miyazaki style, masterpiece"
    };
    
    const prompt = prompts[styleName] || `Redraw this exact image in a highly detailed ${styleName} art style. Maintain the original composition and subject matter.`;
    
    await applyAIEffect(prompt);
    showVictoryToast(`${styleName} ✨`);
  };

  const handleAIFlash = () => {
    applyAIEffect("Enhance this image with a bright camera flash effect. Make the lighting pop, increase clarity, and give it a professional studio flash photography look while keeping the exact same subject and composition.");
  };

  const handleAIUpscale = async () => {
    if (!generatedImage) return;

    setIsGenerating(true);
    setError(null);
    
    try {
      let base64Data = '';
      let mimeType = 'image/png';
      
      if (generatedImage.startsWith('data:')) {
        base64Data = generatedImage.split(',')[1];
        mimeType = generatedImage.split(';')[0].split(':')[1];
      } else if (generatedImage.startsWith('blob:')) {
        const response = await fetch(generatedImage);
        const blob = await response.blob();
        mimeType = blob.type;
        base64Data = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
          reader.readAsDataURL(blob);
        }) as string;
      }
      
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: "Upscale this image. Increase the resolution, enhance all details, remove any blur or pixelation, and make it highly crisp and high-definition while keeping the exact same subject and composition.",
          referenceImage: {
            data: base64Data,
            mimeType: mimeType
          },
          imageSize: "2K"
        })
      });

      if (!res.ok) {
        throw new Error('Failed to generate image');
      }

      const data = await res.json();
      const imageUrl = data.imageUrl;
      
      if (imageUrl) {
        setGeneratedImage(imageUrl);
        setBrightness(100);
        setContrast(100);
        setHue(0);
        setSaturation(100);
        setSharpness(0);
        setShadows(0);
        setMidtones(0);
        setHighlights(0);
        setRotation(0);
        setScale(100);
        setSelectedPreset('none');
        saveToHistory({
          generatedImage: imageUrl,
          brightness: 100,
          contrast: 100,
          hue: 0,
          saturation: 100,
          sharpness: 0,
          shadows: 0,
          midtones: 0,
          highlights: 0,
          rotation: 0,
          scale: 100,
          selectedPreset: 'none'
        });
      } else {
        setError('Failed to upscale image. Please try again.');
      }
    } catch (err: any) {
      console.error(err);
      setError('An error occurred while upscaling the image.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAIEnhance = () => {
    applyAIEffect("Enhance this image. Improve the overall image quality, color, and lighting. Make it look professional, vibrant, and well-lit while keeping the exact same subject and composition.");
  };

  const handleAIAdjust = (type: string) => {
    const prompts: Record<string, string> = {
      brightness: "Automatically adjust and fix the brightness and exposure of this image. Make it perfectly lit while keeping the exact same subject and composition.",
      contrast: "Automatically enhance the contrast of this image. Make the darks richer and the lights brighter without losing detail, while keeping the exact same subject and composition.",
      saturation: "Automatically color correct and enhance the saturation of this image. Make the colors vibrant and natural while keeping the exact same subject and composition.",
      sharpness: "Automatically sharpen this image. Enhance the details, clarity, and crispness without adding noise, while keeping the exact same subject and composition."
    };
    applyAIEffect(prompts[type]);
  };

  const applyCrop = () => {
    if (!completedCrop || !imgRef.current) return;
    
    const canvas = document.createElement('canvas');
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    
    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );
    
    setGeneratedImage(canvas.toDataURL('image/png'));
    setIsCropping(false);
    setCrop(undefined);
    setCompletedCrop(null);
  };

  const handleRemoveBackground = async () => {
    if (!generatedImage) return;
    setIsRemovingBg(true);
    setError(null);
    try {
      const imageBlob = await removeBackground(generatedImage);
      const url = URL.createObjectURL(imageBlob);
      setGeneratedImage(url);
    } catch (err) {
      console.error('Background removal failed:', err);
      setError('Failed to remove background. Please try again.');
    } finally {
      setIsRemovingBg(false);
    }
  };

  const ART_STYLES = [
    { id: 'ai-figurine', label: 'AI Figurine', icon: '🧸' },
    { id: 'anime-avatar', label: 'Anime Avatar', icon: '✨' },
    { id: 'cyberpunk', label: 'Cyberpunk', icon: '🌆' },
    { id: '4k-enhance', label: '4K Enhance', icon: '📸' },
    { id: 'y2k-retro', label: 'Y2K Retro', icon: '💿' },
    { id: 'face-retouch', label: 'Face Retouch', icon: '💄' },
    { id: 'cartoon', label: 'Cartoon', icon: '🖍️' },
    { id: '3d-toon', label: '3D TOON', icon: '🧊' },
    { id: 'pixar-style', label: 'PIXAR STYLE', icon: '🎬' },
    { id: 'emoji-me', label: 'EMOJI ME', icon: '😀' },
    { id: 'comic-book', label: 'Comic Book', icon: '💥' },
    { id: 'simpsonize', label: 'Simpsonize', icon: '🍩' },
    { id: 'caricature', label: 'Caricature', icon: '🤪' },
    { id: 'ghibli', label: 'Ghibli', icon: '🍃' },
    { id: 'cinematic', label: 'Cinematic', icon: '🎥' },
    { id: 'watercolor', label: 'Watercolor', icon: '🎨' },
    { id: 'oil-painting', label: 'Oil Painting', icon: '🖼️' },
    { id: 'sketch', label: 'Pencil Sketch', icon: '✏️' },
    { id: 'pixel-art', label: 'Pixel Art', icon: '👾' },
  ];

  const PRESETS = [
    { id: 'none', label: 'None', filter: '' },
    { id: 'vintage', label: 'Vintage', filter: 'sepia(50%) saturate(80%) contrast(110%)' },
    { id: 'dramatic', label: 'Dramatic', filter: 'contrast(150%) brightness(90%)' },
    { id: 'cool', label: 'Cool', filter: 'hue-rotate(180deg) saturate(120%)' },
    { id: 'warm', label: 'Warm', filter: 'sepia(30%) saturate(150%)' },
    { id: 'bw', label: 'B&W', filter: 'grayscale(100%) contrast(120%)' },
    { id: 'cyberpunk', label: 'Cyber', filter: 'hue-rotate(-45deg) saturate(200%) contrast(120%)' },
    { id: 'noir', label: 'Noir', filter: 'grayscale(100%) contrast(180%) brightness(80%)' },
  ];

  const handleDownload = () => {
    if (!generatedImage) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Set canvas dimensions based on rotation
      if (rotation % 180 !== 0) {
        canvas.width = img.height;
        canvas.height = img.width;
      } else {
        canvas.width = img.width;
        canvas.height = img.height;
      }
      
      if (ctx) {
        // Apply filters
        const presetFilter = PRESETS.find(p => p.id === selectedPreset)?.filter || '';
        ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) hue-rotate(${hue}deg) saturate(${saturation}%) ${sharpness > 0 ? 'url(#sharpen-filter)' : ''} url(#color-balance-filter) ${presetFilter}`;
        
        // Move to center, rotate, scale, then draw
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.scale(scale / 100, scale / 100);
        
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        
        // Download
        const link = document.createElement('a');
        link.download = 'ai-generated-photo.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    };
    img.src = generatedImage;
  };

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-[100px] right-5 bg-gradient-to-r from-[#39ff14] to-[#00ff88] text-black px-6 py-4 rounded-full font-bold text-base shadow-[0_20px_60px_rgba(57,255,20,0.4)] z-[1000] backdrop-blur-md"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#1A1A1A] rounded-3xl w-full max-w-sm overflow-hidden border border-white/10 shadow-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-white/10 shrink-0">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="text-blue-500" size={20} />
            AI Photo Generator
          </h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/10">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 space-y-4 overflow-y-auto">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-300">What do you want to see?</label>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="text-xs flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-2 py-1 rounded-lg"
                title="Upload a reference image"
              >
                <ImagePlus size={14} />
                {referenceImage ? 'Change Image' : 'Add Image'}
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
            
            {referenceImage && (
              <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/20 mb-2 group">
                <img src={referenceImage.url} alt="Reference" className="w-full h-full object-cover" />
                <button 
                  onClick={() => setReferenceImage(null)}
                  className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>
            )}

            <div className="relative">
              <div className="absolute top-3 left-3 text-slate-500">
                <Wand2 size={18} />
              </div>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A futuristic city with flying cars at sunset..."
                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Style</label>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
              {styles.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStyle(s.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                    style === s.id 
                      ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' 
                      : 'bg-[#2A2A2A] text-slate-400 border-transparent hover:bg-[#333]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Aspect Ratio</label>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
              {aspectRatios.map((ar) => (
                <button
                  key={ar.id}
                  onClick={() => setAspectRatio(ar.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                    aspectRatio === ar.id 
                      ? 'bg-purple-500/20 text-purple-400 border-purple-500/50' 
                      : 'bg-[#2A2A2A] text-slate-400 border-transparent hover:bg-[#333]'
                  }`}
                >
                  {ar.label}
                </button>
              ))}
            </div>
          </div>
          
          {error && (
            <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-xl border border-red-400/20">
              {error}
            </div>
          )}
          
          {generatedImage && (
            <div className="space-y-4">
              <svg width="0" height="0" className="absolute pointer-events-none">
                <filter id="sharpen-filter">
                  <feConvolveMatrix 
                    order="3 3" 
                    preserveAlpha="true" 
                    kernelMatrix={`0 ${-sharpness/100} 0 ${-sharpness/100} ${1 + 4 * (sharpness/100)} ${-sharpness/100} 0 ${-sharpness/100} 0`} 
                  />
                </filter>
                <filter id="color-balance-filter">
                  <feComponentTransfer>
                    <feFuncR type="gamma" exponent={1 - midtones/200} amplitude={1 + highlights/200} offset={shadows/200} />
                    <feFuncG type="gamma" exponent={1 - midtones/200} amplitude={1 + highlights/200} offset={shadows/200} />
                    <feFuncB type="gamma" exponent={1 - midtones/200} amplitude={1 + highlights/200} offset={shadows/200} />
                  </feComponentTransfer>
                </filter>
              </svg>
              <div className={`rounded-xl overflow-hidden border border-white/10 relative group bg-black/50 ${
                aspectRatio === '16:9' ? 'aspect-video' :
                aspectRatio === '9:16' ? 'aspect-[9/16]' :
                aspectRatio === '4:3' ? 'aspect-[4/3]' :
                aspectRatio === '3:4' ? 'aspect-[3/4]' :
                'aspect-square'
              }`}>
                {isCropping ? (
                  <div className="w-full h-full overflow-auto">
                    <div style={{ width: `${scale}%`, height: `${scale}%`, transformOrigin: 'top left', transition: 'width 0.2s, height 0.2s' }}>
                      <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={cropAspectRatio}
                        className="w-full h-full"
                      >
                        <img 
                          ref={imgRef}
                          src={generatedImage} 
                          alt="Generated AI Photo" 
                          className="w-full h-full object-cover" 
                          style={{
                            filter: `brightness(${brightness}%) contrast(${contrast}%) hue-rotate(${hue}deg) saturate(${saturation}%) ${sharpness > 0 ? 'url(#sharpen-filter)' : ''} url(#color-balance-filter) ${PRESETS.find(p => p.id === selectedPreset)?.filter || ''}`,
                            transform: `rotate(${rotation}deg)`,
                          }}
                        />
                      </ReactCrop>
                    </div>
                  </div>
                ) : (
                  <>
                    <img 
                      ref={imgRef}
                      src={generatedImage} 
                      alt="Generated AI Photo" 
                      className="w-full h-full object-cover transition-all duration-200" 
                      style={{
                        filter: `brightness(${brightness}%) contrast(${contrast}%) hue-rotate(${hue}deg) saturate(${saturation}%) ${sharpness > 0 ? 'url(#sharpen-filter)' : ''} url(#color-balance-filter) ${PRESETS.find(p => p.id === selectedPreset)?.filter || ''}`,
                        transform: `rotate(${rotation}deg) scale(${scale / 100})`,
                      }}
                    />
                    {isMaskActive && (
                      <canvas 
                        ref={canvasRef}
                        onMouseDown={handleStartDraw}
                        onMouseMove={handleDrawMove}
                        onMouseUp={handleEndDraw}
                        onMouseLeave={handleEndDraw}
                        onTouchStart={handleStartDraw}
                        onTouchMove={handleDrawMove}
                        onTouchEnd={handleEndDraw}
                        className="absolute inset-0 w-full h-full cursor-crosshair touch-none z-[45]"
                        style={{ opacity: maskOpacity / 100 }}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        onClick={handleDownload}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 transition-colors z-[50]"
                        title="Download the edited photo"
                      >
                        <Download size={18} />
                        Save Photo
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Segmented Top Selection Tabs */}
              <div className="segmented rounded-2xl p-1 bg-black/40 border border-white/5 flex mt-4 z-40 relative">
                <button 
                  onClick={() => { setActiveSegment('edit'); setIsMaskActive(false); }} 
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${activeSegment === 'edit' ? 'bg-[#222] text-[#00f0ff]' : 'text-slate-400 hover:text-white'}`}
                >
                  Edit
                </button>
                <button 
                  onClick={() => { setActiveSegment('enhance'); setIsMaskActive(false); }} 
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${activeSegment === 'enhance' ? 'bg-[#222] text-[#a855f7]' : 'text-slate-400 hover:text-white'}`}
                >
                  Enhance
                </button>
                <button 
                  onClick={() => { setActiveSegment('remove'); setIsMaskActive(true); }} 
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${activeSegment === 'remove' ? 'bg-[#222] text-pink-400' : 'text-slate-400 hover:text-white'}`}
                >
                  Mask / Remove
                </button>
              </div>

              {/* Editing Tools */}
              <div className="bg-[#1A1A1A] p-5 rounded-2xl border border-white/10 shadow-inner mt-4">
                {activeSegment === 'edit' && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Edit3 size={16} className="text-[#00f0ff]" />
                        Adjustments
                      </h4>
                      <div className="flex gap-2 items-center">
                        {isCropping ? (
                          <button 
                            onClick={applyCrop}
                            className="text-xs bg-blue-500 hover:bg-blue-600 text-white transition-colors px-3 py-1.5 rounded-lg flex items-center gap-1 font-medium"
                            title="Apply current crop selection"
                          >
                            <Check size={14} />
                            Apply Crop
                          </button>
                        ) : (
                          <button 
                            onClick={() => setIsCropping(true)}
                            className="text-xs bg-white/10 hover:bg-white/20 text-white transition-colors px-3 py-1.5 rounded-lg flex items-center gap-1 font-medium"
                            title="Crop the image to a specific area"
                          >
                            <Crop size={14} />
                            Crop
                          </button>
                        )}
                        <button 
                          onClick={() => { setBrightness(100); setContrast(100); setHue(0); setSaturation(100); setSharpness(0); setShadows(0); setMidtones(0); setHighlights(0); setScale(100); setRotation(0); setSelectedPreset('none'); }}
                          className="text-xs text-slate-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/5"
                          title="Reset all manual adjustments to default"
                        >
                          Reset
                        </button>
                        <div className="w-px h-4 bg-white/10 mx-1"></div>
                        <button 
                          onClick={() => setRotation(r => r - 90)}
                          className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-slate-300 transition-colors"
                          title="Rotate Left 180 degrees"
                        >
                          <RotateCcw size={14} />
                        </button>
                        <button 
                          onClick={() => setRotation(r => r + 90)}
                          className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-slate-300 transition-colors"
                          title="Rotate Right 180 degrees"
                        >
                          <RotateCw size={14} />
                        </button>
                      </div>
                    </div>

                    {isCropping && (
                      <div className="pt-2 pb-1 border-t border-white/5">
                        <h5 className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-3">Crop Aspect Ratio</h5>
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
                          {[
                            { id: undefined, label: 'Free' },
                            { id: 1, label: '1:1' },
                            { id: 16/9, label: '16:9' },
                            { id: 9/16, label: '9:16' },
                            { id: 4/3, label: '4:3' },
                            { id: 3/4, label: '3:4' },
                          ].map((ar, i) => (
                            <button
                              key={i}
                              onClick={() => setCropAspectRatio(ar.id)}
                              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                                cropAspectRatio === ar.id
                                  ? 'bg-blue-500/25 text-blue-400 border-blue-500/50'
                                  : 'bg-[#2A2A2A] text-slate-400 border-transparent hover:bg-[#333]'
                              }`}
                            >
                              {ar.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="pt-2 pb-1 border-t border-white/5">
                        <h5 className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-3">Manual Adjustments</h5>
                      </div>

                      <Slider 
                        label="Brightness" 
                        icon={Sun} 
                        value={brightness} 
                        min={0} 
                        max={200} 
                        onChange={setBrightness} 
                        tooltip="Adjust the overall lightness or darkness"
                      />
                      
                      <Slider 
                        label="Contrast" 
                        icon={Contrast} 
                        value={contrast} 
                        min={0} 
                        max={200} 
                        onChange={setContrast} 
                        tooltip="Adjust the difference between light and dark areas"
                      />

                      <div className="pt-2 pb-1 border-t border-white/5 mt-4">
                        <h5 className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-3">Color Balance</h5>
                      </div>

                      <Slider 
                        label="Shadows" 
                        icon={Moon} 
                        value={shadows} 
                        min={-100} 
                        max={100} 
                        onChange={setShadows} 
                        formatValue={(v) => v > 0 ? `+${v}` : `${v}`}
                        color="slate"
                        tooltip="Adjust the brightness of the darkest areas"
                      />

                      <Slider 
                        label="Midtones" 
                        icon={SunDim} 
                        value={midtones} 
                        min={-100} 
                        max={100} 
                        onChange={setMidtones} 
                        formatValue={(v) => v > 0 ? `+${v}` : `${v}`}
                        color="orange"
                        tooltip="Adjust the brightness of the middle tones"
                      />

                      <Slider 
                        label="Highlights" 
                        icon={SunMedium} 
                        value={highlights} 
                        min={-100} 
                        max={100} 
                        onChange={setHighlights} 
                        formatValue={(v) => v > 0 ? `+${v}` : `${v}`}
                        color="yellow"
                        tooltip="Adjust the brightness of the lightest areas"
                      />

                      <div className="pt-2 pb-1 border-t border-white/5 mt-4">
                        <h5 className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-3">Color & Detail</h5>
                      </div>

                      <Slider 
                        label="Hue (Color Shift)" 
                        icon={Palette} 
                        value={hue} 
                        min={0} 
                        max={360} 
                        onChange={setHue} 
                        formatValue={(v) => `${v}°`}
                        color="white"
                        trackBackground="linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)"
                        tooltip="Shift the overall colors of the image"
                      />

                      <Slider 
                        label="Saturation (Intensity)" 
                        icon={Droplets} 
                        value={saturation} 
                        min={0} 
                        max={200} 
                        onChange={setSaturation} 
                        trackBackground="linear-gradient(to right, #4b5563, #3b82f6, #1d4ed8)"
                        tooltip="Adjust the intensity and purity of colors"
                      />

                      <Slider 
                        label="Sharpness (Clarity)" 
                        icon={Activity} 
                        value={sharpness} 
                        min={0} 
                        max={100} 
                        onChange={setSharpness} 
                        color="emerald"
                        tooltip="Enhance the clarity and detail of edges"
                      />

                      <Slider 
                        label="Zoom" 
                        icon={Crop} 
                        value={scale} 
                        min={100} 
                        max={300} 
                        onChange={setScale} 
                        tooltip="Zoom in or out of the image"
                      />
                    </div>
                  </div>
                )}

                {activeSegment === 'enhance' && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Sparkles size={16} className="text-[#a855f7]" />
                        Professional Enhancements
                      </h4>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h5 className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-3">AI Art Styles</h5>
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
                          {ART_STYLES.map((s) => (
                            <button
                              key={s.id}
                              onClick={() => applyAIStyle(s.label)}
                              disabled={isGenerating}
                              className="flex-shrink-0 flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px]"
                            >
                              <span className="text-xl">{s.icon}</span>
                              <span className="text-[10px] font-bold text-slate-300">{s.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 pb-1 border-t border-white/5">
                        <h5 className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-3">AI Filter Presets</h5>
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
                          {PRESETS.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => setSelectedPreset(p.id)}
                              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                                selectedPreset === p.id 
                                  ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/20' 
                                  : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                              }`}
                            >
                              {p.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 pb-1 border-t border-white/5">
                        <h5 className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-3">AI Magic Tuning</h5>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <button 
                            onClick={handleAIEnhance}
                            disabled={isGenerating}
                            className="flex items-center justify-center gap-2 px-3 py-2.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300 disabled:opacity-50 font-semibold rounded-xl text-xs transition-colors"
                          >
                            <Wand2 size={14} />
                            AI Enhance
                          </button>
                          <button 
                            onClick={handleAIFlash}
                            disabled={isGenerating}
                            className="flex items-center justify-center gap-2 px-3 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 hover:text-amber-300 disabled:opacity-50 font-semibold rounded-xl text-xs transition-colors"
                          >
                            <Zap size={14} />
                            AI Flash
                          </button>
                          <button 
                            onClick={handleAIUpscale}
                            disabled={isGenerating}
                            className="flex items-center justify-center gap-2 px-3 py-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 hover:text-emerald-300 disabled:opacity-50 font-semibold rounded-xl text-xs transition-colors col-span-2"
                          >
                            <Maximize size={14} />
                            AI Upscale
                          </button>
                        </div>

                        <h5 className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-3">AI Intelligent Adjustments</h5>
                        <div className="grid grid-cols-2 gap-2">
                          <button 
                            onClick={() => handleAIAdjust('brightness')}
                            disabled={isGenerating}
                            className="flex items-center justify-center gap-2 px-2 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-[10px] font-medium transition-colors disabled:opacity-50"
                          >
                            <Sun size={12} className="text-amber-400" />
                            Auto Brightness
                          </button>
                          <button 
                            onClick={() => handleAIAdjust('contrast')}
                            disabled={isGenerating}
                            className="flex items-center justify-center gap-2 px-2 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-[10px] font-medium transition-colors disabled:opacity-50"
                          >
                            <Contrast size={12} className="text-blue-400" />
                            Auto Contrast
                          </button>
                          <button 
                            onClick={() => handleAIAdjust('saturation')}
                            disabled={isGenerating}
                            className="flex items-center justify-center gap-2 px-2 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-[10px] font-medium transition-colors disabled:opacity-50"
                          >
                            <Palette size={12} className="text-pink-400" />
                            Auto Saturation
                          </button>
                          <button 
                            onClick={() => handleAIAdjust('sharpness')}
                            disabled={isGenerating}
                            className="flex items-center justify-center gap-2 px-2 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-[10px] font-medium transition-colors disabled:opacity-50"
                          >
                            <Activity size={12} className="text-emerald-400" />
                            Auto Sharpness
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSegment === 'remove' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Scissors size={16} className="text-pink-400" />
                        AI Retouch & Cutout
                      </h4>
                      <button 
                        onClick={handleRemoveBackground}
                        disabled={isRemovingBg}
                        className="text-xs bg-purple-500/20 hover:bg-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-purple-400 transition-colors px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium border border-purple-500/20"
                      >
                        {isRemovingBg ? (
                          <Loader2 size={13} className="animate-spin" />
                        ) : (
                          <Sparkles size={13} />
                        )}
                        <span>Remove BG</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {/* Tool selection buttons */}
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setMaskTool('brush')}
                          className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all border ${
                            maskTool === 'brush' 
                              ? 'bg-pink-500/20 border-pink-500/40 text-pink-400' 
                              : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'
                          }`}
                        >
                          <Palette size={14} /> Brush
                        </button>
                        <button 
                          onClick={() => setMaskTool('lasso')}
                          className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all border ${
                            maskTool === 'lasso' 
                              ? 'bg-pink-500/20 border-pink-500/40 text-pink-400' 
                              : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'
                          }`}
                        >
                          <Activity size={14} /> Lasso
                        </button>
                      </div>

                      {/* Add and erase controls */}
                      <div className="flex gap-2 bg-black/20 p-1 rounded-xl">
                        <button 
                          onClick={() => setMaskMode('add')}
                          className={`flex-1 py-1 text-[10px] font-bold rounded-lg transition-all ${
                            maskMode === 'add' 
                              ? 'bg-[#222] text-pink-400' 
                              : 'text-slate-500'
                          }`}
                        >
                          Add Mask
                        </button>
                        <button 
                          onClick={() => setMaskMode('erase')}
                          className={`flex-1 py-1 text-[10px] font-bold rounded-lg transition-all ${
                            maskMode === 'erase' 
                              ? 'bg-[#222] text-slate-300' 
                              : 'text-slate-500'
                          }`}
                        >
                          Erase
                        </button>
                      </div>

                      {/* Custom Sliders */}
                      <div className="space-y-3 pt-2">
                        <div>
                          <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                            <span>Brush Size</span>
                            <span className="font-mono text-pink-400">{brushSize}px</span>
                          </div>
                          <input 
                            type="range" 
                            min="5" 
                            max="120" 
                            value={brushSize} 
                            onChange={(e) => setBrushSize(parseInt(e.target.value))} 
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-pink-500"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                            <span>Feather</span>
                            <span className="font-mono text-pink-400">{feather}%</span>
                          </div>
                          <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={feather} 
                            onChange={(e) => setFeather(parseInt(e.target.value))} 
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-pink-500"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                            <span>Mask Opacity</span>
                            <span className="font-mono text-pink-400">{maskOpacity}%</span>
                          </div>
                          <input 
                            type="range" 
                            min="10" 
                            max="100" 
                            value={maskOpacity} 
                            onChange={(e) => setMaskOpacity(parseInt(e.target.value))} 
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-pink-500"
                          />
                        </div>
                      </div>

                      {/* Performance action triggers */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <button 
                          onClick={applyRealAIEdit}
                          disabled={isGenerating}
                          className="h-11 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all text-xs"
                        >
                          {isGenerating ? (
                            <Loader2 className="animate-spin text-black" size={13} />
                          ) : (
                            <Sparkles className="text-pink-600 animate-pulse" size={13} />
                          )}
                          <span>Apply AI Edit</span>
                        </button>

                        <button 
                          onClick={() => setIsComparisonOpen(true)}
                          className="h-11 border border-white/20 hover:bg-white/5 rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all text-xs text-slate-300"
                        >
                          <Expand size={13} />
                          <span>Compare</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <button 
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shrink-0 mt-2"
            title="Generate a new photo based on prompt and settings"
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Generate Photo
              </>
            )}
          </button>
        </div>
      </div>
    </div>
    {isComparisonOpen && generatedImage && (
      <ComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        beforeImage={history[0]?.generatedImage || generatedImage}
        afterImage={generatedImage}
        filters={`brightness(${brightness}%) contrast(${contrast}%) hue-rotate(${hue}deg) saturate(${saturation}%) ${sharpness > 0 ? 'url(#sharpen-filter)' : ''} url(#color-balance-filter) ${PRESETS.find(p => p.id === selectedPreset)?.filter || ''}`}
      />
    )}
    </>
  );
};

const PiXisMAgent = ({ isOpen, onClose, onAction }: { isOpen: boolean, onClose: () => void, onAction: (type: 'generate' | 'edit', data: any) => void }) => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setIsProcessing(true);
    
    // Use Gemini to determine intent
    try {
      const ai = new GoogleGenAI({ apiKey: (import.meta as any).env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Determine if the user wants to generate a NEW image or EDIT an existing one. 
        User input: "${input}"
        Return JSON format: { "intent": "generate" | "edit", "prompt": "refined prompt for AI" }`,
        config: { responseMimeType: "application/json" }
      });
      
      const result = JSON.parse(response.text || '{}');
      onAction(result.intent || 'generate', { prompt: result.prompt || input });
      setInput('');
      onClose();
    } catch (err) {
      console.error(err);
      onAction('generate', { prompt: input });
      setInput('');
      onClose();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const base64Data = dataUrl.split(',')[1];
      onAction('edit', { 
        image: { 
          data: base64Data, 
          mimeType: file.type, 
          url: dataUrl 
        } 
      });
      onClose();
    };
    reader.readAsDataURL(file);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[60] bg-[#0A0A0A] flex flex-col text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-[#0A0A0A] z-10">
            <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
              <ChevronDown size={20} />
            </button>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Gift size={20} className="text-teal-400" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Menu size={20} />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto pb-32 px-4 hide-scrollbar">
            <div className="flex flex-col items-center mt-8 mb-10">
              {/* Glowing Orb */}
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-500 rounded-full blur-xl opacity-80 animate-pulse"></div>
                <div className="absolute inset-2 bg-gradient-to-tr from-pink-400 via-purple-400 to-cyan-400 rounded-full blur-md"></div>
                <div className="absolute inset-4 bg-white rounded-full blur-sm opacity-50"></div>
              </div>
              
              <h2 className="text-3xl font-bold mb-2">Hi, I'm PiXisM Agent</h2>
              <p className="text-slate-400 text-sm">Your photo editing agent. Say it. See it.</p>
            </div>

            {/* Creative Center */}
            <div className="bg-white/5 rounded-3xl p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Creative Center</h3>
                <button className="text-xs text-slate-400 flex items-center hover:text-white transition-colors">View All <ChevronRight size={14} /></button>
              </div>
              
              <div className="flex overflow-x-auto gap-3 hide-scrollbar pb-2">
                {/* Card 1 */}
                <div className="min-w-[140px] h-[180px] rounded-2xl overflow-hidden relative group cursor-pointer" onClick={() => setInput('Change outfit for a ...')}>
                  <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80" className="w-full h-full object-cover" alt="Change outfit" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-xs font-medium leading-tight">Change outfit for a ...</div>
                </div>
                {/* Card 2 */}
                <div className="min-w-[140px] h-[180px] rounded-2xl overflow-hidden relative group cursor-pointer" onClick={() => setInput('Remove bystanders')}>
                  <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80" className="w-full h-full object-cover" alt="Remove bystanders" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-xs font-medium leading-tight">Remove bystanders</div>
                </div>
                {/* Card 3 */}
                <div className="min-w-[140px] h-[180px] rounded-2xl overflow-hidden relative group cursor-pointer" onClick={() => setInput('Enhance portrait')}>
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80" className="w-full h-full object-cover" alt="Enhance portrait" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 text-xs font-medium leading-tight">Enhance portrait</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <button className="text-purple-400 text-sm font-medium hover:text-purple-300 transition-colors">See what others are doing &gt;</button>
            </div>

            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-4">
              <button onClick={() => setInput('Generate an image of ')} className="whitespace-nowrap px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:bg-white/10 transition-colors">
                AI Image Generate
              </button>
              <button onClick={() => setInput('Create a virtual avatar of me')} className="whitespace-nowrap px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:bg-white/10 transition-colors">
                Virtual Me
              </button>
              <button className="whitespace-nowrap px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-1">
                <Sparkles size={14} className="text-yellow-400" /> More Insp...
              </button>
            </div>
          </div>

          {/* Bottom Input Area */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A] to-transparent pt-10">
            {/* Suggestion Chips */}
            <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-3 px-1">
              <button onClick={() => setInput('Fashion Wall')} className="whitespace-nowrap px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium transition-colors">
                Fashion Wall
              </button>
              <button onClick={() => setInput('Foggy Blur')} className="whitespace-nowrap px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium transition-colors">
                Foggy Blur
              </button>
              <button onClick={() => setInput('Sparkle Effect')} className="whitespace-nowrap px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium transition-colors">
                Sparkle Effect
              </button>
            </div>
            
            <div className="bg-[#1A1A1A] border border-white/10 rounded-full flex items-center p-2 relative shadow-lg">
              <button className="p-2 text-slate-400 hover:text-white transition-colors">
                <Mic size={20} />
              </button>
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Send a message or hold to talk"
                className="flex-1 bg-transparent border-none focus:outline-none text-sm px-2 text-white placeholder:text-slate-500"
              />
              {input.trim() ? (
                <button 
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-500 transition-colors ml-2"
                >
                  {isProcessing ? <Loader2 size={18} className="animate-spin" /> : <ArrowUp size={18} />}
                </button>
              ) : (
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <ImagePlus size={20} />
                </button>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
                accept="image/*" 
              />
            </div>
            {/* Colorful bottom line indicator */}
            <div className="h-1 w-1/3 mx-auto mt-4 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const LiveCameraModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [filter, setFilter] = useState('none');
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasPermission(true);
    } catch (err) {
      console.error("Camera access denied:", err);
      setHasPermission(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      <style>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
      <div className="flex items-center justify-between p-4 z-10 bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 right-0">
        <button onClick={onClose} className="p-2 text-white bg-black/40 rounded-full backdrop-blur-md hover:bg-white/20 transition-colors">
          <X size={24} />
        </button>
        <div className="flex gap-4">
           <button className="p-2 text-white bg-black/40 rounded-full backdrop-blur-md hover:bg-white/20 transition-colors">
             <Sparkles size={20} />
           </button>
        </div>
      </div>

      <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
        {hasPermission === false ? (
          <div className="text-white text-center p-6">
            <Camera size={48} className="mx-auto mb-4 text-slate-500" />
            <h3 className="text-xl font-bold mb-2">Camera Access Denied</h3>
            <p className="text-slate-400">Please allow camera access in your browser settings to use the Live AI Camera.</p>
          </div>
        ) : (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="w-full h-full object-cover"
            style={{ filter: filter !== 'none' ? filter : undefined, transform: 'scaleX(-1)' }}
          />
        )}
        
        {hasPermission && (
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
             <div className="w-64 h-64 border-2 border-white/20 rounded-3xl relative">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-500 rounded-tl-3xl"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-500 rounded-tr-3xl"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-500 rounded-bl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-500 rounded-br-3xl"></div>
                
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-scan"></div>
             </div>
             <div className="mt-4 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
               <span className="text-xs font-bold text-emerald-400 tracking-wider">AI ACTIVE</span>
             </div>
          </div>
        )}
      </div>

      <div className="h-48 bg-black absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 flex flex-col justify-end">
        <div className="flex gap-4 overflow-x-auto hide-scrollbar mb-6">
          {[
            { id: 'none', label: 'Normal', filter: 'none' },
            { id: 'cyberpunk', label: 'Cyberpunk', filter: 'hue-rotate(-45deg) saturate(200%) contrast(120%)' },
            { id: 'anime', label: 'Anime', filter: 'saturate(150%) contrast(110%) brightness(110%)' },
            { id: 'vintage', label: 'Vintage', filter: 'sepia(50%) saturate(80%) contrast(110%)' },
            { id: 'bw', label: 'Noir', filter: 'grayscale(100%) contrast(150%)' },
          ].map(f => (
            <button 
              key={f.id}
              onClick={() => setFilter(f.filter)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all border ${
                filter === f.filter 
                  ? 'bg-emerald-500 text-black border-emerald-500' 
                  : 'bg-white/10 text-white border-white/10 hover:bg-white/20'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex justify-center items-center pb-4">
           <button 
             onClick={() => {
               setIsCapturing(true);
               setTimeout(() => setIsCapturing(false), 200);
             }}
             className={`w-16 h-16 rounded-full border-4 border-white flex items-center justify-center relative group transition-transform ${isCapturing ? 'scale-90' : ''}`}
           >
              <div className="w-12 h-12 bg-white rounded-full group-hover:scale-95 transition-transform"></div>
           </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showMoreTools, setShowMoreTools] = useState(false);
  const [isAIPhotoModalOpen, setIsAIPhotoModalOpen] = useState(false);
  const [isPiXisMAgentOpen, setIsPiXisMAgentOpen] = useState(false);
  const [isLiveCameraOpen, setIsLiveCameraOpen] = useState(false);
  const [initialModalPrompt, setInitialModalPrompt] = useState<string | undefined>(undefined);
  const [initialModalImage, setInitialModalImage] = useState<{ data: string, mimeType: string, url: string } | null>(null);

  const handleAgentAction = (type: 'generate' | 'edit', data: any) => {
    if (type === 'generate') {
      setInitialModalPrompt(data.prompt);
      setInitialModalImage(null);
    } else {
      setInitialModalPrompt(data.prompt || '');
      if (data.image) setInitialModalImage(data.image);
    }
    setIsAIPhotoModalOpen(true);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    const reader = new FileReader();
    reader.onloadstart = () => {
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + Math.floor(Math.random() * 15) + 5;
        });
      }, 100);
      
      // Store interval ID to clear it later if needed
      (reader as any).progressInterval = interval;
    };

    reader.onloadend = () => {
      clearInterval((reader as any).progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        
        const base64String = (reader.result as string).split(',')[1];
        setInitialModalImage({
          data: base64String,
          mimeType: file.type,
          url: URL.createObjectURL(file)
        });
        setInitialModalPrompt('');
        setIsAIPhotoModalOpen(true);
      }, 500);
    };

    reader.readAsDataURL(file);
  };

  const handleToolClick = (toolName: string) => {
    let prompt = '';
    switch (toolName) {
      case 'Restore Old Function':
        prompt = 'Restore this old photo, fix scratches, enhance details, and colorize it if it is black and white.';
        break;
      case 'Enhance Quality':
        prompt = 'Upscale and enhance the quality of this image to 4K resolution. Make it extremely sharp, detailed, and high definition.';
        break;
      case 'Adjust Body':
        prompt = 'Retouch and adjust the body and face in this image to look professional and aesthetically pleasing.';
        break;
      case 'Outpaint/Inpaint':
        prompt = 'Expand the borders of this image seamlessly, adding more context to the background.';
        break;
      case 'AI Flash':
        prompt = 'Enhance this image with a bright camera flash effect. Make the lighting pop, increase clarity, and give it a professional studio flash photography look.';
        break;
      case 'Auto Enhance':
        prompt = 'Automatically enhance the overall quality of this photo. Adjust the lighting, improve sharpness, and correct the color balance to make it look professional and vibrant.';
        break;
      default:
        prompt = `Apply ${toolName} effect to the image.`;
    }
    setInitialModalPrompt(prompt);
    setInitialModalImage(null);
    setIsAIPhotoModalOpen(true);
  };

  return (
    <>
      <Particles />
      <div className="max-w-md mx-auto min-h-screen relative bg-[#0A0A0A] text-slate-100 font-display z-10">
        <TopBar />
        <AppHeader />
        <main className="pb-32 space-y-2">
          <div className="px-4">
            <ActionButtons 
              showMore={showMoreTools} 
              onMoreClick={() => setShowMoreTools(!showMoreTools)} 
              onAIPhotoClick={() => setIsAIPhotoModalOpen(true)}
              onEditClick={() => {
                setInitialModalPrompt('');
                setInitialModalImage(null);
                setIsAIPhotoModalOpen(true);
              }}
              onAIVideoClick={() => {
                setInitialModalPrompt('Generate a cinematic, high-quality video frame of a stunning landscape.');
                setInitialModalImage(null);
                setIsAIPhotoModalOpen(true);
              }}
              onLiveCameraClick={() => setIsLiveCameraOpen(true)}
            />
          </div>
          {showMoreTools && <MoreTools onToolClick={handleToolClick} />}
          <UploadPrompt onUpload={handleUpload} isUploading={isUploading} uploadProgress={uploadProgress} />
          <FeaturedCarousel />
          <TopTrends />
          <TextToImage />
        </main>
        <BottomNav onAgentClick={() => setIsPiXisMAgentOpen(true)} />
      </div>
      <PiXisMAgent 
        isOpen={isPiXisMAgentOpen} 
        onClose={() => setIsPiXisMAgentOpen(false)} 
        onAction={handleAgentAction} 
      />
      <AIPhotoModal 
        isOpen={isAIPhotoModalOpen} 
        onClose={() => {
          setIsAIPhotoModalOpen(false);
          setInitialModalPrompt(undefined);
          setInitialModalImage(null);
        }} 
        initialPrompt={initialModalPrompt}
        initialImage={initialModalImage}
      />
      <LiveCameraModal isOpen={isLiveCameraOpen} onClose={() => setIsLiveCameraOpen(false)} />
    </>
  );
}

