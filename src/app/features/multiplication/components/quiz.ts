import { Component, inject, ViewChild } from '@angular/core';
import { QuizShellComponent } from '../../../shared/quiz/quiz-shell';
import { QuizGeneratorService } from '../../../core/services/quiz-generator.service';
import { QuizOption } from '../../../shared/models/quiz-data.interface';
import { Timer } from '../../../shared/components/timer/timer';
import { QuizTimeUpService } from '../../../core/services/quiz-time-up.service';

@Component({
  standalone: true,
  selector: 'app-multiplication-quiz',
  imports: [QuizShellComponent, Timer],
  template: `
    <app-timer #timerRef [duration]="60" (finished)="onTimeUp()"></app-timer>

    <app-quiz-shell
      [question]="question"
      [options]="options"
      [correctAnswer]="correctAnswer"
      (onCorrect)="handleCorrectAnswer()"
      (onIncorrect)="handleIncorrectAnswer()"
    />
  `
})
export class Quiz {
  @ViewChild('timerRef') timer!: Timer;

  public question = '';
  public correctAnswer: number | string = '';
  public options: QuizOption[] = [];
  private correctAnswerCount = 0;
  private quizTimerService = inject(QuizTimeUpService);

  constructor(private quizService: QuizGeneratorService) {
    this.generateQuestion();
  }

  private generateQuestion() {
    const savedLevel = sessionStorage.getItem('LEVEL');
    const level = Number(savedLevel) || 1;
    const quiz = this.quizService.generate('mul', level);
    this.question = quiz.question;
    this.correctAnswer = quiz.answer;
    this.options = quiz.options;
  }

  onTimeUp() {
    this.quizTimerService.handleTimeUp(this.correctAnswerCount);
  }

  handleCorrectAnswer(): void {
    this.generateQuestion();
    this.correctAnswerCount++;
  }

  handleIncorrectAnswer(): void {
    this.timer.reduce();
  }
}
