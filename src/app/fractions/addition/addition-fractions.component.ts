import { Component } from '@angular/core';
import { QuizShellComponent } from '../../shared/quiz/quiz-shell';
import { generateFractionAdditionQuiz } from './fraction-addition.generator';
import { FractionQuiz } from '../../shared/models/quiz-data.interface';

@Component({
  standalone: true,
  selector: 'app-addition-fractions',
  template: `
    <app-quiz-shell
      [question]="data.question"
      [options]="data.options"
      [correctAnswer]="data.correctAnswer"
      (onCorrect)="nextQuestion()"
    />
  `,
  imports: [QuizShellComponent]
})
export class AdditionFractionsComponent {
  public data: FractionQuiz;

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
}
