import {
  Component,
  computed,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  numberAttribute, OnChanges,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-timer',
  template: `<div class="timer">{{ formattedTime() }}</div>`,
  styleUrls: ['./timer.css'],
})
export class Timer implements OnChanges {
  @Input({ transform: numberAttribute }) duration = 60;
  @Input() autoStart = true;

  @Output() finished = new EventEmitter<void>();
  @Output() tick = new EventEmitter<number>();

  private remaining: WritableSignal<number> = signal(0);
  private running = signal(false);
  private deadline: number | null = null;
  private intervalId: number | null = null;

  readonly formattedTime = computed(() => {
    const value = this.remaining();
    if (this.duration <= 60) return `${value}`;
    const m = Math.floor(value / 60).toString().padStart(2, '0');
    const s = (value % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  });

  constructor() {
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => this.clear());
  }

  ngOnChanges() {
    if (this.autoStart) this.start();
    else this.reset();
  }

  start() {
    this.clear();
    this.remaining.set(Math.max(0, Math.floor(this.duration)));
    if (this.remaining() === 0) {
      queueMicrotask(() => this.finished.emit());
      return;
    }
    this.deadline = Date.now() + this.remaining() * 1000;
    this.running.set(true);
    this.intervalId = window.setInterval(() => this.update(), 250);
  }

  reset() {
    this.clear();
    this.remaining.set(Math.max(0, Math.floor(this.duration)));
  }

  reduce(seconds = 5) {
    this.update();
    const dec = Math.max(0, Math.floor(seconds)) * 1000;
    const now = Date.now();
    const leftMs = Math.max(0, (this.deadline ?? now + this.remaining()*1000) - now);
    const nextMs = Math.max(0, leftMs - dec);
    const next = Math.ceil(nextMs / 1000);

    this.remaining.set(next);
    if (this.running()) this.deadline = now + nextMs;
    if (next === 0) { this.finished.emit(); this.clear(); }
  }

  private update() {
    if (this.deadline == null) return;
    const msLeft = this.deadline - Date.now();
    const secondsLeft = Math.max(0, Math.ceil(msLeft / 1000));
    if (secondsLeft !== this.remaining()) {
      this.remaining.set(secondsLeft);
      this.tick.emit(secondsLeft);
    }
    if (secondsLeft === 0) {
      this.finished.emit();
      this.clear();
    }
  }

  private clear() {
    this.clearIntervalOnly();
    this.running.set(false);
    this.deadline = null;
  }

  private clearIntervalOnly() {
    if (this.intervalId != null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
