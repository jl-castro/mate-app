import { Component } from '@angular/core';
import { QuizShellComponent } from '../../../shared/quiz/quiz-shell';
import { QuizGeneratorService } from '../../../core/services/quiz-generator.service';
import { QuizOption } from '../../../shared/models/quiz-data.interface';

@Component({
  standalone: true,
  selector: 'app-multiplication-quiz',
  imports: [QuizShellComponent],
  template: `
    <app-quiz-shell
      [question]="question"
      [options]="options"
      [correctAnswer]="correctAnswer"
      (onCorrect)="generateQuestion()"
    />
  `
})
export class Quiz {
  public question = '';
  public correctAnswer: number | string = '';
  public options: QuizOption[] = [];

  constructor(private quizService: QuizGeneratorService) {
    this.generateQuestion();
  }

  generateQuestion() {
    const savedLevel = sessionStorage.getItem('LEVEL');
    const level = Number(savedLevel) || 1;
    const quiz = this.quizService.generate('mul', level);
    this.question = quiz.question;
    this.correctAnswer = quiz.answer;
    this.options = quiz.options;
  }
}
