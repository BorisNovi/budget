import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appFloatInput]',
  standalone: true
})
export class FloatInputDirective {
  @Input() floatInputValueLimit = 9999999;
  @Input() floatInputDecimalPart = 1;

  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInputChange(event: InputEvent): void {
    const input = event.target as HTMLInputElement;

    // Заменяет запятую на точку и удаляем все символы, кроме цифр и точки
    let value = input.value.replace(/,/g, '.').replace(/[^0-9.]/g, '');

    // Убирает лидирующие нули (кроме случая "0." в начале)
    if (value.startsWith('0') && value[1] !== '.') {
      value = value.replace(/^0+/, '0');
    }

    // Убирает повторяющиеся точки
    const parts = value.split('.');
    if (parts.length > 2) {
      value = `${parts[0]}.${parts.slice(1).join('')}`;
    }

    // Добавляет ноль в начало, если ввод начался с точки
    if (value.startsWith('.')) {
      value = `0${value}`;
    }

    // Если начинается с нуля и не имеет точки, добавляет точку
    if (value.length > 1 && value.startsWith('0') && !value.startsWith('0.')) {
      value = `0.${value.slice(1)}`;
    }

    this.ngControl.control?.setValue(value, { emitEvent: false });
  }

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;

    // Проверка на повторение точки
    if (event.key === '.' && input.value.includes('.')) {
      event.preventDefault();
      return;
    }

    // Разрешает ввод только цифр, точки и запятой
    if (!/[0-9.,]/.test(event.key)) {
      event.preventDefault();
    }

    // Проверка на величину значения
    if (+input.value >= this.floatInputValueLimit) {
      event.preventDefault();
    }

    // Ограничение знаков дробной части
    if (input.value.split('').includes('.') && input.value.split('.')[1].length >= this.floatInputDecimalPart) {
      event.preventDefault();
    }
  }
}
