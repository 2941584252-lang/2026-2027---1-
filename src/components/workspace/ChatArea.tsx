import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Download, 
  Edit3, 
  Sparkles, 
  BookOpen, 
  Bot, 
  FileText,
  Save,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { Skill, WorkflowStage } from '../../types';
import { AIService } from '../../services/ai';
import { usePlatform } from '../../context/PlatformContext';

interface ChatAreaProps {
  skill: Skill | null;
  onStagesUpdate: (stages: WorkflowStage[], stepIndex: number, executing: boolean) => void;
  presetInput?: string;
}

export const ChatArea: React.FC<ChatAreaProps> = ({ skill, onStagesUpdate, presetInput }) => {
  const { addToast } = usePlatform();
  const [formInputs, setFormInputs] = useState<Record<string, string>>({});
  const [isExecuting, setIsExecuting] = useState(false);
  const [resultMarkdown, setResultMarkdown] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Initialize or reset input values whenever skill changes
  useEffect(() => {
    if (skill) {
      const initial: Record<string, string> = {};
      skill.inputs.forEach((inp) => {
        initial[inp.name] = inp.name === 'focusArea' && inp.options ? inp.options[0] : '';
      });
      if (presetInput) {
        const firstField = skill.inputs[0]?.name;
        if (firstField) initial[firstField] = presetInput;
      } else if (skill.sampleInput) {
        const firstField = skill.inputs[0]?.name;
        if (firstField) initial[firstField] = skill.sampleInput;
      }
      setFormInputs(initial);
      setResultMarkdown('');
      setIsEditing(false);
    }
  }, [skill, presetInput]);

  if (!skill) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm flex flex-col items-center justify-center text-center h-full text-slate-400">
        <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-3" />
        <h4 className="font-semibold text-slate-700 dark:text-slate-300 text-sm">请在左侧选择一个 AI Skill</h4>
        <p className="text-xs text-slate-400 mt-1">选择后将在此处载入专业学习工作流界面</p>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setFormInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleFillSample = () => {
    if (skill.sampleInput) {
      const firstField = skill.inputs[0]?.name;
      if (firstField) {
        setFormInputs((prev) => ({ ...prev, [firstField]: skill.sampleInput || '' }));
        addToast({
          type: 'info',
          title: '已填入典型范例数据',
          message: '点击“开始执行工作流”即可秒级体验。'
        });
      }
    }
  };

  const handleRunWorkflow = async () => {
    setIsExecuting(true);
    setResultMarkdown('');
    setIsEditing(false);

    const stages: WorkflowStage[] = [
      { id: 1, name: '输入学习材料', detail: '字符清洗、长文本切片与元数据解析', status: 'waiting' },
      { id: 2, name: 'AI 任务分析与规划', detail: '学科语境判定与子任务拓扑拆解', status: 'waiting' },
      { id: 3, name: 'Skill 路由与加载', detail: `挂载【${skill.name}】专业约束规则`, status: 'waiting' },
      { id: 4, name: 'Agent 多步骤协同', detail: '论证因果链核验、批判反思与交叉推导', status: 'waiting' },
      { id: 5, name: '生成结构化成果', detail: '渲染标准 Markdown 报告与知识卡片', status: 'waiting' },
      { id: 6, name: '用户交互审阅与微调', detail: '在线二次修改、批注与观点增补', status: 'waiting' },
      { id: 7, name: '保存为永久学习资料', detail: '归档个人知识库，支持多格式导出', status: 'waiting' },
    ];

    try {
      const result = await AIService.executeWorkflow(skill, formInputs, {
        onStageChange: (stageId, status, detail) => {
          const updated = stages.map((st) =>
            st.id === stageId ? { ...st, status, detail: detail || st.detail } : st
          );
          onStagesUpdate(updated, stageId, true);
        }
      });

      setResultMarkdown(result);
      onStagesUpdate(
        stages.map((s) => (s.id <= 5 ? { ...s, status: 'completed' } : s)),
        6,
        false
      );
    } catch (err: any) {
      console.error(err);
      addToast({
        type: 'error',
        title: '执行出错',
        message: err.message || '请检查输入或稍后重试'
      });
      onStagesUpdate(stages, 1, false);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(resultMarkdown);
    setCopied(true);
    addToast({
      type: 'success',
      title: '已复制到剪贴板',
      message: '可直接粘贴至 Obsidian, Notion 或 Word 中使用。'
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([resultMarkdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${skill.name}_学习报告_${new Date().toISOString().slice(0, 10)}.md`;
    link.click();
    URL.revokeObjectURL(url);
    addToast({
      type: 'success',
      title: 'Markdown 文件下载成功'
    });
  };

  const handleDownloadJSON = () => {
    const data = {
      skillId: skill.id,
      skillName: skill.name,
      timestamp: new Date().toISOString(),
      inputs: formInputs,
      outputMarkdown: resultMarkdown
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${skill.id}_export.json`;
    link.click();
    URL.revokeObjectURL(url);
    addToast({
      type: 'success',
      title: 'JSON 结构化数据导出成功'
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex flex-col h-full overflow-hidden">
      {/* Skill Banner */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {skill.name}
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200/60">
              {skill.major}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{skill.description}</p>
        </div>

        <button
          onClick={handleFillSample}
          className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 hover:bg-brand-100 rounded-lg transition-colors shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          填入范例
        </button>
      </div>

      {/* Main Workspace Body: Split into Input / Output */}
      <div className="flex-1 overflow-y-auto py-4 space-y-5">
        {/* Dynamic Inputs Form */}
        <div className="space-y-3">
          {skill.inputs.map((field) => (
            <div key={field.name}>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                <span className="text-[10px] text-slate-400 font-mono">
                  {field.type}
                </span>
              </div>

              {field.type === 'textarea' ? (
                <textarea
                  rows={4}
                  value={formInputs[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  placeholder={field.placeholder || '请输入材料内容...'}
                  className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 font-sans leading-relaxed"
                />
              ) : field.type === 'select' ? (
                <select
                  value={formInputs[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={formInputs[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  placeholder={field.placeholder || ''}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              )}
            </div>
          ))}

          {/* Trigger Button */}
          <div className="flex justify-end pt-1">
            <button
              onClick={handleRunWorkflow}
              disabled={isExecuting}
              className={`flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white rounded-xl shadow-md transition-all ${
                isExecuting
                  ? 'bg-amber-500 cursor-wait'
                  : 'bg-gradient-to-r from-brand-600 via-indigo-600 to-accent-600 hover:opacity-95 shadow-brand-500/25 hover:scale-[1.01]'
              }`}
            >
              {isExecuting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>正在执行 7 步学习工作流...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>启动 AI 工作流 (Run Workflow)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Structured Output Section */}
        {resultMarkdown && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  结构化学习成果输出
                </h4>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-lg transition-colors ${
                    isEditing
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                  title="在线微调修改"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>{isEditing ? '完成微调' : '在线修改'}</span>
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 rounded-lg"
                  title="复制全部 Markdown"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? '已复制' : '复制'}</span>
                </button>
                <button
                  onClick={handleDownloadMarkdown}
                  className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 rounded-lg"
                  title="导出 .md 笔记"
                >
                  <Download className="w-3 h-3" />
                  <span>.MD</span>
                </button>
                <button
                  onClick={handleDownloadJSON}
                  className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 rounded-lg"
                  title="导出 JSON 数据"
                >
                  <FileSpreadsheet className="w-3 h-3" />
                  <span>.JSON</span>
                </button>
              </div>
            </div>

            {/* Output Display / Editor */}
            {isEditing ? (
              <textarea
                rows={12}
                value={resultMarkdown}
                onChange={(e) => setResultMarkdown(e.target.value)}
                className="w-full p-4 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            ) : (
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-sans prose prose-slate dark:prose-invert max-w-none overflow-x-auto whitespace-pre-wrap">
                {resultMarkdown}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
