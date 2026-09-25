import React, { useState } from 'react';
import { Layers, Sparkles, BookOpen, Bot, Workflow, HelpCircle } from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';
import { ToolSidebar } from '../components/workspace/ToolSidebar';
import { ChatArea } from '../components/workspace/ChatArea';
import { WorkflowTracker } from '../components/visual/WorkflowTracker';
import { WorkflowStage } from '../types';

export const Workspace: React.FC = () => {
  const { activeSkill } = usePlatform();
  const [stages, setStages] = useState<WorkflowStage[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [presetInput, setPresetInput] = useState<string>('');

  const handleStagesUpdate = (newStages: WorkflowStage[], stepIndex: number, executing: boolean) => {
    setStages(newStages);
    setCurrentStep(stepIndex);
    setIsExecuting(executing);
  };

  const handleSelectSamplePreset = (inputString: string) => {
    setPresetInput(inputString);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-4rem)] flex flex-col space-y-4">
      {/* Top Banner Notice */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-brand-50/80 dark:bg-brand-950/40 border border-brand-200/60 dark:border-brand-800/60 text-xs text-brand-800 dark:text-brand-200 shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-600 shrink-0" />
          <span>
            <strong>智汇工坊 AI 学习工作台</strong>：正在协同执行【{activeSkill?.name || '通用学习任务'}】。右侧面板实时反映 7 步任务流转状态。
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-brand-700 dark:text-brand-300">
          <span>无需配置 API Key 即可全功能演示</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">支持一键微调与 Markdown 导出</span>
        </div>
      </div>

      {/* 3-Column Responsive Workbench Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0">
        {/* Left: AI Tool & Presets (3 cols) */}
        <div className="lg:col-span-3 h-full overflow-hidden">
          <ToolSidebar onSelectSamplePreset={handleSelectSamplePreset} />
        </div>

        {/* Center: Dynamic Chat / Skill Execution Area (6 cols) */}
        <div className="lg:col-span-6 h-full overflow-hidden">
          <ChatArea
            skill={activeSkill}
            onStagesUpdate={handleStagesUpdate}
            presetInput={presetInput}
          />
        </div>

        {/* Right: Live 7-step Workflow Tracker (3 cols) */}
        <div className="lg:col-span-3 h-full overflow-hidden">
          <WorkflowTracker
            stages={stages}
            currentStep={currentStep}
            isExecuting={isExecuting}
            activeSkillName={activeSkill?.name}
          />
        </div>
      </div>
    </div>
  );
};
