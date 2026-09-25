import React, { createContext, useContext, useState, useEffect } from 'react';
import { Skill, Agent, Scenario, CaseStudy, Workshop } from '../types';
import { initialSkills } from '../data/skills';
import { initialAgents } from '../data/agents';
import { initialScenarios } from '../data/scenarios';
import { initialCases } from '../data/cases';
import { initialWorkshops } from '../data/workshops';
import { AIService } from '../services/ai';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}

interface PlatformContextType {
  skills: Skill[];
  agents: Agent[];
  scenarios: Scenario[];
  cases: CaseStudy[];
  workshops: Workshop[];
  activeSkill: Skill | null;
  setActiveSkill: (skill: Skill | null) => void;
  activeAgent: Agent | null;
  setActiveAgent: (agent: Agent | null) => void;
  addSkill: (newSkill: Omit<Skill, 'id' | 'createdAt' | 'usageCount'>) => Skill;
  registerWorkshop: (workshopId: string, studentName: string, major: string) => boolean;
  registeredWorkshopIds: string[];
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isApiModalOpen: boolean;
  setIsApiModalOpen: (open: boolean) => void;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export const PlatformProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [skills, setSkills] = useState<Skill[]>(() => {
    const saved = localStorage.getItem('zhihui_custom_skills');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...parsed, ...initialSkills];
      } catch (e) {
        console.error('Failed to parse custom skills', e);
      }
    }
    return initialSkills;
  });

  const [agents] = useState<Agent[]>(initialAgents);
  const [scenarios] = useState<Scenario[]>(initialScenarios);
  const [cases] = useState<CaseStudy[]>(initialCases);
  const [workshops, setWorkshops] = useState<Workshop[]>(initialWorkshops);
  const [registeredWorkshopIds, setRegisteredWorkshopIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('zhihui_registered_workshops');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeSkill, setActiveSkill] = useState<Skill | null>(initialSkills[0]);
  const [activeAgent, setActiveAgent] = useState<Agent | null>(initialAgents[0]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);

  useEffect(() => {
    AIService.initConfig();
  }, []);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addSkill = (skillData: Omit<Skill, 'id' | 'createdAt' | 'usageCount'>): Skill => {
    const newSkill: Skill = {
      ...skillData,
      id: `custom-skill-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      usageCount: 1,
      isCustom: true
    };

    setSkills((prev) => {
      const updated = [newSkill, ...prev];
      const customOnly = updated.filter((s) => s.isCustom);
      localStorage.setItem('zhihui_custom_skills', JSON.stringify(customOnly));
      return updated;
    });

    addToast({
      type: 'success',
      title: 'Skill 创建并发布成功！',
      message: `已将【${newSkill.name}】同步至全校 AI Skill 广场。`
    });

    return newSkill;
  };

  const registerWorkshop = (workshopId: string, studentName: string, major: string): boolean => {
    if (registeredWorkshopIds.includes(workshopId)) {
      addToast({
        type: 'info',
        title: '您已报名该工作坊',
        message: '无需重复提交，我们会通过学工平台发送参会通知。'
      });
      return false;
    }

    const updatedIds = [...registeredWorkshopIds, workshopId];
    setRegisteredWorkshopIds(updatedIds);
    localStorage.setItem('zhihui_registered_workshops', JSON.stringify(updatedIds));

    setWorkshops((prev) =>
      prev.map((w) =>
        w.id === workshopId ? { ...w, registeredCount: w.registeredCount + 1 } : w
      )
    );

    addToast({
      type: 'success',
      title: '工作坊报名成功！',
      message: `已为 ${studentName} 同学（${major}）保留研讨席位。`
    });
    return true;
  };

  return (
    <PlatformContext.Provider
      value={{
        skills,
        agents,
        scenarios,
        cases,
        workshops,
        activeSkill,
        setActiveSkill,
        activeAgent,
        setActiveAgent,
        addSkill,
        registerWorkshop,
        registeredWorkshopIds,
        toasts,
        addToast,
        removeToast,
        isSearchOpen,
        setIsSearchOpen,
        isApiModalOpen,
        setIsApiModalOpen
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (!context) throw new Error('usePlatform must be used within PlatformProvider');
  return context;
};
