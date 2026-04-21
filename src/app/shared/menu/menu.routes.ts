import { Routes } from '@angular/router';
import { MenuPage } from './menu.page';

export const menuRoutes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'tareas',
        loadComponent: () =>
          import('../../features/tareas/tareas.page').then((m) => m.TareasPage),
      },
      {
        path : 'categorias',
        loadComponent: () => import('../../features/categorias/categorias.page').then( m => m.CategoriasPage)
      }
    ],
  },
];
