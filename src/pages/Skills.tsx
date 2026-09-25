import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  PlusCircle, 
  Sparkles, 
  Layers, 
  GraduationCap, 
  Tag, 
  Compass 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePlatform } from '../context/PlatformContext';
import { SkillCard } from '../components/skill/SkillCard';
import { SkillDetailModal } from '../components/skill/SkillDetailModal';
import { Skill, SkillCategory, MajorDomain, DifficultyLevel } from '../types';

export const Skills: React.FC = () => {
  const { skills } = usePlatform();
  const [modalSkill, setModalSkill] = useState<Skill | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('全部');
  const [selectedMajor, setSelectedMajor] = useState<string>('全部');
  const [selectedDiff, setSelectedDiff] = useState<string>('全部');

  const categories = ['全部', '文献阅读', '课程复习', '知识整理', '写作辅助', '数据分析', '编程学习', '语言学习', '跨专业学习'];
  const majors = ['全部', '通用学科', '计算机/人工智能', '人文社科', '经管类', '理工类', '医学/生命科学', '艺术设计'];
  const difficulties = ['全部', '入门', '进阶', '专家'];

  const filtered = skills.filter((skill) => {
    const matchesSearch =
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCat = selectedCat === '全部' || skill.category === selectedCat;
    const matchesMajor = selectedMajor === '全部' || skill.major === selectedMajor;
    const matchesDiff = selectedDiff === '全部' || skill.difficulty === selectedDiff;

    return matchesSearch && matchesCat && matchesMajor && matchesDiff;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
              <BookOpen className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
              AI SKILL WORKSHOP
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            AI Skill 工坊
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            把复杂的大学专业学习任务，封装成具有规范输入、明确规则与稳定结构化输出的 AI 能力。
          </p>
        </div>

        <Link
          to="/create"
          className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md shadow-brand-600/30 transition-all shrink-0 hover:scale-[1.02]"
        >
          <PlusCircle className="w-4 h-4" />
          <span>共创发布新 Skill</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜索 Skill 技能名称、适用专业、核心知识点或标签..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Categories Tab Row */}
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            任务类别分类 (Categories)：
          </span>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                  selectedCat === cat
                    ? 'bg-brand-600 text-white font-semibold shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Disciplines and Difficulty Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              学科专业筛选 (Majors)：
            </span>
            <div className="flex flex-wrap gap-1.5">
              {majors.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMajor(m)}
                  className={`px-2.5 py-0.5 rounded-md text-[11px] transition-colors ${
                    selectedMajor === m
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold'
                      : 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              掌握难度 (Difficulty)：
            </span>
            <div className="flex flex-wrap gap-1.5">
              {difficulties.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDiff(d)}
                  className={`px-2.5 py-0.5 rounded-md text-[11px] transition-colors ${
                    selectedDiff === d
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Skills */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-slate-500">
            共检索到 <strong className="text-brand-600 font-bold">{filtered.length}</strong> 个符合条件的 AI Skill
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="text-base font-bold text-slate-700 dark:text-slate-300">暂无匹配的 AI Skill</h4>
            <p className="text-xs text-slate-400">您可以尝试清空筛选条件，或在“Skill 共创”页面亲手定制一个！</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                onOpenPrincipleModal={(s) => setModalSkill(s)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Principle Modal */}
      <SkillDetailModal
        skill={modalSkill}
        onClose={() => setModalSkill(null)}
      />
    </div>
  );
};
