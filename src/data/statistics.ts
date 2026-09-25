export const statisticsData = {
  summary: {
    skillsCount: 24,
    agentsCount: 12,
    scenariosCount: 18,
    casesCount: 36,
    totalInvocations: 15680,
    studentsServed: 580,
    satisfactionRate: 98.4
  },
  monthlyUsage: [
    { month: '2026-10', invocations: 1240, users: 110 },
    { month: '2026-11', invocations: 2890, users: 230 },
    { month: '2026-12', invocations: 4620, users: 380 },
    { month: '2027-01', invocations: 3950, users: 440 },
    { month: '2027-02', invocations: 2980, users: 490 }
  ],
  majorDistribution: [
    { name: '计算机/人工智能', value: 34, color: '#6172f3' },
    { name: '人文社科 (历史/文/哲)', value: 24, color: '#a855f7' },
    { name: '经管类 (商学院/经济)', value: 18, color: '#06b6d4' },
    { name: '理工类 (数理化工程)', value: 14, color: '#10b981' },
    { name: '医学与生命科学', value: 7, color: '#f59e0b' },
    { name: '艺术设计类', value: 3, color: '#ec4899' }
  ],
  skillCategoryPopularity: [
    { category: '文献阅读', count: 4890, percentage: 31.2 },
    { category: '课程复习', count: 4210, percentage: 26.8 },
    { category: '知识整理', count: 2850, percentage: 18.2 },
    { category: '写作辅助', count: 1980, percentage: 12.6 },
    { category: '跨专业学习', count: 1750, percentage: 11.2 }
  ],
  satisfactionDimensions: [
    { subject: '任务分解清晰度', score: 98 },
    { subject: '无学术幻觉度', score: 95 },
    { subject: '学习启发深度', score: 97 },
    { subject: '操作简易度', score: 96 },
    { subject: '格式规范性', score: 99 }
  ]
};
