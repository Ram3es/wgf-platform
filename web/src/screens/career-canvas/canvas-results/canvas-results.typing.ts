export interface IResultQuestion {
  title: string;
  value: string;
  color?: string;
  type?: string;
}

export interface IResultPageProps {
  questions: IResultQuestion[];
}
