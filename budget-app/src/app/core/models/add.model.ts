import { TuiDay } from '@taiga-ui/cdk';

export interface IAdd {
  amount: number;
  expencesType: ExpenceType;
  date: TuiDay;
  timestamp: string;
  comment: string;
  category: string;
}

export enum ExpenceType {
  expence = 'expence',
  income = 'income',
}
