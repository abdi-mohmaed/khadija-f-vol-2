import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Play } from 'lucide-react';

export interface DynamicItem {
    id: string;
    title: string;
    description: string;
    mediaUrl: string;
    mediaType: 'image' | 'video';
}

const ProjectsPage: React.FC = () => {
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
                setProjects(JSON.parse(data.value));
            } catch (e) {
                console.error("Failed to parse projects", e);
            }
        }
        setLoading(false);
    };

    const documentaries = projects.filter(p => p.mediaType === 'video');
    const gallery = projects.filter(p => p.mediaType === 'image');

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pt-24 pb-20">
            {/* Header Section */}
            <div className="bg-blue-900 text-white py-16 mb-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 transform transition-all hover:scale-105 duration-300">Our Projects & Documentaries</h1>
                    <p className="text-blue-100 max-w-2xl mx-auto text-lg">
                        Explore the impact of our work through images and videos from the ground.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Documentary Section */}
                {documentaries.length > 0 && (
                    <div className="mb-20">
                        <div className="flex items-center gap-3 mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">Documentary</h2>
                            <div className="h-1 flex-1 bg-gradient-to-r from-blue-600 to-transparent opacity-20 rounded"></div>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                            {documentaries.map((doc, i) => (
                                <div 
                                    key={doc.id} 
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
                                >
                                    <div className="relative aspect-video bg-gray-900 overflow-hidden">
                                        {doc.mediaUrl.includes('youtube.com') || doc.mediaUrl.includes('youtu.be') ? (
                                            <iframe
                                                src={doc.mediaUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                                                className="w-full h-full"
                                                allowFullScreen
                                            />
                                        ) : (
                                            <video
                                                src={doc.mediaUrl}
                                                controls
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500 pointer-events-none"></div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">{doc.title}</h3>
                                        <p className="text-gray-600 line-clamp-2">{doc.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Gallery Section */}
                {gallery.length > 0 && (
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">Gallery</h2>
                            <div className="h-1 flex-1 bg-gradient-to-r from-blue-600 to-transparent opacity-20 rounded"></div>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {gallery.map((img, i) => (
                                <div 
                                    key={img.id} 
                                    className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-1"
                                >
                                    <div className="aspect-square bg-gray-200 overflow-hidden">
                                        <img
                                            src={img.mediaUrl}
                                            alt={img.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                        <h3 className="text-white font-bold text-lg mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{img.title}</h3>
                                        <p className="text-gray-200 text-sm line-clamp-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{img.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {projects.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Play className="w-10 h-10 text-blue-300" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Check back later!</h3>
                        <p className="text-gray-500">We are currently uploading new projects and documentaries.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectsPage;
