import React, { useState } from 'react';
import { 
  Bot, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Info, 
  Layers, 
  Cpu, 
  Database,
  GitBranch,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';
import { Agent, AgentNode } from '../../types';

interface AgentFlowDiagramProps {
  agent: Agent;
  currentRunningNodeIndex?: number;
  interactive?: boolean;
}

export const AgentFlowDiagram: React.FC<AgentFlowDiagramProps> = ({
  agent,
  currentRunningNodeIndex = -1,
  interactive = true
}) => {
  const [selectedNode, setSelectedNode] = useState<AgentNode | null>(agent.nodes[0] || null);

  const getNodeIcon = (type: AgentNode['type']) => {
    switch (type) {
      case 'trigger': return Layers;
      case 'analyzer': return Cpu;
      case 'skill_router': return GitBranch;
      case 'skill_executor': return Sparkles;
      case 'validator': return ShieldCheck;
      case 'generator': return FileSpreadsheet;
      default: return Bot;
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl overflow-hidden relative">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#6172f3_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-800 gap-3 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-base font-bold text-white tracking-wide">
              {agent.name}
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-brand-900/60 text-brand-300 border border-brand-700/50">
              {agent.targetRole}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            动态自适应协同流水线 · 点击任意节点即可查看其输入输出契约与执行逻辑
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-brand-500" />
            待命
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            执行中
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            已完成
          </span>
        </div>
      </div>

      {/* Flow Nodes Pipeline */}
      <div className="py-8 overflow-x-auto relative z-10">
        <div className="flex items-center justify-between min-w-[700px] gap-2 px-2">
          {agent.nodes.map((node, index) => {
            const Icon = getNodeIcon(node.type);
            const isSelected = selectedNode?.id === node.id;
            const isRunning = currentRunningNodeIndex === index;
            const isCompleted = currentRunningNodeIndex > index;

            return (
              <React.Fragment key={node.id}>
                {/* Node Box */}
                <div
                  onClick={() => interactive && setSelectedNode(node)}
                  className={`relative flex flex-col items-center p-3 rounded-xl border text-center transition-all cursor-pointer min-w-[125px] max-w-[140px] group ${
                    isSelected
                      ? 'border-brand-400 bg-brand-950/70 shadow-lg shadow-brand-500/20 ring-2 ring-brand-500/40'
                      : isRunning
                      ? 'border-amber-400 bg-amber-950/40 animate-pulse'
                      : isCompleted
                      ? 'border-emerald-500/60 bg-emerald-950/30'
                      : 'border-slate-800 bg-slate-800/60 hover:border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  {/* Stage Badge */}
                  <div className="absolute -top-2.5 left-2 px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-slate-900 border border-slate-700 text-slate-400">
                    S0{node.stageIndex}
                  </div>

                  {/* Icon Circle */}
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 transition-transform group-hover:scale-110 ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-600/40'
                      : isRunning
                      ? 'bg-amber-500 text-slate-950'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-700/80 text-slate-300'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Label */}
                  <h5 className="text-[11px] font-semibold text-slate-200 line-clamp-2 leading-tight">
                    {node.label}
                  </h5>

                  {/* Type Tag */}
                  <span className="text-[9px] text-slate-400 mt-1 uppercase tracking-wider font-mono">
                    {node.type}
                  </span>
                </div>

                {/* Arrow connector */}
                {index < agent.nodes.length - 1 && (
                  <div className="flex items-center text-slate-600 shrink-0">
                    <div className="w-6 h-[2px] bg-gradient-to-r from-slate-700 to-slate-600 relative">
                      <div className="absolute inset-0 bg-brand-400/40 animate-pulse" />
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 -ml-1 text-slate-500" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Node Inspector Drawer */}
      {selectedNode && (
        <div className="mt-4 p-4 rounded-xl bg-slate-950/90 border border-slate-800 relative z-10 animate-in fade-in duration-150">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-brand-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                节点详查：{selectedNode.label}
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
              节点类型: {selectedNode.type}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block mb-1">功能逻辑描述：</span>
              <p className="text-slate-200 leading-relaxed">{selectedNode.description}</p>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">输入契约 (Input Schema)：</span>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-[11px] text-indigo-300">
                {selectedNode.inputSchema || '纯文本 / 结构化AST'}
              </div>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">输出契约 (Output Schema)：</span>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-[11px] text-emerald-300">
                {selectedNode.outputSchema || 'JSON 语义向量 / 报告片段'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
