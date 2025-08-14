import { Component, inject, ViewChild } from '@angular/core';
import { QuizShellComponent } from '../../shared/quiz/quiz-shell';
import { FractionQuiz } from '../../shared/models/quiz-data.interface';
import { generateFractionSubtractionQuiz } from './fraction-subtraction.generator';
import { Timer } from '../../shared/components/timer/timer';
import { QuizTimeUpService } from '../../core/services/quiz-time-up.service';

@Component({
  standalone: true,
  selector: 'app-subtraction-fractions',
  template: `
    <app-timer #timerRef [duration]="60" (finished)="onTimeUp()"></app-timer>

    <app-quiz-shell
      [question]="data.question"
      [options]="data.options"
      [correctAnswer]="data.correctAnswer"
      (onCorrect)="handleCorrectAnswer()"
      (onIncorrect)="handleIncorrectAnswer()"
    />
  `,
  imports: [QuizShellComponent, Timer]
})
export class SubtractionFractionsComponent {
  @ViewChild('timerRef') timer!: Timer;

  public data: FractionQuiz;
  private correctAnswerCount = 0;
  private quizTimerService = inject(QuizTimeUpService);

  constructor() {
    this.data = this.generateQuestion();
  }

  private generateQuestion(): FractionQuiz {
    const savedLevel = sessionStorage.getItem('LEVEL');
    const level = Number(savedLevel) || 1;
    return generateFractionSubtractionQuiz(level);
  }

  private nextQuestion() {
    this.data = this.generateQuestion();
  }

  onTimeUp() {
    this.quizTimerService.handleTimeUp(this.correctAnswerCount);
  }

  handleCorrectAnswer(): void {
    this.nextQuestion();
    this.correctAnswerCount++;
  }

  handleIncorrectAnswer(): void {
    this.timer.reduce();
  }
}
