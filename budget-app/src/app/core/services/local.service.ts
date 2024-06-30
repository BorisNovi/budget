import { Injectable } from '@angular/core';
import { TuiDay } from '@taiga-ui/cdk';
import { IAdd } from '../models/add.model';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  constructor() {}

  public set(key: string, data: IAdd): void {
    const existingData: { [dateStr: string]: IAdd[] } = this.get(key);

    if (existingData[data.dateStr]) {
      existingData[data.dateStr].push(data);
    } else {
      existingData[data.dateStr] = [data];
    }

    window.localStorage.setItem(key, JSON.stringify(existingData));
  }

  public get(key: string): { [timestamp: string]: IAdd[] } {
    const data = window.localStorage.getItem(key);
    return data ? JSON.parse(data) : {};
  }

  public getRangeSortedList(key: string, from: TuiDay, to?: TuiDay): IAdd[] {
    const data = window.localStorage.getItem(key);
    if (!data) return [];

    const startDate = new Date(`${from.formattedYear}-${from.formattedMonthPart}-${from.formattedDayPart}`);
    const endDate = to ? new Date(`${to.formattedYear}-${to.formattedMonthPart}-${to.formattedDayPart}`) : new Date();
    const filteredKeys = Object.keys(JSON.parse(data)).filter((dateKey) => {
      const [day, month, year] = dateKey.split('.');
      const date = new Date(`${year}-${month}-${day}`);
      return date >= startDate && date <= endDate;
    });
    const result: IAdd[] = filteredKeys.flatMap((item) => JSON.parse(data)[item]);

    return result;
  }
}
