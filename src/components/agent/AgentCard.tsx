import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, ArrowRight, Sparkles, Workflow, Layers, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { Agent } from '../../types';
import { AgentFlowDiagram } from '../visual/AgentFlowDiagram';
import { usePlatform } from '../../context/PlatformContext';

interface AgentCardProps {
  agent: Agent;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const [showFlow, setShowFlow] = useState(false);
  const { setActiveAgent, setActiveSkill, skills } = usePlatform();
  const navigate = useNavigate();

  const handleLaunchAgent = () => {
    setActiveAgent(agent);
    // Auto select first default skill
    if (agent.defaultSkillIds.length > 0) {
      const matched = skills.find((s) => s.id === agent.defaultSkillIds[0]);
      if (matched) setActiveSkill(matched);
    }
    navigate('/workspace');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm hover:border-brand-500/40 dark:hover:border-brand-500/40 transition-all flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-600 text-white flex items-center justify-center shadow-md shadow-brand-500/20">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {agent.name}
                </h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200/60">
                  {agent.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                模拟角色：<strong className="text-slate-700 dark:text-slate-300 font-medium">{agent.targetRole}</strong> · 适用领域：{agent.major}
              </p>
            </div>
          </div>
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            {agent.usageCount.toLocaleString()}次协同
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
          {agent.description}
        </p>

        {/* Workflow Summary Pills */}
        <div className="mb-5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            自主执行流水线 (Pipeline)：
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {agent.workflowSummary.map((step, idx) => (
              <React.Fragment key={idx}>
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                  {step}
                </span>
                {idx < agent.workflowSummary.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-slate-300 dark:text-slate-600" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Expandable Flow Diagram */}
        {showFlow && (
          <div className="mb-5 animate-in fade-in zoom-in-95 duration-200">
            <AgentFlowDiagram agent={agent} />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
        <button
          onClick={() => setShowFlow(!showFlow)}
          className="flex items-center gap-1 text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline"
        >
          <Workflow className="w-3.5 h-3.5" />
          <span>{showFlow ? '收起工作流图谱' : '查看交互式工作流图谱'}</span>
          {showFlow ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={handleLaunchAgent}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm shadow-brand-600/30 transition-all hover:scale-[1.02]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          启动 Agent
        </button>
      </div>
    </div>
  );
};
