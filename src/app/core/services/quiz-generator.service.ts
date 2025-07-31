import { Injectable } from '@angular/core';
import { QuizData, QuizOption } from '../../shared/models/quiz-data.interface';

export type OperationType = 'add' | 'mul' | 'sub' | 'div';

@Injectable({
  providedIn: 'root'
})
export class QuizGeneratorService {
  private readonly OPTION_COUNT = 4;

  generate(type: OperationType, level: number = 1): QuizData {
    const rangeMap: Record<1 | 2 | 3 | 4 | 5, [number, number]> = {
      1: [1, 5],
      2: [1, 10],
      3: [5, 15],
      4: [10, 30],
      5: [30, 100],
    };
    const safeLevel = Math.max(1, Math.min(5, level)) as 1 | 2 | 3 | 4 | 5;
    const [min, max] = rangeMap[safeLevel];

    let a = this.getRandomInt(min, max);
    let b = this.getRandomInt(min, max);
    let question = '';
    let answer = 0;

    switch (type) {
      case 'add':
        answer = a + b;
        question = `${a} + ${b} = ?`;
        break;
      case 'mul':
        answer = a * b;
        question = `${a} × ${b} = ?`;
        break;
      case 'sub':
        if (a < b) [a, b] = [b, a];
        answer = a - b;
        question = `${a} - ${b} = ?`;
        break;
      case 'div':
        const divisor = this.getRandomInt(min, max);
        const result = this.getRandomInt(min, max);
        const dividend = divisor * result;

        a = dividend;
        b = divisor;
        answer = result;
        question = `${a} ÷ ${b} = ?`;
        break;
    }

    const options = this.generateOptions(answer);
    return {question, answer, options};
  }

  private generateOptions(correct: number): QuizOption[] {
    const values: number[] = [correct];

    while (values.length < this.OPTION_COUNT) {
      const offset = this.getRandomInt(1, 10);
      const fake = Math.random() < 0.5 ? correct + offset : correct - offset;

      if (fake > 0 && !values.includes(fake)) {
        values.push(fake);
      }
    }

    const shuffled = this.shuffle(values);

    return shuffled.map((value, index) => ({
      id: Date.now() + index,
      value
    }));
  }


  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private shuffle(array: number[]): number[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
