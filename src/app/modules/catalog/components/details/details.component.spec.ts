import { ActivatedRoute } from '@angular/router';
import { DetailsComponent } from '@app/modules/catalog/components/details/details.component';
import { createComponentFactory, mockProvider, Spectator, SpyObject } from '@ngneat/spectator/jest';
import { CatalogService } from '@app/modules/catalog/services/catalog.service';
import { of } from 'rxjs';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let spectator: Spectator<DetailsComponent>;
  let serviceSpy: SpyObject<CatalogService>;
  let activatedRouteSpy: SpyObject<ActivatedRoute>;

  const createComponent = createComponentFactory({
    component: DetailsComponent,
    mocks: [ CatalogService ],
    shallow: true,
    detectChanges: false,
    declareComponent: false,
    providers: [
      mockProvider(ActivatedRoute, {
        params: of({ id: 1 })
      })
    ]
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    serviceSpy = spectator.inject(CatalogService, true);
    activatedRouteSpy = spectator.inject(ActivatedRoute);

  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });


  describe('ngOnInit', () => {
    it('should call getDetailsById method with passed params', () => {
      spectator.detectChanges();

      expect(serviceSpy.getDetailsById).toHaveBeenCalledWith(1);
    });
  });
});
