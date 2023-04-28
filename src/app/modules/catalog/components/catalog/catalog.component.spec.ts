import { CATALOG_PAGINATOR } from '@app/modules/catalog/services/catalog-paginator.service';
import { CatalogState } from '@app/modules/catalog/state/catalog.store';
import { PaginatorPlugin } from '@datorama/akita';
import { createComponentFactory, Spectator, SpyObject } from '@ngneat/spectator/jest';
import { CatalogComponent } from '@app/modules/catalog/components/catalog/catalog.component';
import { CatalogService } from '@app/modules/catalog/services/catalog.service';
import { of } from 'rxjs';

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
    declareComponent: false,
    providers: [
      {
        provide: CATALOG_PAGINATOR,
        useValue: {
          pageChanges: of(1),
          getPage: () => of({
            perPage: 1,
            lastPage: 1,
            currentPage: 1,
            total: 1,
            data: []
          })
        }
      }
    ]
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    pagerRef = spectator.inject(CATALOG_PAGINATOR);
    serviceSpy = spectator.inject(CatalogService, true);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  describe('ngOnInit', () => {
    it('should call getPage paginator method', () => {
      jest.spyOn(pagerRef, 'getPage');
      spectator.detectChanges();

      expect(pagerRef.getPage).toHaveBeenCalled();
    });
  });
});
