import React, { useState, useEffect } from 'react';
import { Droplet, Heart, Award, ArrowRight, Activity, Calendar, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const DonorHome = () => {
  const [urgentRequests, setUrgentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('/api/requests');
        const data = await response.json();
        setUrgentRequests(data.filter(r => r.status === 'pending').slice(0, 3));
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="flex-1 md:ml-72 min-h-screen bg-slate-50 relative overflow-x-hidden pt-16 md:pt-0 pb-10">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-50/80 rounded-full blur-3xl opacity-70 -translate-y-1/2 translate-x-1/3 pointer-events-none animate-fade-in-up"></div>

      <div className="relative z-10 p-5 md:p-10 max-w-[1200px] mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <header className="mb-10 mt-5">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
            Welcome back, <span className="text-brand-600">Arjun!</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium">You've saved 3 lives so far. You are eligible to donate again in 14 days.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Donor ID Card */}
          <div className="glass-card rounded-3xl p-8 bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-xl shadow-brand-500/20 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 blur-xl rounded-full"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start mb-8">
                <div className="bg-white/20 px-3 py-1.5 rounded-lg text-xs font-bold tracking-widest uppercase">Verified Donor</div>
                <Droplet className="text-white/60" size={32} />
              </div>
              <div>
                <p className="text-brand-100 text-sm font-semibold uppercase tracking-wider mb-1">Blood Group</p>
                <div className="flex items-end gap-3">
                  <h2 className="text-6xl font-black leading-none">O+</h2>
                  <span className="text-brand-200 font-bold mb-1">Universal Donor</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-8 -right-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <Heart size={150} />
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-panel rounded-3xl p-6 flex flex-col justify-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex flex-col items-center justify-center mb-4 border border-amber-200/50">
                <Award size={24} strokeWidth={2.5} />
              </div>
              <h3 className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-1">Donation Tier</h3>
              <h4 className="text-2xl font-extrabold text-slate-900">Gold Savior</h4>
              <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
                <div className="bg-amber-500 h-full w-[60%] rounded-full"></div>
              </div>
              <p className="text-xs text-slate-400 font-bold mt-2">2 donations away from Platinum</p>
            </div>

            <div className="glass-panel rounded-3xl p-6 flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-24 h-24 bg-emerald-500/10 blur-xl rounded-full"></div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex flex-col items-center justify-center mb-4 border border-emerald-200/50 relative z-10">
                <Calendar size={24} strokeWidth={2.5} />
              </div>
              <h3 className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-1 relative z-10">Next Eligible Date</h3>
              <h4 className="text-2xl font-extrabold text-slate-900 relative z-10">April 21, 2026</h4>
              <p className="text-sm font-semibold text-emerald-600 mt-2 flex items-center gap-1 relative z-10">
                <Activity size={16} /> Track Health Profile
              </p>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 md:p-8 rounded-3xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-extrabold text-slate-900">Urgent matches near you</h3>
            <Link to="/all-requests" className="text-brand-600 font-bold text-sm flex items-center hover:bg-brand-50 px-3 py-1.5 rounded-lg transition-colors">
              See all <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="h-24 bg-slate-100 animate-pulse rounded-2xl"></div>
            ) : urgentRequests.length > 0 ? (
              urgentRequests.map((request) => (
                <div key={request._id} className="bg-brand-50/50 border border-brand-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-lg hover:shadow-brand-100/50 transition-all duration-300">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-white border border-brand-200 text-brand-600 flex items-center justify-center font-black text-2xl shadow-sm">
                      {request.bloodType}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-extrabold text-lg text-slate-900">{request.hospitalName}</h4>
                        <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-md tracking-wider ${
                          request.urgency === 'critical' ? 'bg-rose-100 text-rose-700' : 
                          request.urgency === 'high' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {request.urgency}
                        </span>
                      </div>
                      <p className="text-slate-500 font-medium text-sm flex items-center gap-3">
                        <span className="flex items-center gap-1"><MapPin size={14}/> {request.area || 'Hospital Location'}</span>
                        <span className="flex items-center gap-1 text-xs opacity-75"><Clock size={12}/> Added {new Date(request.createdAt).toLocaleDateString()}</span>
                      </p>
                    </div>
                  </div>
                  <Link 
                    to={`/donate-now/${request._id}`}
                    className="w-full sm:w-auto px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-md shadow-brand-500/20 whitespace-nowrap text-center"
                  >
                    I can donate
                  </Link>
                </div>
              ))
            ) : (
              <div className="h-32 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 font-medium italic">
                No urgent blood requests at the moment.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorHome;
