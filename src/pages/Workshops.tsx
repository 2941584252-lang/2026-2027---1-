import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Tag, 
  UserCheck, 
  X,
  ShieldCheck 
} from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';
import { Workshop } from '../types';

export const Workshops: React.FC = () => {
  const { workshops, registerWorkshop, registeredWorkshopIds } = usePlatform();
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [studentName, setStudentName] = useState('');
  const [studentMajor, setStudentMajor] = useState('');

  const handleOpenRegister = (ws: Workshop) => {
    setSelectedWorkshop(ws);
    setStudentName('');
    setStudentMajor('');
  };

  const handleConfirmRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorkshop || !studentName.trim() || !studentMajor.trim()) return;

    registerWorkshop(selectedWorkshop.id, studentName.trim(), studentMajor.trim());
    setSelectedWorkshop(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
            <Calendar className="w-5 h-5" />
          </span>
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest">
            WORKSHOPS & ADVOCACY
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          培训推广与共创工坊
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
          落实申报书中的“培训推广与资料保障”要求。通过小型工作坊、跨专业黑客松与案例研讨，帮助更多非技术专业学生理解如何把自己的学习方法转化为 AI 工作流。
        </p>
      </div>

      {/* Workshops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {workshops.map((ws) => {
          const isRegistered = registeredWorkshopIds.includes(ws.id);

          return (
            <div
              key={ws.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-7 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header Tag & Status */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200/60">
                    主讲：{ws.speaker} ({ws.speakerRole})
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      ws.status === '报名中'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-200'
                    }`}
                  >
                    {ws.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  {ws.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {ws.description}
                </p>

                {/* Logistics */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{ws.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="line-clamp-1">{ws.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>面向：{ws.target}</span>
                  </div>
                </div>

                {/* Outlines */}
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    核心研讨议程：
                  </span>
                  <div className="space-y-1.5">
                    {ws.outlines.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Register Row */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  已报名 <strong className="text-brand-600 font-bold">{ws.registeredCount}</strong> / {ws.maxSeats} 人
                </div>

                {isRegistered ? (
                  <button
                    disabled
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 rounded-xl"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    已成功保留席位
                  </button>
                ) : (
                  <button
                    onClick={() => handleOpenRegister(ws)}
                    className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md shadow-brand-600/30 transition-all hover:scale-[1.02]"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    立即在线报名
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Registration Modal */}
      {selectedWorkshop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-600" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  工作坊参会报名
                </h3>
              </div>
              <button
                onClick={() => setSelectedWorkshop(null)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <span className="text-xs text-brand-600 dark:text-brand-400 font-semibold block">
                活动名称：
              </span>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                {selectedWorkshop.title}
              </p>
              <p className="text-xs text-slate-400 mt-1">{selectedWorkshop.time}</p>
            </div>

            <form onSubmit={handleConfirmRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  学生姓名 *
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="如：张同学"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  所在学院与专业 *
                </label>
                <input
                  type="text"
                  required
                  value={studentMajor}
                  onChange={(e) => setStudentMajor(e.target.value)}
                  placeholder="如：文学院 汉语言文学 / 国际商学院"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedWorkshop(null)}
                  className="px-4 py-2 text-xs text-slate-500 hover:bg-slate-100 rounded-xl"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md shadow-brand-600/30"
                >
                  确认报名
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
