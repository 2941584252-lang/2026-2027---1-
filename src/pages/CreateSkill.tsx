import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  Sparkles, 
  Eye, 
  Save, 
  Layers, 
  Trash2, 
  Plus, 
  CheckCircle2, 
  BookOpen,
  Wand2,
  Code
} from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';
import { Skill, SkillCategory, MajorDomain, DifficultyLevel } from '../types';

export const CreateSkill: React.FC = () => {
  const { addSkill, setActiveSkill } = usePlatform();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<SkillCategory>('文献阅读');
  const [major, setMajor] = useState<MajorDomain>('人文社科');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('入门');
  const [painPoint, setPainPoint] = useState('');
  const [author, setAuthor] = useState('计创2502 勤助实践组');
  const [tags, setTags] = useState('跨专业共创, 学习工作流');

  // Dynamic Workflow steps
  const [workflow, setWorkflow] = useState<string[]>([
    '解析原始材料格式与结构',
    '识别核心论点与关键变量',
    '执行专业框架逻辑推理',
    '生成结构化学术报告'
  ]);

  // Prompt template
  const [promptTemplate, setPromptTemplate] = useState(
    '作为专业学科导师，请根据学生提供的材料，严格按照以下步骤完成分析并生成结构化成果。'
  );

  const categories: SkillCategory[] = [
    '文献阅读', '课程复习', '知识整理', '写作辅助', '数据分析', '编程学习', '语言学习', '跨专业学习'
  ];

  const majors: MajorDomain[] = [
    '计算机/人工智能', '人文社科', '经管类', '理工类', '医学/生命科学', '艺术设计', '通用学科'
  ];

  const handleAddStep = () => {
    setWorkflow([...workflow, `步骤 ${workflow.length + 1}：新增处理阶段`]);
  };

  const handleRemoveStep = (idx: number) => {
    if (workflow.length <= 2) return;
    setWorkflow(workflow.filter((_, i) => i !== idx));
  };

  const handleStepChange = (idx: number, val: string) => {
    const updated = [...workflow];
    updated[idx] = val;
    setWorkflow(updated);
  };

  // AI Helper: Auto Complete Steps & Schema based on painPoint
  const handleAiAutoComplete = () => {
    if (!painPoint.trim()) {
      alert('请先在下方输入“要解决的专业学习痛点”，以便 AI 针对性推导！');
      return;
    }

    if (painPoint.includes('史') || painPoint.includes('文')) {
      setName('古典文献考据与多源辨异助手');
      setDescription('针对古籍句读、职官制度与同事件多文本冲突，开展源流考辨与多维度矩阵对齐。');
      setCategory('跨专业学习');
      setMajor('人文社科');
      setWorkflow([
        '古籍断句与专名术语抽取',
        '作者立场与官私撰史话语权透视',
        '多源版本差异矩阵对齐',
        '生成带注释考据长文'
      ]);
      setPromptTemplate('请以严谨的历史考据学规范，对古籍史料进行源流比对，重点关注制度变迁与记载异同。');
    } else if (painPoint.includes('商') || painPoint.includes('经') || painPoint.includes('财')) {
      setName('商业战略画布与竞争博弈解析器');
      setDescription('运用波特五力与商业模式画布(BMC)，将企业复杂财报与冲突信息解构为落地执行路线。');
      setCategory('跨专业学习');
      setMajor('经管类');
      setWorkflow([
        '提取财务关键异常指标',
        '应用MECE准则完成要素穷尽分类',
        '构建动态行业竞争价值曲线',
        '输出金字塔式高管战略建议'
      ]);
      setPromptTemplate('运用麦肯锡金字塔原理，做到结论先行、自上而下，输出具有高度商业常识的落地策略。');
    } else {
      setName(`${category}深度辅助研读助手`);
      setDescription(`针对${painPoint}，通过多阶段规范化分解，提供系统性推理与结构化产出。`);
      setWorkflow([
        '输入材料清洗与核心概念抽取',
        '横向对比分析与理论验证',
        '批判性思考与局限性审阅',
        '生成标准学术报告与知识卡片'
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      alert('请填写完整的 Skill 名称与描述！');
      return;
    }

    const created = addSkill({
      name,
      description,
      category,
      major,
      difficulty,
      author,
      authorRole: '共创学生开发者',
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      workflow,
      promptTemplate,
      sampleInput: `请围绕【${name}】的场景，对我提供的这段专业学习文本进行深度分析...`,
      inputs: [
        { name: 'mainText', type: 'textarea', label: '学习材料或待分析文本', placeholder: '粘贴专业文献、讲义或问题描述...', required: true }
      ],
      outputs: [
        { key: 'analysis', label: '深度分析', description: '基于规则的核心推导', format: 'markdown' },
        { key: 'summary', label: '知识卡片', description: '原子化提炼', format: 'card' }
      ]
    });

    setActiveSkill(created);
    navigate('/workspace');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
            <PlusCircle className="w-5 h-5" />
          </span>
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
            SKILL CO-CREATION WIZARD
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          共创专属 AI Skill
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
          把你在某一门专业课中摸索出的优质学习方法，沉淀为可以反复调用、并分享给其他同学的 AI 技能。
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: 痛点与 AI 智能建议 */}
        <div className="bg-gradient-to-r from-brand-900/10 via-indigo-900/10 to-slate-900/10 dark:from-brand-950/50 dark:to-slate-900/50 p-6 rounded-3xl border border-brand-200/60 dark:border-brand-800/60 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-500" />
              第 1 步：你想要解决什么真实专业学习痛点？
            </label>
            <button
              type="button"
              onClick={handleAiAutoComplete}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:opacity-90 rounded-lg shadow-sm"
            >
              <Wand2 className="w-3.5 h-3.5" />
              AI 智能补全步骤与规则
            </button>
          </div>
          <textarea
            rows={2}
            value={painPoint}
            onChange={(e) => setPainPoint(e.target.value)}
            placeholder="例如：我读历史文献经常分不清官职古今变迁和修史立场；或者宏观经济学政策传导链算不清摩擦阻力..."
            className="w-full p-3 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <p className="text-[11px] text-slate-400">
            * 提示：输入痛点后点击“AI 智能补全”，系统将为您自动生成名称、流程与提示词框架。
          </p>
        </div>

        {/* Step 2: 基础信息 */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            第 2 步：Skill 基础定义
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Skill 名称 *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="如：历史文献互证助手、宏观政策传导推导器..."
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                作者 / 共创团队署名
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              技能功能简介 (一句话讲明白能帮学生做什么) *
            </label>
            <textarea
              rows={2}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="简要概括输入什么、输出什么、解决什么核心难点..."
              className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                任务分类 (Category)
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as SkillCategory)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                面向学科 (Major)
              </label>
              <select
                value={major}
                onChange={(e) => setMajor(e.target.value as MajorDomain)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {majors.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                难度级别
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="入门">入门 (零基础上手)</option>
                <option value="进阶">进阶 (有专业基础)</option>
                <option value="专家">专家 (高阶科研/研讨)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              场景检索标签 (逗号分隔)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="如：期末备考, 论文考据, 逻辑推演"
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        {/* Step 3: 内部执行工作流 */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              第 3 步：内部执行处理步骤 (Workflow Steps)
            </h3>
            <button
              type="button"
              onClick={handleAddStep}
              className="flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              添加步骤
            </button>
          </div>

          <div className="space-y-2">
            {workflow.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 text-xs font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <input
                  type="text"
                  value={step}
                  onChange={(e) => handleStepChange(idx, e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                {workflow.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveStep(idx)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 4: 提示词工程规则 */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            第 4 步：Prompt 规则与学术约束 (System Prompt)
          </h3>
          <textarea
            rows={4}
            value={promptTemplate}
            onChange={(e) => setPromptTemplate(e.target.value)}
            className="w-full p-3 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 leading-relaxed"
          />
          <p className="text-[11px] text-slate-400">
            * 智汇工坊平台会在底层自动注入学科严谨度契约，约束模型拒绝主观臆测与学术幻觉。
          </p>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate('/skills')}
            className="px-5 py-2.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-xl"
          >
            取消
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:opacity-95 rounded-xl shadow-lg shadow-brand-500/25 transition-all hover:scale-[1.02]"
          >
            <Save className="w-4 h-4" />
            <span>保存并发布至 Skill 广场</span>
          </button>
        </div>
      </form>
    </div>
  );
};
