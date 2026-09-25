import React, { useState } from 'react';
import { X, Key, Cpu, Check, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { AIService } from '../../services/ai';
import { ApiConfig } from '../../types';

export const ApiKeyModal: React.FC = () => {
  const { isApiModalOpen, setIsApiModalOpen, addToast } = usePlatform();
  const currentConfig = AIService.getConfig();
  
  const [provider, setProvider] = useState<ApiConfig['provider']>(currentConfig.provider);
  const [apiKey, setApiKey] = useState(currentConfig.apiKey || '');
  const [baseUrl, setBaseUrl] = useState(currentConfig.baseUrl || 'https://api.openai.com/v1');
  const [model, setModel] = useState(currentConfig.model || 'gpt-4o-mini');

  if (!isApiModalOpen) return null;

  const handleSave = () => {
    AIService.saveConfig({
      provider,
      apiKey: apiKey.trim(),
      baseUrl: baseUrl.trim(),
      model: model.trim()
    });

    addToast({
      type: 'success',
      title: 'AI 引擎配置已更新',
      message: provider === 'mock' 
        ? '已启用内置 Mock 模拟演示模式（无需 Key 稳定秒级演示）' 
        : `已启用真实大模型接口 (${model})`
    });
    setIsApiModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300 flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-slate-900 dark:text-white">AI 引擎与接口配置</h3>
              <p className="text-xs text-slate-400">支持内置免 Key 演示模式与真实大模型 API 切换</p>
            </div>
          </div>
          <button 
            onClick={() => setIsApiModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {/* Mode Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              运行模式选择
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setProvider('mock')}
                className={`p-3 text-left rounded-xl border transition-all ${
                  provider === 'mock'
                    ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                    Mock 模拟演示模式
                  </span>
                  {provider === 'mock' && <Check className="w-4 h-4 text-brand-600" />}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  推荐！无需任何 API Key，真实呈现多步骤智能体工作流与全流程产出。
                </p>
              </button>

              <button
                type="button"
                onClick={() => setProvider('openai')}
                className={`p-3 text-left rounded-xl border transition-all ${
                  provider !== 'mock'
                    ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-accent-600" />
                    真实大模型接口
                  </span>
                  {provider !== 'mock' && <Check className="w-4 h-4 text-brand-600" />}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  支持 OpenAI、DeepSeek、Gemini 或其他兼容接口调用真实大模型。
                </p>
              </button>
            </div>
          </div>

          {/* Conditional Real API Form */}
          {provider !== 'mock' && (
            <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  API Key 密钥
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">仅保存在您的本地浏览器 LocalStorage，不上传任何服务器。</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    API Base URL (端点)
                  </label>
                  <input
                    type="text"
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                    placeholder="https://api.openai.com/v1"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    模型名称 (Model)
                  </label>
                  <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="gpt-4o-mini 或 deepseek-chat"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Info Banner */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <p>
              智汇工坊遵循教学研讨与实践评估规范。若当前没有 API Key，Mock 模式已内置高质量跨专业结构化文献、考点与逻辑诊断演示数据，可随时完整体验。
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setIsApiModalOpen(false)}
            className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            取消
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-sm shadow-brand-600/30 transition-all"
          >
            保存配置
          </button>
        </div>
      </div>
    </div>
  );
};
