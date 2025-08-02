import { Component, inject } from '@angular/core';
import { QuizShellComponent } from '../../../shared/quiz/quiz-shell';
import { QuizGeneratorService } from '../../../core/services/quiz-generator.service';
import { QuizOption } from '../../../shared/models/quiz-data.interface';
import { Timer } from '../../../shared/components/timer/timer';
import { QuizTimerService } from '../../../core/services/quiz-timer.service';

@Component({
  standalone: true,
  selector: 'app-division-quiz',
  imports: [QuizShellComponent, Timer],
  template: `
    <app-timer [duration]="60" (finished)="onTimeUp()"></app-timer>

    <app-quiz-shell
      [question]="question"
      [options]="options"
      [correctAnswer]="correctAnswer"
      (onCorrect)="generateQuestion()"
    />
  `
})
export class DivisionQuizComponent {
  public question = '';
  public correctAnswer: number | string = '';
  public options: QuizOption[] = [];
  private quizTimerService = inject(QuizTimerService);

  constructor(private quizService: QuizGeneratorService) {
    this.generateQuestion();
  }

  generateQuestion() {
    const savedLevel = sessionStorage.getItem('LEVEL');
    const level = Number(savedLevel) || 1;
    const quiz = this.quizService.generate('div', level);
    this.question = quiz.question;
    this.correctAnswer = quiz.answer;
    this.options = quiz.options;
  }

  onTimeUp() {
    this.quizTimerService.onTimeUp();
  }
}
