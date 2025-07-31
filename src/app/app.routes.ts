import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'quiz/multiplication',
    loadChildren: () => import('./features/multiplication/multiplication.routes')
      .then(m => m.multiplicationRoutes)
  },
  {
    path: 'quiz/addition',
    loadChildren: () => import('./features/addition/addition.routes')
      .then(m => m.additionRoutes)
  },
  {
    path: 'quiz/subtraction',
    loadChildren: () => import('./features/substraction/substraction.route')
      .then(m => m.subtractionRoutes),
  },
  {
    path: 'quiz/division',
    loadChildren: () => import('./features/division/division.routes')
      .then(m => m.divisionRoutes),
  },
  {
    path: 'fractions',
    loadChildren: () => import('./fractions/fractions.routes')
      .then(m => m.fractionsRoutes)
  }
];
