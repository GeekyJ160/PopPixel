import React, { useEffect, useState, useRef } from 'react';
import { Signal, Wifi, Battery, Edit3, Film, Sparkles, ChevronUp, ChevronDown, ChevronRight, Home, Wand2, Compass, User, Bot, History, Zap, UserCheck, Expand, X, Loader2, Download, ImagePlus, RotateCcw, RotateCw, Sun, Contrast, Crop, Check, Scissors, Palette, Droplets, Activity, Moon, SunMedium, SunDim } from 'lucide-react';
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

const ActionButtons = ({ showMore, onMoreClick, onAIPhotoClick }: { showMore: boolean, onMoreClick: () => void, onAIPhotoClick: () => void }) => (
  <header className="grid grid-cols-4 gap-3 mt-2">
    <button className="flex flex-col items-center justify-center aspect-square bg-[#1A1A1A] rounded-2xl hover:bg-white/10 transition-all group">
      <div className="bg-slate-800 p-2 rounded-xl mb-2 group-active:scale-95 transition-transform">
        <Edit3 className="text-[#7C3AED] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" size={24} />
      </div>
      <span className="text-xs font-medium">Edit</span>
    </button>
    <button className="flex flex-col items-center justify-center aspect-square bg-[#1A1A1A] rounded-2xl hover:bg-white/10 transition-all group">
      <div className="bg-slate-800 p-2 rounded-xl mb-2 group-active:scale-95 transition-transform">
        <Film className="text-pink-500 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" size={24} />
      </div>
      <span className="text-xs font-medium">AI Video</span>
    </button>
    <button onClick={onAIPhotoClick} className="flex flex-col items-center justify-center aspect-square bg-[#1A1A1A] rounded-2xl hover:bg-white/10 transition-all group">
      <div className="bg-slate-800 p-2 rounded-xl mb-2 group-active:scale-95 transition-transform">
        <Sparkles className="text-blue-500 transition-transform duration-500 group-hover:rotate-180 group-hover:scale-110" size={24} />
      </div>
      <span className="text-xs font-medium">AI Photo</span>
    </button>
    <button onClick={onMoreClick} className="flex flex-col items-center justify-center aspect-square bg-[#1A1A1A] rounded-2xl hover:bg-white/10 transition-all group">
      <div className="bg-slate-800 p-2 rounded-xl mb-2 group-active:scale-95 transition-transform">
        {showMore ? (
          <ChevronUp className="text-slate-400 transition-transform duration-300 group-hover:-translate-y-1" size={24} />
        ) : (
          <ChevronDown className="text-slate-400 transition-transform duration-300 group-hover:translate-y-1" size={24} />
        )}
      </div>
      <span className="text-xs font-medium">{showMore ? 'Less' : 'More'}</span>
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

  const handleRemove = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  if (items.length === 0) return null;

  return (
    <section className="mt-2">
      <div className="flex overflow-x-auto gap-4 hide-scrollbar py-2 px-4">
        <AnimatePresence>
          {items.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 1, scale: 1, width: 280 }}
              exit={{ opacity: 0, scale: 0.8, width: 0, marginRight: 0 }}
              transition={{ duration: 0.3 }}
              className="relative min-w-[280px] h-[160px] rounded-[24px] overflow-hidden flex-shrink-0 group"
            >
              <img alt={item.alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={item.image}/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
              <button 
                onClick={() => handleRemove(item.id)}
                className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 transition-colors backdrop-blur-md p-1.5 rounded-full border border-white/10 flex items-center justify-center z-10"
              >
                <X className="text-white" size={16} />
              </button>
              <div className="absolute bottom-4 left-5 flex items-center gap-2 pointer-events-none">
                <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-md">
                  <Edit3 size={16} className="text-white" />
                </div>
                <h3 className="text-white text-xl font-bold leading-tight">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
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
        <span className="text-[10px] font-bold uppercase tracking-wide mt-2 text-[#9D4EDD]">Agent Pop</span>
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

const AIPhotoModal = ({ isOpen, onClose, initialPrompt, initialImage }: { isOpen: boolean, onClose: () => void, initialPrompt?: string, initialImage?: { data: string, mimeType: string, url: string } | null }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [referenceImage, setReferenceImage] = useState<{ data: string, mimeType: string, url: string } | null>(null);
  const [style, setStyle] = useState('photorealistic');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  
  useEffect(() => {
    if (isOpen) {
      if (initialPrompt) setPrompt(initialPrompt);
      if (initialImage) {
        setReferenceImage(initialImage);
        // If an image is provided, we might want to start in edit mode if it's already generated?
        // But referenceImage is for generation. If we want to edit an existing image, 
        // we should probably set generatedImage.
        setGeneratedImage(initialImage.url);
      }
    } else {
      // Reset when closing
      setPrompt('');
      setGeneratedImage(null);
      setReferenceImage(null);
      setError(null);
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
  const [crop, setCrop] = useState<ReactCropType>();
  const [completedCrop, setCompletedCrop] = useState<ReactCropType | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      const ai = new GoogleGenAI({ apiKey: (import.meta as any).env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY });
      
      const parts: any[] = [];
      if (referenceImage) {
        parts.push({
          inlineData: {
            data: referenceImage.data,
            mimeType: referenceImage.mimeType
          }
        });
      }
      
      const finalPrompt = `${prompt}, style: ${style}`;
      parts.push({ text: finalPrompt });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio,
          }
        }
      });
      
      let imageUrl = null;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          imageUrl = `data:image/png;base64,${base64EncodeString}`;
          break;
        }
      }
      
      if (imageUrl) {
        setGeneratedImage(imageUrl);
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
      const ai = new GoogleGenAI({ apiKey: (import.meta as any).env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY });
      
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
      
      const parts = [
        {
          inlineData: {
            data: base64Data,
            mimeType: mimeType
          }
        },
        { text: promptText }
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio,
          }
        }
      });
      
      let imageUrl = null;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          imageUrl = `data:image/png;base64,${base64EncodeString}`;
          break;
        }
      }
      
      if (imageUrl) {
        setGeneratedImage(imageUrl);
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

  const applyAIStyle = (styleName: string) => {
    applyAIEffect(`Redraw this exact image in a highly detailed ${styleName} art style. Maintain the original composition and subject matter.`);
  };

  const handleAIFlash = () => {
    applyAIEffect("Enhance this image with a bright camera flash effect. Make the lighting pop, increase clarity, and give it a professional studio flash photography look while keeping the exact same subject and composition.");
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
    { id: 'watercolor', label: 'Watercolor', icon: '🎨' },
    { id: 'cyberpunk', label: 'Cyberpunk', icon: '🌆' },
    { id: 'anime', label: 'Anime', icon: '✨' },
    { id: 'oil-painting', label: 'Oil Painting', icon: '🖼️' },
    { id: 'sketch', label: 'Pencil Sketch', icon: '✏️' },
    { id: '3d-render', label: '3D Render', icon: '🧊' },
    { id: 'pixel-art', label: 'Pixel Art', icon: '👾' },
    { id: 'cinematic', label: 'Cinematic', icon: '🎬' },
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
                  <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                    className="w-full h-full"
                  >
                    <img 
                      ref={imgRef}
                      src={generatedImage} 
                      alt="Generated AI Photo" 
                      className="w-full h-full object-cover" 
                      style={{
                        filter: `brightness(${brightness}%) contrast(${contrast}%) hue-rotate(${hue}deg) saturate(${saturation}%) ${sharpness > 0 ? 'url(#sharpen-filter)' : ''} url(#color-balance-filter) ${PRESETS.find(p => p.id === selectedPreset)?.filter || ''}`,
                        transform: `rotate(${rotation}deg) scale(${scale / 100})`,
                      }}
                    />
                  </ReactCrop>
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
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        onClick={handleDownload}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 transition-colors"
                      >
                        <Download size={18} />
                        Save Photo
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Editing Tools */}
              <div className="bg-[#1A1A1A] p-5 rounded-2xl border border-white/10 shadow-inner space-y-5 mt-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Edit3 size={16} className="text-blue-400" />
                    Adjustments
                  </h4>
                  <div className="flex gap-2 items-center">
                    {isCropping ? (
                      <button 
                        onClick={applyCrop}
                        className="text-xs bg-blue-500 hover:bg-blue-600 text-white transition-colors px-3 py-1.5 rounded-lg flex items-center gap-1 font-medium"
                      >
                        <Check size={14} />
                        Apply Crop
                      </button>
                    ) : (
                      <button 
                        onClick={() => setIsCropping(true)}
                        className="text-xs bg-white/10 hover:bg-white/20 text-white transition-colors px-3 py-1.5 rounded-lg flex items-center gap-1 font-medium"
                      >
                        <Crop size={14} />
                        Crop
                      </button>
                    )}
                    <button 
                      onClick={handleRemoveBackground}
                      disabled={isRemovingBg}
                      className="text-xs bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors px-3 py-1.5 rounded-lg flex items-center gap-1 font-medium"
                      title="Remove Background"
                    >
                      {isRemovingBg ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Scissors size={14} />
                      )}
                      <span className="hidden sm:inline">Remove BG</span>
                    </button>
                    <button 
                      onClick={handleAIFlash}
                      disabled={isGenerating}
                      className="text-xs bg-amber-500/20 hover:bg-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-amber-400 transition-colors px-3 py-1.5 rounded-lg flex items-center gap-1 font-medium"
                      title="AI Flash"
                    >
                      {isGenerating ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Zap size={14} />
                      )}
                      <span className="hidden sm:inline">AI Flash</span>
                    </button>
                    <div className="w-px h-4 bg-white/10 mx-1"></div>
                    <button 
                      onClick={() => { setBrightness(100); setContrast(100); setHue(0); setSaturation(100); setSharpness(0); setShadows(0); setMidtones(0); setHighlights(0); setScale(100); setRotation(0); setSelectedPreset('none'); }}
                      className="text-xs text-slate-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/5"
                    >
                      Reset
                    </button>
                    <div className="w-px h-4 bg-white/10 mx-1"></div>
                    <button 
                      onClick={() => setRotation(r => r - 90)}
                      className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-slate-300 transition-colors"
                      title="Rotate Left"
                    >
                      <RotateCcw size={14} />
                    </button>
                    <button 
                      onClick={() => setRotation(r => r + 90)}
                      className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-slate-300 transition-colors"
                      title="Rotate Right"
                    >
                      <RotateCw size={14} />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="pt-2 pb-1 border-t border-white/5">
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
                              ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20' 
                              : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                      <span className="flex items-center gap-1.5"><Sun size={14} className="text-slate-400" /> Brightness</span>
                      <motion.span 
                        key={brightness}
                        initial={{ scale: 1.2, color: '#60A5FA' }}
                        animate={{ scale: 1, color: '#94A3B8' }}
                        className="bg-black/50 px-2 py-0.5 rounded border border-white/5 w-12 text-center"
                      >
                        {brightness}%
                      </motion.span>
                    </div>
                    <div className="relative flex items-center h-4 group">
                      <div className="absolute w-full h-1.5 bg-white/10 rounded-full pointer-events-none overflow-hidden">
                        <motion.div 
                          className="h-full bg-blue-500 rounded-full" 
                          initial={false}
                          animate={{ width: `${(brightness / 200) * 100}%` }}
                          transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
                        />
                      </div>
                      <input 
                        type="range" min="0" max="200" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))}
                        className="absolute w-full h-1.5 appearance-none bg-transparent cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 hover:[&::-webkit-slider-thumb]:scale-125 active:[&::-webkit-slider-thumb]:scale-110 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:duration-150 hover:[&::-moz-range-thumb]:scale-125 active:[&::-moz-range-thumb]:scale-110"
                      />
                      <div 
                        className="absolute -top-8 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none transform -translate-x-1/2"
                        style={{ left: `${(brightness / 200) * 100}%` }}
                      >
                        {brightness}%
                        <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-blue-500"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                      <span className="flex items-center gap-1.5"><Contrast size={14} className="text-slate-400" /> Contrast</span>
                      <motion.span 
                        key={contrast}
                        initial={{ scale: 1.2, color: '#60A5FA' }}
                        animate={{ scale: 1, color: '#94A3B8' }}
                        className="bg-black/50 px-2 py-0.5 rounded border border-white/5 w-12 text-center"
                      >
                        {contrast}%
                      </motion.span>
                    </div>
                    <div className="relative flex items-center h-4 group">
                      <div className="absolute w-full h-1.5 bg-white/10 rounded-full pointer-events-none overflow-hidden">
                        <motion.div 
                          className="h-full bg-blue-500 rounded-full" 
                          initial={false}
                          animate={{ width: `${(contrast / 200) * 100}%` }}
                          transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
                        />
                      </div>
                      <input 
                        type="range" min="0" max="200" value={contrast} onChange={(e) => setContrast(Number(e.target.value))}
                        className="absolute w-full h-1.5 appearance-none bg-transparent cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 hover:[&::-webkit-slider-thumb]:scale-125 active:[&::-webkit-slider-thumb]:scale-110 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:duration-150 hover:[&::-moz-range-thumb]:scale-125 active:[&::-moz-range-thumb]:scale-110"
                      />
                      <div 
                        className="absolute -top-8 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none transform -translate-x-1/2"
                        style={{ left: `${(contrast / 200) * 100}%` }}
                      >
                        {contrast}%
                        <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-blue-500"></div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 pb-1 border-t border-white/5 mt-4">
                    <h5 className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-3">Color Balance</h5>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                      <span className="flex items-center gap-1.5"><Moon size={14} className="text-slate-400" /> Shadows</span>
                      <motion.span 
                        key={shadows}
                        initial={{ scale: 1.2, color: '#60A5FA' }}
                        animate={{ scale: 1, color: '#94A3B8' }}
                        className="bg-black/50 px-2 py-0.5 rounded border border-white/5 w-12 text-center"
                      >
                        {shadows > 0 ? `+${shadows}` : shadows}
                      </motion.span>
                    </div>
                    <div className="relative flex items-center h-4 group">
                      <div className="absolute w-full h-1.5 bg-white/10 rounded-full pointer-events-none overflow-hidden">
                        <motion.div 
                          className="h-full bg-slate-500 rounded-full" 
                          initial={false}
                          animate={{ width: `${((shadows + 100) / 200) * 100}%` }}
                          transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
                        />
                      </div>
                      <input 
                        type="range" min="-100" max="100" value={shadows} onChange={(e) => setShadows(Number(e.target.value))}
                        className="absolute w-full h-1.5 appearance-none bg-transparent cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 hover:[&::-webkit-slider-thumb]:scale-125 active:[&::-webkit-slider-thumb]:scale-110 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:duration-150 hover:[&::-moz-range-thumb]:scale-125 active:[&::-moz-range-thumb]:scale-110"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                      <span className="flex items-center gap-1.5"><SunDim size={14} className="text-slate-400" /> Midtones</span>
                      <motion.span 
                        key={midtones}
                        initial={{ scale: 1.2, color: '#60A5FA' }}
                        animate={{ scale: 1, color: '#94A3B8' }}
                        className="bg-black/50 px-2 py-0.5 rounded border border-white/5 w-12 text-center"
                      >
                        {midtones > 0 ? `+${midtones}` : midtones}
                      </motion.span>
                    </div>
                    <div className="relative flex items-center h-4 group">
                      <div className="absolute w-full h-1.5 bg-white/10 rounded-full pointer-events-none overflow-hidden">
                        <motion.div 
                          className="h-full bg-orange-500 rounded-full" 
                          initial={false}
                          animate={{ width: `${((midtones + 100) / 200) * 100}%` }}
                          transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
                        />
                      </div>
                      <input 
                        type="range" min="-100" max="100" value={midtones} onChange={(e) => setMidtones(Number(e.target.value))}
                        className="absolute w-full h-1.5 appearance-none bg-transparent cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 hover:[&::-webkit-slider-thumb]:scale-125 active:[&::-webkit-slider-thumb]:scale-110 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:duration-150 hover:[&::-moz-range-thumb]:scale-125 active:[&::-moz-range-thumb]:scale-110"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                      <span className="flex items-center gap-1.5"><SunMedium size={14} className="text-slate-400" /> Highlights</span>
                      <motion.span 
                        key={highlights}
                        initial={{ scale: 1.2, color: '#60A5FA' }}
                        animate={{ scale: 1, color: '#94A3B8' }}
                        className="bg-black/50 px-2 py-0.5 rounded border border-white/5 w-12 text-center"
                      >
                        {highlights > 0 ? `+${highlights}` : highlights}
                      </motion.span>
                    </div>
                    <div className="relative flex items-center h-4 group">
                      <div className="absolute w-full h-1.5 bg-white/10 rounded-full pointer-events-none overflow-hidden">
                        <motion.div 
                          className="h-full bg-yellow-500 rounded-full" 
                          initial={false}
                          animate={{ width: `${((highlights + 100) / 200) * 100}%` }}
                          transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
                        />
                      </div>
                      <input 
                        type="range" min="-100" max="100" value={highlights} onChange={(e) => setHighlights(Number(e.target.value))}
                        className="absolute w-full h-1.5 appearance-none bg-transparent cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 hover:[&::-webkit-slider-thumb]:scale-125 active:[&::-webkit-slider-thumb]:scale-110 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:duration-150 hover:[&::-moz-range-thumb]:scale-125 active:[&::-moz-range-thumb]:scale-110"
                      />
                    </div>
                  </div>

                  <div className="pt-2 pb-1 border-t border-white/5 mt-4">
                    <h5 className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-3">Color & Detail</h5>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                      <span className="flex items-center gap-1.5"><Palette size={14} className="text-slate-400" /> Hue (Color Shift)</span>
                      <motion.span 
                        key={hue}
                        initial={{ scale: 1.2, color: '#60A5FA' }}
                        animate={{ scale: 1, color: '#94A3B8' }}
                        className="bg-black/50 px-2 py-0.5 rounded border border-white/5 w-12 text-center"
                      >
                        {hue}°
                      </motion.span>
                    </div>
                    <div className="relative flex items-center h-4 group">
                      <div className="absolute w-full h-1.5 bg-white/10 rounded-full pointer-events-none overflow-hidden">
                        <div 
                          className="absolute inset-0 opacity-30"
                          style={{ background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)' }}
                        />
                        <motion.div 
                          className="h-full bg-white/40 rounded-full relative z-10" 
                          initial={false}
                          animate={{ width: `${(hue / 360) * 100}%` }}
                          transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
                        />
                      </div>
                      <input 
                        type="range" min="0" max="360" value={hue} onChange={(e) => setHue(Number(e.target.value))}
                        className="absolute w-full h-1.5 appearance-none bg-transparent cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 hover:[&::-webkit-slider-thumb]:scale-125 active:[&::-webkit-slider-thumb]:scale-110 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:duration-150 hover:[&::-moz-range-thumb]:scale-125 active:[&::-moz-range-thumb]:scale-110"
                      />
                      <div 
                        className="absolute -top-8 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none transform -translate-x-1/2"
                        style={{ left: `${(hue / 360) * 100}%` }}
                      >
                        {hue}°
                        <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-blue-500"></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                      <span className="flex items-center gap-1.5"><Droplets size={14} className="text-slate-400" /> Saturation (Intensity)</span>
                      <motion.span 
                        key={saturation}
                        initial={{ scale: 1.2, color: '#60A5FA' }}
                        animate={{ scale: 1, color: '#94A3B8' }}
                        className="bg-black/50 px-2 py-0.5 rounded border border-white/5 w-12 text-center"
                      >
                        {saturation}%
                      </motion.span>
                    </div>
                    <div className="relative flex items-center h-4 group">
                      <div className="absolute w-full h-1.5 bg-white/10 rounded-full pointer-events-none overflow-hidden">
                        <div 
                          className="absolute inset-0 opacity-20"
                          style={{ background: 'linear-gradient(to right, #4b5563, #3b82f6, #1d4ed8)' }}
                        />
                        <motion.div 
                          className="h-full bg-blue-500 rounded-full relative z-10" 
                          initial={false}
                          animate={{ width: `${(saturation / 200) * 100}%` }}
                          transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
                        />
                      </div>
                      <input 
                        type="range" min="0" max="200" value={saturation} onChange={(e) => setSaturation(Number(e.target.value))}
                        className="absolute w-full h-1.5 appearance-none bg-transparent cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 hover:[&::-webkit-slider-thumb]:scale-125 active:[&::-webkit-slider-thumb]:scale-110 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:duration-150 hover:[&::-moz-range-thumb]:scale-125 active:[&::-moz-range-thumb]:scale-110"
                      />
                      <div 
                        className="absolute -top-8 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none transform -translate-x-1/2"
                        style={{ left: `${(saturation / 200) * 100}%` }}
                      >
                        {saturation}%
                        <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-blue-500"></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                      <span className="flex items-center gap-1.5"><Activity size={14} className="text-slate-400" /> Sharpness (Clarity)</span>
                      <motion.span 
                        key={sharpness}
                        initial={{ scale: 1.2, color: '#60A5FA' }}
                        animate={{ scale: 1, color: '#94A3B8' }}
                        className="bg-black/50 px-2 py-0.5 rounded border border-white/5 w-12 text-center"
                      >
                        {sharpness}%
                      </motion.span>
                    </div>
                    <div className="relative flex items-center h-4 group">
                      <div className="absolute w-full h-1.5 bg-white/10 rounded-full pointer-events-none overflow-hidden">
                        <motion.div 
                          className="h-full bg-emerald-500 rounded-full" 
                          initial={false}
                          animate={{ width: `${sharpness}%` }}
                          transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
                        />
                      </div>
                      <input 
                        type="range" min="0" max="100" value={sharpness} onChange={(e) => setSharpness(Number(e.target.value))}
                        className="absolute w-full h-1.5 appearance-none bg-transparent cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 hover:[&::-webkit-slider-thumb]:scale-125 active:[&::-webkit-slider-thumb]:scale-110 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:duration-150 hover:[&::-moz-range-thumb]:scale-125 active:[&::-moz-range-thumb]:scale-110"
                      />
                      <div 
                        className="absolute -top-8 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none transform -translate-x-1/2"
                        style={{ left: `${sharpness}%` }}
                      >
                        {sharpness}%
                        <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-emerald-500"></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                      <span className="flex items-center gap-1.5"><Crop size={14} className="text-slate-400" /> Zoom</span>
                      <motion.span 
                        key={scale}
                        initial={{ scale: 1.2, color: '#60A5FA' }}
                        animate={{ scale: 1, color: '#94A3B8' }}
                        className="bg-black/50 px-2 py-0.5 rounded border border-white/5 w-12 text-center"
                      >
                        {scale}%
                      </motion.span>
                    </div>
                    <div className="relative flex items-center h-4 group">
                      <div className="absolute w-full h-1.5 bg-white/10 rounded-full pointer-events-none overflow-hidden">
                        <motion.div 
                          className="h-full bg-blue-500 rounded-full" 
                          initial={false}
                          animate={{ width: `${((scale - 100) / 200) * 100}%` }}
                          transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
                        />
                      </div>
                      <input 
                        type="range" min="100" max="300" value={scale} onChange={(e) => setScale(Number(e.target.value))}
                        className="absolute w-full h-1.5 appearance-none bg-transparent cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150 hover:[&::-webkit-slider-thumb]:scale-125 active:[&::-webkit-slider-thumb]:scale-110 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:duration-150 hover:[&::-moz-range-thumb]:scale-125 active:[&::-moz-range-thumb]:scale-110"
                      />
                      <div 
                        className="absolute -top-8 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none transform -translate-x-1/2"
                        style={{ left: `${((scale - 100) / 200) * 100}%` }}
                      >
                        {scale}%
                        <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-blue-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <button 
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shrink-0 mt-2"
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
  );
};

const AgentPop = ({ isOpen, onClose, onAction }: { isOpen: boolean, onClose: () => void, onAction: (type: 'generate' | 'edit', data: any) => void }) => {
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
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-24 left-4 right-4 z-[60] max-w-md mx-auto"
        >
          <div className="bg-[#1A1A1A]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Agent Pop</h3>
                  <p className="text-[10px] text-slate-400">How can I help you today?</p>
                </div>
              </div>
              <button onClick={onClose} className="p-1 hover:bg-white/5 rounded-full transition-colors">
                <X size={18} className="text-slate-400" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="relative">
                <textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe an image or edits..."
                  className="w-full bg-black/40 border border-white/5 rounded-2xl p-3 pr-12 text-sm focus:outline-none focus:border-purple-500/50 transition-colors min-h-[80px] resize-none"
                />
                <button 
                  onClick={handleSubmit}
                  disabled={isProcessing || !input.trim()}
                  className="absolute bottom-3 right-3 p-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 rounded-xl transition-colors"
                >
                  {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />}
                </button>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 py-2.5 rounded-xl text-xs font-medium transition-colors"
                >
                  <ImagePlus size={16} className="text-blue-400" />
                  Upload Image
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  className="hidden" 
                  accept="image/*" 
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showMoreTools, setShowMoreTools] = useState(false);
  const [isAIPhotoModalOpen, setIsAIPhotoModalOpen] = useState(false);
  const [isAgentPopOpen, setIsAgentPopOpen] = useState(false);
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

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setUploadProgress(0);
            // Here you would typically handle the uploaded file
            alert('Photo uploaded successfully!');
          }, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 200);
  };

  const handleToolClick = (toolName: string) => {
    alert(`Feature '${toolName}' is ready for implementation!`);
  };

  return (
    <>
      <Particles />
      <div className="max-w-md mx-auto min-h-screen relative bg-[#0A0A0A] text-slate-100 font-display z-10">
        <TopBar />
        <main className="pb-32 space-y-2">
          <div className="px-4">
            <ActionButtons 
              showMore={showMoreTools} 
              onMoreClick={() => setShowMoreTools(!showMoreTools)} 
              onAIPhotoClick={() => setIsAIPhotoModalOpen(true)}
            />
          </div>
          {showMoreTools && <MoreTools onToolClick={handleToolClick} />}
          <UploadPrompt onUpload={handleUpload} isUploading={isUploading} uploadProgress={uploadProgress} />
          <FeaturedCarousel />
          <TopTrends />
          <TextToImage />
        </main>
        <BottomNav onAgentClick={() => setIsAgentPopOpen(true)} />
      </div>
      <AgentPop 
        isOpen={isAgentPopOpen} 
        onClose={() => setIsAgentPopOpen(false)} 
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
    </>
  );
}

