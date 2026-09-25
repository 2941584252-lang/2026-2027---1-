import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  ChevronRight, 
  FileText, 
  GraduationCap, 
  CheckSquare, 
  Scroll, 
  TrendingUp, 
  Activity, 
  Code2 
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { Skill } from '../../types';

interface ToolSidebarProps {
  onSelectSamplePreset: (presetInput: string) => void;
}

export const ToolSidebar: React.FC<ToolSidebarProps> = ({ onSelectSamplePreset }) => {
  const { skills, activeSkill, setActiveSkill } = usePlatform();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('全部');

  const categories = ['全部', '文献阅读', '课程复习', '知识整理', '写作辅助', '跨专业学习'];

  const filtered = skills.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCat === '全部' || s.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const presets = [
    {
      title: 'ResNet 论文精读范例',
      skillId: 'literature-deep-read',
      desc: '残差学习论文摘要与退化问题解析'
    },
    {
      title: '操作系统 PV 同步考点',
      skillId: 'exam-review-synthesis',
      desc: '临界区、死锁条件与自测题生成'
    },
    {
      title: '实证论文逻辑跃迁巡检',
      skillId: 'academic-logic-checker',
      desc: '排查以相关代因果与过度绝对化'
    },
    {
      title: '历史古籍食货志考据',
      skillId: 'historical-source-critical',
      desc: '官私史书差异与源流互证'
    }
  ];

  const handleApplyPreset = (preset: typeof presets[0]) => {
    const targetSkill = skills.find((s) => s.id === preset.skillId);
    if (targetSkill) {
      setActiveSkill(targetSkill);
      if (targetSkill.sampleInput) {
        onSelectSamplePreset(targetSkill.sampleInput);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-col h-full overflow-hidden">
      {/* Search & Category Filter */}
      <div className="mb-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-brand-500" />
            AI 学习技能库
          </span>
          <span className="text-[11px] text-slate-400 font-mono">{filtered.length} 个可用</span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜索 Skill..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>

        {/* Categories Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1 text-[11px] scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-2 py-0.5 rounded-md whitespace-nowrap transition-colors ${
                selectedCat === cat
                  ? 'bg-brand-600 text-white font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skills List */}
      <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 divide-y divide-slate-100 dark:divide-slate-800/60">
        {filtered.map((skill) => {
          const isActive = activeSkill?.id === skill.id;

          return (
            <div
              key={skill.id}
              onClick={() => setActiveSkill(skill)}
              className={`p-2.5 rounded-xl cursor-pointer transition-all ${
                isActive
                  ? 'bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 ring-1 ring-brand-500/20'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold line-clamp-1 ${
                  isActive ? 'text-brand-700 dark:text-brand-300' : 'text-slate-800 dark:text-slate-200'
                }`}>
                  {skill.name}
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                  {skill.difficulty}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                {skill.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Preset Fast Trials */}
      <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
          一键带入典型演示样本：
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {presets.map((p, i) => (
            <button
              key={i}
              onClick={() => handleApplyPreset(p)}
              className="text-left p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 hover:bg-brand-50 dark:hover:bg-brand-950/40 border border-slate-100 dark:border-slate-800 transition-colors"
            >
              <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 block line-clamp-1">
                {p.title}
              </span>
              <span className="text-[9px] text-slate-400 line-clamp-1">
                {p.desc}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
