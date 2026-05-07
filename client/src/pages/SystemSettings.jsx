import React, { useState } from 'react';
import { 
  Settings, User, Bell, Shield, Database, 
  Save, Trash2, Camera, Mail, Phone, 
  MapPin, Globe, CheckCircle2, AlertCircle
} from 'lucide-react';

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [saveStatus, setSaveStatus] = useState(null);

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 3000);
    }, 1500);
  };

  const tabs = [
    { id: 'profile', icon: User, label: 'General Profile' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'inventory', icon: Database, label: 'Inventory Opts' },
    { id: 'security', icon: Shield, label: 'App Security' },
  ];

  return (
    <div className="flex-1 md:ml-72 min-h-screen bg-slate-50 pt-20 md:pt-10 pb-20 px-5">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-xl shadow-slate-900/20">
              <Settings size={22} className="animate-spin" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">System Settings</h1>
              <p className="text-slate-500 font-medium">Manage your hospital profile and application preferences.</p>
            </div>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Settings Sidebar */}
          <aside className="lg:w-72">
            <div className="glass-panel p-3 rounded-[2rem] shadow-xl border border-white/40 mb-6 bg-white/40">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all duration-300 ${
                      activeTab === tab.id 
                        ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30 -translate-y-1' 
                        : 'text-slate-500 hover:bg-white hover:text-slate-900 active:scale-95'
                    }`}
                  >
                    <tab.icon size={20} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
            
            <button className="w-full flex items-center justify-center gap-2 p-5 bg-rose-50 text-rose-600 border-2 border-rose-100 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-rose-100 transition-colors">
              <Trash2 size={18} /> Delete Account
            </button>
          </aside>

          {/* Settings Content */}
          <main className="flex-1">
            <div className="glass-panel p-8 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden bg-white/80 border border-white">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

              {activeTab === 'profile' && (
                <div className="space-y-10 animate-fade-in-up">
                  <div className="flex flex-col sm:flex-row items-center gap-8 border-b border-slate-100 pb-10">
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-[2.5rem] bg-slate-200 flex items-center justify-center text-slate-400 overflow-hidden shadow-inner border-2 border-white">
                        <User size={64} strokeWidth={1} />
                      </div>
                      <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-brand-600 text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-brand-700 transition-colors">
                        <Camera size={18} />
                      </button>
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-3xl font-black text-slate-900 leading-none mb-2 tracking-tight">Kauvery Hospital</h3>
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Hospital ID: #KH-2026-TRICHY</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { icon: Mail, label: 'contact Email', val: 'kauvery@hospitals.com' },
                      { icon: Phone, label: 'emergency Contact', val: '+91 98765 43210' },
                      { icon: MapPin, label: 'primary location', val: 'Trichy Main Road, TN' },
                      { icon: Globe, label: 'official website', val: 'www.kauveryhospital.com' }
                    ].map((item) => (
                      <div key={item.label}>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 pl-1">{item.label}</label>
                        <div className="relative">
                          <item.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                          <input 
                            type="text" 
                            defaultValue={item.val}
                            className="w-full bg-slate-50 border-2 border-slate-100/60 rounded-2xl p-4 pl-12 outline-none focus:border-brand-500 font-bold text-slate-900 transition-all shadow-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-8 animate-fade-in-up">
                  <h3 className="text-2xl font-black text-slate-900 mb-8 border-b border-slate-100 pb-5">Notification Preferences</h3>
                  {[
                    { title: 'Urgent Request Alerts', desc: 'Notify me when blood inventory is critically low.' },
                    { title: 'Donor Acceptances', desc: 'Instant alert when a donor commits to a request.' },
                    { title: 'System Updates', desc: 'Receive info about new platform features.' },
                    { title: 'Monthly Reports', desc: 'Email summaries of donation activity.' }
                  ].map((notif, idx) => (
                    <div key={idx} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-3xl border border-slate-100/60 hover:bg-white transition-colors group">
                      <div className="max-w-[80%]">
                        <h4 className="font-extrabold text-slate-900 mb-1 group-hover:text-brand-600 transition-colors">{notif.title}</h4>
                        <p className="text-slate-500 text-xs font-medium">{notif.desc}</p>
                      </div>
                      <div className="w-12 h-6 bg-slate-200 rounded-full relative p-1 cursor-pointer transition-colors hover:bg-brand-100">
                        <div className="w-4 h-4 bg-white rounded-full shadow-md ml-auto"></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'inventory' && (
                <div className="space-y-10 animate-fade-in-up">
                  <div className="flex items-start gap-4 p-6 bg-amber-50 text-amber-700 rounded-[2rem] border-2 border-amber-100/50">
                    <AlertCircle className="shrink-0 animate-pulse" size={24} />
                    <div>
                      <h4 className="font-black uppercase tracking-widest text-xs mb-1">Stock Warning</h4>
                      <p className="text-xs font-bold leading-relaxed opacity-80">Manual inventory reporting is required until the ERP sync is activated.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {['O+', 'O-', 'A+', 'A-'].map(type => (
                      <div key={type} className="bg-white border-2 border-slate-100 rounded-3xl p-6 shadow-sm hover:border-brand-200 transition-all text-center">
                        <div className="text-xs font-black text-slate-400 mb-2">{type} Status</div>
                        <select className="bg-transparent font-black text-lg outline-none text-brand-600 cursor-pointer">
                          <option>Optimal</option>
                          <option selected>Low</option>
                          <option>Critical</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-10 animate-fade-in-up">
                  <h3 className="text-2xl font-black text-slate-900 mb-8 border-b border-slate-100 pb-5">Access & Security</h3>
                  <div className="space-y-6 max-w-md">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 pl-1">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 outline-none focus:border-brand-500 font-bold" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 pl-1">New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 outline-none focus:border-brand-500 font-bold" />
                    </div>
                    <div className="p-6 bg-emerald-50 text-emerald-700 rounded-3xl border border-emerald-100">
                      <div className="flex items-center gap-3 mb-2 font-black text-xs uppercase tracking-widest">
                        <CheckCircle2 size={16} /> 2FA Active
                      </div>
                      <p className="text-[10px] font-bold opacity-80 leading-relaxed">Your account is secured with biometric and email-based authentication.</p>
                    </div>
                  </div>
                </div>
              )}

              <footer className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6 relative z-10">
                <div className="flex items-center gap-3 text-slate-400 text-sm font-bold order-2 sm:order-1">
                  <Clock size={18} /> Last synced: 2 mins ago
                </div>
                <button 
                  onClick={handleSave}
                  disabled={saveStatus === 'saving'}
                  className={`order-1 sm:order-2 px-12 py-5 rounded-2xl font-black flex items-center gap-3 transition-all duration-300 shadow-2xl relative overflow-hidden group ${
                    saveStatus === 'saved' ? 'bg-emerald-600 text-white shadow-emerald-500/20' : 'bg-slate-900 text-white shadow-slate-900/20 active:scale-95'
                  }`}
                >
                  <div className={`absolute inset-0 bg-brand-600 w-0 group-hover:w-full transition-all duration-500 z-0 ${saveStatus === 'saved' ? 'hidden' : ''}`}></div>
                  <span className="relative z-10 flex items-center gap-3">
                    {saveStatus === 'saving' ? 'Applying...' : 
                     saveStatus === 'saved' ? <><CheckCircle2 size={24} /> Changes Applied</> : 
                     <><Save size={20} /> Save Configuration</>}
                  </span>
                </button>
              </footer>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
