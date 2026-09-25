export type SkillCategory = 
  | '文献阅读' 
  | '课程复习' 
  | '知识整理' 
  | '写作辅助' 
  | '数据分析' 
  | '编程学习' 
  | '语言学习' 
  | '跨专业学习';

export type MajorDomain = 
  | '计算机/人工智能'
  | '人文社科' 
  | '经管类' 
  | '理工类' 
  | '医学/生命科学' 
  | '艺术设计' 
  | '通用学科';

export type DifficultyLevel = '入门' | '进阶' | '专家';

export interface SkillInputSchema {
  name: string;
  type: 'text' | 'textarea' | 'file' | 'select';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

export interface SkillOutputSchema {
  key: string;
  label: string;
  description: string;
  format: 'markdown' | 'json' | 'tags' | 'table' | 'card';
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  major: MajorDomain;
  difficulty: DifficultyLevel;
  inputs: SkillInputSchema[];
  outputs: SkillOutputSchema[];
  workflow: string[];
  promptTemplate: string;
  usageCount: number;
  author: string;
  authorRole?: string;
  createdAt: string;
  tags: string[];
  isCustom?: boolean;
  sampleInput?: string;
  iconName?: string;
}

export interface AgentNode {
  id: string;
  label: string;
  type: 'trigger' | 'analyzer' | 'skill_router' | 'skill_executor' | 'validator' | 'generator';
  description: string;
  status: 'waiting' | 'running' | 'completed' | 'error';
  executionTime?: string;
  inputSchema?: string;
  outputSchema?: string;
  stageIndex: number;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  major: MajorDomain;
  targetRole: string;
  workflowSummary: string[];
  nodes: AgentNode[];
  usageCount: number;
  sampleTask: string;
  defaultSkillIds: string[];
  iconName?: string;
}

export interface Scenario {
  id: string;
  category: '人文社科' | '经管类' | '理工类' | '医学/生命科学' | '艺术类';
  title: string;
  major: string;
  targetCourse: string;
  problemDescription: string;
  painPoint: string;
  traditionalApproach: string;
  aiSkillSolution: string;
  agentWorkflow: string[];
  expectedOutcome: string;
  tags: string[];
  recommendedSkillId: string;
  iconName?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  major: string;
  authorTeam: string;
  problem: string;
  traditionalMethod: string;
  aiWorkflow: string[];
  coreSkillUsed: string;
  agentUsed: string;
  concreteResult: {
    metrics: string;
    summary: string;
    highlights: string[];
  };
  studentFeedback: {
    quote: string;
    student: string;
    grade: string;
    avatar?: string;
  };
  optimizationTimeline: {
    phase: string;
    date: string;
    improvement: string;
  }[];
}

export interface Workshop {
  id: string;
  title: string;
  description: string;
  time: string;
  location: string;
  target: string;
  status: '报名中' | '即将开始' | '已结束';
  maxSeats: number;
  registeredCount: number;
  speaker: string;
  speakerRole: string;
  outlines: string[];
  tags: string[];
}

export interface WorkflowStage {
  id: number;
  name: string;
  detail: string;
  status: 'waiting' | 'running' | 'completed';
  timestamp?: string;
  duration?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  skillId?: string;
  stageResults?: Record<string, any>;
  isStreaming?: boolean;
}

export interface ApiConfig {
  provider: 'mock' | 'openai' | 'deepseek' | 'gemini';
  apiKey: string;
  baseUrl: string;
  model: string;
}

export interface TeamMember {
  name: string;
  role: string;
  duty: string;
  grade: string;
  classMajor: string;
  phone?: string;
  contributions: string[];
}
