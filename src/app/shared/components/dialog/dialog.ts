import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-timeout-dialog',
  imports: [CommonModule, MatDialogModule, MatButton],
  template: `
    <h2 mat-dialog-title>⏱️ Tiempo agotado</h2>
    <mat-dialog-content>
      <p>Se terminó el tiempo para responder</p>
      <p class="score">Tu puntaje es <strong>{{ data.score }}</strong></p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Volver al jugar</button>
    </mat-dialog-actions>
  `,
  styleUrl: 'dialog.css'
})
export class TimeoutDialogComponent {
  public readonly data: { score: number } = inject(MAT_DIALOG_DATA);
}
