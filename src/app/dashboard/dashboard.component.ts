import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay, startWith, tap } from 'rxjs/operators';
import { SiteTitleService } from '@red-probeaufgabe/core';
import {
  FhirSearchFn,
  IFhirPatient,
  IFhirPractitioner,
  IFhirSearchResponse,
  IPreparedIFhirPatient,
  IPreparedIFhirPractitioner,
  ISearchFormData,
} from '@red-probeaufgabe/types';
import { IUnicornTableColumn } from '@red-probeaufgabe/ui';
import { FhirUtilService, SearchFacadeService } from '@red-probeaufgabe/search';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  // Init unicorn columns to display
  columns: Set<IUnicornTableColumn> = new Set<IUnicornTableColumn>([
    'number',
    'resourceType',
    'name',
    'gender',
    'birthDate',
  ]);
  isLoading = true;
  selectedItem: IPreparedIFhirPatient | IPreparedIFhirPractitioner;

  /*
   * Implement search on keyword or fhirSearchFn change
   **/
  search$: Observable<IFhirSearchResponse<IFhirPatient | IFhirPractitioner>>;

  entries$: Observable<Array<IFhirPatient | IFhirPractitioner>>;

  totalLength$;

  // The AbstractSearchFacadeService was the wrong class to inject here, because it's an abstract class that only provides all needed methods for the implementation of a search service.
  // And in this case it cannot be injectable, only the implementations are injectable
  constructor(
    private siteTitleService: SiteTitleService,
    private searchFacade: SearchFacadeService,
    private utilService: FhirUtilService,
  ) {
    this.siteTitleService.setSiteTitle('Dashboard');

    // search for all entries
    this.search({ searchFuncSelect: FhirSearchFn.SearchAll, searchText: '' });
  }

  onItemSelected(item: IFhirPatient | IFhirPractitioner): void {
    this.selectedItem = this.utilService.prepareData(item);
  }

  onSearchChanged(formData: ISearchFormData): void {
    this.search(formData);
  }

  private initSearch(formData: ISearchFormData): void {
    //
    this.isLoading = true;

    //
    this.search$ = this.searchFacade.search(formData.searchFuncSelect, formData.searchText).pipe(
      catchError(this.handleError),
      tap((data) => {
        this.isLoading = false;
      }),
      shareReplay(),
    );
  }

  private isValidSearch(formData: ISearchFormData): boolean {
    return formData.searchText === '' || !new RegExp('[^A-Za-z0-9]').test(formData.searchText);
  }

  private mapEntries(): void {
    this.entries$ = this.search$.pipe(
      map((data) => !!data && data.entry),
      startWith([]),
    );
  }

  private mapTotalLength(): void {
    this.totalLength$ = this.search$.pipe(
      map((data) => !!data && data.total),
      startWith(0),
    );
  }

  private search(formData: ISearchFormData): void {
    //
    if (!this.isValidSearch(formData)) {
      return;
    }

    //
    this.selectedItem = null;

    // create search request
    this.initSearch(formData);

    // execute search and map entries
    this.mapEntries();

    // set total length of current query
    this.mapTotalLength();
  }

  private handleError(): Observable<IFhirSearchResponse<IFhirPatient | IFhirPractitioner>> {
    return of({ entry: [], total: 0 });
  }
}
