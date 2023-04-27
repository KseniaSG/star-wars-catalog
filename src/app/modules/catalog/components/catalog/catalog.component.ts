import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginationResponse, PaginatorPlugin } from '@datorama/akita';
import { Observable, switchMap } from 'rxjs';
import { CATALOG_PAGINATOR } from 'src/app/modules/catalog/services/catalog-paginator.service';
import { CatalogService } from 'src/app/modules/catalog/services/catalog.service';
import { Person } from 'src/app/modules/catalog/state/catalog.model';
import { CatalogState } from 'src/app/modules/catalog/state/catalog.store';
import { ROUTE_PATH } from 'src/app/routes';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  readonly catalogListUrl = ROUTE_PATH.CATALOG;
  readonly siths: string[] = ['Darth Vader'];
  readonly pageLimit: number = 10;

  pagination$!: Observable<PaginationResponse<CatalogState>>;
  list$!: Observable<Person[]>;

  constructor(
    private service: CatalogService,
    @Inject(CATALOG_PAGINATOR) public paginatorRef: PaginatorPlugin<CatalogState>
  ) {}

  ngOnInit(): void {
    this.pagination$ = this.paginatorRef.pageChanges
      .pipe(
        switchMap((page: number) => {
          const reqFn = () => this.service.getList({ page, limit: this.pageLimit });

          return this.paginatorRef.getPage(reqFn);
        })
      );
  }
}
