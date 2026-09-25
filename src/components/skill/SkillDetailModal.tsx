import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Sparkles, BookOpen, Layers, GitBranch, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Skill } from '../../types';
import { usePlatform } from '../../context/PlatformContext';

interface SkillDetailModalProps {
  skill: Skill | null;
  onClose: () => void;
}

export const SkillDetailModal: React.FC<SkillDetailModalProps> = ({ skill, onClose }) => {
  const { setActiveSkill } = usePlatform();
  const navigate = useNavigate();

  if (!skill) return null;

  const handleLaunch = () => {
    setActiveSkill(skill);
    onClose();
    navigate('/workspace');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">{skill.name}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200/60">
                  {skill.category}
                </span>
              </div>
              <p className="text-xs text-slate-400">共创团队：{skill.author} ({skill.authorRole || '智汇工坊团队'})</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
              技能定义与功能摘要
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
              {skill.description}
            </p>
          </div>

          {/* Workflow Steps */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <GitBranch className="w-4 h-4 text-brand-500" />
              内部执行工作流 (Workflow Pipeline)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {skill.workflow.map((step, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300"
                >
                  <span className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 font-bold flex items-center justify-center text-[10px] shrink-0">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inputs & Outputs Schema */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input Specs */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                输入材料规范 (Inputs Contract)
              </h4>
              <div className="space-y-2">
                {skill.inputs.map((inp, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{inp.label}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        {inp.type} · {inp.required ? '必填' : '选填'}
                      </span>
                    </div>
                    {inp.placeholder && (
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">示例：{inp.placeholder}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Output Specs */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                结构化输出要求 (Outputs Schema)
              </h4>
              <div className="space-y-2">
                {skill.outputs.map((out, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{out.label}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50">
                        {out.format}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{out.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Academic Principle & Prompt Architecture */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Prompt 设计哲学与学理规范
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs leading-relaxed overflow-x-auto">
              {skill.promptTemplate}
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              * 注：智汇工坊遵循“人机共创，辅助思考”准则，内部规则强制要求基于输入文本客观事实，禁止无根据臆测。
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50/80 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
          <div className="text-xs text-slate-400">
            适用专业：<strong className="text-slate-600 dark:text-slate-300 font-medium">{skill.major}</strong>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700 rounded-xl"
            >
              关闭
            </button>
            <button
              onClick={handleLaunch}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md shadow-brand-600/30 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              在工作台立即使用
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
