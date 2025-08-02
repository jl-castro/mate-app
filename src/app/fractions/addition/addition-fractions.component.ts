import { Component, inject } from '@angular/core';
import { QuizShellComponent } from '../../shared/quiz/quiz-shell';
import { generateFractionAdditionQuiz } from './fraction-addition.generator';
import { FractionQuiz } from '../../shared/models/quiz-data.interface';
import { QuizTimerService } from '../../core/services/quiz-timer.service';
import { Timer } from '../../shared/components/timer/timer';

@Component({
  standalone: true,
  selector: 'app-addition-fractions',
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
export class AdditionFractionsComponent {
  public data: FractionQuiz;
  private quizTimerService = inject(QuizTimerService);

  constructor() {
    this.data = this.generateQuestion();
  }

  generateQuestion(): FractionQuiz {
    const savedLevel = sessionStorage.getItem('LEVEL');
    const level = Number(savedLevel) || 1;
    return generateFractionAdditionQuiz(level);
  }

  nextQuestion() {
    this.data = this.generateQuestion();
  }

  onTimeUp() {
    this.quizTimerService.onTimeUp();
  }
}
