import { Routes } from '@angular/router';
import { AdditionFractionsComponent } from './addition/addition-fractions.component';
import { SubtractionFractionsComponent } from './subtraction/subtraction-fractions.component';

export const fractionsRoutes: Routes = [
  {path: 'add', component: AdditionFractionsComponent},
  {path: 'sub', component: SubtractionFractionsComponent},
];
