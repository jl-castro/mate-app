import { Component, inject } from '@angular/core';
import { QuizShellComponent } from '../../shared/quiz/quiz-shell';
import { FractionQuiz } from '../../shared/models/quiz-data.interface';
import { generateFractionSubtractionQuiz } from './fraction-subtraction.generator';
import { Timer } from '../../shared/components/timer/timer';
import { QuizTimerService } from '../../core/services/quiz-timer.service';

@Component({
  standalone: true,
  selector: 'app-subtraction-fractions',
  template: `
    <app-timer [duration]="60" (finished)="onTimeUp()"></app-timer>

    <app-quiz-shell
      [question]="data.question"
      [options]="data.options"
      [correctAnswer]="data.correctAnswer"
      (onCorrect)="nextQuestion()"
    />
  `,
  imports: [QuizShellComponent, Timer]
})
export class SubtractionFractionsComponent {
  public data: FractionQuiz;
  private quizTimerService = inject(QuizTimerService);

  constructor() {
    this.data = this.generateQuestion();
  }

  generateQuestion(): FractionQuiz {
    const savedLevel = sessionStorage.getItem('LEVEL');
    const level = Number(savedLevel) || 1;
    return generateFractionSubtractionQuiz(level);
  }

  nextQuestion() {
    this.data = this.generateQuestion();
  }

  onTimeUp() {
    this.quizTimerService.onTimeUp();
  }
}
