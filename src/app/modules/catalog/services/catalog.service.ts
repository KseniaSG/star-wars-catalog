import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationResponse } from '@datorama/akita';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CATALOG } from 'src/app/constants/url.constants';
import { CatalogResponse, Person, PersonDetailsResponse } from 'src/app/modules/catalog/state/catalog.model';

@Injectable()
export class CatalogService {
  constructor(
    private readonly http: HttpClient
  ) { }
  readonly pageLimit: number = 10;

  getList(pageConfig: PageConfig): Observable<PaginationResponse<Person>> {
    return this.http
      .get<CatalogResponse>(
        CATALOG.LIST_URL,
        { params: { page: pageConfig.page, limit: pageConfig.limit }}
      )
      .pipe(
        map((res: CatalogResponse) => this.mapListResponse(res, pageConfig)),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error('getList failed ' + error));
        })
      );
  }

  getDetailsById(id: string): Observable<PersonDetailsResponse> {
    return this.http.get<PersonDetailsResponse>(CATALOG.LIST_URL + '/' + id).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error('getDetailsById failed ' + error));
      })
    );
  }

  private mapListResponse(res: CatalogResponse, pageConfig: PageConfig) {
    return {
      perPage: this.pageLimit,
      lastPage: this.pageLimit,
      currentPage: pageConfig.page,
      total: res.total_records,
      data: res.results
    };
  }
}
