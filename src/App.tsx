import React, { useEffect, useState } from 'react';
import { Signal, Wifi, Battery, Edit3, Film, Sparkles, ChevronUp, ChevronDown, ChevronRight, Home, Wand2, Compass, User, Bot, History, Zap, UserCheck, Expand, X, Loader2, Download } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'motion/react';

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

const BottomNav = () => (
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
        <button className="w-16 h-16 rounded-full orb-glow flex items-center justify-center relative overflow-hidden active:scale-90 transition-transform shadow-2xl">
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

const AIPhotoModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: (import.meta as any).env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: prompt,
            },
          ],
        },
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#1A1A1A] rounded-3xl w-full max-w-sm overflow-hidden border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="text-blue-500" size={20} />
            AI Photo Generator
          </h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/10">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">What do you want to see?</label>
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
          
          {error && (
            <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-xl border border-red-400/20">
              {error}
            </div>
          )}
          
          {generatedImage && (
            <div className="rounded-xl overflow-hidden border border-white/10 aspect-square relative group">
              <img src={generatedImage} alt="Generated AI Photo" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <a 
                  href={generatedImage} 
                  download="ai-generated-photo.png"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 transition-colors"
                >
                  <Download size={18} />
                  Save Photo
                </a>
              </div>
            </div>
          )}
          
          <button 
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
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

export default function App() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showMoreTools, setShowMoreTools] = useState(false);
  const [isAIPhotoModalOpen, setIsAIPhotoModalOpen] = useState(false);

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
        <BottomNav />
      </div>
      <AIPhotoModal isOpen={isAIPhotoModalOpen} onClose={() => setIsAIPhotoModalOpen(false)} />
    </>
  );
}

