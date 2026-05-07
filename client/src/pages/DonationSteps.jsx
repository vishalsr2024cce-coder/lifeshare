import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Heart, CheckCircle2, ChevronRight, ChevronLeft, 
  Stethoscope, Thermometer, User, ClipboardCheck, 
  ShieldCheck, AlertCircle, Droplet
} from 'lucide-react';

const DonationSteps = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form states
  const [healthScreen, setHealthScreen] = useState({
    fever: false,
    tattoos: false,
    medication: false,
    travel: false
  });

  const [vitals, setVitals] = useState({
    weight: '',
    age: '',
    lastDonation: 'None'
  });

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await fetch('/api/requests');
        const data = await response.json();
        const found = data.find(r => r._id === id);
        if (found) setRequest(found);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [id]);

  const handleComplete = async () => {
    try {
      await fetch(`/api/requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'in-progress' }),
      });
      setStep(4); // Success step
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-black text-slate-300">Loading Screening...</div>;
  if (!request) return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Request Not Found</div>;

  const ProgressHeader = () => (
    <div className="max-w-2xl mx-auto mb-16">
      <div className="flex justify-between items-center relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 w-full z-0 rounded-full"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-600 transition-all duration-500 z-0 rounded-full" 
          style={{ width: `${((step - 1) / 3) * 100}%` }}
        ></div>
        
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="relative z-10">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg ${
              step >= i ? 'bg-brand-600 text-white scale-110' : 'bg-white text-slate-400 border-2 border-slate-100'
            }`}>
              {step > i ? <CheckCircle2 size={24} /> : (
                i === 1 ? <Stethoscope size={24} /> :
                i === 2 ? <ClipboardCheck size={24} /> :
                i === 3 ? <ShieldCheck size={24} /> :
                <Heart size={24} />
              )}
            </div>
            <span className={`absolute top-16 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${
              step >= i ? 'text-brand-600' : 'text-slate-400'
            }`}>
              {i === 1 ? 'Health' : i === 2 ? 'Vitals' : i === 3 ? 'Review' : 'Verified'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-5">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-600 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            <Droplet size={14} /> Request ID: #{id?.slice(-6)}
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Donor Screening <br/> for <span className="text-brand-600">{request.hospitalName}</span>
          </h1>
        </header>

        {step < 4 && <ProgressHeader />}

        <div className="glass-panel p-8 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          {step === 1 && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center">
                  <Thermometer size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 leading-none">Health Checklist</h3>
                  <p className="text-slate-500 font-medium mt-1">Please confirm the following to ensure eligibility.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: 'fever', label: 'Have you had fever/flu in the last 7 days?' },
                  { key: 'tattoos', label: 'Did you get a tattoo in the last 6 months?' },
                  { key: 'medication', label: 'Are you taking any antibiotics currently?' },
                  { key: 'travel', label: 'Have you travelled abroad in the last month?' }
                ].map(q => (
                  <label key={q.key} className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    healthScreen[q.key] ? 'border-brand-500 bg-brand-50/30' : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'
                  }`}>
                    <span className="font-bold text-slate-700 text-sm max-w-[200px] leading-tight">{q.label}</span>
                    <input 
                      type="checkbox" 
                      className="w-6 h-6 rounded-lg border-2 border-slate-300 text-brand-600 focus:ring-brand-500"
                      checked={healthScreen[q.key]}
                      onChange={() => setHealthScreen({...healthScreen, [q.key]: !healthScreen[q.key]})}
                    />
                  </label>
                ))}
              </div>

              {Object.values(healthScreen).some(v => v) && (
                <div className="p-5 bg-rose-50 border-2 border-rose-100 rounded-2xl flex gap-4 text-rose-700 animate-pulse">
                  <AlertCircle className="shrink-0" size={24} />
                  <p className="text-xs font-black uppercase tracking-wide leading-relaxed">
                    Safety Alert: Based on your answers, you may need a medical consultation before donating.
                  </p>
                </div>
              )}

              <footer className="pt-10 flex justify-end">
                <button 
                  onClick={() => setStep(2)}
                  className="px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl flex items-center gap-2 shadow-xl shadow-slate-900/10 transition-all hover:-translate-y-1"
                >
                  Save & Continue <ChevronRight size={20} />
                </button>
              </footer>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 leading-none">Basic Vitals</h3>
                  <p className="text-slate-500 font-medium mt-1">Provide your details to complete the match.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Weight (kg)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 70"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 outline-none focus:border-sky-500 font-black text-2xl text-slate-900 transition-all"
                    value={vitals.weight}
                    onChange={(e) => setVitals({...vitals, weight: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Age</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 25"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 outline-none focus:border-sky-500 font-black text-2xl text-slate-900 transition-all"
                    value={vitals.age}
                    onChange={(e) => setVitals({...vitals, age: e.target.value})}
                  />
                </div>
              </div>

              <footer className="pt-10 flex justify-between">
                <button onClick={() => setStep(1)} className="px-10 py-4 text-slate-500 font-black flex items-center gap-2 hover:bg-slate-100 rounded-2xl transition-colors">
                  <ChevronLeft size={20} /> Back
                </button>
                <button 
                  onClick={() => setStep(3)}
                  className="px-10 py-4 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl flex items-center gap-2 shadow-xl shadow-slate-900/10 transition-all hover:-translate-y-1"
                >
                  Final Review <ChevronRight size={20} />
                </button>
              </footer>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-10 animate-fade-in-up">
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-brand-100 text-brand-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-brand-500/10 shadow-xl">
                  <ShieldCheck size={40} strokeWidth={2.5} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 leading-none mb-3">Review & Confirm</h3>
                <p className="text-slate-500 font-medium">Please verify your details before submitting.</p>
              </div>

              <div className="bg-white/50 border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-inner grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-200/60 pb-2">Medical Profile</h4>
                  <ul className="space-y-4">
                    {Object.entries(healthScreen).map(([k, v]) => (
                      <li key={k} className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm">
                        <span className="text-sm font-bold text-slate-600 capitalize">{k} Status</span>
                        <span className={`text-[10px] font-black px-3 py-1 rounded-full border-2 ${v ? 'border-rose-200 text-rose-600 bg-rose-50' : 'border-emerald-200 text-emerald-600 bg-emerald-50' } uppercase`}>
                          {v ? 'Positive' : 'Negative'}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 border-b border-slate-200/60 pb-2">Vitals Summary</h4>
                  <div className="space-y-4">
                    <div className="bg-white p-5 rounded-2xl shadow-sm text-center">
                      <div className="text-3xl font-black text-slate-900">{vitals.weight || '--'} <span className="text-xs text-slate-400">kg</span></div>
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Weight</span>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-sm text-center">
                      <div className="text-3xl font-black text-slate-900">{vitals.age || '--'} <span className="text-xs text-slate-400">yrs</span></div>
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Age</span>
                    </div>
                  </div>
                </div>
              </div>

              <footer className="pt-10 flex gap-4">
                <button onClick={() => setStep(2)} className="flex-1 py-5 text-slate-500 font-black bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all">
                  Edit Details
                </button>
                <button 
                  onClick={handleComplete}
                  className="flex-[2] py-5 bg-brand-600 hover:bg-brand-700 text-white font-black rounded-2xl shadow-2xl shadow-brand-600/30 transition-all hover:-translate-y-1 active:translate-y-0"
                >
                  I Promise to Donate
                </button>
              </footer>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-10 animate-fade-in-up">
              <div className="w-32 h-32 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner border-4 border-white animate-bounce-short">
                <Heart size={64} fill="currentColor" strokeWidth={2.5} />
              </div>
              <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                Thank You, <br/> hero!
              </h1>
              <p className="text-slate-500 font-medium max-w-sm mx-auto mb-12 text-lg">
                Your request has been verified and <span className="text-brand-600 font-bold">{request.hospitalName}</span> has been notified.
              </p>
              
              <div className="max-w-xs mx-auto space-y-4">
                <Link to="/" className="block py-5 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl shadow-2xl shadow-slate-900/10 transition-all hover:scale-105 active:scale-95">
                  Back to Dashboard
                </Link>
                <Link to="/learn" className="block py-4 text-brand-600 font-bold hover:bg-brand-50 rounded-2xl transition-colors">
                  Read Donation FAQ
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationSteps;
