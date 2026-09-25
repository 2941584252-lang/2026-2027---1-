import { Skill } from '../types';

export const initialSkills: Skill[] = [
  {
    id: 'literature-deep-read',
    name: '文献精读助手 (Literature Deep-Read)',
    description: '将长篇学术论文或专著章节解构为研究问题、方法论、核心结论、创新点与局限性的结构化阅读报告。',
    category: '文献阅读',
    major: '通用学科',
    difficulty: '进阶',
    usageCount: 1420,
    author: '陈靖昊 / 智汇工坊团队',
    authorRole: 'AI Skill 设计岗',
    createdAt: '2026-10-15',
    tags: ['学术论文', '结构化解析', '研究方法', '批判性思考'],
    iconName: 'BookOpen',
    sampleInput: `标题：Deep Residual Learning for Image Recognition
摘要：Deeper neural networks are more difficult to train. We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously. We explicitly reformulate the layers as learning residual functions with reference to the layer inputs, instead of learning unreferenced functions.
正文片段：Driven by the significance of depth, we hypothesize that it is easier to optimize the residual mapping than to optimize the original, unreferenced mapping. To address the degradation problem, we introduce a deep residual learning framework. Instead of hoping each few stacked layers directly fit a desired underlying mapping, we explicitly let these layers fit a residual mapping. Formally, denoting the desired underlying mapping as H(x), we let the stacked nonlinear layers fit another mapping F(x) := H(x) - x. The original mapping is recast into F(x)+x.`,
    inputs: [
      { name: 'paperText', type: 'textarea', label: '论文文本或摘要', placeholder: '粘贴论文正文片段、摘要或章节内容...', required: true },
      { name: 'focusArea', type: 'select', label: '解析侧重点', placeholder: '选择精读重点', required: false, options: ['全面结构化精读', '方法论与实验复现', '研究创新点与启发', '文献批判与局限性'] }
    ],
    outputs: [
      { key: 'problem', label: '研究核心问题 (Problem)', description: '论文试图解决的根本学术痛点', format: 'markdown' },
      { key: 'methodology', label: '研究方法与设计 (Methodology)', description: '理论框架、模型结构或实验流程', format: 'markdown' },
      { key: 'findings', label: '核心发现与数据 (Findings)', description: '关键实证数据与定量/定性结论', format: 'markdown' },
      { key: 'innovation', label: '理论与实践创新 (Innovation)', description: '对现有知识体系的独特增量', format: 'markdown' },
      { key: 'limitations', label: '局限性与未来方向 (Limitations)', description: '论文尚未解决或存在偏差的边界', format: 'markdown' }
    ],
    workflow: [
      '提取论文题录与元数据',
      '定位核心研究问题与假设',
      '逆向解析实验/理论证明范式',
      '提取并交叉检验实证指标',
      '多维度批判性反思与沉淀'
    ],
    promptTemplate: `你是一名顶尖学术研究助手。请针对输入的论文材料，严谨提取：1. 研究问题 2. 研究方法 3. 核心结论 4. 创新贡献 5. 局限性与质疑点。必须基于文本客观事实，禁止无根据臆测。`
  },
  {
    id: 'exam-review-synthesis',
    name: '课程复习全景图谱助手 (Exam Reviewer)',
    description: '输入课程章节教材或笔记，自动生成高频考点树、易错易混概念辨析表、复习冲刺计划及变式自测题。',
    category: '课程复习',
    major: '通用学科',
    difficulty: '入门',
    usageCount: 2150,
    author: '董吉祥 / 跨专业共创组',
    authorRole: '跨专业场景共创岗',
    createdAt: '2026-10-20',
    tags: ['期末备考', '考点提炼', '概念对比', '自测刷题'],
    iconName: 'GraduationCap',
    sampleInput: `课程：操作系统原理
章节：第3章 进程同步与死锁
重点内容：临界区互斥、PV操作（信号量机制）、哲学家就餐问题、死锁产生的四个必要条件（互斥、占有且等待、不可抢占、循环等待）、银行家算法资源分配安全性检查。`,
    inputs: [
      { name: 'courseName', type: 'text', label: '课程名称', placeholder: '如：数据结构、西方经济学、中国现代文学史...', required: true },
      { name: 'materials', type: 'textarea', label: '章节知识点或教材笔记', placeholder: '粘贴课程提纲、PPT要点或课后习题...', required: true }
    ],
    outputs: [
      { key: 'coreKnowledge', label: '核心知识体系树', description: '层级化知识骨架与关联图', format: 'markdown' },
      { key: 'highFrequencyExamPoints', label: '高频命题点与分值预测', description: '期末/考研最易出大题与综合题的点', format: 'table' },
      { key: 'confusingConcepts', label: '易混淆概念对比矩阵', description: '概念内涵、外延与反例对比', format: 'table' },
      { key: 'selfTestQuestions', label: '原创考查自测题 (含解析)', description: '3道选择/简答与评分要点', format: 'markdown' }
    ],
    workflow: [
      '梳理输入教材的核心概念与层级',
      '识别高频考点与关联算法/定理',
      '构建横向易混淆对比矩阵',
      '生成多层次针对性自测题库'
    ],
    promptTemplate: `作为资深大学学科助教，请根据学生提供的课程章节，生成结构化复习框架：包含核心概念树、高频考点矩阵、易混淆概念深度辨析表，以及3道高含金量自测题目。`
  },
  {
    id: 'knowledge-card-atomic',
    name: '原子知识卡片生成器 (Atomic Knowledge Cards)',
    description: '遵循费曼学习法与卡片盒笔记法(Zettelkasten)，将晦涩知识点打散重塑为单一原子卡片与双链结构。',
    category: '知识整理',
    major: '通用学科',
    difficulty: '入门',
    usageCount: 1890,
    author: '陈靖昊',
    authorRole: 'AI Skill 设计岗',
    createdAt: '2026-11-02',
    tags: ['卡片笔记', '费曼技巧', '深度理解', '知识内化'],
    iconName: 'Layers',
    sampleInput: `知识概念：博弈论中的“纳什均衡 (Nash Equilibrium)”
定义：在一个博弈过程中，无论对方策略如何，每个参与者都选择了针对他人策略的最优策略，此时没有任何一人有单独改变策略的动力。经典例子有囚徒困境、智猪博弈、硬币正反面等。`,
    inputs: [
      { name: 'rawConcept', type: 'textarea', label: '知识点或概念文本', placeholder: '输入需要内化的专业概念或复杂定理...', required: true },
      { name: 'analogyTarget', type: 'text', label: '通俗类比领域 (选填)', placeholder: '例如：日常生活、篮球比赛、校园恋爱、游戏机制...', required: false }
    ],
    outputs: [
      { key: 'feynmanExplanation', label: '大白话费曼解释 (一分钟看懂)', description: '小学生也能听懂的生活化类比', format: 'markdown' },
      { key: 'atomicCard', label: '标准原子卡片 (YAML Frontmatter)', description: '可直接导入 Obsidian / Logseq 的双链笔记', format: 'markdown' },
      { key: 'mentalModel', label: '底层思维模型映射', description: '该概念可迁移运用的跨学科场景', format: 'markdown' }
    ],
    workflow: [
      '抽取概念本质要素与数学/逻辑定义',
      '构建跨学科低门槛生活类比模型',
      '提炼单一职责原子卡片与双链元标签',
      '给出典型误用辨析与思考题'
    ],
    promptTemplate: `使用费曼技巧和卡片笔记规范，把输入概念重构为：1. 极简本质定义 2. 生动生活化类比 3. 适用边界与反直觉陷阱 4. 可直接复制的 Markdown 卡片。`
  },
  {
    id: 'academic-logic-checker',
    name: '学术论文论证逻辑巡检员 (Logic & Rigor Inspector)',
    description: '非查重工具！专注扫描论文草稿中的偷换概念、论据不充分、因果倒置、语病及过度绝对化用词。',
    category: '写作辅助',
    major: '通用学科',
    difficulty: '进阶',
    usageCount: 1670,
    author: '张钥童',
    authorRole: '测试评估与优化岗',
    createdAt: '2026-11-10',
    tags: ['论文修改', '逻辑自洽', '学术规范', '论证严密'],
    iconName: 'CheckCircle2',
    sampleInput: `我们通过对某高校大一到大四年级共150名学生发放问卷，发现大四年级学生使用AI的比例高达92%，显著高于大一的55%。由此我们可以得出结论：大学阶段的学习压力直接导致了学生对人工智能工具的严重依赖，学校应该全面禁止低年级学生在任何作业中使用AI，否则将严重破坏教学质量。`,
    inputs: [
      { name: 'paperDraft', type: 'textarea', label: '论文段落或草稿', placeholder: '粘贴引言、文献综述、论证或讨论段落...', required: true },
      { name: 'disciplineContext', type: 'text', label: '所属学科规范', placeholder: '如：实证社会学、马克思主义理论、计算机工程...', required: false }
    ],
    outputs: [
      { key: 'logicalFallacies', label: '逻辑漏洞与因果跃迁诊断', description: '指出以偏概全、因果倒置等逻辑缺陷', format: 'table' },
      { key: 'academicTone', label: '学术语言严谨度修订建议', description: '将绝对化情绪化表述改为客观学理语言', format: 'markdown' },
      { key: 'evidenceStrengthening', label: '证据链补强方案', description: '建议补充的统计检验方法或对照组', format: 'markdown' }
    ],
    workflow: [
      '分句剖析论点与论据对应关系',
      '检索逻辑谬误（滑坡谬误、假因果等）',
      '审查论据样本代表性与解释边界',
      '提供学术措辞润色前后对比对照'
    ],
    promptTemplate: `作为严苛的学术同行评审审稿人，请客观审查这段文本的论证逻辑链条。指出：1. 论据推导论点的逻辑跳跃 2. 样本与结论的过度概括 3. 提供两版学术严谨的重构段落。`
  },
  {
    id: 'historical-source-critical',
    name: '历史文献互证与考据助手 (Historical Source Critical)',
    description: '针对历史学古汉语、官文书及近代史料，辅助完成校勘训诂、史料源流考辨、作者立场与偏见解构。',
    category: '跨专业学习',
    major: '人文社科',
    difficulty: '专家',
    usageCount: 780,
    author: '董吉祥 / 历史文化学院共创组',
    authorRole: '跨专业场景共创岗',
    createdAt: '2026-11-18',
    tags: ['历史学', '史料考据', '古籍整理', '多源互证'],
    iconName: 'Scroll',
    sampleInput: `《明史·食货志》载：“洪武二十四年，天下户一千六十五万四千三百六十八，口六千五十四万五千八百一十二。……是岁，天下田八百五十万七千六百二十三顷。”而《明实录》同年代户口记录存在千余户差距。`,
    inputs: [
      { name: 'sourceText', type: 'textarea', label: '历史古籍/文书原文', placeholder: '输入待考证的历史文献原文片段...', required: true },
      { name: 'historicalPeriod', type: 'text', label: '所属朝代/时期与文献类别', placeholder: '如：明初官修国史、宋代笔记小说、晚清报刊...', required: true }
    ],
    outputs: [
      { key: 'sourceContext', label: '文本生成背景与作者意图分析', description: '撰者政治立场与修史话语权透视', format: 'markdown' },
      { key: 'crossVerification', label: '互证建议与参考史料谱系', description: '推荐比对的正史、方志、出土简牍与档案', format: 'table' },
      { key: 'historiographyReflection', label: '史学史批判与现代学术脉络', description: '近四十年学术界主流争论与代表学者观点', format: 'markdown' }
    ],
    workflow: [
      '文义疏通与生僻制度词汇锚定',
      '文献作者政治社会脉络还原',
      '辨析官私记录差异与统计失真成因',
      '形成多源互证考据线索树'
    ],
    promptTemplate: `以历史学专业学术训练标准，对提供的史料进行源流与批判性考证：解析作者立场、修纂时代背景、数据局限，并提供交叉互证的史料查考指南。`
  },
  {
    id: 'business-case-minto',
    name: '商业案例金字塔复盘助手 (Minto Pyramid Case Study)',
    description: '面向经管专业学生，依据麦肯锡金字塔原理与商业框架(PESTEL/波特五力/SWOT)，深度拆解真实企业商业案例。',
    category: '跨专业学习',
    major: '经管类',
    difficulty: '进阶',
    usageCount: 1350,
    author: '董吉祥 / 国际商学院共创组',
    authorRole: '跨专业场景共创岗',
    createdAt: '2026-11-25',
    tags: ['工商管理', '商业分析', '战略决策', '商业模式'],
    iconName: 'TrendingUp',
    sampleInput: `案例：某国内新茶饮品牌出海东南亚市场的战略困局
背景：该品牌在国内依靠低价加盟迅速扩张突破万店，但在进军印尼与越南市场时，面临本土供应链成本高企、清真认证合规迟缓、冷链仓储损耗率超过18%、以及当地年轻消费者对奶精配方抵触等问题，导致首批30家海外门店平均单店亏损。`,
    inputs: [
      { name: 'caseBrief', type: 'textarea', label: '商业案例背景陈述', placeholder: '输入企业背景、财务数据、市场冲突与经营困境...', required: true },
      { name: 'analysisFramework', type: 'select', label: '指定分析框架', placeholder: '选择战略模型', required: false, options: ['波特五力竞争模型', '麦肯锡7S架构', '蓝海战略价值曲线', '商业模式画布(BMC)'] }
    ],
    outputs: [
      { key: 'mintoPyramid', label: '结论先行金字塔战略摘要', description: '核心主论点与纵向支撑论据链', format: 'markdown' },
      { key: 'frameworkBreakdown', label: '框架化战略因子深度矩阵', description: '宏观/微观各维度打分与证据支持', format: 'table' },
      { key: 'actionableProposals', label: '落地可执行决策路线图 (MECE)', description: '按短期/中期/长期拆解的可行性方案', format: 'markdown' }
    ],
    workflow: [
      '提取案例关键财务与市场异动变量',
      '套用商业分析模型进行MECE分解',
      '梳理核心瓶颈矛盾与因果树',
      '形成金字塔结构的战略决策建议报告'
    ],
    promptTemplate: `作为资深战略咨询顾问，运用金字塔原理及商业战略模型对该案例进行拆解：做到结论先行、以上统下、分类归纳，并给出符合商业常识的落地策略。`
  },
  {
    id: 'clinical-pathology-logic',
    name: '医学临床病理推理拆解器 (Clinical Pathologic Reasoning)',
    description: '面向医学及生科学生，将主诉、体征、生化检验与影像学表现映射为病理生理机制链条，拒绝死记硬背。',
    category: '跨专业学习',
    major: '医学/生命科学',
    difficulty: '专家',
    usageCount: 960,
    author: '董吉祥 / 生命科学学院共创组',
    authorRole: '跨专业场景共创岗',
    createdAt: '2026-12-05',
    tags: ['临床医学', '病理生理', '鉴别诊断', '机制推导'],
    iconName: 'Activity',
    sampleInput: `患者男性，58岁。突发胸骨后压榨性剧烈疼痛3小时，向左肩及左臂内侧放射，伴大汗淋漓、呼吸困难。心电图示V1-V4导联ST段弓背向上抬高0.3mV，血清肌钙蛋白I (cTnI) 显著升高 (12.4 ng/mL)，既往高血压病史15年，吸烟30年。`,
    inputs: [
      { name: 'clinicalCase', type: 'textarea', label: '病例主诉与检查指标', placeholder: '输入患者病史、主诉、查体与实验室检查结果...', required: true },
      { name: 'focusMechanisms', type: 'text', label: '学习关注重点 (选填)', placeholder: '如：冠脉血栓形成机理、心肌细胞电生理变化、心源性休克预警...', required: false }
    ],
    outputs: [
      { key: 'pathophysiologyChain', label: '病理生理机制推导链 (因果树)', description: '从危险因素到分子细胞改变的演进链', format: 'markdown' },
      { key: 'differentialDiagnosis', label: '鉴别诊断辨析表格', description: '与主动脉夹层、肺栓塞等急症的鉴别要点', format: 'table' },
      { key: 'pharmacologyLinkage', label: '急诊用药机制与靶点图谱', description: '抗血小板、抗凝、再灌注药物的作用位点与禁忌', format: 'markdown' }
    ],
    workflow: [
      '提取核心主诉与特征性生化/心电生物标志物',
      '绘制微观病理生理到宏观临床表现的演变链',
      '建立横向急重症鉴别诊断鉴别要点表',
      '关联基础药理学机制与临床指南推荐'
    ],
    promptTemplate: `作为医学院内科与病理生理学教授，请围绕该病例展开学理机制剖析：从内皮损伤、斑块破裂到缺血坏死建立逻辑链，并提供鉴别诊断矩阵。`
  },
  {
    id: 'code-algorithm-refactor',
    name: '算法思路分解与可视化导引 (Algorithm Visual Tutor)',
    description: '面向计算机与工科初学者，将LeetCode复杂算法题拆解为直观状态转移方程、手绘指针演算与踩坑用例。',
    category: '编程学习',
    major: '计算机/人工智能',
    difficulty: '入门',
    usageCount: 2310,
    author: '于咏琪',
    authorRole: 'AI Agent 开发岗',
    createdAt: '2026-12-10',
    tags: ['数据结构', '算法竞赛', '动态规划', '代码重构'],
    iconName: 'Code2',
    sampleInput: `题目：最长递增子序列 (Longest Increasing Subsequence, LIS)
给定一个整数数组 nums = [10,9,2,5,3,7,101,18]，找到其中最长严格递增子序列的长度。
要求：请同时解释 O(N^2) 动态规划与 O(N log N) 二分贪心法两种思路。`,
    inputs: [
      { name: 'algoProblem', type: 'textarea', label: '题目描述或代码片段', placeholder: '输入算法题干、数据规模与边界条件...', required: true },
      { name: 'targetLanguage', type: 'select', label: '实现语言', placeholder: '选择编程语言', required: true, options: ['C++', 'Python', 'Java', 'TypeScript', 'Rust'] }
    ],
    outputs: [
      { key: 'intuition', label: '算法直觉与朴素暴力解法瓶颈', description: '从暴力穷举如何一步步优化出巧妙思路', format: 'markdown' },
      { key: 'stateTransition', label: '状态定义与转移方程/指针演进', description: '清晰的数学定义与边界Base Case', format: 'markdown' },
      { key: 'cleanCode', label: '高质量注释实现 (含复杂度分析)', description: '变量命名优雅、带防御性断言的高分代码', format: 'markdown' },
      { key: 'cornerCases', label: '极易超时的致命边界用例', description: '单调递减、全部相同、空数组等防御测试', format: 'table' }
    ],
    workflow: [
      '剖析数据规模与时间空间复杂度限制',
      '构建直观状态演进数学模型',
      '提供分步手算推导与代码实现',
      '生成极限测试用例与边界避坑指南'
    ],
    promptTemplate: `你是一名资深ACM算法金牌教练。请为学生把算法题目讲解透彻：杜绝直接贴代码，必须先讲通朴素直觉与瓶颈，再给出严格的状态转移推导和优雅工程化代码。`
  }
];
