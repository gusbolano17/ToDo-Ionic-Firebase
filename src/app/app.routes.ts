import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tareas',
    pathMatch: 'full',
  },
  {
    path: 'tareas',
    loadComponent: () => import('./features/tareas/tareas.page').then(m => m.TareasPage),
  },
  {
    path: 'categorias',
    loadComponent: () => import('./features/categorias/categorias.page').then(m => m.CategoriasPage),
  },
];
