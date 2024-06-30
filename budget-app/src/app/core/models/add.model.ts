import { TuiDay } from '@taiga-ui/cdk';
import { ExpenceTypeKey } from '../enums';

export interface IAdd {
  amount: number;
  expencesType: ExpenceTypeKey;
  date: TuiDay;
  dateStr: string;
  comment: string;
  category: string;
}
