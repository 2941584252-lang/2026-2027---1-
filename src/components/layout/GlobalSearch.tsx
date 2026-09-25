import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, Bot, Compass, Award, ArrowRight } from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

export const GlobalSearch: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, skills, agents, scenarios, cases, setActiveSkill } = usePlatform();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const cleanQ = query.trim().toLowerCase();

  const filteredSkills = cleanQ
    ? skills.filter(
        (s) =>
          s.name.toLowerCase().includes(cleanQ) ||
          s.description.toLowerCase().includes(cleanQ) ||
          s.tags.some((t) => t.toLowerCase().includes(cleanQ)) ||
          s.category.toLowerCase().includes(cleanQ)
      )
    : skills.slice(0, 4);

  const filteredAgents = cleanQ
    ? agents.filter(
        (a) =>
          a.name.toLowerCase().includes(cleanQ) ||
          a.description.toLowerCase().includes(cleanQ) ||
          a.category.toLowerCase().includes(cleanQ)
      )
    : agents.slice(0, 3);

  const filteredScenarios = cleanQ
    ? scenarios.filter(
        (sc) =>
          sc.title.toLowerCase().includes(cleanQ) ||
          sc.major.toLowerCase().includes(cleanQ) ||
          sc.painPoint.toLowerCase().includes(cleanQ)
      )
    : scenarios.slice(0, 2);

  const handleSelectSkill = (skill: typeof skills[0]) => {
    setActiveSkill(skill);
    setIsSearchOpen(false);
    navigate('/workspace');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="flex items-center px-4 py-3 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-brand-500 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索 AI Skill、Agent 工作流、跨专业场景、共创案例..."
            className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="ml-2 text-xs text-slate-400 border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
          {/* Skills Section */}
          {filteredSkills.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-brand-500" />
                  AI Skill 技能库
                </span>
                <span>{filteredSkills.length} 项</span>
              </div>
              <div className="space-y-1">
                {filteredSkills.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => handleSelectSkill(s)}
                    className="group flex items-center justify-between p-2 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-950/40 cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                          {s.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                          {s.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">{s.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Agents Section */}
          {filteredAgents.length > 0 && (
            <div className="pt-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-accent-500" />
                  AI Agent 工作流
                </span>
              </div>
              <div className="space-y-1">
                {filteredAgents.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigate('/agents');
                    }}
                    className="group flex items-center justify-between p-2 rounded-lg hover:bg-accent-50 dark:hover:bg-accent-950/40 cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-accent-600 dark:group-hover:text-accent-400">
                          {a.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300">
                          {a.targetRole}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">{a.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-accent-500 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scenarios Section */}
          {filteredScenarios.length > 0 && (
            <div className="pt-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-emerald-500" />
                  跨专业真实学习场景
                </span>
              </div>
              <div className="space-y-1">
                {filteredScenarios.map((sc) => (
                  <div
                    key={sc.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigate('/scenarios');
                    }}
                    className="group flex items-center justify-between p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/40 cursor-pointer transition-colors"
                  >
                    <div>
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-emerald-600">
                        {sc.title}
                      </span>
                      <p className="text-xs text-slate-400 line-clamp-1">{sc.painPoint}</p>
                    </div>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      {sc.major}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>提示：点击任意条目可直接带入工作台体验</span>
          <div className="flex gap-2">
            <span>按 <kbd className="px-1 py-0.5 bg-white dark:bg-slate-800 rounded border">ESC</kbd> 退出</span>
          </div>
        </div>
      </div>
    </div>
  );
};
