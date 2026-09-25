import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  Search, 
  Sun, 
  Moon, 
  Settings, 
  BookOpen, 
  Bot, 
  Layers, 
  Compass, 
  Award, 
  Calendar, 
  PlusCircle,
  Menu,
  X,
  BarChart2,
  Info
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { usePlatform } from '../../context/PlatformContext';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { setIsSearchOpen, setIsApiModalOpen } = usePlatform();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: '首页', path: '/', icon: Sparkles },
    { label: 'AI Skills', path: '/skills', icon: BookOpen },
    { label: 'AI Agents', path: '/agents', icon: Bot },
    { label: 'AI 工作台', path: '/workspace', icon: Layers, highlight: true },
    { label: '跨专业场景', path: '/scenarios', icon: Compass },
    { label: '共创案例', path: '/cases', icon: Award },
    { label: 'Skill 共创', path: '/create', icon: PlusCircle },
    { label: '推广培训', path: '/workshops', icon: Calendar },
    { label: '数据大屏', path: '/statistics', icon: BarChart2 },
    { label: '项目成果', path: '/about', icon: Info },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-accent-500 flex items-center justify-center text-white shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-brand-600 via-indigo-600 to-accent-600 bg-clip-text text-transparent dark:from-brand-400 dark:to-accent-400">
                  智汇工坊
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950/80 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800/60">
                  AI 共创平台
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden xl:block">
                面向跨专业学习场景的 AI Skill 与 Agent 实践创新
              </p>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-medium whitespace-nowrap rounded-lg transition-all ${
                    active
                      ? item.highlight
                        ? 'bg-brand-600 text-white shadow-sm shadow-brand-600/30'
                        : 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 font-semibold'
                      : item.highlight
                      ? 'text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/40'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Quick Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/70 dark:hover:bg-slate-700/70 transition-colors"
              title="全局搜索 (Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">搜索...</span>
              <kbd className="hidden sm:inline-block text-[10px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 rounded text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* API Settings Button */}
            <button
              onClick={() => setIsApiModalOpen(true)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="配置 AI 模型 (支持 Mock / 真实 API)"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={theme === 'dark' ? '切换为明亮模式' : '切换为深色模式'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* User Badge */}
            <div className="hidden md:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs font-bold flex items-center justify-center shadow-inner">
                创
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold leading-tight text-slate-800 dark:text-slate-200">计创2502</p>
                <p className="text-[10px] text-brand-600 dark:text-brand-400">共创团队</p>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 pt-2 pb-4 space-y-1 animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  active
                    ? 'bg-brand-500 text-white'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
