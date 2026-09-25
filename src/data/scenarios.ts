import { Scenario } from '../types';

export const initialScenarios: Scenario[] = [
  // 人文社科
  {
    id: 'scen-humanities-history',
    category: '人文社科',
    title: '历史古籍源流考辨与多源史料互证',
    major: '历史学 / 古典文献学',
    targetCourse: '中国古代史、中国历史文选',
    painPoint: '古文句读艰涩、官制与地理名词古今演变繁杂，不同史书对同一事件叙述各异，学生耗费数十小时查类书却理不清史料源流与撰者立场。',
    problemDescription: '研读《明实录》与地方志中关于一条鞭法推行情况的冲突记录，需理清赋役改革背后的官僚阶层博弈与社会阻力。',
    traditionalApproach: '手翻《历代职官表》《中国历史地图集》及各类断代史料丛刊，逐字逐句摘抄笔记，易忽视修史制度背景导致的叙事偏向。',
    aiSkillSolution: '调用【历史文献互证与考据助手】Skill，快速标引职官变迁、厘清纪年换算，并提供正史、奏疏与民间账簿的交叉对比框架。',
    agentWorkflow: [
      '史料文本自动句读与专名实体标引',
      '修纂者社会政治背景与修史话语权透视',
      '官私史书差异点自动生成矩阵比对',
      '产出带学术注释的考据导读报告'
    ],
    expectedOutcome: '一份兼具文献训诂细节与学术史脉络的结构化考据长文，支持直接导出为学期读书报告初稿。',
    tags: ['古籍考据', '史料互证', '制度变迁', '实事求是'],
    recommendedSkillId: 'historical-source-critical',
    iconName: 'Scroll'
  },
  {
    id: 'scen-humanities-ideology',
    category: '人文社科',
    title: '思政理论经典著作学理逻辑解构',
    major: '马克思主义理论 / 哲学',
    targetCourse: '马克思主义基本原理、毛泽东思想和中国特色社会主义理论体系概论',
    painPoint: '经典著作篇幅宏大、哲学思辨深邃，容易停留在字面背诵考点，难以串联历史唯物主义与辩证唯物主义的深层学理逻辑。',
    problemDescription: '研读《关于费尔巴哈的提纲》，如何真正理解“实践观”对旧唯物主义与唯心主义的超越？',
    traditionalApproach: '单向阅读教材结论段落，缺乏概念推演的批判性演进视角，期末背诵答题常出现“原理与论述脱节”。',
    aiSkillSolution: '调用【原子知识卡片生成器】与【文献精读助手】，把马克思写作的历史语境、针对的旧哲学论点及核心命题逐条建立因果树。',
    agentWorkflow: [
      '经典文本原著段落精细切片',
      '识别批判对象（青年黑格尔派与机械唯物论）',
      '建立实践转向的逻辑因果演进链',
      '生成学理阐释卡片与现实指导思考题'
    ],
    expectedOutcome: '清晰明了的经典著作学理逻辑导图，以及包含“现实映射”的深度讨论纲要。',
    tags: ['马理论', '经典原著', '唯物史观', '学理透视'],
    recommendedSkillId: 'literature-deep-read',
    iconName: 'BookMarked'
  },

  // 经管类
  {
    id: 'scen-econ-business-case',
    category: '经管类',
    title: '复杂商业案例多维框架深度拆解',
    major: '工商管理 / 市场营销',
    targetCourse: '战略管理、市场营销学、商业模式创新',
    painPoint: '长达数十页的哈佛商学院/清华经管案例背景庞杂，学生常抓不住核心矛盾，分析汇报流于泛泛而谈的套话。',
    problemDescription: '针对新能源车企面临价格战与出海关税壁垒的双重冲击，如何运用波特五力与金字塔原理输出高说服力战略提案？',
    traditionalApproach: '小组成员各自看一段，汇报时拼凑PPT，各部分分析模型互相矛盾（如SWOT与波特五力结论冲突），缺乏自洽结论。',
    aiSkillSolution: '加载【商业案例金字塔复盘助手】，以麦肯锡金字塔原理严格执行“结论先行 - MECE分解 - 落地路线图”。',
    agentWorkflow: [
      '提取案例关键财务异动与市场冲突信号',
      '执行波特五力/价值链双模型MECE归因',
      '梳理短期生存与长期护城河两难抉择',
      '输出咨询级高管汇报金字塔报告'
    ],
    expectedOutcome: '一份包含核心观点、数据支撑、风险对冲与落地甘特图的商业决策建议书。',
    tags: ['商业案例', '金字塔原理', '战略管理', 'MECE框架'],
    recommendedSkillId: 'business-case-minto',
    iconName: 'TrendingUp'
  },
  {
    id: 'scen-econ-macro',
    category: '经管类',
    title: '宏观经济数据异动与政策传导链推演',
    major: '经济学 / 金融学',
    targetCourse: '宏观经济学、货币银行学',
    painPoint: '央行降准降息、CPI/PPI背离等现实经济事件，与课本IS-LM、AS-AD模型的静态图示脱节，学生算不清政策时滞与传导阻滞。',
    problemDescription: '解析公开市场操作利率下调如何通过债券市场、银行信贷渠道最终传导至实体经济投资与消费？',
    traditionalApproach: '孤立套用课本方程式，难以结合流动性陷阱、企业预期转弱等微观心理，实证分析缺乏现实解释力。',
    aiSkillSolution: '调用【课程复习全景图谱】与知识卡片，构建从“货币工具 → 金融中介 → 资产价格 → 实体需求”的完整动态传导逻辑树。',
    agentWorkflow: [
      '解析宏观指标当前绝对值与环比异动',
      '映射标准宏观经济学传导机制路径',
      '识别现实经济传导中的三大摩擦阻力',
      '生成对比推演矩阵与情景模拟分析'
    ],
    expectedOutcome: '宏观政策传导因果链路全景图，兼具学术严谨性与财经观察深度。',
    tags: ['宏观经济', '传导机制', '货币政策', '实证分析'],
    recommendedSkillId: 'exam-review-synthesis',
    iconName: 'BarChart3'
  },

  // 理工类
  {
    id: 'scen-stem-algo-debug',
    category: '理工类',
    title: '复杂算法状态机拆解与避坑沙盘',
    major: '计算机科学与技术 / 软件工程',
    targetCourse: '数据结构与算法、编译原理',
    painPoint: '动态规划与图论题目代码往往只有十几行，但状态定义和边界转移极其抽象，只看题解代码无法掌握解题思维迁移。',
    problemDescription: '面对LeetCode复杂区间DP或状态压缩DP问题，学生经常不知道“状态为何这样定义”、“为何这种贪心会失效”。',
    traditionalApproach: '机械死背题解模板，换个问法或边界条件即陷入解答错误，无法体会算法从朴素穷举到空间换时间的演化过程。',
    aiSkillSolution: '调用【算法思路分解与可视化导引】，分层输出朴素直觉、反例攻击、严格状态转移方程与边界用例。',
    agentWorkflow: [
      '剖析数据规模确定算法复杂度上界',
      '举反例证明贪心策略的失效场景',
      '推导清晰数学状态转移与Base Case',
      '生成工程级带防御断言的优雅代码'
    ],
    expectedOutcome: '步骤详尽的算法思维演进解析，彻底搞懂“为什么这么想”，而非单纯复制粘贴代码。',
    tags: ['算法设计', '动态规划', '状态转移', '工程素养'],
    recommendedSkillId: 'code-algorithm-refactor',
    iconName: 'Code2'
  },
  {
    id: 'scen-stem-paper-method',
    category: '理工类',
    title: '理工科研论文实验复现与消融实验逆向',
    major: '人工智能 / 电子信息 / 自动化',
    targetCourse: '机器学习、科研导论',
    painPoint: '顶会论文模型创新繁多，但学生常难以辨别核心贡献究竟来自新设计的Loss函数、网络架构，还是仅仅靠调参玄学。',
    problemDescription: '精读一篇CVPR目标检测论文，需要逆向复原其Baseline基线、消融实验(Ablation Study)每一步带来的增益指标。',
    traditionalApproach: '通读全篇抓不住量化要点，盲目下载开源代码复现常因超参数未说明而无法复现指标，浪费数周算力。',
    aiSkillSolution: '调用【文献精读助手】定向解析“实验协议与消融分析”，生成模块级贡献对照表。',
    agentWorkflow: [
      '锁定Benchmark数据集与评估指标(mAP/FPS)',
      '逆向梳理Ablation实验的控制变量对比组',
      '提取超参数设置与关键工程Tricks',
      '输出实验复现检查清单与风险点提示'
    ],
    expectedOutcome: '模块清晰的科研论文实验复现蓝图，快速识别论文“水分”与“干货”。',
    tags: ['科研论文', '消融实验', '复现指南', '量化基准'],
    recommendedSkillId: 'literature-deep-read',
    iconName: 'Cpu'
  },

  // 医学/生命科学
  {
    id: 'scen-med-clinical',
    category: '医学/生命科学',
    title: '从临床病例表现到分子病理机制反向推演',
    major: '临床医学 / 基础医学',
    targetCourse: '病理生理学、诊断学、内科学',
    painPoint: '医学知识点极其庞杂零碎，学生常陷入“背疾病症状-背药名”的孤立死记，面对多合并症复杂患者无法建立临床思维。',
    problemDescription: '糖尿病肾病合并严重水肿、蛋白尿与高血压患者，如何从肾小球基底膜电荷屏障破坏推导至全身血流动力学紊乱？',
    traditionalApproach: '翻阅几千页《内科学》和《病理学》，在不同章节反复跳跃，难以在脑海中建立动态疾病演进图谱。',
    aiSkillSolution: '调用【医学临床病理推理拆解器】，将宏观检验指标精准映射到微观分子病理改变。',
    agentWorkflow: [
      '梳理主诉与特征性生化免疫指标',
      '推导微血管内皮损伤与足突细胞脱落链路',
      '建立横向危急重症鉴别诊断矩阵',
      '关联药物靶点与临床使用指征禁忌'
    ],
    expectedOutcome: '清晰严密的病理生理学因果逻辑图谱，助力医学生快速养成规范的临床住院医思维。',
    tags: ['临床思维', '病理生理', '机制推导', '循证医学'],
    recommendedSkillId: 'clinical-pathology-logic',
    iconName: 'Activity'
  },

  // 艺术类
  {
    id: 'scen-art-design-theory',
    category: '艺术类',
    title: '现代设计史流派演化与形式语言深度解构',
    major: '视觉传达 / 工业设计 / 美术史',
    targetCourse: '世界现代设计史、设计方法学',
    painPoint: '设计史论考试往往要求论述包豪斯、乌尔姆、后现代主义等流派的社会背景与形式语言，学生常流于华丽词藻堆砌，缺乏严谨批判。',
    problemDescription: '分析包豪斯“形式追随功能”理念在数码时代交互界面设计（如扁平化与新拟物风）中的继承与异化。',
    traditionalApproach: '看画册记图片风格，背诵设计史标准评语，遇到需要论证现代设计哲学的大题时思维苍白。',
    aiSkillSolution: '调用【原子知识卡片生成器】与【学术论文论证逻辑巡检员】，从技术进步、材料革新、社会阶层三维度深度解构设计形式。',
    agentWorkflow: [
      '提取设计流派诞生的时代工业与哲学背景',
      '拆解几何构成、色彩体系与材料交互规范',
      '建立百年设计美学演化脉络谱系',
      '生成兼具美学感知与批判反思的分析报告'
    ],
    expectedOutcome: '富有学术穿透力的设计理论研究长文与视觉范式辨析卡片。',
    tags: ['设计理论', '包豪斯', '形式语言', '设计批评'],
    recommendedSkillId: 'knowledge-card-atomic',
    iconName: 'Palette'
  }
];
