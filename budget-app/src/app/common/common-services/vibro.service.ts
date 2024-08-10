import { Injectable } from '@angular/core';

@Injectable()
export class VibroService {
  private readonly isSupported: boolean = 'vibrate' in navigator;

  constructor() {
    if (this.isSupported) {
      navigator.vibrate([10, 100, 50]);
      console.log('Vibration supported.');
    } else {
      console.error('Vibration is not supported.');
    }
  }

  public vibrate(): void {
    this.triggerVibration([10, 100, 500]);
  }

  public short(): void {
    this.triggerVibration(25);
  }

  public double(): void {
    this.triggerVibration([10, 50]);
  }

  public long(): void {
    this.triggerVibration(100);
  }

  private triggerVibration(pattern: number | number[]): void {
    if (this.isSupported) {
      navigator.vibrate(pattern);
    }
  }
}
