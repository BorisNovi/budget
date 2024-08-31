import { Injectable } from '@angular/core';
import { TuiDay } from '@taiga-ui/cdk';
import { ExpenceTypeKey, IAdd } from 'src/app/common';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  constructor() {}

  public set(key: string, data: IAdd): void {
    const existingData: { [dateStr: string]: IAdd[] } = this.get(key);
    const existingDataList = existingData[data.dateStr];

    if (existingDataList) {
      const currID = existingDataList[existingDataList.length - 1].id || 0;
      data.id = currID + 1;
      existingDataList.push(data);
    } else {
      data.id = 0;
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

  public remove(key: ExpenceTypeKey, id: number, date: string): void {
    const formattedDate = date.split('-').reverse().join('.');
    const existingData: { [dateStr: string]: IAdd[] } = this.get(key);

    if (!existingData || !existingData[formattedDate]) {
      return;
    }

    const existingDataSelectedDateList = existingData[formattedDate];
    const existingDataCleared = existingDataSelectedDateList.filter((data) => data.id !== id);

    if (existingDataCleared.length === 0) {
      delete existingData[formattedDate];
    } else {
      existingData[formattedDate] = existingDataCleared;
    }

    window.localStorage.setItem(key, JSON.stringify(existingData));
  }

  public clearAll(): void {
    window.localStorage.removeItem(ExpenceTypeKey.EXPENCE);
    window.localStorage.removeItem(ExpenceTypeKey.INCOME);
  }
}
