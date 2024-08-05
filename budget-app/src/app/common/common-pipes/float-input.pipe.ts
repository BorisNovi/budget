import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'float_input',
  standalone: true
})

export class FloatInputPipe implements PipeTransform {
  transform(value: string, decimalPart = 1): string {
    let newValue = String(value);

    // Заменяет ведущую точку, запятую или '0' на '0.'
    if (newValue[0] === '.' || newValue[0] === ',' || newValue === '0,' || (newValue === '0' && !newValue[1])) {
      newValue = '0.';
    }

    // Удаляет любые символы, кроме цифр, точек и запятых
    newValue = newValue.replace(/[^0-9.]/g, '');

    // Ограничивает количество символов после точки
    const parts = newValue.split('.');
    if (parts[1]?.length > decimalPart) {
      parts[1] = parts[1].slice(0, decimalPart);
      newValue = parts.join('.');
    }

    return newValue;
  }
}
