import { inject, InjectionToken } from '@angular/core';
import { PaginatorPlugin } from '@datorama/akita';
import { CatalogQuery } from 'src/app/modules/catalog/state/catalog.query';

export const CATALOG_PAGINATOR =
  new InjectionToken('CATALOG_PAGINATOR', {
    providedIn: 'root',
    factory: () => new PaginatorPlugin(inject(CatalogQuery)).withControls().withRange()
  });
