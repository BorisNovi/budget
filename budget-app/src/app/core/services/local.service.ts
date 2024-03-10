import { Injectable } from '@angular/core';
import { IAdd } from '../models/add.model';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  constructor() {}

  public set(key: string, data: IAdd): void {
    const existingData: { [timestamp: string]: IAdd[] } = this.get(key);

    if (existingData[data.timestamp]) {
      existingData[data.timestamp].push(data);
    } else {
      existingData[data.timestamp] = [data];
    }

    window.localStorage.setItem(key, JSON.stringify(existingData));
  }

  public get(key: string): { [timestamp: string]: IAdd[] } {
    const data = window.localStorage.getItem(key);

    return data ? JSON.parse(data) : {};
  }
}
