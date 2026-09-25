import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Bot, 
  Layers, 
  Award, 
  Compass, 
  CheckCircle2, 
  Zap, 
  Cpu, 
  Users, 
  Workflow, 
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
  FileText
} from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';
import { SkillCard } from '../components/skill/SkillCard';
import { SkillDetailModal } from '../components/skill/SkillDetailModal';
import { Skill } from '../types';

export const Home: React.FC = () => {
  const { skills, agents, scenarios, cases, setActiveSkill } = usePlatform();
  const [modalSkill, setModalSkill] = useState<Skill | null>(null);
  const navigate = useNavigate();

  // Recommended skills
  const recommendedSkills = skills.slice(0, 4);

  const stats = [
    { label: 'AI Skills 技能', value: '24+', desc: '跨学科沉淀规范' },
    { label: 'AI Agents 智能体', value: '12+', desc: '自主多步骤闭环' },
    { label: '真实学习场景', value: '18+', desc: '五大学科深度融合' },
    { label: '共创落地案例', value: '36+', desc: '学生实践成果' },
    { label: '服务覆盖人次', value: '500+', desc: '勤助实践育人' },
  ];

  const innovations = [
    {
      num: '01',
      title: '从 Chat 到 Skill',
      subtitle: '一次性对话 → 可复用的学习能力',
      description: '将学生在文献阅读、公式推导、概念辨析等场景中零散琐碎的单次提问，抽象为具有明确输入材料、处理步骤、判断规则与结构化格式的 AI 技能。',
      icon: BookOpen,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      num: '02',
      title: '从 Skill 到 Agent',
      subtitle: '单一工具 → 自主协同任务闭环',
      description: '在明确学习目标的基础上，通过任务拆解、动态技能路由与多节点反馈，让多个 AI Skill 像流水线一样协同工作，完整交付深度学习成果。',
      icon: Bot,
      color: 'from-indigo-600 to-purple-600'
    },
    {
      num: '03',
      title: '从单一专业到跨专业共创',
      subtitle: '技术赋能 + 真实场景落地',
      description: '采用“计算机专业学生提供技术支持 + 其他专业学生提供真实学习场景”的共创模式，让工科技术与文、史、哲、经管、医学实现深层跨界碰撞。',
      icon: Users,
      color: 'from-purple-600 to-pink-600'
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-16 pb-8 border-b border-slate-200/80 dark:border-slate-800">
        {/* Glow Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-500/20 via-indigo-500/15 to-purple-500/20 blur-3xl rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950/80 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800/60 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                陕西师范大学勤助实践创新立项成果
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                让 AI 真正进入你的 <br />
                <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-accent-600 bg-clip-text text-transparent dark:from-brand-400 dark:via-indigo-300 dark:to-accent-400">
                  专业学习工作流
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                从一个问题，到一个 <strong className="text-slate-900 dark:text-white font-semibold">AI Skill</strong>，再到一个可以自主执行复杂任务的 <strong className="text-slate-900 dark:text-white font-semibold">AI Agent</strong>。智汇工坊打破“一问一答”浅层交互，实现跨专业学习场景的数智化深度赋能。
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/workspace"
                  className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-brand-600 via-indigo-600 to-accent-600 hover:opacity-95 rounded-xl shadow-lg shadow-brand-500/25 transition-all hover:scale-[1.02]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>进入核心工作台</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  to="/skills"
                  className="flex items-center gap-1.5 px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors shadow-sm"
                >
                  <BookOpen className="w-4 h-4 text-brand-500" />
                  <span>探索 AI Skills</span>
                </Link>

                <Link
                  to="/agents"
                  className="flex items-center gap-1.5 px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors shadow-sm"
                >
                  <Bot className="w-4 h-4 text-accent-500" />
                  <span>探索 AI Agents</span>
                </Link>

                <Link
                  to="/cases"
                  className="flex items-center gap-1 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 px-3 py-2"
                >
                  <span>查看共创案例</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Highlights */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  内置 Mock 免 Key 演示模式
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  支持自定义 API 真实调用
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  无缝导出 Markdown / 双链卡片
                </span>
              </div>
            </div>

            {/* Right: Dynamic Agent Pipeline Animation Box */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-slate-900 p-6 shadow-2xl border border-slate-800 overflow-hidden text-white">
                {/* Header bar */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-[11px] font-mono text-slate-400 ml-2">zhihui-workflow-engine.sh</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-950 text-brand-300 border border-brand-800">
                    Agent Core Active
                  </span>
                </div>

                {/* Animated Pipeline Nodes */}
                <div className="py-6 space-y-3 font-mono text-xs">
                  {/* Step 1 */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded bg-brand-600 flex items-center justify-center text-[10px] font-bold">1</div>
                      <span className="text-slate-200">User Task: 文献研读需求</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Ready
                    </span>
                  </div>

                  <div className="flex justify-center text-slate-500">
                    <div className="w-[1.5px] h-3 bg-brand-500/50 animate-pulse" />
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-[10px] font-bold">2</div>
                      <span className="text-slate-200">Task Planner (任务规划器)</span>
                    </div>
                    <span className="text-[10px] text-amber-400 animate-pulse">Decomposing...</span>
                  </div>

                  <div className="flex justify-center text-slate-500">
                    <div className="w-[1.5px] h-3 bg-indigo-500/50 animate-pulse" />
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded bg-purple-600 flex items-center justify-center text-[10px] font-bold">3</div>
                      <span className="text-slate-200">Skill Router (文献精读 Skill)</span>
                    </div>
                    <span className="text-[10px] text-emerald-400">Routed</span>
                  </div>

                  <div className="flex justify-center text-slate-500">
                    <div className="w-[1.5px] h-3 bg-purple-500/50 animate-pulse" />
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-gradient-to-r from-brand-950 to-purple-950 border border-brand-500/50 shadow-inner">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded bg-emerald-500 text-slate-950 flex items-center justify-center text-[10px] font-bold">4</div>
                      <span className="text-white font-semibold">Structured Learning Report</span>
                    </div>
                    <span className="text-[10px] text-brand-300 font-bold">Generated</span>
                  </div>
                </div>

                {/* Console Log Excerpt */}
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[10px] text-slate-400 leading-relaxed">
                  <span className="text-emerald-400">[智汇工坊内核]</span> 载入跨专业规范：提取核心科学假设、方法论对照、证据链反思。已闭环生成结构化学术报告。
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Numeric Metrics Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          {stats.map((item, idx) => (
            <div key={idx} className="text-center p-2">
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-br from-brand-600 to-accent-600 bg-clip-text text-transparent dark:from-brand-400 dark:to-accent-300 font-mono">
                {item.value}
              </span>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">
                {item.label}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Three Core Innovations: "为什么是智汇工坊？" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
            PROJECT INNOVATION
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            为什么是“智汇工坊”？三大核心创新
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            拒绝套壳问答，以高阶工程化思维重构大学生的 AI 深度专业学习实践。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {innovations.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm hover:shadow-xl hover:border-brand-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-extrabold text-slate-200 dark:text-slate-800 font-mono">
                      {item.num}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 block mb-3">
                    {item.subtitle}
                  </span>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>闭环实践规范</span>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Today's Recommended Skills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
              FEATURED SKILLS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              今日精选推荐 AI Skill
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              经过多轮跨专业学生试用与迭代的高频典型学习技能，一键带入工作台。
            </p>
          </div>

          <Link
            to="/skills"
            className="flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            <span>查看全部 24+ 个 Skill</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedSkills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              onOpenPrincipleModal={(s) => setModalSkill(s)}
            />
          ))}
        </div>
      </section>

      {/* 5. Cross-Disciplinary Scenarios Quick Entry */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-brand-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-brand-300 border border-white/10">
              <Compass className="w-3.5 h-3.5" />
              跨专业共创实战
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              打通“计算机技术”与“五大学科真实场景”
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              覆盖人文社科、经管类、理工类、医学与生命科学、艺术设计 5 大门类。每个场景均提供“真实痛点 → AI Skill → Agent 工作流 → 最终成果”的完整实践链条。
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/scenarios"
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-all shadow-md"
              >
                <span>探索全部学习场景</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/create"
                className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all"
              >
                <span>共创我的专属 Skill</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Principle Modal */}
      <SkillDetailModal
        skill={modalSkill}
        onClose={() => setModalSkill(null)}
      />
    </div>
  );
};
