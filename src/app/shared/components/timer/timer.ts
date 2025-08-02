import { Component, DestroyRef, EventEmitter, inject, Input, Output, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-timer',
  imports: [CommonModule],
  template: `<div class="timer">{{ formattedTime }}</div>`,
  styleUrl: './timer.css'
})
export class Timer {
  private _duration = 60;
  @Output() finished = new EventEmitter<void>();

  private remaining: WritableSignal<number> = signal(0);
  private intervalId: number | null = null;

  @Input()
  set duration(value: number) {
    this._duration = value;
    this.start();
  }

  constructor() {
    const destroyRef = inject(DestroyRef);

    destroyRef.onDestroy(() => {
      if (this.intervalId) clearInterval(this.intervalId);
    });
  }

  private start() {
    this.remaining.set(this._duration);
    if (this.intervalId) clearInterval(this.intervalId);

    this.intervalId = window.setInterval(() => {
      const current = this.remaining();
      if (current <= 1) {
        this.remaining.set(0);
        clearInterval(this.intervalId!);
        this.finished.emit();
      } else {
        this.remaining.set(current - 1);
      }
    }, 1000);
  }

  get formattedTime(): string {
    const value = this.remaining();
    if (this._duration <= 60) {
      return `${value}`;
    }

    const minutes = Math.floor(value / 60).toString().padStart(2, '0');
    const seconds = (value % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }
}
