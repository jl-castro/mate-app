import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { QuizOption } from '../models/quiz-data.interface';

@Component({
  standalone: true,
  selector: 'app-quiz-shell',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatSnackBarModule, RouterModule],
  templateUrl: 'quiz-shell.html',
  styleUrl: 'quiz-shell.css'
})
export class QuizShellComponent {
  @Input() question!: string;
  @Input() options: QuizOption[] = [];
  @Input() correctAnswer!: number | string;
  @Output() onCorrect = new EventEmitter<void>();
  @Output() onIncorrect = new EventEmitter<void>();

  private snackBar = inject(MatSnackBar);

  checkAnswer(selected: number | string) {
    if (selected === this.correctAnswer) {
      this.snackBar.open('✅ ¡Correcto!', 'Cerrar', {duration: 1500});
      this.onCorrect.emit();
    } else {
      this.onIncorrect.emit();
      this.snackBar.open('❌ Incorrecto. Intenta otra vez.', 'Cerrar', {duration: 2000});
    }
  }

  formatFraction(input: number | string): string {
    const str = input.toString();

    if (!str.includes('/')) return str;

    return str.replace(/(\d+)\/(\d+)/g, (_, num, den) => {
      return `<span class="frac"><sup>${num}</sup>&frasl;<sub>${den}</sub></span>`;
    });
  }
}
