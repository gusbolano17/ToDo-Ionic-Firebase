import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/tareas/tareas.page').then(m => m.TareasPage)
  },
  {
    path: 'tarea-modal',
    loadComponent: () => import('./features/tareas/tarea-modal/tarea-modal.page').then( m => m.TareaModalPage)
  },
  {
    path: 'categorias',
    loadComponent: () => import('./features/categorias/categorias.page').then( m => m.CategoriasPage)
  },
];
