type TSectionTitle = 'Home' | 'Assessment' | 'Users';

export interface INavigationBarProps {
  activeDashboardItem: string;
  setActiveItem: (item: string) => () => void;
  user: IUser;
}

export interface INavigationSection {
  title: TSectionTitle;
  items: string[];
}

export interface INavigationRoles {
  user: INavigationSection[];
  trainerAdmin: INavigationSection[];
  superAdmin: INavigationSection[];
}
