import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { enableAkitaProdMode } from '@datorama/akita';
import { AppComponent } from 'src/app/app.component';
import { CatalogService } from 'src/app/modules/catalog/services/catalog.service';
import { CatalogQuery } from 'src/app/modules/catalog/state/catalog.query';
import { CatalogStore } from 'src/app/modules/catalog/state/catalog.store';
import { routes } from 'src/app/routes';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes)),
    importProvidersFrom(HttpClientModule),
    { provide: CatalogService, useClass: CatalogService },
    { provide: CatalogQuery, useClass: CatalogQuery },
    { provide: CatalogStore, useClass: CatalogStore }
  ]
}).catch(err => console.error(err));
