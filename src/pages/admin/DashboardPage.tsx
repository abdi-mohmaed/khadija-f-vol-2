import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import {
    LogOut, Home, Image, FileText, Users, ChevronRight,
    Save, Upload, Check, AlertCircle, Menu, X, Plus, Trash2
} from 'lucide-react';

type ContentMap = Record<string, string>;

type Section = 'hero' | 'recent_projects' | 'programs' | 'about';

export interface DynamicItem {
    id: string;
    title: string;
    description: string;
    mediaUrl: string;
    mediaType: 'image' | 'video';
    showInHomepage?: boolean;
}

const SECTIONS: { id: Section; label: string; icon: React.ReactNode }[] = [
    { id: 'hero', label: 'Hero Section', icon: <Home className="w-5 h-5" /> },
    { id: 'recent_projects', label: 'Recent Projects', icon: <Image className="w-5 h-5" /> },
    { id: 'programs', label: 'Our Programs', icon: <FileText className="w-5 h-5" /> },
    { id: 'about', label: 'About Us', icon: <Users className="w-5 h-5" /> },
];

const FIELDS: Record<Section, { id: string; label: string; type: 'text' | 'textarea' | 'image' | 'video' }[]> = {
    hero: [
        { id: 'hero_title', label: 'Main Title', type: 'textarea' },
        { id: 'hero_subtitle', label: 'Subtitle / Description', type: 'textarea' },
        { id: 'hero_image', label: 'Background Image', type: 'image' },
    ],
    recent_projects: [], // Handled dynamically
    programs: [
        // Hero fields for programs page
        { id: 'program_hero_title', label: 'Program Hero Title', type: 'text' },
        { id: 'program_hero_subtitle', label: 'Program Hero Subtitle', type: 'textarea' },
        { id: 'program_hero_media', label: 'Program Hero Background Image/Video', type: 'image' },
        // 10 Static Programs Image Fields
        { id: 'program_1_image', label: '1. Orphanages Support Program Image', type: 'image' },
        { id: 'program_2_image', label: '2. Orphanages School Program Image', type: 'image' },
        { id: 'program_3_image', label: '3. Low Income Families Support Program Image', type: 'image' },
        { id: 'program_4_image', label: '4. Low Income Families Housing Program Image', type: 'image' },
        { id: 'program_5_image', label: '5. Water Supply Aid Program Image', type: 'image' },
        { id: 'program_6_image', label: '6. Food Aid Program Image', type: 'image' },
        { id: 'program_7_image', label: '7. Ramadan Food Aid Program Image', type: 'image' },
        { id: 'program_8_image', label: '8. Eid Adha Program Image', type: 'image' },
        { id: 'program_9_image', label: '9. Charitable Construction to Mosques Program Image', type: 'image' },
        { id: 'program_10_image', label: '10. Charitable Construction to Schools Program Image', type: 'image' },
    ],
    about: [
        { id: 'about_title', label: 'Page Title', type: 'text' },
        { id: 'about_mission', label: 'Mission Statement', type: 'textarea' },
        { id: 'about_hero_image', label: 'Hero Image', type: 'image' },
        { id: 'about_video_url', label: 'Video URL (YouTube embed or direct link)', type: 'video' },
    ],
};

const DashboardPage: React.FC = () => {
    const [activeSection, setActiveSection] = useState<Section>('hero');
    const [content, setContent] = useState<ContentMap>({});
    const [originalContent, setOriginalContent] = useState<ContentMap>({});
    
    // Dynamic Arrays State
    const [projects, setProjects] = useState<DynamicItem[]>([]);
    const [programs, setPrograms] = useState<DynamicItem[]>([]);

    const [saving, setSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [uploading, setUploading] = useState<Record<string, boolean>>({});
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        const { data, error } = await supabase.from('content').select('id, value');
        if (error) { console.error(error); return; }
        const map: ContentMap = {};
        (data || []).forEach((row: { id: string; value: string }) => { map[row.id] = row.value; });
        setContent(map);
        setOriginalContent(map);

        try {
            if (map['projects_data']) setProjects(JSON.parse(map['projects_data']));
            if (map['programs_data']) setPrograms(JSON.parse(map['programs_data']));
        } catch (e) {
            console.error("Failed to parse dynamic data", e);
        }
    };

    // Keep content in sync with dynamic arrays to trigger hasUnsavedChanges
    useEffect(() => {
        setContent(prev => ({
            ...prev,
            projects_data: JSON.stringify(projects)
        }));
    }, [projects]);

    const handleChange = (id: string, value: string) => {
        setContent(prev => ({ ...prev, [id]: value }));
        setSaveStatus('idle');
    };

    const handleDynamicChange = (
        type: 'projects' | 'programs',
        id: string,
        field: keyof DynamicItem,
        value: string
    ) => {
        const setter = type === 'projects' ? setProjects : setPrograms;
        setter(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
        setSaveStatus('idle');
    };

    const addDynamicItem = (type: 'projects' | 'programs') => {
        const setter = type === 'projects' ? setProjects : setPrograms;
        setter(prev => [...prev, {
            id: Date.now().toString(),
            title: '',
            description: '',
            mediaUrl: '',
            mediaType: 'image'
        }]);
        setSaveStatus('idle');
    };

    const removeDynamicItem = (type: 'projects' | 'programs', id: string) => {
        const setter = type === 'projects' ? setProjects : setPrograms;
        setter(prev => prev.filter(item => item.id !== id));
        setSaveStatus('idle');
    };

    const handleImageUpload = async (fieldId: string, file: File, dynamicTarget?: { type: 'projects'|'programs', id: string }) => {
        setUploading(prev => ({ ...prev, [fieldId]: true }));
        const ext = file.name.split('.').pop();
        const filename = `${fieldId}-${Date.now()}.${ext}`;
        const { data, error } = await supabase.storage.from('media').upload(filename, file, { upsert: true });
        if (error) { 
            console.error(error); 
            alert(`Upload failed: ${error.message}\nMake sure you created the 'media' bucket in Supabase Storage!`);
            setUploading(prev => ({ ...prev, [fieldId]: false })); 
            return; 
        }
        const { data: urlData } = supabase.storage.from('media').getPublicUrl(data.path);
        
        if (dynamicTarget) {
            handleDynamicChange(dynamicTarget.type, dynamicTarget.id, 'mediaUrl', urlData.publicUrl);
        } else {
            handleChange(fieldId, urlData.publicUrl);
        }
        setUploading(prev => ({ ...prev, [fieldId]: false }));
    };

    const handleSave = async () => {
        setSaving(true);
        setSaveStatus('idle');
        
        const upsertData: { id: string; value: string }[] = [];
        
        // Save regular fields
        if (FIELDS[activeSection]) {
             const fields = FIELDS[activeSection];
             upsertData.push(...fields.map(f => ({ id: f.id, value: content[f.id] || '' })));
        }

        // Save dynamic fields if on those sections
        if (activeSection === 'recent_projects') {
             upsertData.push({ id: 'projects_data', value: JSON.stringify(projects) });
        }

        const { error } = await supabase.from('content').upsert(upsertData);
        setSaving(false);
        if (error) { 
            setSaveStatus('error'); 
        } else { 
            setSaveStatus('success'); 
            setOriginalContent(prev => ({ ...prev, ...Object.fromEntries(upsertData.map(r => [r.id, r.value])) })); 
        }
        setTimeout(() => setSaveStatus('idle'), 3000);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    const hasUnsavedChanges = (() => {
        if (activeSection === 'recent_projects') {
            return content['projects_data'] !== originalContent['projects_data'];
        }
        return FIELDS[activeSection].some(f => (content[f.id] || '') !== (originalContent[f.id] || ''));
    })();

    const renderDynamicList = (type: 'projects' | 'programs') => {
        const items = type === 'projects' ? projects : programs;
        return (
            <div className="space-y-6 mt-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900 capitalize">{type} List</h2>
                    <button
                        onClick={() => addDynamicItem(type)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                    >
                        <Plus className="w-4 h-4" /> Add {type === 'projects' ? 'Project' : 'Program'}
                    </button>
                </div>

                {items.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500">No items added yet. Click the button above to add one.</p>
                    </div>
                )}

                {items.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative">
                        <button
                            onClick={() => removeDynamicItem(type, item.id)}
                            className="absolute top-4 right-4 text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg transition"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                        
                        <div className="space-y-4 pr-12">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={item.title}
                                    onChange={e => handleDynamicChange(type, item.id, 'title', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                                    placeholder="Enter title..."
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={item.description}
                                    onChange={e => handleDynamicChange(type, item.id, 'description', e.target.value)}
                                    rows={3}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 resize-vertical"
                                    placeholder="Enter description..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Media Type</label>
                                    <select
                                        value={item.mediaType}
                                        onChange={e => handleDynamicChange(type, item.id, 'mediaType', e.target.value as 'image'|'video')}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
                                    >
                                        <option value="image">Image</option>
                                        <option value="video">Video</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Media URL <span className="font-normal text-gray-500 text-xs">(Paste URL or upload)</span>
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={item.mediaUrl}
                                            onChange={e => handleDynamicChange(type, item.id, 'mediaUrl', e.target.value)}
                                            className="flex-1 min-w-0 border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-sm"
                                            placeholder={`https://...`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => fileInputRefs.current[`${type}-${item.id}`]?.click()}
                                            disabled={uploading[`${type}-${item.id}`]}
                                            className="flex items-center justify-center bg-gray-100 border border-gray-300 text-gray-700 px-4 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
                                        >
                                            <Upload className="w-4 h-4" />
                                        </button>
                                        <input
                                            ref={el => { fileInputRefs.current[`${type}-${item.id}`] = el; }}
                                            type="file"
                                            accept={item.mediaType === 'image' ? "image/*" : "video/*"}
                                            className="hidden"
                                            onChange={e => { 
                                                if (e.target.files?.[0]) 
                                                    handleImageUpload(`${type}-${item.id}`, e.target.files[0], { type, id: item.id }); 
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {type === 'projects' && (
                                <div className="flex items-center gap-3 pt-2">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={item.showInHomepage !== false}
                                            onChange={e => {
                                                const setter = setProjects;
                                                setter(prev => prev.map(p => p.id === item.id ? { ...p, showInHomepage: e.target.checked } : p));
                                                setSaveStatus('idle');
                                            }}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                    <span className="text-sm font-semibold text-gray-700">
                                        Show in Homepage ({item.showInHomepage !== false ? 'ON' : 'OFF'})
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {item.showInHomepage !== false ? 'Appears on both homepage slider and project gallery page' : 'Only appears on the projects page'}
                                    </span>
                                </div>
                            )}

                            {/* Media Preview */}
                            {item.mediaUrl && (
                                <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center h-48 w-full max-w-md">
                                    {item.mediaType === 'image' ? (
                                        <img src={item.mediaUrl} alt="Preview" className="max-h-full max-w-full object-contain" />
                                    ) : item.mediaUrl.includes('youtube.com') || item.mediaUrl.includes('youtu.be') ? (
                                        <iframe 
                                            src={item.mediaUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')} 
                                            className="w-full h-full" 
                                            allowFullScreen 
                                        />
                                    ) : (
                                        <video src={item.mediaUrl} controls className="max-h-full max-w-full" />
                                    )}
                                </div>
                            )}

                        </div>
                    </div>
                ))}
            </div>
        );
    }

    const renderField = (field: typeof FIELDS[Section][0]) => {
        const value = content[field.id] || '';
        if (field.type === 'text') {
            return (
                <input
                    type="text"
                    value={value}
                    onChange={e => handleChange(field.id, e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
            );
        }
        if (field.type === 'textarea') {
            return (
                <textarea
                    value={value}
                    onChange={e => handleChange(field.id, e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 resize-vertical"
                />
            );
        }
        if (field.type === 'image') {
            return (
                <div className="space-y-3">
                    {value && (
                        <div className="relative rounded-lg overflow-hidden border border-gray-200 h-40 bg-gray-50">
                            {value.includes('.mp4') || value.includes('video') ? (
                                <video src={value} controls className="w-full h-full object-cover" />
                            ) : (
                                <img src={value} alt="preview" className="w-full h-full object-cover" />
                            )}
                        </div>
                    )}
                    <div className="flex gap-3 flex-wrap">
                        <button
                            type="button"
                            onClick={() => fileInputRefs.current[field.id]?.click()}
                            disabled={uploading[field.id]}
                            className="flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-100 transition text-sm font-medium disabled:opacity-50"
                        >
                            <Upload className="w-4 h-4" />
                            {uploading[field.id] ? 'Uploading...' : 'Upload Media'}
                        </button>
                        <input
                            ref={el => { fileInputRefs.current[field.id] = el; }}
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={e => { if (e.target.files?.[0]) handleImageUpload(field.id, e.target.files[0]); }}
                        />
                        <input
                            type="text"
                            value={value}
                            onChange={e => handleChange(field.id, e.target.value)}
                            placeholder="Or paste media URL..."
                            className="flex-1 min-w-0 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-800"
                        />
                    </div>
                </div>
            );
        }
        if (field.type === 'video') {
            return (
                <div className="space-y-3">
                    <input
                        type="text"
                        value={value}
                        onChange={e => handleChange(field.id, e.target.value)}
                        placeholder="https://youtube.com/embed/... or direct video URL"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    />
                    <div className="flex gap-3 flex-wrap">
                        <button
                            type="button"
                            onClick={() => fileInputRefs.current[field.id]?.click()}
                            disabled={uploading[field.id]}
                            className="flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-100 transition text-sm font-medium disabled:opacity-50"
                        >
                            <Upload className="w-4 h-4" />
                            {uploading[field.id] ? 'Uploading...' : 'Upload Video'}
                        </button>
                        <input
                            ref={el => { fileInputRefs.current[field.id] = el; }}
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={e => { if (e.target.files?.[0]) handleImageUpload(field.id, e.target.files[0]); }}
                        />
                    </div>
                    {value && value.includes('youtube') && (
                        <iframe src={value} className="w-full h-48 rounded-lg border" allowFullScreen />
                    )}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white flex flex-col transform transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-5 border-b border-gray-700 flex items-center justify-between">
                    <div>
                        <p className="font-bold text-white text-sm">Khadija Foundation</p>
                        <p className="text-gray-400 text-xs mt-0.5">Content Manager</p>
                    </div>
                    <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {SECTIONS.map(section => (
                        <button
                            key={section.id}
                            onClick={() => { setActiveSection(section.id); setSidebarOpen(false); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm font-medium ${activeSection === section.id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
                        >
                            {section.icon}
                            {section.label}
                            {activeSection === section.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition text-sm font-medium"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Bar */}
                <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button className="lg:hidden text-gray-600 hover:text-gray-900" onClick={() => setSidebarOpen(true)}>
                            <Menu className="w-6 h-6" />
                        </button>
                        <div>
                            <h1 className="text-lg font-bold text-gray-900">{SECTIONS.find(s => s.id === activeSection)?.label}</h1>
                            <p className="text-xs text-gray-500">Edit and save content changes</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={saving || !hasUnsavedChanges}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition ${saveStatus === 'success' ? 'bg-green-600 text-white' :
                                saveStatus === 'error' ? 'bg-red-600 text-white' :
                                    hasUnsavedChanges ? 'bg-blue-600 text-white hover:bg-blue-700' :
                                        'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {saving ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : saveStatus === 'success' ? (
                            <Check className="w-4 h-4" />
                        ) : saveStatus === 'error' ? (
                            <AlertCircle className="w-4 h-4" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {saving ? 'Saving...' : saveStatus === 'success' ? 'Saved!' : saveStatus === 'error' ? 'Error!' : 'Save Changes'}
                    </button>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24">
                    {hasUnsavedChanges && (
                        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 text-sm flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            You have unsaved changes. Click "Save Changes" to apply them to your website.
                        </div>
                    )}

                    <div className="space-y-6 max-w-3xl">
                        {/* Static Fields */}
                        {FIELDS[activeSection].map(field => (
                            <div key={field.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">{field.label}</label>
                                {renderField(field)}
                            </div>
                        ))}

                        {/* Dynamic Lists */}
                        {activeSection === 'recent_projects' && renderDynamicList('projects')}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
