import React, { useState, useEffect } from 'react';
import { Droplet, Search, MapPin, Clock, Activity, AlertTriangle, ArrowLeft, Heart, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const AllRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBlood, setFilterBlood] = useState('All');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('/api/requests');
        const data = await response.json();
        setRequests(data.filter(r => r.status === 'pending'));
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const filteredRequests = requests.filter(r => {
    const matchesSearch = r.hospitalName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         r.area?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBlood = filterBlood === 'All' || r.bloodType === filterBlood;
    return matchesSearch && matchesBlood;
  });

  const urgencyConfig = {
    critical: { colors: 'bg-rose-100 text-rose-700 border-rose-200', icon: <Activity size={14}/> },
    high: { colors: 'bg-orange-100 text-orange-700 border-orange-200', icon: <AlertTriangle size={14}/> },
    medium: { colors: 'bg-amber-100 text-amber-700 border-amber-200', icon: <Clock size={14}/> },
    low: { colors: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: <Droplet size={14}/> },
  };

  return (
    <div className="flex-1 md:ml-72 min-h-screen bg-slate-50 relative overflow-x-hidden pt-16 md:pt-0 pb-20">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-50/80 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
      
      <div className="relative z-10 p-5 md:p-10 max-w-[1400px] mx-auto animate-fade-in-up">
        
        <header className="mb-12">
          <Link to="/" className="inline-flex items-center text-slate-400 hover:text-brand-600 font-bold text-sm mb-6 transition-colors group">
            <ArrowLeft size={18} className="mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Dashboard
          </Link>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">
                All Urgent Needs
              </h1>
              <p className="text-slate-500 text-lg font-medium">Browse every active blood requirement across the network.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative w-full sm:w-80 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Search hospital or location..." 
                  className="w-full bg-white border-2 border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-500 shadow-sm transition-all text-slate-700 font-bold"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="relative flex items-center">
                <Filter className="absolute left-4 text-slate-400" size={18} />
                <select 
                  className="bg-white border-2 border-slate-200 rounded-2xl py-4 pl-12 pr-10 outline-none focus:border-brand-500 shadow-sm appearance-none font-black text-slate-900 cursor-pointer"
                  value={filterBlood}
                  onChange={(e) => setFilterBlood(e.target.value)}
                >
                  {['All', 'O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-64 bg-white/50 animate-pulse rounded-[2.5rem] border-2 border-slate-100"></div>
            ))}
          </div>
        ) : filteredRequests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredRequests.map((request) => (
              <div key={request._id} className="glass-panel group hover:border-brand-300 hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-500 p-8 rounded-[2.5rem] relative overflow-hidden flex flex-col h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-500 text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-brand-500/30 group-hover:scale-110 transition-transform duration-500">
                    {request.bloodType}
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest flex items-center gap-2 border-2 ${urgencyConfig[request.urgency]?.colors}`}>
                    {urgencyConfig[request.urgency]?.icon}
                    {request.urgency}
                  </div>
                </div>
                
                <div className="mb-auto relative z-10">
                  <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight group-hover:text-brand-600 transition-colors">{request.hospitalName}</h3>
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-sm mb-6">
                    <MapPin size={16} className="text-brand-500" />
                    {request.area || 'General Location'}
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100 mt-auto flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                    <Clock size={14}/>
                    {new Date(request.createdAt).toLocaleDateString()}
                  </div>
                  <Link 
                    to={`/donate-now/${request._id}`}
                    className="px-6 py-3 bg-slate-900 group-hover:bg-brand-600 text-white font-black rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95 shadow-slate-900/10 group-hover:shadow-brand-500/30 text-center"
                  >
                    Donate Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-8 text-slate-300">
              <Heart size={48} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">No matches found</h3>
            <p className="text-slate-500 font-medium">Try adjusting your filters or search keywords.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRequests;
