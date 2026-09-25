import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { GlobalSearch } from './components/layout/GlobalSearch';
import { ApiKeyModal } from './components/layout/ApiKeyModal';
import { ToastContainer } from './components/layout/ToastContainer';

// Pages
import { Home } from './pages/Home';
import { Skills } from './pages/Skills';
import { Agents } from './pages/Agents';
import { Workspace } from './pages/Workspace';
import { Scenarios } from './pages/Scenarios';
import { Cases } from './pages/Cases';
import { CreateSkill } from './pages/CreateSkill';
import { Workshops } from './pages/Workshops';
import { Statistics } from './pages/Statistics';
import { About } from './pages/About';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/scenarios" element={<Scenarios />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/create" element={<CreateSkill />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <Footer />

      {/* Global Overlays & Modals */}
      <GlobalSearch />
      <ApiKeyModal />
      <ToastContainer />
    </div>
  );
};

export default App;
