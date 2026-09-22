import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import {
    LogOut, Home, Image, FileText, Users, ChevronRight,
    Save, Upload, Check, AlertCircle, Menu, X
} from 'lucide-react';

type ContentMap = Record<string, string>;

type Section = 'hero' | 'recent_projects' | 'programs' | 'about';

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
    recent_projects: [
        { id: 'project_1_title', label: 'Project 1 — Title', type: 'text' },
        { id: 'project_1_description', label: 'Project 1 — Description', type: 'textarea' },
        { id: 'project_1_image', label: 'Project 1 — Image', type: 'image' },
        { id: 'project_2_title', label: 'Project 2 — Title', type: 'text' },
        { id: 'project_2_description', label: 'Project 2 — Description', type: 'textarea' },
        { id: 'project_2_image', label: 'Project 2 — Image', type: 'image' },
        { id: 'project_3_title', label: 'Project 3 — Title', type: 'text' },
        { id: 'project_3_description', label: 'Project 3 — Description', type: 'textarea' },
        { id: 'project_3_image', label: 'Project 3 — Image', type: 'image' },
    ],
    programs: [
        { id: 'program_1_title', label: 'Program 1 — Title', type: 'text' },
        { id: 'program_1_description', label: 'Program 1 — Description', type: 'textarea' },
        { id: 'program_1_image', label: 'Program 1 — Image', type: 'image' },
        { id: 'program_2_title', label: 'Program 2 — Title', type: 'text' },
        { id: 'program_2_description', label: 'Program 2 — Description', type: 'textarea' },
        { id: 'program_2_image', label: 'Program 2 — Image', type: 'image' },
        { id: 'program_3_title', label: 'Program 3 — Title', type: 'text' },
        { id: 'program_3_description', label: 'Program 3 — Description', type: 'textarea' },
        { id: 'program_3_image', label: 'Program 3 — Image', type: 'image' },
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
    };

    const handleChange = (id: string, value: string) => {
        setContent(prev => ({ ...prev, [id]: value }));
        setSaveStatus('idle');
    };

    const handleImageUpload = async (fieldId: string, file: File) => {
        setUploading(prev => ({ ...prev, [fieldId]: true }));
        const ext = file.name.split('.').pop();
        const filename = `${fieldId}-${Date.now()}.${ext}`;
        const { data, error } = await supabase.storage.from('media').upload(filename, file, { upsert: true });
        if (error) { console.error(error); setUploading(prev => ({ ...prev, [fieldId]: false })); return; }
        const { data: urlData } = supabase.storage.from('media').getPublicUrl(data.path);
        handleChange(fieldId, urlData.publicUrl);
        setUploading(prev => ({ ...prev, [fieldId]: false }));
    };

    const handleSave = async () => {
        setSaving(true);
        setSaveStatus('idle');
        const fields = FIELDS[activeSection];
        const upsertData = fields.map(f => ({ id: f.id, value: content[f.id] || '' }));
        const { error } = await supabase.from('content').upsert(upsertData);
        setSaving(false);
        if (error) { setSaveStatus('error'); } else { setSaveStatus('success'); setOriginalContent(prev => ({ ...prev, ...Object.fromEntries(upsertData.map(r => [r.id, r.value])) })); }
        setTimeout(() => setSaveStatus('idle'), 3000);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    const hasUnsavedChanges = FIELDS[activeSection].some(
        f => (content[f.id] || '') !== (originalContent[f.id] || '')
    );

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
                            <img src={value} alt="preview" className="w-full h-full object-cover" />
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
                            {uploading[field.id] ? 'Uploading...' : 'Upload Image'}
                        </button>
                        <input
                            ref={el => { fileInputRefs.current[field.id] = el; }}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e => { if (e.target.files?.[0]) handleImageUpload(field.id, e.target.files[0]); }}
                        />
                        <input
                            type="text"
                            value={value}
                            onChange={e => handleChange(field.id, e.target.value)}
                            placeholder="Or paste image URL..."
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
                <main className="flex-1 overflow-y-auto p-4 sm:p-6">
                    {hasUnsavedChanges && (
                        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 text-sm flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            You have unsaved changes. Click "Save Changes" to apply them to your website.
                        </div>
                    )}

                    <div className="space-y-6 max-w-3xl">
                        {FIELDS[activeSection].map(field => (
                            <div key={field.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">{field.label}</label>
                                {renderField(field)}
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
