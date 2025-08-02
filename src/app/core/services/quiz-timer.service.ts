import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export type OperationType = 'add' | 'mul' | 'sub' | 'div';

@Injectable({
  providedIn: 'root'
})
export class QuizTimerService {
  private snackBar = inject(MatSnackBar);

  public onTimeUp(): void {
    this.snackBar.open('⏱️ ¡Tiempo agotado!', 'Cerrar', {duration: 3000});
  }
}
