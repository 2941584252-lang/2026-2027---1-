import React from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Bot, 
  Award, 
  PieChart as PieIcon, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  Legend 
} from 'recharts';
import { statisticsData } from '../data/statistics';

export const Statistics: React.FC = () => {
  const { summary, monthlyUsage, majorDistribution, skillCategoryPopularity, satisfactionDimensions } = statisticsData;

  const cards = [
    { title: '平台累计调用', value: `${summary.totalInvocations.toLocaleString()} 次`, desc: '覆盖全校 5 大学科门类', icon: TrendingUp, color: 'text-brand-600' },
    { title: '直接服务学生', value: `${summary.studentsServed} 人`, desc: '勤助育人与工作坊推广', icon: Users, color: 'text-indigo-600' },
    { title: 'AI Skill 沉淀', value: `${summary.skillsCount} 个`, desc: '标准化专业学习技能', icon: BookOpen, color: 'text-purple-600' },
    { title: 'AI Agent 原型', value: `${summary.agentsCount} 款`, desc: '自主多步骤闭环协同', icon: Bot, color: 'text-accent-600' },
    { title: '用户综合满意度', value: `${summary.satisfactionRate}%`, desc: '基于 420 份盲测问卷', icon: Award, color: 'text-emerald-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
            <BarChart2 className="w-5 h-5" />
          </span>
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
            PROJECT ANALYTICS
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          项目实践成果数据大屏
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
          全景展示“智汇工坊”在跨专业学习场景下的调用频次、院系专业参与热度、技能分类偏好与学生学术体验反馈。
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{c.title}</span>
                <Icon className={`w-4 h-4 ${c.color}`} />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono block">
                  {c.value}
                </span>
                <p className="text-[11px] text-slate-400 mt-1">{c.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart Row 1: Monthly Usage Trend & Discipline Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Trend Area Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                月度调用与活跃服务走势
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">自 2026 年 10 月项目启动以来的持续增长</p>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
              月均增幅 45%
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyUsage}>
                <defs>
                  <linearGradient id="colorInvocations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6172f3" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6172f3" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', fontSize: '12px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="invocations" name="AI调用总次数" stroke="#6172f3" strokeWidth={2} fillOpacity={1} fill="url(#colorInvocations)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Major Discipline Pie (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              跨专业学科参与比例
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">工科与人文社科、经管深度交叉共创</p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={majorDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {majorDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val: any) => [`${val}%`, '占比']}
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', fontSize: '12px', color: '#fff' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Chart Row 2: Skill Category Bar & Satisfaction Dimensions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Category Popularity Bar (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              不同学习场景分类调用热度排行
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">文献阅读与课程复习为全校高频核心诉求</p>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillCategoryPopularity}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', fontSize: '12px', color: '#fff' }}
                />
                <Bar dataKey="count" name="累计使用次数" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Satisfaction Rating Bars (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              学术严谨度与体验满意度盲测
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">杜绝学术幻觉，注重逻辑链与格式规范</p>
          </div>

          <div className="space-y-4 pt-2">
            {satisfactionDimensions.map((dim, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{dim.subject}</span>
                  <span className="font-bold text-brand-600 dark:text-brand-400 font-mono">{dim.score} / 100</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-500 to-emerald-500 transition-all duration-500"
                    style={{ width: `${dim.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
