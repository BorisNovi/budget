import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private _currency = 'USD';
  constructor() { }

  get currencyCode() {
    // eslint-disable-next-line no-underscore-dangle
    const currencyCode = window.localStorage.getItem('currency') || this._currency;
    return currencyCode;
  }

  public setCurrency(currency: string) {
    window.localStorage.setItem('currency', currency);
  }
}
