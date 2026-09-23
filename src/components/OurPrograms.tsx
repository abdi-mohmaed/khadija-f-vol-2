import React, { useState, useEffect } from 'react';
import { ArrowRight, Heart, GraduationCap, Home, Droplets, Utensils, Gift, Building, School, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface DynamicItem {
    id: string;
    title: string;
    description: string;
    mediaUrl: string;
    mediaType: 'image' | 'video';
}

const defaultPrograms = [
    {
      title: "Orphanages Support Program",
      description: "Providing comprehensive care, emotional support, and essential resources for orphaned children across Somaliland, ensuring they receive the love and attention they deserve.",
      mediaUrl: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600",
      mediaType: 'image' as const,
      id: "1"
    },
    {
      title: "Orphanages School Program",
      description: "Establishing and supporting educational facilities specifically for orphaned children, providing quality education and creating pathways to brighter futures.",
      mediaUrl: "https://images.pexels.com/photos/8613313/pexels-photo-8613313.jpeg?auto=compress&cs=tinysrgb&w=600",
      mediaType: 'image' as const,
      id: "2"
    },
    {
      title: "Low Income Families Support Program",
      description: "Offering financial assistance, healthcare support, and essential resources to vulnerable families struggling with poverty and economic hardship.",
      mediaUrl: "https://images.pexels.com/photos/6647003/pexels-photo-6647003.jpeg?auto=compress&cs=tinysrgb&w=600",
      mediaType: 'image' as const,
      id: "3"
    },
    {
      title: "Low Income Families Housing Program",
      description: "Building and renovating homes for families in need, providing safe, dignified housing solutions that create stable foundations for family life.",
      mediaUrl: "https://images.pexels.com/photos/8363028/pexels-photo-8363028.jpeg?auto=compress&cs=tinysrgb&w=600",
      mediaType: 'image' as const,
      id: "4"
    },
    {
      title: "Water Supply Aid Program",
      description: "Developing sustainable water infrastructure including wells, water purification systems, and distribution networks to address critical water shortages in rural communities.",
      mediaUrl: "https://images.pexels.com/photos/8923671/pexels-photo-8923671.jpeg?auto=compress&cs=tinysrgb&w=600",
      mediaType: 'image' as const,
      id: "5"
    },
    {
      title: "Food Aid Program",
      description: "Providing emergency food assistance and establishing sustainable food security programs for families and communities facing hunger and malnutrition.",
      mediaUrl: "https://images.pexels.com/photos/6647120/pexels-photo-6647120.jpeg?auto=compress&cs=tinysrgb&w=600",
      mediaType: 'image' as const,
      id: "6"
    },
    {
      title: "Ramadan Food Aid Program",
      description: "Special food distribution program during the holy month of Ramadan, providing iftar meals and food packages to ensure no family goes without during this sacred time.",
      mediaUrl: "https://images.pexels.com/photos/8363102/pexels-photo-8363102.jpeg?auto=compress&cs=tinysrgb&w=600",
      mediaType: 'image' as const,
      id: "7"
    },
    {
      title: "Eid Adha Program",
      description: "Celebrating Eid al-Adha by providing meat distribution to needy families, ensuring everyone can participate in this important religious celebration with dignity.",
      mediaUrl: "https://images.pexels.com/photos/6646866/pexels-photo-6646866.jpeg?auto=compress&cs=tinysrgb&w=600",
      mediaType: 'image' as const,
      id: "8"
    },
    {
      title: "Charitable Construction to Mosques Program",
      description: "Building and renovating mosques to serve as spiritual centers for communities, providing places of worship, learning, and community gathering.",
      mediaUrl: "https://images.pexels.com/photos/8363103/pexels-photo-8363103.jpeg?auto=compress&cs=tinysrgb&w=600",
      mediaType: 'image' as const,
      id: "9"
    },
    {
      title: "Charitable Construction to Schools Program",
      description: "Constructing modern educational facilities equipped with proper classrooms, libraries, and learning resources to advance education in underserved areas.",
      mediaUrl: "https://images.pexels.com/photos/8923672/pexels-photo-8923672.jpeg?auto=compress&cs=tinysrgb&w=600",
      mediaType: 'image' as const,
      id: "10"
    }
];

const OurPrograms = () => {
    const [programs, setPrograms] = useState<DynamicItem[]>([]);
    const [heroData, setHeroData] = useState({
        title: "Our Programs",
        subtitle: "Discover how Khadija Foundation is making a difference through our multiple core program areas addressing critical needs in Somaliland.",
        media: "https://images.pexels.com/photos/6647001/pexels-photo-6647001.jpeg?auto=compress&cs=tinysrgb&w=1200"
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const { data, error } = await supabase.from('content').select('id, value');
        if (!error && data) {
            const map: Record<string, string> = {};
            data.forEach(d => { map[d.id] = d.value; });

            if (map['program_hero_title']) setHeroData(p => ({ ...p, title: map['program_hero_title'] }));
            if (map['program_hero_subtitle']) setHeroData(p => ({ ...p, subtitle: map['program_hero_subtitle'] }));
            if (map['program_hero_media']) setHeroData(p => ({ ...p, media: map['program_hero_media'] }));

            if (map['programs_data']) {
                try {
                    const parsed = JSON.parse(map['programs_data']);
                    if (parsed && parsed.length > 0) {
                        setPrograms(parsed);
                    } else {
                        setPrograms(defaultPrograms);
                    }
                } catch (e) {
                    setPrograms(defaultPrograms);
                }
            } else {
                setPrograms(defaultPrograms);
            }
        } else {
            setPrograms(defaultPrograms);
        }
    };

    const isVideoBackground = heroData.media.includes('.mp4') || heroData.media.includes('video');

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="pt-20 md:pt-24 pb-16 md:pb-24 relative overflow-hidden">
                {isVideoBackground ? (
                    <video 
                        src={heroData.media} 
                        autoPlay 
                        muted 
                        loop 
                        playsInline 
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <div 
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url('${heroData.media}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    ></div>
                )}
                
                <div className="absolute inset-0 bg-blue-600/85"></div>
                
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{heroData.title}</h1>
                        <p className="text-xl md:text-2xl mb-8 opacity-90">
                            {heroData.subtitle}
                        </p>
                        <div className="flex flex-wrap justify-center gap-8 text-center">
                            <div>
                                <div className="text-3xl md:text-4xl font-bold">10</div>
                                <div className="text-blue-200">Core Programs</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-bold">22K+</div>
                                <div className="text-blue-200">Lives Impacted</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl font-bold">15+</div>
                                <div className="text-blue-200">Years of Service</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Programs Grid */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Programs</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Each program is designed to address specific challenges facing communities in Somaliland, creating sustainable solutions and lasting impact.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {programs.map((program, index) => (
                            <div key={program.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="md:flex h-full">
                                    <div className="md:w-1/3">
                                        <div className="h-48 md:h-full overflow-hidden bg-gray-100">
                                            {program.mediaType === 'video' ? (
                                                <video 
                                                    src={program.mediaUrl} 
                                                    className="w-full h-full object-cover"
                                                    controls
                                                />
                                            ) : (
                                                <img 
                                                    src={program.mediaUrl} 
                                                    alt={program.title}
                                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="md:w-2/3 p-6 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center mb-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                                    <Star className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900">{program.title}</h3>
                                            </div>
                                            <p className="text-gray-600 mb-4 text-sm leading-relaxed">{program.description}</p>
                                        </div>
                                        <a href="#" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 text-sm mt-auto">
                                            Learn More
                                            <ArrowRight className="w-4 h-4 ml-1" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 md:py-24 relative overflow-hidden">
                <div 
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url('https://images.pexels.com/photos/6647002/pexels-photo-6647002.jpeg?auto=compress&cs=tinysrgb&w=1200')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                ></div>
                <div className="absolute inset-0 bg-blue-600/85"></div>
                
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Support Our Programs</h2>
                        <p className="text-xl mb-8 opacity-90">
                            Your contribution can help us expand these vital programs and reach even more communities in need across Somaliland.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a href="#" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition whitespace-nowrap">
                                Donate Now
                            </a>
                            <a href="#" className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition whitespace-nowrap">
                                Become a Partner
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OurPrograms;