import { Injectable } from '@angular/core';
import { TuiCurrency } from '@taiga-ui/addon-commerce';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private _currency = 'Dollar';
  constructor() { }

  get currency() {
    // eslint-disable-next-line no-underscore-dangle
    const currencyName = window.localStorage.getItem('currency') || this._currency;
    return currencyName;
  }

  get currencyCode() {
    // eslint-disable-next-line no-underscore-dangle
    const currencyName = window.localStorage.getItem('currency') || this._currency;
    return TuiCurrency[currencyName as keyof typeof TuiCurrency];
  }

  public setCurrency(currency: string) {
    window.localStorage.setItem('currency', currency);
  }
}
