import { CATALOG_PAGINATOR } from '@app/modules/catalog/services/catalog-paginator.service';
import { Person } from '@app/modules/catalog/state/catalog.model';
import { CatalogState } from '@app/modules/catalog/state/catalog.store';
import { PaginationResponse, PaginatorPlugin } from '@datorama/akita';
import { createComponentFactory, Spectator, SpyObject } from '@ngneat/spectator/jest';
import { CatalogComponent } from '@app/modules/catalog/components/catalog/catalog.component';
import { CatalogService } from '@app/modules/catalog/services/catalog.service';
import { Observable, of } from 'rxjs';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let spectator: Spectator<CatalogComponent>;
  let pagerRef: SpyObject<PaginatorPlugin<CatalogState>>;
  let serviceSpy: SpyObject<CatalogService>;

  const createComponent = createComponentFactory({
    component: CatalogComponent,
    mocks: [ CatalogService ],
    shallow: true,
    detectChanges: false,
    providers: [
      {
        provide: CATALOG_PAGINATOR,
        useValue: { pageChanges: of(1) }
      }
    ]
  });

  const responseMock: Observable<PaginationResponse<Person>> = of({} as unknown as PaginationResponse<Person> );

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    pagerRef = spectator.inject(CATALOG_PAGINATOR) ;
    serviceSpy = spectator.inject(CatalogService, true);
    serviceSpy.getList.andReturn(of(responseMock));
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  describe('ngOnInit', () => {
    it('should call getList service method', () => {
      spectator.detectChanges();

      expect(serviceSpy.getList).toHaveBeenCalledWith({ page: 1, limit: 10});
    });
  });
});
