import { Agent } from '../types';

export const initialAgents: Agent[] = [
  {
    id: 'agent-literature-research',
    name: '文献深度研读多智能体 (Literature Research Agent)',
    description: '端到端自主执行：从学术论文文本解析、研究问题界定、实验方法逆向、关键数据挖掘到生成多维度阅读报告。',
    category: '科研精读',
    major: '通用学科',
    targetRole: '学术导师与审稿专家',
    usageCount: 1680,
    sampleTask: '请深度精读这篇关于大语言模型注意力机制加速的学术论文，提取其实验设计与对比基线。',
    defaultSkillIds: ['literature-deep-read', 'knowledge-card-atomic'],
    iconName: 'FileText',
    workflowSummary: [
      '论文结构智能解析',
      '学术问题与研究假设识别',
      '方法论与实验协议还原',
      '量化实验结果交叉核验',
      '批判性同行评审报告合成'
    ],
    nodes: [
      {
        id: 'node-lit-1',
        label: '文本流与元数据提取 (Parser)',
        type: 'trigger',
        description: '自动分离论文的Title、Abstract、Introduction、Methodology与Conclusion，过滤引用噪音。',
        status: 'waiting',
        stageIndex: 1,
        inputSchema: 'PDF/TXT 文本全文',
        outputSchema: '章节结构化抽象语法树 (AST)'
      },
      {
        id: 'node-lit-2',
        label: '研究核心问题判别 (Problem Analyzer)',
        type: 'analyzer',
        description: '识别作者发现的现有学术空白(Gap)与本文提出的主命题假设。',
        status: 'waiting',
        stageIndex: 2,
        inputSchema: 'Introduction 与 Related Work 文本',
        outputSchema: '研究痛点与核心科学假设'
      },
      {
        id: 'node-lit-3',
        label: '研究方法与设计逆向 (Methodology Router)',
        type: 'skill_router',
        description: '判断论文属于理论推导、定量实证、算法优化还是问卷实验，调度对应专业解析 Skill。',
        status: 'waiting',
        stageIndex: 3,
        inputSchema: 'Methodology 章节',
        outputSchema: '技术路径图与变量操作化定义'
      },
      {
        id: 'node-lit-4',
        label: '实验数据与基准检验 (Evidence Extractor)',
        type: 'skill_executor',
        description: '提取SOTA对比指标、消融实验(Ablation Study)与样本统计效力(p值/置信区间)。',
        status: 'waiting',
        stageIndex: 4,
        inputSchema: 'Experiments 与 Results 表格数据',
        outputSchema: '关键度量指标与实验对照矩阵'
      },
      {
        id: 'node-lit-5',
        label: '批判性审稿与报告合成 (Report Synthesizer)',
        type: 'generator',
        description: '从创新增量、理论漏洞、未来拓展三个维度生成出版级精读笔记与思维图谱。',
        status: 'waiting',
        stageIndex: 5,
        inputSchema: '前序分析聚合特征向量',
        outputSchema: '完整结构化学术阅读长文'
      }
    ]
  },
  {
    id: 'agent-course-review',
    name: '课程复习冲刺自主规划 Agent (Course Review Planner)',
    description: '针对期末、考研或考证备考，将教材知识体系拆解为考点网络、易混淆概念对比矩阵、冲刺排期及自测题库。',
    category: '备考规划',
    major: '通用学科',
    targetRole: '学科金牌主讲与命题研究员',
    usageCount: 2450,
    sampleTask: '整理《数据结构与算法》中二叉搜索树、平衡二叉树与红黑树的高频期末考点与对比表。',
    defaultSkillIds: ['exam-review-synthesis', 'knowledge-card-atomic'],
    iconName: 'GraduationCap',
    workflowSummary: [
      '教材目录与考纲结构化',
      '命题权重大数据关联分析',
      '易错点陷阱库归纳',
      '自适应复习周期规划',
      '原创高仿真模拟自测题生成'
    ],
    nodes: [
      {
        id: 'node-rev-1',
        label: '知识图谱拓扑构建 (Syllabus Mapper)',
        type: 'trigger',
        description: '抽取章、节、知识点三级依赖图，定位核心先导知识。',
        status: 'waiting',
        stageIndex: 1,
        inputSchema: '教材大纲或课程笔记',
        outputSchema: '有向无环图知识依赖网络'
      },
      {
        id: 'node-rev-2',
        label: '高频考点密度评分 (Weight Evaluator)',
        type: 'analyzer',
        description: '结合历年典型题型，计算选择题、计算题与综合论述题的命题频次权重。',
        status: 'waiting',
        stageIndex: 2,
        inputSchema: '知识图谱节点集',
        outputSchema: '高频考点优先级排列表'
      },
      {
        id: 'node-rev-3',
        label: '易混淆概念矩阵比对 (Confusion Matrix Skill)',
        type: 'skill_executor',
        description: '调用专业辨析 Skill，横向对比容易张冠李戴的定理、公式与适用边界。',
        status: 'waiting',
        stageIndex: 3,
        inputSchema: '相近或对应概念对',
        outputSchema: '多维对比表格与经典反例'
      },
      {
        id: 'node-rev-4',
        label: '艾宾浩斯复习排期引擎 (Schedule Engine)',
        type: 'validator',
        description: '根据考试剩余天数，科学规划第一轮精读、第二轮刷题、第三轮默写的日程。',
        status: 'waiting',
        stageIndex: 4,
        inputSchema: '考点列表与备考周期',
        outputSchema: '日历级学习任务清单'
      },
      {
        id: 'node-rev-5',
        label: '针对性自测题与评分标准 (Quiz Generator)',
        type: 'generator',
        description: '生成涵盖概念理解、综合应用和踩坑辨析的自测题，附带踩分点剖析。',
        status: 'waiting',
        stageIndex: 5,
        inputSchema: '高频考点与错误陷阱',
        outputSchema: '模拟自测卷及答案详解'
      }
    ]
  },
  {
    id: 'agent-writing-inspection',
    name: '学术论文严谨性全流程巡检 Agent (Paper Rigor Inspector)',
    description: '贯通“篇章宏观结构 → 逻辑因果链条 → 学术语言规范 → 引用格式对齐”的自动化严谨性审查流水线。',
    category: '学术规范',
    major: '通用学科',
    targetRole: '顶级期刊执行主编',
    usageCount: 1980,
    sampleTask: '审查这篇实证论文的引言与讨论部分，重点检查因果推导是否严密，有无过度夸大研究结论。',
    defaultSkillIds: ['academic-logic-checker'],
    iconName: 'ShieldCheck',
    workflowSummary: [
      '篇章逻辑结构平衡性扫描',
      '论证因果跃迁与偷换概念排查',
      '学术语调润色与口语化清洗',
      '文献引用对应性校验',
      '生成修改前后对照表'
    ],
    nodes: [
      {
        id: 'node-wri-1',
        label: '篇章结构对称性检测 (Structure Scanner)',
        type: 'trigger',
        description: '检查摘要、引言、方法、讨论段落比例，评估是否头重脚轻或结论仓促。',
        status: 'waiting',
        stageIndex: 1,
        inputSchema: '论文全文草稿',
        outputSchema: '篇章结构评分与段落失衡预警'
      },
      {
        id: 'node-wri-2',
        label: '论点-论据因果推导核验 (Causal Link Validator)',
        type: 'analyzer',
        description: '基于形式逻辑法则，检查是否存在“以相关代因果”、“诉诸无知”、“幸存者偏差”。',
        status: 'waiting',
        stageIndex: 2,
        inputSchema: '核心论述段落',
        outputSchema: '逻辑漏洞定位与风险评级'
      },
      {
        id: 'node-wri-3',
        label: '学术措辞与绝对化用语清洗 (Tone Polisher)',
        type: 'skill_executor',
        description: '将“显然证明了”、“完全正确”等不当绝对化口吻改写为严谨的学术限定表达。',
        status: 'waiting',
        stageIndex: 3,
        inputSchema: '敏感主观表述句',
        outputSchema: '客观克制学术润色对照'
      },
      {
        id: 'node-wri-4',
        label: '论证完整度综合评估 (Rigor Score Synthesizer)',
        type: 'generator',
        description: '生成综合修订诊断报告，提供论据补充建议与分级修改策略。',
        status: 'waiting',
        stageIndex: 4,
        inputSchema: '全流程质检结果',
        outputSchema: '完整论文巡检修订指南'
      }
    ]
  },
  {
    id: 'agent-knowledge-synthesis',
    name: '知识重构与卡片化智囊 Agent (Knowledge Synthesis Agent)',
    description: '支持海量长文本与杂乱资料的多模态知识重构：一键解构为原子知识卡片、思维导图骨架及双链知识树。',
    category: '知识内化',
    major: '通用学科',
    targetRole: '知识管理架构师',
    usageCount: 1540,
    sampleTask: '将这段关于认知心理学注意分配理论的讲座速记整理成层级知识卡片。',
    defaultSkillIds: ['knowledge-card-atomic'],
    iconName: 'Network',
    workflowSummary: [
      '核心概念实体与语义识别',
      '费曼学习法通俗解构',
      '卡片盒笔记法标准原子化',
      '跨学科思维模型关联',
      'Markdown 双链与知识网络导出'
    ],
    nodes: [
      {
        id: 'node-kno-1',
        label: '语义实体与命题提取 (Entity Extractor)',
        type: 'trigger',
        description: '从杂乱输入文本中清洗非核心停用词，提取专业术语与基础定理定义。',
        status: 'waiting',
        stageIndex: 1,
        inputSchema: '课堂录音文字稿/杂乱笔记',
        outputSchema: '概念名词集与关联关系对'
      },
      {
        id: 'node-kno-2',
        label: '概念通俗化类比重构 (Feynman Simplifier)',
        type: 'skill_executor',
        description: '调用费曼类比 Skill，为抽象术语匹配日常直觉化映射场景。',
        status: 'waiting',
        stageIndex: 2,
        inputSchema: '专业概念抽象定义',
        outputSchema: '直觉化生活类比段落'
      },
      {
        id: 'node-kno-3',
        label: '原子卡片标准化封装 (Zettelkasten Formatter)',
        type: 'generator',
        description: '生成包含 YAML 元数据、核心定义、应用案例、反例辨析的标准卡片。',
        status: 'waiting',
        stageIndex: 3,
        inputSchema: '结构化概念语义块',
        outputSchema: 'Obsidian / Logseq 兼容双链 Markdown'
      }
    ]
  }
];
