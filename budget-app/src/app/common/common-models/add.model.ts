import { TuiDay } from '@taiga-ui/cdk';
import { ExpenceTypeKey } from '../common-enums/expenceTypeKey.enum';

export interface IAdd {
  amount: number;
  expencesType: ExpenceTypeKey;
  date: TuiDay;
  dateStr: string;
  comment: string;
  category: string;
}
