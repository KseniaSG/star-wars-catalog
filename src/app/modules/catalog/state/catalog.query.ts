import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Person } from 'src/app/modules/catalog/state/catalog.model';
import { CatalogState, CatalogStore } from 'src/app/modules/catalog/state/catalog.store';

@Injectable()
export class CatalogQuery extends QueryEntity<CatalogState, Person> {
  constructor(protected override store: CatalogStore) {
    super(store);
  }
}
