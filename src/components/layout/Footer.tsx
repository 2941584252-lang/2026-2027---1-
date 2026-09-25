import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ShieldCheck, Github, ExternalLink, Code } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-sm mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Project Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-brand-600 text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-slate-900 dark:text-white">智汇工坊</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              面向跨专业学习场景的 AI Skill 与 Agent 共创实践项目。依托陕西师范大学人工智能与计算机学院，推动大模型技术与大学深度专业学习深度融合。
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/50">
              <ShieldCheck className="w-3.5 h-3.5" />
              勤助实践创新立项项目
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-3">
              核心功能
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/workspace" className="hover:text-brand-600 dark:hover:text-brand-400">AI 学习工作台 (Core)</Link></li>
              <li><Link to="/skills" className="hover:text-brand-600 dark:hover:text-brand-400">AI Skill 工坊广场</Link></li>
              <li><Link to="/agents" className="hover:text-brand-600 dark:hover:text-brand-400">AI Agent 工作流图谱</Link></li>
              <li><Link to="/create" className="hover:text-brand-600 dark:hover:text-brand-400">共创专属 AI Skill</Link></li>
            </ul>
          </div>

          {/* Cross-Disciplinary */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-3">
              跨专业学习场景
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/scenarios" className="hover:text-brand-600 dark:hover:text-brand-400">人文社科：史料互证与马理论</Link></li>
              <li><Link to="/scenarios" className="hover:text-brand-600 dark:hover:text-brand-400">经管类：商业案例金字塔复盘</Link></li>
              <li><Link to="/scenarios" className="hover:text-brand-600 dark:hover:text-brand-400">理工类：算法拆解与论文消融</Link></li>
              <li><Link to="/scenarios" className="hover:text-brand-600 dark:hover:text-brand-400">医学/生命科学：临床病理推演</Link></li>
            </ul>
          </div>

          {/* Team & Accreditation */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-3">
              团队与开源规范
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-2">
              项目负责人：崔启霖（计创2502）<br />
              团队成员：陈靖昊、于咏琪、董吉祥、张钥童、周佳艺<br />
              指导单位：陕西师范大学 人工智能与计算机学院
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-slate-400">
              <Code className="w-3.5 h-3.5" />
              <span>MIT License 开源协议</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026-2027 陕西师范大学“智汇工坊”勤助实践创新项目团队. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> by 计创2502
            </span>
            <Link to="/about" className="hover:underline">关于项目与岗责分工</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
