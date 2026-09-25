import React, { useState } from 'react';
import { 
  Bot, 
  Workflow, 
  Sparkles, 
  Layers, 
  GitBranch, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';
import { AgentCard } from '../components/agent/AgentCard';

export const Agents: React.FC = () => {
  const { agents } = usePlatform();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-lg bg-accent-50 text-accent-600 dark:bg-accent-950 dark:text-accent-300">
            <Bot className="w-5 h-5" />
          </span>
          <span className="text-xs font-bold text-accent-600 dark:text-accent-400 uppercase tracking-widest">
            AI AGENT PLATFORM
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          AI Agent 工作台
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          让 AI 从“回答问题”，进一步走向“自主协同完成任务”。展示多智能体在复杂学术科研、复习冲刺与论文巡检中的全流程编排。
        </p>
      </div>

      {/* Feature Banner: Agent Concept */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-600/80 flex items-center justify-center shrink-0">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">任务自主分解 (Decomposition)</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              将宏大学术任务（如精读专著、论文改写）拆解为有向无环图执行链，杜绝一步到位的幻觉。
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600/80 flex items-center justify-center shrink-0">
            <GitBranch className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">智能技能路由 (Skill Router)</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              根据当前子阶段特征，自适应动态调度最适配的专业 AI Skill，参数自动校准与类型强约束。
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-600/80 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">批判核验闭环 (Reflection)</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              输出成果前强制经过逻辑巡检与学术自洽性核查，保证输出对大学生专业研究有实质帮助。
            </p>
          </div>
        </div>
      </div>

      {/* Agent Catalog */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            典型多智能体系统列表
          </h3>
          <span className="text-xs text-slate-400">
            内置 {agents.length} 款开箱即用学习 Agent
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </div>
  );
};
