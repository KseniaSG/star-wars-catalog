import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationResponse } from '@datorama/akita';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Catalog } from 'src/app/constants/url.constants';
import { CatalogResponse, Person, PersonDetailsResponse } from 'src/app/modules/catalog/state/catalog.model';
import { CatalogQuery } from 'src/app/modules/catalog/state/catalog.query';
import { CatalogStore } from 'src/app/modules/catalog/state/catalog.store';

@Injectable()
export class CatalogService {
  constructor(
    private readonly http: HttpClient,
    private store: CatalogStore,
    private query: CatalogQuery
  ) { }

  getList(pageConfig: { page: number, limit: number }): Observable<PaginationResponse<Person>> {
    return this.http.get<CatalogResponse>(Catalog.list + '?page=' + pageConfig.page + '&limit=' + pageConfig.limit)
      .pipe(
        tap(entities => {
          this.store.set([...entities.results]);
          this.query.select().subscribe(res=>console.log(res))
        }),
        map((res: CatalogResponse) => {
          console.log({
            perPage: 10,
            lastPage: 10,
            currentPage: +pageConfig.page,
            total: +res.total_records,
            data: res.results
          });
          return {
            perPage: 10,
            lastPage: 10,
            currentPage: +pageConfig.page,
            total: +res.total_records,
            data: res.results
          };
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error('getList failed ' + error));
        })
      );
  }

  getDetailsById(id: string): Observable<PersonDetailsResponse> {
    return this.http.get<PersonDetailsResponse>(Catalog.list + '/' + id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error('getDetailsById failed ' + error));
        })
    );
  }
}
