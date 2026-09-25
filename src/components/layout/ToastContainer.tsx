import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = usePlatform();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />,
          info: <Info className="w-5 h-5 text-brand-500 shrink-0" />
        };

        const bgBorders = {
          success: 'border-emerald-200/80 dark:border-emerald-800/80 bg-white dark:bg-slate-900',
          warning: 'border-amber-200/80 dark:border-amber-800/80 bg-white dark:bg-slate-900',
          error: 'border-red-200/80 dark:border-red-800/80 bg-white dark:bg-slate-900',
          info: 'border-brand-200/80 dark:border-brand-800/80 bg-white dark:bg-slate-900'
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-xl border ${bgBorders[toast.type]} flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-200`}
          >
            {icons[toast.type]}
            <div className="flex-1">
              <h5 className="text-xs font-semibold text-slate-900 dark:text-slate-100">{toast.title}</h5>
              {toast.message && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  {toast.message}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
