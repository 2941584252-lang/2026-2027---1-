import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Users, 
  TrendingUp, 
  Quote, 
  Clock, 
  FileText,
  Workflow
} from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';
import { CaseStudy } from '../types';

export const Cases: React.FC = () => {
  const { cases, skills, setActiveSkill } = usePlatform();
  const [activeCaseId, setActiveCaseId] = useState<string>(cases[0]?.id || '');
  const navigate = useNavigate();

  const currentCase = cases.find((c) => c.id === activeCaseId) || cases[0];

  const handleLaunchCase = (c: CaseStudy) => {
    const matched = skills.find((s) => s.name.includes(c.coreSkillUsed.split(' ')[0])) || skills[0];
    if (matched) {
      setActiveSkill(matched);
      navigate('/workspace');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-300">
            <Award className="w-5 h-5" />
          </span>
          <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">
            CO-CREATION CASE STUDIES
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          跨专业共创案例库
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
          展示项目在真实大学专业学习中落地的代表性案例。通过传统学习与 AI 工作流的对比分析，呈现学生从“不会用”到“深度共创”的真实成长轨迹。
        </p>
      </div>

      {/* Case Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {cases.map((c) => {
          const isActive = c.id === currentCase.id;
          return (
            <button
              key={c.id}
              onClick={() => setActiveCaseId(c.id)}
              className={`p-4 text-left rounded-2xl border transition-all ${
                isActive
                  ? 'border-purple-500 bg-purple-50/70 dark:bg-purple-950/40 text-purple-950 dark:text-purple-200 ring-2 ring-purple-500/20 shadow-md'
                  : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
              }`}
            >
              <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider block mb-1">
                {c.major}
              </span>
              <h4 className="text-xs font-bold line-clamp-2 leading-tight">
                {c.title}
              </h4>
              <p className="text-[10px] text-slate-400 mt-2 line-clamp-1">
                共创：{c.authorTeam}
              </p>
            </button>
          );
        })}
      </div>

      {/* Case Detail In-depth Showcase */}
      {currentCase && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm space-y-8 animate-in fade-in duration-200">
          {/* Title & Metadata */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200/60">
                {currentCase.major}
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
                {currentCase.title}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                共创团队成员：<strong className="text-slate-700 dark:text-slate-300">{currentCase.authorTeam}</strong>
              </p>
            </div>

            <button
              onClick={() => handleLaunchCase(currentCase)}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-md shadow-purple-600/30 transition-all shrink-0 hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              在工作台加载该案例
            </button>
          </div>

          {/* Core Problem & Comparison Table */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              传统学习困境 vs AI 工作流对比解析
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Traditional */}
              <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 space-y-2">
                <span className="text-xs font-bold text-rose-700 dark:text-rose-400 block">
                  🔴 传统学习模式瓶颈：
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentCase.traditionalMethod}
                </p>
              </div>

              {/* AI Workflow */}
              <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 space-y-2">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block">
                  🟢 智汇工坊 AI 多步协同流水线：
                </span>
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {currentCase.aiWorkflow.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Concrete Results & Metrics */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/10 via-brand-900/10 to-slate-900/10 dark:from-purple-950/40 dark:to-slate-950/40 border border-purple-200/50 dark:border-purple-800/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                实践成果与量化提升
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900 px-3 py-1 rounded-full shadow-sm">
                {currentCase.concreteResult.metrics}
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {currentCase.concreteResult.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {currentCase.concreteResult.highlights.map((h, i) => (
                <div key={i} className="p-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Student Quote */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex items-start gap-4">
            <Quote className="w-8 h-8 text-purple-400 shrink-0 mt-1" />
            <div className="space-y-2">
              <p className="text-xs italic text-slate-700 dark:text-slate-300 leading-relaxed">
                “{currentCase.studentFeedback.quote}”
              </p>
              <div className="text-[11px] text-slate-400 font-medium">
                — <strong className="text-slate-800 dark:text-slate-200 font-semibold">{currentCase.studentFeedback.student}</strong>（{currentCase.studentFeedback.grade}）
              </div>
            </div>
          </div>

          {/* Optimization Timeline */}
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-4 flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              案例优化与迭代历程 (Optimization Journey)
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentCase.optimizationTimeline.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-purple-600 dark:text-purple-400">{item.phase}</span>
                    <span className="text-slate-400 font-mono">{item.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.improvement}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
