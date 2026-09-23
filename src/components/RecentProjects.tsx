import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

interface DynamicItem {
    id: string;
    title: string;
    description: string;
    mediaUrl: string;
    mediaType: 'image' | 'video';
    showInHomepage?: boolean;
}

const defaultProjects = [
    {
        id: "1",
        title: "Our school in Burco graduating and ranking on top",
        description: "We not only focus on their education but also their wellbeing, emotional support, health care, and transport access. We thank the families, teachers, and school staff for all they have done.",
        mediaUrl: "https://static.readdy.ai/image/adf562689ffc9835cd635ce609fa5c86/08bc1dc1514cfc09b8f523c5806be1eb.jfif",
        mediaType: 'image' as const
    },
    {
        id: "2",
        title: "Water aid support across the country",
        description: "We try to reach places that most NGOs or foreign aid don't reach during drought seasons. Thousands of people rely on us every year for critical water access.",
        mediaUrl: "https://static.readdy.ai/image/adf562689ffc9835cd635ce609fa5c86/e0eabc37b88dcf27bd2e2c27ba369097.jfif",
        mediaType: 'image' as const
    },
    {
        id: "3",
        title: "Youth Employment & Support",
        description: "Unemployment is an issue that we are still trying to solve in our communities through hands-on training and youth initiatives.",
        mediaUrl: "https://static.readdy.ai/image/adf562689ffc9835cd635ce609fa5c86/a83fce7a3fe8d834f9495c5e7350bd70.jfif",
        mediaType: 'image' as const
    }
];

const RecentProjects = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [projects, setProjects] = useState<DynamicItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const { data, error } = await supabase
            .from('content')
            .select('value')
            .eq('id', 'projects_data')
            .single();

        if (!error && data?.value) {
            try {
                const parsed = JSON.parse(data.value);
                if (parsed && parsed.length > 0) {
                    setProjects(parsed.filter((p: DynamicItem) => p.showInHomepage !== false));
                } else {
                    setProjects(defaultProjects);
                }
            } catch (e) {
                console.error("Failed to parse projects", e);
                setProjects(defaultProjects);
            }
        } else {
            setProjects(defaultProjects);
        }
        setLoading(false);
    };

    // Auto-advance slideshow
    useEffect(() => {
        if (projects.length === 0) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % projects.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [projects.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % projects.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);

    if (loading || projects.length === 0) {
        return <div className="h-96 bg-gray-900 flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>;
    }

    const activeProject = projects[currentSlide];

    return (
        <section className="relative w-full bg-gray-900 overflow-hidden min-h-[600px] flex items-center">
            {activeProject.mediaType === 'video' ? (
                 <div className="absolute inset-0 bg-black">
                     {activeProject.mediaUrl.includes('youtube.com') || activeProject.mediaUrl.includes('youtu.be') ? (
                         <iframe 
                             src={`${activeProject.mediaUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}?autoplay=1&mute=1&controls=0&loop=1&playlist=${activeProject.mediaUrl.split('v=')[1] || ''}`}
                             className="absolute inset-0 w-full h-full object-cover scale-[1.3] opacity-60 pointer-events-none"
                             allow="autoplay; fullscreen"
                         />
                     ) : (
                         <video 
                             src={activeProject.mediaUrl} 
                             autoPlay 
                             muted 
                             loop 
                             playsInline 
                             className="absolute inset-0 w-full h-full object-cover opacity-60"
                         />
                     )}
                 </div>
            ) : (
                <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out transform scale-105"
                    style={{ backgroundImage: `url(${activeProject.mediaUrl})` }}
                >
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>
            )}

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-32">
                <div className="text-center md:text-left mb-6">
                    <h2 className="text-sm uppercase tracking-wider font-semibold text-gray-300 mb-2">Recent Projects Spotlight</h2>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="w-full md:w-2/3 lg:w-1/2 md:pr-8">
                        <div className="mb-4 flex gap-3">
                            {activeProject.mediaType === 'video' && (
                                <span className="inline-flex items-center gap-1 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    <PlayCircle className="w-3 h-3" /> Video
                                </span>
                            )}
                        </div>
                        <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight transition-all duration-500 min-h-[100px] md:min-h-[120px]">
                            {activeProject.title}
                        </h3>

                        <p className="text-lg text-gray-200 mb-8 max-w-xl transition-all duration-500 min-h-[90px]">
                            {activeProject.description}
                        </p>

                        <Link to="/projects" className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition whitespace-nowrap shadow-lg group">
                            View this here
                            <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Navigation Controls */}
            {projects.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all z-20"
                        aria-label="Previous project"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all z-20"
                        aria-label="Next project"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>

                    {/* Slide Indicators */}
                    <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3 z-20">
                        {projects.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-blue-500 w-8' : 'bg-white/50 hover:bg-white/80'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
};

export default RecentProjects;