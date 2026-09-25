import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Layers, 
  BrainCircuit, 
  Workflow, 
  FileCheck, 
  Edit3, 
  Download,
  AlertCircle
} from 'lucide-react';
import { WorkflowStage } from '../../types';

interface WorkflowTrackerProps {
  stages: WorkflowStage[];
  currentStep: number;
  isExecuting: boolean;
  activeSkillName?: string;
}

export const WorkflowTracker: React.FC<WorkflowTrackerProps> = ({
  stages,
  currentStep,
  isExecuting,
  activeSkillName
}) => {
  const defaultStages: WorkflowStage[] = [
    { id: 1, name: '输入学习材料', detail: '字符清洗、长文本切片与元数据解析', status: 'waiting' },
    { id: 2, name: 'AI 任务分析与规划', detail: '学科语境判定与子任务拓扑拆解', status: 'waiting' },
    { id: 3, name: 'Skill 路由与加载', detail: `挂载【${activeSkillName || '指定Skill'}】专业约束规则`, status: 'waiting' },
    { id: 4, name: 'Agent 多步骤协同', detail: '论证因果链核验、批判反思与交叉推导', status: 'waiting' },
    { id: 5, name: '生成结构化成果', detail: '渲染标准 Markdown 报告与知识卡片', status: 'waiting' },
    { id: 6, name: '用户交互审阅与微调', detail: '在线二次修改、批注与观点增补', status: 'waiting' },
    { id: 7, name: '保存为永久学习资料', detail: '归档个人知识库，支持多格式导出', status: 'waiting' },
  ];

  const displayStages = stages.length ? stages : defaultStages;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300 flex items-center justify-center">
            <Workflow className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              7步学习工作流执行追踪
            </h4>
            <p className="text-[10px] text-slate-400">实时反映 AI Agent 任务闭环状态</p>
          </div>
        </div>
        <div className="text-right">
          {isExecuting ? (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
              流转执行中
            </span>
          ) : currentStep >= 5 ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200/60">
              <CheckCircle2 className="w-3 h-3" />
              已就绪
            </span>
          ) : (
            <span className="text-[10px] text-slate-400">待触发</span>
          )}
        </div>
      </div>

      {/* 7-Step Vertical Flow */}
      <div className="py-4 space-y-3 flex-1 overflow-y-auto">
        {displayStages.map((stage, idx) => {
          const isDone = stage.status === 'completed';
          const isCurrent = stage.status === 'running';

          return (
            <div key={stage.id} className="relative flex items-start gap-3 group">
              {/* Vertical connector line */}
              {idx < displayStages.length - 1 && (
                <div
                  className={`absolute left-3.5 top-7 bottom-0 w-[2px] -mb-3 transition-colors ${
                    isDone
                      ? 'bg-emerald-500 dark:bg-emerald-500/80'
                      : isCurrent
                      ? 'bg-amber-400'
                      : 'bg-slate-200 dark:bg-slate-800'
                  }`}
                />
              )}

              {/* Status Badge */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-all relative z-10 ${
                  isDone
                    ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30'
                    : isCurrent
                    ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/20 animate-pulse'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <span>{stage.id}</span>
                )}
              </div>

              {/* Details Content */}
              <div className="flex-1 pb-1">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-semibold ${
                      isDone
                        ? 'text-slate-900 dark:text-white'
                        : isCurrent
                        ? 'text-amber-600 dark:text-amber-400 font-bold'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {stage.name}
                  </span>
                  {isCurrent && (
                    <span className="text-[10px] text-amber-500 animate-pulse font-mono">Running...</span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                  {stage.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer hint */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-brand-500 shrink-0" />
        <span>智汇工坊工作流将“一问一答”升级为可复用的学习闭环</span>
      </div>
    </div>
  );
};
