import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  Layers, 
  Code, 
  Eye, 
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import { Skill } from '../../types';
import { usePlatform } from '../../context/PlatformContext';

interface SkillCardProps {
  skill: Skill;
  onOpenPrincipleModal: (skill: Skill) => void;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, onOpenPrincipleModal }) => {
  const { setActiveSkill } = usePlatform();
  const navigate = useNavigate();

  const handleLaunch = () => {
    setActiveSkill(skill);
    navigate('/workspace');
  };

  const getDifficultyBadge = (level: Skill['difficulty']) => {
    switch (level) {
      case '入门':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200/60';
      case '进阶':
        return 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border-brand-200/60';
      case '专家':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200/60';
    }
  };

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm hover:shadow-md hover:border-brand-500/40 dark:hover:border-brand-500/40 transition-all flex flex-col justify-between">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {skill.category}
          </span>
          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${getDifficultyBadge(skill.difficulty)}`}>
              {skill.difficulty}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              {skill.usageCount.toLocaleString()}次使用
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-2 line-clamp-1">
          {skill.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 mb-4">
          {skill.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {skill.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer & Actions */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>共创作者：<strong className="text-slate-600 dark:text-slate-300 font-normal">{skill.author}</strong></span>
          <span>{skill.major}</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onOpenPrincipleModal(skill)}
            className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200/70 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            查看原理
          </button>
          <button
            onClick={handleLaunch}
            className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm shadow-brand-600/30 transition-all group-hover:scale-[1.02]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            立即使用
          </button>
        </div>
      </div>
    </div>
  );
};
