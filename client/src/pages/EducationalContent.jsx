import React from 'react';
import { BookOpen, CheckCircle, HeartPulse, Stethoscope, Droplet } from 'lucide-react';

const EducationalContent = () => {
  const steps = [
    { title: "Registration", desc: "Sign up, provide your ID, and complete a simple medical history questionnaire.", icon: BookOpen },
    { title: "Health Screening", desc: "A brief physical exam checks your temperature, blood pressure, pulse, and hemoglobin.", icon: Stethoscope },
    { title: "The Donation", desc: "The actual donation takes only 8-10 minutes. You will be seated comfortably.", icon: Droplet },
    { title: "Refresh & Recover", desc: "Enjoy a snack and drink for 10-15 minutes before getting back to your day.", icon: CheckCircle },
  ];

  return (
    <div className="flex-1 md:ml-72 min-h-screen bg-slate-50 relative overflow-x-hidden pt-16 md:pt-0 pb-10">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-50 rounded-full blur-3xl opacity-70 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="relative z-10 p-5 md:p-10 max-w-[1000px] mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="glass-panel rounded-3xl p-8 md:p-12 mb-10 text-center relative overflow-hidden bg-white/90">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-brand-500/10 blur-3xl rounded-full"></div>
          <HeartPulse size={48} className="text-brand-600 mx-auto mb-6 relative z-10" strokeWidth={2}/>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 relative z-10">
            Why Donate Blood?
          </h1>
          <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed relative z-10">
            Every two seconds, someone in the world needs blood. Your single donation can save up to three lives. Discover the process, benefits, and how you can be a hero.
          </p>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center">
            <span className="w-2 h-8 bg-brand-500 rounded-full mr-3"></span>
            The Donation Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="glass-card rounded-2xl p-6 relative group overflow-hidden border border-slate-100">
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-125 transition-transform duration-500 text-brand-600">
                  <step.icon size={100} />
                </div>
                <div className="text-brand-600 bg-brand-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-brand-100">
                  <step.icon size={24} strokeWidth={2.5}/>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 relative z-10">{step.title}</h3>
                <p className="text-sm font-medium text-slate-500 leading-relaxed relative z-10">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-8 md:p-10 bg-slate-900 text-white border border-slate-800">
           <h2 className="text-2xl font-extrabold mb-4">Who can donate?</h2>
           <ul className="space-y-3 text-slate-300 font-medium">
             <li className="flex items-center gap-3"><CheckCircle size={18} className="text-emerald-400"/> You are between 18 and 65 years old.</li>
             <li className="flex items-center gap-3"><CheckCircle size={18} className="text-emerald-400"/> You weigh at least 50 kg (110 lbs).</li>
             <li className="flex items-center gap-3"><CheckCircle size={18} className="text-emerald-400"/> You are in good general health and feel well.</li>
             <li className="flex items-center gap-3"><CheckCircle size={18} className="text-emerald-400"/> Your hemoglobin level is above 12.5 g/dL.</li>
           </ul>
        </div>
      </div>
    </div>
  );
};

export default EducationalContent;
