export interface IQuestionsNavigationProps {
  activeSection: string;
  setActiveItem: (item: string) => () => void;
  completedSections: string[];
}

export interface IQuestionsNavigationStylesProps {
  isActive: boolean;
  color: string;
  isCompleted: boolean;
}
