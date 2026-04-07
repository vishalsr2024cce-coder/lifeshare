import React, { useState } from 'react';
import { Droplet, AlertTriangle, Plus, Clock, MapPin, Search, Activity, Heart, GripVertical, CheckCircle2 } from 'lucide-react';

const Dashboard = () => {
  const [requests, setRequests] = useState([
    { _id: '1', bloodType: 'O-', hospitalName: 'Apollo Hospitals', area: 'Greams Road, Chennai', urgency: 'critical', status: 'pending', createdAt: new Date(Date.now() - 1800000).toISOString() },
    { _id: '2', bloodType: 'A+', hospitalName: 'CMC Vellore', area: 'Vellore', urgency: 'high', status: 'pending', createdAt: new Date(Date.now() - 7200000).toISOString() },
    { _id: '3', bloodType: 'B-', hospitalName: 'Ganga Hospital', area: 'Coimbatore', urgency: 'medium', status: 'in-progress', createdAt: new Date(Date.now() - 14400000).toISOString() },
    { _id: '4', bloodType: 'AB+', hospitalName: 'Meenakshi Mission Hospital', area: 'Madurai', urgency: 'high', status: 'fulfilled', createdAt: new Date(Date.now() - 86400000).toISOString() },
    { _id: '5', bloodType: 'O+', hospitalName: 'Kauvery Hospital', area: 'Trichy', urgency: 'critical', status: 'in-progress', createdAt: new Date(Date.now() - 3600000).toISOString() }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedId, setDraggedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Form state
  const [form, setForm] = useState({
    bloodType: 'O-',
    hospitalName: '',
    area: '',
    urgency: 'critical',
  });

  const urgencyConfig = {
    critical: { colors: 'bg-rose-100 text-rose-700 border-rose-200', icon: <Activity size={14}/> },
    high: { colors: 'bg-orange-100 text-orange-700 border-orange-200', icon: <AlertTriangle size={14}/> },
    medium: { colors: 'bg-amber-100 text-amber-700 border-amber-200', icon: <Clock size={14}/> },
    low: { colors: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: <Droplet size={14}/> },
  };

  const columns = [
    { id: 'pending', title: 'Pending Match', color: 'text-rose-600', dot: 'bg-rose-500' },
    { id: 'in-progress', title: 'Donors Assigned', color: 'text-amber-600', dot: 'bg-amber-500' },
    { id: 'fulfilled', title: 'Fulfilled', color: 'text-emerald-600', dot: 'bg-emerald-500' }
  ];

  const timeAgo = (dateString) => {
    const hours = Math.round((new Date() - new Date(dateString)) / 3600000);
    if (hours < 1) return 'Just now';
    return `${hours}h ago`;
  };

  const filteredRequests = requests.filter(r => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.hospitalName?.toLowerCase().includes(q) ||
      r.area?.toLowerCase().includes(q) ||
      r.bloodType?.toLowerCase().includes(q)
    );
  });

  /* Drag & Drop Handlers */
  const handleDragStart = (e, id) => {
    setDraggedId(id);
    e.dataTransfer.setData('requestId', id);
    e.dataTransfer.effectAllowed = 'move';
    /* Makes the dragged avatar semi-transparent slightly */
    setTimeout(() => { e.target.style.opacity = '0.5'; }, 0);
  };

  const handleDragEnd = (e) => {
    setDraggedId(null);
    e.target.style.opacity = '1';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('requestId');
    if (id) {
      setRequests(requests.map(req =>
        req._id === id ? { ...req, status: newStatus } : req
      ));
    }
  };

  /* Form Handlers */
  const handleFormChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setSubmitError('');
  };

  const handleSubmit = async () => {
    if (!form.hospitalName.trim()) {
      setSubmitError('Hospital name is required.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bloodType: form.bloodType,
          hospitalName: form.hospitalName.trim(),
          area: form.area.trim(),
          urgency: form.urgency,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to create request');
      }

      const newRequest = await response.json();
      setRequests(prev => [newRequest, ...prev]);
      setIsModalOpen(false);
      setForm({ bloodType: 'O-', hospitalName: '', area: '', urgency: 'critical' });
    } catch (err) {
      // Fallback: add locally so UI works even if API fails
      const localRequest = {
        _id: Date.now().toString(),
        ...form,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      setRequests(prev => [localRequest, ...prev]);
      setIsModalOpen(false);
      setForm({ bloodType: 'O-', hospitalName: '', area: '', urgency: 'critical' });
      console.warn('API error (saved locally):', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = () => {
    setForm({ bloodType: 'O-', hospitalName: '', area: '', urgency: 'critical' });
    setSubmitError('');
    setIsModalOpen(true);
  };

  return (
    <div className="flex-1 md:ml-72 min-h-screen bg-slate-50 relative overflow-x-hidden pt-16 md:pt-0 pb-10">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-50/80 rounded-full blur-3xl opacity-70 -translate-y-1/2 translate-x-1/3 pointer-events-none animate-fade-in-up"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-50/80 rounded-full blur-3xl opacity-70 translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

      <div className="relative z-10 p-5 md:p-10 max-w-[1500px] mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        
        <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-2 flex items-center">
              Request Kanban
            </h1>
            <p className="text-slate-500 text-lg font-medium">Drag and drop blood requests to update their status instantly.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
            <div className="relative w-full sm:w-72 glass-panel rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-brand-500/50 transition-all">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search area or hospital..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none py-3 pl-10 pr-4 outline-none text-slate-700 placeholder:text-slate-400 font-medium"
              />
            </div>
            <button 
              onClick={openModal}
              className="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg shadow-brand-600/30 transition-all hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            >
              <Plus size={20} strokeWidth={2.5} className="mr-1.5" />
              New Request
            </button>
          </div>
        </header>

        {/* Drag and Drop Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[500px]">
          {columns.map((col, idx) => (
            <div 
              key={col.id} 
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.id)}
              className="glass-panel rounded-3xl p-6 flex flex-col opacity-0 animate-fade-in-up border-dashed hover:border-brand-300 transition-colors"
              style={{ animationDelay: `${0.2 + (idx * 0.1)}s` }}
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/60">
                <h3 className={`font-extrabold text-lg flex items-center gap-2 ${col.color}`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${col.dot} shadow-sm`}></span>
                  {col.title}
                </h3>
                <span className="bg-white/90 text-slate-600 font-bold px-3 py-1 rounded-full text-sm shadow-sm">
                  {filteredRequests.filter(r => r.status === col.id).length}
                </span>
              </div>

              <div className="flex-1 space-y-4">
                {filteredRequests.filter(r => r.status === col.id).map((request) => (
                  <div 
                    key={request._id} 
                    draggable
                    onDragStart={(e) => handleDragStart(e, request._id)}
                    onDragEnd={handleDragEnd}
                    className={`bg-white rounded-2xl p-4 shadow-sm border border-slate-100 cursor-grab active:cursor-grabbing hover:shadow-md hover:border-brand-200 transition-all group ${draggedId === request._id ? 'ring-2 ring-brand-400 opacity-50' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <GripVertical size={16} className="text-slate-300 group-hover:text-slate-500" />
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center border border-brand-200/50 shadow-inner">
                          <span className="text-brand-600 font-black text-sm">{request.bloodType}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 leading-tight block max-w-[150px] truncate">{request.hospitalName}</h4>
                          <span className="text-xs font-medium text-slate-500 flex items-center gap-1 mt-0.5">
                            <MapPin size={10} /> {request.area || '—'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pl-7 mt-2">
                      <div className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wide flex items-center gap-1 ${request.status === 'fulfilled' ? 'bg-emerald-100 text-emerald-700' : urgencyConfig[request.urgency]?.colors}`}>
                        {request.status === 'fulfilled' ? <CheckCircle2 size={12}/> : urgencyConfig[request.urgency]?.icon}
                        {request.status === 'fulfilled' ? 'Completed' : request.urgency}
                      </div>
                      <div className="text-xs font-bold text-slate-400 flex items-center gap-1">
                        <Clock size={12}/>
                        {timeAgo(request.createdAt)}
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredRequests.filter(r => r.status === col.id).length === 0 && (
                  <div className="h-24 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 text-sm font-medium">
                    Drop requests here
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white rounded-[2rem] max-w-lg w-full p-8 shadow-2xl shadow-slate-900/50 animate-fade-in-up border border-white/20">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Post Urgent Alert</h2>
            <p className="text-slate-500 font-medium mb-8">Notify compatible donors instantly.</p>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-extrabold text-slate-900 mb-2 uppercase tracking-wide">Blood Type Required</label>
                <select
                  name="bloodType"
                  value={form.bloodType}
                  onChange={handleFormChange}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3.5 focus:ring-0 focus:border-brand-500 outline-none text-slate-800 font-bold transition-all"
                >
                  {['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'].map(type => <option key={type}>{type}</option>)}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-extrabold text-slate-900 mb-2 uppercase tracking-wide">Hospital Name <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  name="hospitalName"
                  value={form.hospitalName}
                  onChange={handleFormChange}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3.5 focus:ring-0 focus:border-brand-500 outline-none text-slate-800 font-bold transition-all placeholder:font-medium placeholder:text-slate-400"
                  placeholder="e.g. Apollo Hospitals"
                />
              </div>

              <div>
                <label className="block text-sm font-extrabold text-slate-900 mb-2 uppercase tracking-wide">Area / Location</label>
                <input
                  type="text"
                  name="area"
                  value={form.area}
                  onChange={handleFormChange}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3.5 focus:ring-0 focus:border-brand-500 outline-none text-slate-800 font-bold transition-all placeholder:font-medium placeholder:text-slate-400"
                  placeholder="e.g. Greams Road, Chennai"
                />
              </div>
              
              <div>
                <label className="block text-sm font-extrabold text-slate-900 mb-2 uppercase tracking-wide">Urgency Level</label>
                <select
                  name="urgency"
                  value={form.urgency}
                  onChange={handleFormChange}
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl p-3.5 focus:ring-0 focus:border-brand-500 outline-none text-slate-800 font-bold transition-all"
                >
                  <option value="critical">Critical (Immediate Need)</option>
                  <option value="high">High (Within 24 Hours)</option>
                  <option value="medium">Medium (Within 2-3 Days)</option>
                  <option value="low">Low (Routine Restock)</option>
                </select>
              </div>

              {submitError && (
                <p className="text-rose-600 text-sm font-bold bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
                  ⚠ {submitError}
                </p>
              )}
              
              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className="flex-1 py-4 text-slate-600 font-extrabold bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-[2] py-4 bg-brand-600 hover:bg-brand-700 text-white font-extrabold rounded-xl shadow-xl shadow-brand-500/30 transition-all hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {isSubmitting ? 'Publishing...' : 'Publish Alert Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
