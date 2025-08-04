import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TimeoutDialogComponent } from '../../shared/components/dialog/dialog';

@Injectable({
  providedIn: 'root'
})
export class QuizTimeUpService {
  private router = inject(Router);
  private dialog = inject(MatDialog);

  public navigateToQuiz(): Promise<boolean> {
    return this.router.navigate(['/']);
  }

  public handleTimeUp(score: number): void {
    this.navigateToQuiz().then((result) => {
      if (result) {
        score = score !== 0 ? score * 10 : score;
        this.dialog.open(TimeoutDialogComponent, {
          data: {score},
          disableClose: true,
          width: '350px'
        });
      }
    })
  }
}
