import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import DonorHome from './pages/DonorHome';
import EducationalContent from './pages/EducationalContent';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      {user ? (
        <div className="flex text-slate-900 bg-slate-50 min-h-screen font-sans w-full">
          <Sidebar user={user} setUser={setUser} />
          <div className="flex-1 md:ml-72 min-h-screen relative w-full">
            <Routes>
              <Route path="/" element={<DonorHome />} />
              <Route path="/hospital" element={<Dashboard />} />
              <Route path="/learn" element={<EducationalContent />} />
              <Route path="*" element={<Navigate to={user.role === 'admin' || user.role === 'hospital' ? "/hospital" : "/"} replace />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
