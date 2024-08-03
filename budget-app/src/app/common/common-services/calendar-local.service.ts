import { Injectable } from '@angular/core';
import { TuiDayRange, TuiDay, TuiMonth } from '@taiga-ui/cdk';

@Injectable()
export class CalendarLocalService {
  public today = TuiDay.currentLocal();
  public firstDayOfMonth = new TuiDay(this.today.year, this.today.month, 1);
  public daysInMonth = new TuiMonth(this.today.year, this.today.month).daysCount;
  public lastDayOfMonth = new TuiDay(this.today.year, this.today.month, this.daysInMonth);
  public currentMonthRange = new TuiDayRange(this.firstDayOfMonth, this.lastDayOfMonth);

  get savedRange(): TuiDayRange {
    const storageRange = window.localStorage.getItem('saved-calendar-range') || '';
    if (!storageRange) return this.currentMonthRange;

    const parsedStorageRange: { from: string, to: string } = JSON.parse(storageRange);
    const parsedFrom = this.parseTuiDay(parsedStorageRange.from);
    const parsedTo = this.parseTuiDay(parsedStorageRange.to);
    return new TuiDayRange(parsedFrom, parsedTo);
  }

  public saveRange(range: TuiDayRange): void {
    window.localStorage.setItem('saved-calendar-range', JSON.stringify(range));
  }

  private parseTuiDay(dateStr: string): TuiDay {
    const parsedDate = new Date(dateStr);
    return new TuiDay(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate());
  }
}
