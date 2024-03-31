import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private _currency = '₾';
  constructor() { }

  get currency() {
    // eslint-disable-next-line no-underscore-dangle
    return this._currency;
  }

  public setCurrency(currency: string) {
    window.localStorage.setItem('currency', currency);
  }

  // TODO: добавить установку валюты в настройках
}
