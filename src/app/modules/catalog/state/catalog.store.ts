import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Person } from 'src/app/modules/catalog/state/catalog.model';

export type CatalogState = EntityState<Person, string>;

@Injectable()
@StoreConfig({ name: 'catalog', idKey: 'uid' })
export class CatalogStore extends EntityStore<CatalogState, Person> {
  constructor() {
    super();
  }
}
