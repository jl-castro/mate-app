import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterModule, MatCardModule, MatButtonModule],
  templateUrl: 'home.html',
  styleUrl: 'home.css'
})
export class HomeComponent {
  public level = 1;
  private readonly LEVEL_KEY = 'LEVEL';

  constructor() {
    const savedLevel = sessionStorage.getItem(this.LEVEL_KEY);
    if (savedLevel) {
      this.level = Number(savedLevel);
    }
  }

  increaseLevel() {
    if (this.level < 5) {
      this.level++;
      sessionStorage.setItem(this.LEVEL_KEY, this.level.toString());
    }
  }

  decreaseLevel() {
    if (this.level > 1) {
      this.level--;
      sessionStorage.setItem(this.LEVEL_KEY, this.level.toString());
    }
  }
}
