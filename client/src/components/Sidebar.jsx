import React, { useState } from 'react';
import { Activity, Home, Heart, FileText, Settings, LogOut, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ user, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = user?.role === 'admin' || user?.role === 'hospital' ? [
    { name: 'Requests Kanban', path: '/hospital', icon: Activity },
    { name: 'System Settings', path: '/settings', icon: Settings },
  ] : [
    { name: 'My Profile', path: '/', icon: Heart },
    { name: 'Why Donate?', path: '/learn', icon: FileText },
  ];

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-5 left-5 z-50 p-2.5 md:hidden bg-slate-900 text-white rounded-xl shadow-xl hover:bg-slate-800 transition-colors"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden" onClick={toggleSidebar} />
      )}

      <div className={`fixed inset-y-0 left-0 bg-slate-950 text-slate-300 w-72 flex flex-col justify-between py-8 shadow-2xl z-40 transition-transform duration-500 ease-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div>
          <div className="flex items-center px-8 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-brand-500 flex items-center justify-center mr-4 shadow-lg shadow-brand-500/30 animate-float">
              <Activity className="text-white" size={26} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">LifeShare</h1>
              <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-0.5">Blood Network</p>
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-1.5">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-4 py-3.5 rounded-xl font-medium transition-all duration-200 group ${
                    active 
                      ? 'bg-brand-600/10 text-brand-500 relative before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1.5 before:bg-brand-500 before:rounded-r-full' 
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  <item.icon className={`mr-3.5 ${active ? 'text-brand-500' : 'text-slate-500 group-hover:text-white transition-colors'}`} size={20} strokeWidth={active ? 2.5 : 2} />
                  {item.name}
                  {item.name === 'Requests Kanban' && (
                    <span className="ml-auto bg-brand-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center justify-center shadow-sm shadow-brand-500/50">
                      Live
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="px-5 pt-8">
          <div className="bg-slate-900 rounded-2xl p-5 mb-5 border border-slate-800/50 relative overflow-hidden group hover:border-slate-700 transition-colors">
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-brand-500/20 blur-xl rounded-full group-hover:bg-brand-500/30 transition-colors"></div>
            <h4 className="text-white font-semibold mb-1 relative z-10 text-sm">Low Inventory</h4>
            <p className="text-xs text-slate-400 mb-4 relative z-10 leading-relaxed">O+ blood type is critically low in Trichy.</p>
            <Link to="/hospital" onClick={() => setIsOpen(false)} className="block text-center w-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2.5 rounded-xl transition-colors relative z-10">
              View Urgent Needs
            </Link>
          </div>

          <div className="bg-slate-900/50 rounded-2xl p-4 mb-4 border border-slate-800/50">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3">Testing Role</p>
            <div className="flex gap-2 p-1 bg-slate-950 rounded-xl">
              <button 
                onClick={() => setUser({...user, role: 'donor'})}
                className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${user?.role === 'donor' ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20' : 'text-slate-500 hover:text-white'}`}
              >
                Donor
              </button>
              <button 
                onClick={() => setUser({...user, role: 'hospital'})}
                className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${user?.role === 'hospital' || user?.role === 'admin' ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20' : 'text-slate-500 hover:text-white'}`}
              >
                Hospital
              </button>
            </div>
          </div>

          <button
            onClick={() => setUser(null)}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-slate-400 rounded-xl hover:bg-slate-800/50 hover:text-white transition-colors"
          >
            <LogOut className="mr-3 text-slate-500" size={20} />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
