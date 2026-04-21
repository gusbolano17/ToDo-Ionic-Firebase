import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./tareas/tareas.page').then(m => m.TareasPage)
  },
];
