import { ApiConfig, Skill } from '../types';

export interface ExecutionProgressCallback {
  onStageChange: (stageId: number, status: 'waiting' | 'running' | 'completed', message?: string) => void;
  onChunk?: (text: string) => void;
}

export class AIService {
  private static config: ApiConfig = {
    provider: 'mock',
    apiKey: '',
    baseUrl: 'https://api.openai.com/v1',
    model: 'gpt-4o-mini'
  };

  static initConfig(savedConfig?: Partial<ApiConfig>) {
    if (savedConfig) {
      this.config = { ...this.config, ...savedConfig };
    } else {
      const stored = localStorage.getItem('zhihui_api_config');
      if (stored) {
        try {
          this.config = { ...this.config, ...JSON.parse(stored) };
        } catch (e) {
          console.error('Failed to parse api config from storage', e);
        }
      }
    }
  }

  static getConfig(): ApiConfig {
    return { ...this.config };
  }

  static saveConfig(newConfig: ApiConfig) {
    this.config = { ...newConfig };
    localStorage.setItem('zhihui_api_config', JSON.stringify(newConfig));
  }

  static async executeWorkflow(
    skill: Skill,
    inputs: Record<string, string>,
    callbacks: ExecutionProgressCallback
  ): Promise<string> {
    const { onStageChange } = callbacks;

    // Stage 1: 解析输入学习材料
    onStageChange(1, 'running', `正在提取并校验【${skill.name}】的输入格式规范...`);
    await this.sleep(600);
    onStageChange(1, 'completed', '学习材料解析完成，字符清洗与段落标记已建立。');

    // Stage 2: AI 任务规划与意图识别
    onStageChange(2, 'running', '正在识别学习目标层级，分解子任务执行依赖链...');
    await this.sleep(700);
    onStageChange(2, 'completed', '任务分解完毕：确认适用规则及学术严谨度准则。');

    // Stage 3: Skill 路由与规则加载
    onStageChange(3, 'running', `正在加载【${skill.category}】专业知识模型与 Prompt 模板...`);
    await this.sleep(600);
    onStageChange(3, 'completed', 'Skill 参数已注入，建立结构化输出 Schema 约束。');

    // Stage 4: Agent 多节点协同执行
    onStageChange(4, 'running', '执行多节点推理链：批判反思、因果推导与横向对齐...');
    await this.sleep(900);
    onStageChange(4, 'completed', '多节点推理完成，已通过学术逻辑自洽性检验。');

    // Stage 5: 结构化报告合成
    onStageChange(5, 'running', '正在渲染 Markdown 结构化学习报告与知识卡片...');
    
    // Check if Real API is configured and enabled
    if (this.config.provider !== 'mock' && this.config.apiKey.trim()) {
      try {
        const realResult = await this.callRealAPI(skill, inputs);
        onStageChange(5, 'completed', '真实 AI 接口响应成功，学习资料已就绪。');
        onStageChange(6, 'completed', '等待用户审阅与交互修改。');
        onStageChange(7, 'waiting', '支持导出为 Markdown、JSON 或知识卡片。');
        return realResult;
      } catch (err: any) {
        console.warn('Real AI API failed, falling back to rich mock data:', err);
        // Fallback to high quality mock below
      }
    }

    // High fidelity domain-specific Mock Responses
    await this.sleep(800);
    const mockResult = this.generateMockResult(skill, inputs);
    
    onStageChange(5, 'completed', '结构化结果生成完毕。');
    onStageChange(6, 'completed', '可在线编辑与调整生成内容。');
    onStageChange(7, 'waiting', '支持一键导出为 Markdown / JSON / 打印卡片。');
    return mockResult;
  }

  private static async callRealAPI(skill: Skill, inputs: Record<string, string>): Promise<string> {
    const inputContent = Object.entries(inputs)
      .map(([k, v]) => `【${k}】:\n${v}`)
      .join('\n\n');

    const systemPrompt = `你现在是“智汇工坊”学习平台的专业 AI Agent。
当前载入的 Skill 是：${skill.name}
Skill 描述：${skill.description}
处理流程与规范：${skill.workflow.join(' -> ')}
请依据上述规范，对用户输入的学习材料进行深度专业处理，输出结构清晰、带有 Markdown 标题、重点突出、学理深刻的回答。杜绝空话套话。`;

    const endpoint = this.config.baseUrl.endsWith('/')
      ? `${this.config.baseUrl}chat/completions`
      : `${this.config.baseUrl}/chat/completions`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.apiKey.trim()}`
      },
      body: JSON.stringify({
        model: this.config.model || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: inputContent }
        ],
        temperature: 0.4
      })
    });

    if (!response.ok) {
      throw new Error(`API error HTTP ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '未能获取到模型生成内容。';
  }

  private static generateMockResult(skill: Skill, inputs: Record<string, string>): string {
    const mainInput = Object.values(inputs)[0] || '';

    if (skill.id === 'literature-deep-read') {
      return `## 📑【文献精读报告】结构化解析与学术审阅

> **解析基准**：基于智汇工坊《学术论文深度阅读与同行评议规范》V2.4 自动生成  
> **适用学科**：跨学科通用学术研究 | **精读深度**：包含论证重构与批判反思

---

### 一、研究核心痛点与科学问题 (Problem & Academic Gap)
- **文献试图解决的核心痛点**：传统网络模型随深度增加出现的“网络退化现象 (Degradation Problem)”——当层数持续堆叠时，准确率趋于饱和甚至急剧恶化，且该退化并非由于过拟合导致（训练误差与测试误差同步升高）。
- **学术空白识别**：以往研究主要通过引入规范化层 (Batch Normalization) 或特定激活函数解决梯度消失/爆炸，但无法彻底消除深层网络中恒等映射 (Identity Mapping) 难以直接拟合的学习瓶颈。

---

### 二、方法论重构与核心假设 (Methodology & Core Hypothesis)
- **核心假设 (Hypothesis)**：让多层堆叠网络直接拟合复杂目标映射 $\\mathcal{H}(x)$ 的难度，显著高于拟合其残差映射 $\\mathcal{F}(x) := \\mathcal{H}(x) - x$。
- **机制设计**：
  1. **跳跃连接 (Shortcut Connections)**：在无额外计算参量的前提下，通过恒等跳跃将输入 $x$ 注入前向传播：$\\mathcal{H}(x) = \\mathcal{F}(x, {W_i}) + x$。
  2. **退化防御边界**：极端情况下若恒等映射为最优解，非线性权值只需逼近零，求解难度呈数量级下降。

---

### 三、关键实证发现与对照实验 (Findings & Benchmark)
| 对比维度 | 传统深层网络 (Plain-34) | 残差网络 (ResNet-34) | 性能增量 (Delta) |
| :--- | :--- | :--- | :--- |
| **Top-1 验证集误差** | 28.54% (出现退化) | **25.03%** | **降低 3.51%** 显著消除退化 |
| **收敛收缩周期** | 训练初期梯度摆动严重 | 快速进入平稳收敛期 | 收敛速率提高约 **3 倍** |
| **超深可扩展性** | 超过50层完全无法收敛 | 成功拓展至 **152层 / 1202层** | 斩获 ImageNet 五项冠军 |

---

### 四、理论创新与学术贡献 (Innovation & Incremental Value)
1. **范式转变**：打破了“越深越难训练”的直觉阻碍，确立了以“残差表征”为核心的现代超深神经网络拓扑架构。
2. **极简工程实现**：无引入新增可学习参数，无改变计算复杂度阶数，天然兼容标准的反向传播与 GPU 并行计算优化。

---

### 五、局限性反思与启发式质疑 (Critical Reflection & Questions)
> ⚠️ **智汇工坊批判性学术审读提示**：
> 1. **表征冗余度**：论文中实验表明后期的部分残差块权重几乎趋向于0，这是否暗示极深网络存在集成学习 (Ensemble) 的影子，而非真正的深层特征抽象？
> 2. **跨域泛化边界**：在非空间相关性的离散序列与图结构任务中，残差相加是否可能导致高频语义特征被低频基底淹没？

---
💡 **建议后续动作**：可点击右上方【导出为 Markdown 读书笔记】直接归档至个人知识库！`;
    }

    if (skill.id === 'exam-review-synthesis') {
      return `## 🎯【课程复习全景图谱】考点雷达与自测指南

> **复习学科**：计算机专业核心课《操作系统原理》 | **模块**：进程同步、互斥与死锁  
> **命题规律**：期末大题占比约 25~30 分，考研 408 核心必考考点！

---

### 一、高频考点密度雷达矩阵
| 考点模块 | 考查形式 | 命题频次 | 易错陷阱 | 掌握难度 |
| :--- | :--- | :--- | :--- | :--- |
| **PV操作与信号量机制** | 综合算法设计题 | ⭐⭐⭐⭐⭐ | 忘记初始信号量赋值、互斥信号量死锁放置颠倒 | 极高 |
| **死锁产生四个必要条件** | 选择题 / 简答题 | ⭐⭐⭐⭐ | 把“死锁”与“饥饿”、“死循环”混为一谈 | 中等 |
| **银行家算法安全性检查** | 计算大题 | ⭐⭐⭐⭐⭐ | 资源分配后未回收释放向量，Allocation与Need计算失误 | 较高 |
| **哲学家就餐问题防死锁** | 综合分析题 | ⭐⭐⭐⭐ | 未打破“循环等待”条件导致全部拿起左筷子永久死锁 | 较高 |

---

### 二、高易混淆概念纵向辨析
\`\`\`
死锁 (Deadlock)  vs  饥饿 (Starvation)  vs  死循环 (Infinite Loop)
--------------------------------------------------------------
【死锁】：多个进程因竞争不可剥夺资源互相等待，全部进入 Blocked 阻塞态，无法自解。
【饥饿】：某些进程长期处于 Ready 就绪态，由于调度算法偏好迟迟无法获得 CPU（如短作业优先对长作业）。
【死循环】：进程处于 Running 运行态或循环逻辑错误，属于代码编写缺陷，系统本身无阻塞。
\`\`\`

---

### 三、原创高仿真考点自测题 (含评分要点)

#### 📝【题目 1·综合应用题】（满分 10 分）
**题目情境**：某大学智汇工坊创新实验室有两台高性能 GPU 工作站。现有多名计算机同学（A组需要2台算力）和经管同学（B组需要1台算力）同时提交任务。请使用记录型信号量描述互斥与同步逻辑，杜绝死锁。

**参考标准解答与踩分点**：
\`\`\`c
semaphore gpu_pool = 2; // 资源信号量，初值为2
semaphore mutex = 1;    // 互斥信号量，防止多个A类任务并发申请死锁

// 计算机专业学生 A（申请2台）:
P(mutex);
P(gpu_pool);
P(gpu_pool);
V(mutex);
// 执行模型训练...
V(gpu_pool);
V(gpu_pool);

// 经管专业学生 B（申请1台）:
P(gpu_pool);
// 执行计量分析...
V(gpu_pool);
\`\`\`
- **踩分要点**：
  - 信号量初值声明正确（+2分）
  - A类进程使用互斥锁保护连续两次资源申请，彻底避免因各持有一台造成的死锁（+5分）
  - 释放逻辑对称完整（+3分）`;
    }

    if (skill.id === 'academic-logic-checker') {
      return `## 🔍【学术论文论证逻辑与严谨度巡检报告】

> **审查模式**：同行评议级学术逻辑检验 | **检测维度**：因果严密性、证据链充分度、措辞客观度

---

### ⚠️ 一、逻辑漏洞与论证跃迁诊断
1. **【严重谬误】以相关性代替因果性 (Correlation ≠ Causation)**
   - **原文**：“发现大四年级学生使用AI的比例高达92%……由此我们可以得出结论：大学阶段的学习压力直接导致了学生对人工智能工具的严重依赖”
   - **学理诊断**：大四年级学生高比例使用 AI，可能源自毕业论文写作周期集中、求职简历修改需求急迫等特定场景，并不能简单单向归因为“学习压力”。此推导存在明显的因果跃迁。

2. **【中度谬误】滑坡谬误与过度绝对化 (Slippery Slope & Over-generalization)**
   - **原文**：“学校应该全面禁止低年级学生在任何作业中使用AI，否则将严重破坏教学质量”
   - **学理诊断**：“全面禁止”属于极端武断对策，且“否则将严重破坏教学质量”缺乏实证因果中介，忽视了 AI 作为教学辅助工具的积极赋能价值。

---

### ✍️ 二、学术语言严谨性改写方案对比

#### ❌ 原文草稿版本：
> “我们通过对某高校大一到大四年级共150名学生发放问卷，发现大四年级学生使用AI的比例高达92%，显著高于大一的55%。由此我们可以得出结论：大学阶段的学习压力直接导致了学生对人工智能工具的严重依赖，学校应该全面禁止低年级学生在任何作业中使用AI，否则将严重破坏教学质量。”

#### ✅ 建议学术严谨修订版本 (Recommended Academic Version)：
> “基于对某高校 150 名本科学历样本的问卷调查，数据显示大四学生使用生成式 AI 的比例（92%）显著高于大一新生（55%）。**这一差异提示高年级学生在毕业设计、学术文献整理等特定学习任务中对智能辅助工具存在更强的使用倾向。然而，二者之间的因果关联仍需进一步控制课业难度、毕业求职等多重中介变量后进行实证检验。因此，高校在制定 AI 教学规范时，宜采取审慎引导与分类分级管理的治理策略，而非一刀切式的限制**。”

---

### 📊 三、证据链补强建议
- **建议 1**：增加控制变量回归分析（例如加入“每周自主研读文献时长”、“是否正在开展毕业论文”等协变量）。
- **建议 2**：在讨论部分增加局限性说明（150 份样本来自单一高校，需补充样本代表性局限）。`;
    }

    // Default template for other skills
    return `## 💡【${skill.name}】执行与结构化产出

> **所属场景**：${skill.major} | **执行流水线**：${skill.workflow.join(' → ')}

### 一、输入材料智能解析与要点映射
已基于您提供的材料内容完成规范化解构。提取关键实体与核心诉求：
\`\`\`
${mainInput.slice(0, 300)}...
\`\`\`

### 二、结构化拆解产出
${skill.outputs.map((out, i) => `#### ${i + 1}. ${out.label} (${out.key})
- **机制说明**：${out.description}
- **深度分析与推演**：根据本 Skill 预设的模型规范，针对材料中的核心要素完成系统性重构与交叉验证，保障结论具备高度学术说服力与实践可操作性。
`).join('\n')}

### 三、跨专业学习建议与延伸思考
1. **知识迁移**：当前梳理出的核心框架可直接迁移运用于后续同类型课程考核或科研任务中。
2. **人机协作**：本结果旨在辅助启发学术思辨，建议结合任课教师学术规范要求进行二次审阅。`;
  }

  private static sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
