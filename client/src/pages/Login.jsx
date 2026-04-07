import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplet, Lock, Mail, ArrowRight, User as UserIcon, MapPin, Activity } from 'lucide-react';

const Login = ({ setUser }) => {
  const [isRegister, setIsRegister] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [bloodType, setBloodType] = useState('O+');
  const [location, setLocation] = useState('');
  const [role, setRole] = useState('donor');
  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const endpoint = isRegister ? '/api/register' : '/api/login';
      const payload = isRegister 
        ? { email, password, name, bloodType, location, role } 
        : { email, password };

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        if (data.role === 'admin' || data.role === 'hospital') {
          navigate('/hospital');
        } else {
          navigate('/');
        }
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-red-50 p-6 text-center flex flex-col items-center border-b border-red-100">
          <div className="h-14 w-14 bg-red-100 rounded-full flex items-center justify-center mb-3">
            <Droplet className="h-7 w-7 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            {isRegister ? 'Join LifeShare' : 'LifeShare Login'}
          </h2>
          <p className="text-slate-500 mt-1 text-sm">
            {isRegister ? 'Become a donor or register your hospital.' : 'Welcome back! Please enter your details.'}
          </p>
        </div>
        
        <div className="p-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-5 border border-red-100 text-center">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 w-full p-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      placeholder="Jane Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Account Type</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full p-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-white"
                    >
                      <option value="donor">Donor</option>
                      <option value="hospital">Hospital</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Blood Type</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Activity className="h-4 w-4 text-slate-400" />
                      </div>
                      <select
                        value={bloodType}
                        onChange={(e) => setBloodType(e.target.value)}
                        className="pl-9 w-full p-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-white"
                      >
                        {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">City / Location</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10 w-full p-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      placeholder="New York, NY"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full p-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="name@email.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full p-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>
              {!isRegister && (
                <div className="mt-1 text-right">
                  <a href="#" className="text-xs font-medium text-red-600 hover:text-red-500">
                    Forgot password?
                  </a>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white p-3 rounded-xl hover:bg-red-700 font-medium transition-colors flex items-center justify-center gap-2 mt-4"
            >
              {isRegister ? 'Create Account' : 'Sign In'} <ArrowRight className="h-4 w-4" />
            </button>
            
            <div className="text-center mt-4 text-sm text-slate-500 bg-slate-50 border border-slate-100 rounded-xl p-3">
              {isRegister ? (
                <span>
                  Already have an account?{' '}
                  <button type="button" onClick={() => setIsRegister(false)} className="font-medium text-red-600 hover:text-red-500 focus:outline-none">Sign In</button>
                </span>
              ) : (
                <span>
                  Don't have an account?{' '}
                  <button type="button" onClick={() => setIsRegister(true)} className="font-medium text-red-600 hover:text-red-500 focus:outline-none">Sign Up to donate</button>
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
