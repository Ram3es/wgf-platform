type TSectionTitle = 'Home' | 'Assessment' | 'Users';

export interface INavigationBarProps {
  user: IUser;
}

export interface INavigationSection {
  title: TSectionTitle;
  items: {
    title: string;
    route: string;
  }[];
}

export interface INavigationRoles {
  user: INavigationSection[];
  trainerAdmin: INavigationSection[];
  superAdmin: INavigationSection[];
}
