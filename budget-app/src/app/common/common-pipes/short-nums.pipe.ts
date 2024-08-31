import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'short_nums',
  standalone: true,
})
export class ShortNumsPipe implements PipeTransform {
  transform(value: string | number): string {
    let newValue: string | number = value;

    if (+value >= 1000) {
      const suffixes = ['', 'K', 'M', 'B', 'T', 'Q'];
      const suffixNum = Math.floor(`${value}`.length / 3);
      let shortValue: string | number = '';

      for (let precision = 2; precision >= 1; precision--) {
        shortValue = parseFloat((suffixNum !== 0 ? +value / 1000 ** suffixNum : +value).toPrecision(precision));
        const dotLessShortValue = `${shortValue}`.replace(/[^a-zA-Z 0-9]+/g, '');
        if (dotLessShortValue.length <= 2) break;
      }

      if (typeof shortValue === 'number' && shortValue % 1 !== 0) shortValue = shortValue.toFixed(1);
      newValue = shortValue + suffixes[suffixNum];
    }
    return String(newValue);
  }
}
