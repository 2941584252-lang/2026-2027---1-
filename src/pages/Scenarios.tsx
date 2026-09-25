import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Compass, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Workflow, 
  GraduationCap,
  Scroll,
  TrendingUp,
  Cpu,
  Activity,
  Palette
} from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';
import { Scenario } from '../types';

export const Scenarios: React.FC = () => {
  const { scenarios, skills, setActiveSkill } = usePlatform();
  const [selectedCat, setSelectedCat] = useState<string>('全部');
  const navigate = useNavigate();

  const categories = ['全部', '人文社科', '经管类', '理工类', '医学/生命科学', '艺术类'];

  const filtered = selectedCat === '全部'
    ? scenarios
    : scenarios.filter((s) => s.category === selectedCat);

  const handleLaunchScenario = (sc: Scenario) => {
    const matched = skills.find((s) => s.id === sc.recommendedSkillId) || skills[0];
    if (matched) {
      setActiveSkill(matched);
      navigate('/workspace');
    }
  };

  const getCategoryIcon = (cat: Scenario['category']) => {
    switch (cat) {
      case '人文社科': return Scroll;
      case '经管类': return TrendingUp;
      case '理工类': return Cpu;
      case '医学/生命科学': return Activity;
      case '艺术类': return Palette;
      default: return Compass;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
            <Compass className="w-5 h-5" />
          </span>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            CROSS-DISCIPLINARY SCENARIOS
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          跨专业学习场景库
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
          这是“智汇工坊”区别于普通聊天机器人的核心壁垒。每一场景均由计算机专业与对应专业学生联合调研沉淀，包含“真实痛点 → AI Skill → Agent 工作流 → 最终成果”的闭环实践。
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCat === cat
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filtered.map((sc) => {
          const Icon = getCategoryIcon(sc.category);

          return (
            <div
              key={sc.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-7 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/80 dark:text-emerald-300 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200/60">
                          {sc.category}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          {sc.major}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                        {sc.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Target Course */}
                <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
                  对应专业课程：<strong className="text-slate-800 dark:text-slate-200">{sc.targetCourse}</strong>
                </div>

                {/* Contrast: Traditional vs AI Skill Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {/* Pain & Traditional */}
                  <div className="p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 text-rose-950 dark:text-rose-200">
                    <div className="flex items-center gap-1.5 font-bold mb-1 text-rose-700 dark:text-rose-400">
                      <AlertCircle className="w-3.5 h-3.5" />
                      真实学习痛点与传统困境
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                      {sc.painPoint}
                    </p>
                  </div>

                  {/* AI Skill Solution */}
                  <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-emerald-950 dark:text-emerald-200">
                    <div className="flex items-center gap-1.5 font-bold mb-1 text-emerald-700 dark:text-emerald-400">
                      <Sparkles className="w-3.5 h-3.5" />
                      智汇工坊 AI 破局方案
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                      {sc.aiSkillSolution}
                    </p>
                  </div>
                </div>

                {/* Agent Workflow Steps */}
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    智能体工作流执行逻辑：
                  </span>
                  <div className="space-y-1.5">
                    {sc.agentWorkflow.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800"
                      >
                        <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expected Outcome */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">预期交付学习成果：</span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{sc.expectedOutcome}</p>
                </div>
              </div>

              {/* Footer Button */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {sc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleLaunchScenario(sc)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm shadow-emerald-600/30 transition-all hover:scale-[1.02]"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  启动此场景 Agent
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
