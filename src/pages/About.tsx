import React from 'react';
import { 
  Info, 
  ShieldCheck, 
  Users, 
  Target, 
  GitBranch, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  BookOpen, 
  HeartHandshake,
  Calendar,
  Layers
} from 'lucide-react';
import { teamMembers } from '../data/team';

export const About: React.FC = () => {
  const lifecycle = [
    {
      period: '2026年10月 — 11月',
      stage: '第一阶段：团队组建与需求调研',
      desc: '组建 6 人核心跨职能团队，面向文、史、哲、经管、医学生发放深度访谈问卷，梳理第一批具有高频学习价值的场景痛点清单。'
    },
    {
      period: '2026年11月 — 2027年1月',
      stage: '第二阶段：Skill 设计与初步测试',
      desc: '围绕文献精读、课程复习、考点辨析、论文巡检等高频场景，沉淀出首批 8~10 个标准化 AI Skill 原型并开展多轮盲测迭代。'
    },
    {
      period: '2027年2月 — 4月',
      stage: '第三阶段：Agent 实践与跨专业共创',
      desc: '将成熟 Skill 串联为自主协同的多智能体流水线。邀请文科、商科、生科学生深度介入，完成动态路由与批判反思逻辑对齐。'
    },
    {
      period: '2027年4月 — 5月',
      stage: '第四阶段：工作坊与推广应用',
      desc: '举办 4~6 场全校性跨专业 AI 学习共创工作坊与小型黑客马拉松，直接覆盖学生 500 人次以上。'
    },
    {
      period: '2027年5月 — 6月',
      stage: '第五阶段：成果整理与总结结项',
      desc: '编制《“智汇工坊”大学生 AI Skill 入门指南》与跨专业案例集，沉淀高水平勤助实践创新结项报告。'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
            <Info className="w-5 h-5" />
          </span>
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
            ABOUT THE PROJECT
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          项目背景与团队分工
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
          陕西师范大学“发展成才计划”勤助实践创新重点项目——“智汇工坊”。以人工智能技术赋能全学科学生，推动从单向问答向自主协同工作流跃迁。
        </p>
      </div>

      {/* Project Essence Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-wider">
            <Target className="w-4 h-4" />
            项目立项依据与宗旨
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-snug">
            突破“一问一答”浅层应用，迈向“设计AI如何完成专业任务”
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            当前大学生使用生成式 AI 仍大多停留在资料查询和简单文案润色等一次性对话层面。面对长篇学术文献精读、复杂公式推导、案例反思等需要连续批判思维的任务，传统聊天机器人无法建立稳定的学习流程。
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            “智汇工坊”引导学生设计并调度 AI Skill 与 Agent，重点培养问题分解、流程把控与批判性反思能力，<strong>是辅助与激发学生思考，而非代替学生完成学习任务</strong>。
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4" />
            勤助育人与实践创新特色
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-snug">
            “计算机技术支持 + 兄弟院系真实场景”共创机制
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            项目彻底打破以往勤工助学以机械重复、事务性劳动为主的传统模式。通过吸纳具有家庭经济困难背景的计算机专业拔尖创新学生组建攻关团队，将勤助岗位与专业实践深度融合。
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            团队成员在服务全校广大师生专业学习的过程中，提升了系统工程架构、需求分析、敏捷沟通与团队协作综合素质，达成“资助育人、实践成才”目标。
          </p>
        </div>
      </div>

      {/* 6 Team Roles Showcase */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              申报书明确的 6 大核心岗位与团队成员
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">岗位职责清晰、闭环链条完备的跨职能创新团队</p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 font-semibold">
            计创2502 创新实验班
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs font-bold text-brand-600 dark:text-brand-400 block">
                      {member.role}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                      {member.name}
                    </h4>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">
                    {member.grade}
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {member.duty}
                </p>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    核心主导成果：
                  </span>
                  <div className="space-y-1">
                    {member.contributions.map((c, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-400">
                {member.classMajor}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5-Stage Implementation Lifecycle */}
      <div className="bg-slate-900 text-white p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-xl space-y-6">
        <div>
          <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">
            PROJECT TIMELINE
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            项目实施全生命周期规划 (2026.10 — 2027.06)
          </h3>
        </div>

        <div className="space-y-4">
          {lifecycle.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 gap-3"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-brand-400 block font-semibold">
                  {item.period}
                </span>
                <h5 className="text-sm font-bold text-white">{item.stage}</h5>
                <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
                  {item.desc}
                </p>
              </div>
              <span className="w-6 h-6 rounded-full bg-brand-900 text-brand-300 border border-brand-700 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                0{idx + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
