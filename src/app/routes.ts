import { Routes } from '@angular/router';

export const ROUTE_PATH = {
  CATALOG: 'catalog'
};

export const childRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./modules/catalog/components/catalog/catalog.component').then(m => m.CatalogComponent),
    pathMatch: 'full'
  },
  {
    path: ':id',
    loadComponent: () => import('./modules/catalog/components/details/details.component').then(m => m.DetailsComponent)
  }
];

export const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: ROUTE_PATH.CATALOG
  },
  {
    path: 'catalog',
    loadChildren: () => childRoutes
  }
];

