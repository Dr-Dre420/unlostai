import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Skill {
  id: string;
  name: string;
  category: string;
  weight: number;
}

interface AssessmentContextType {
  selectedSkills: Set<string>;
  currentStep: number;
  assessmentComplete: boolean;
  toggleSkill: (skillId: string) => void;
  setCurrentStep: (step: number) => void;
  completeAssessment: () => void;
  resetAssessment: () => void;
  getSkillsByCategory: (category: string) => string[];
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};

interface AssessmentProviderProps {
  children: ReactNode;
}

export const AssessmentProvider: React.FC<AssessmentProviderProps> = ({ children }) => {
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set());
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentComplete, setAssessmentComplete] = useState(false);

  const toggleSkill = (skillId: string) => {
    const newSelected = new Set(selectedSkills);
    if (newSelected.has(skillId)) {
      newSelected.delete(skillId);
    } else {
      newSelected.add(skillId);
    }
    setSelectedSkills(newSelected);
  };

  const completeAssessment = () => {
    setAssessmentComplete(true);
  };

  const resetAssessment = () => {
    setSelectedSkills(new Set());
    setCurrentStep(0);
    setAssessmentComplete(false);
  };

  const getSkillsByCategory = (category: string) => {
    return Array.from(selectedSkills).filter(skillId => {
      // This would normally check against a skills database
      return true; // For now, return all selected skills
    });
  };

  const value = {
    selectedSkills,
    currentStep,
    assessmentComplete,
    toggleSkill,
    setCurrentStep,
    completeAssessment,
    resetAssessment,
    getSkillsByCategory,
  };

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
};