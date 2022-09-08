import { Component, EventEmitter, Output, ɵisObservable } from '@angular/core';
import { FhirSearchFn, ISearchFormData } from '@red-probeaufgabe/types';

@Component({
  selector: 'app-search',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent {
  /** Implement Search Form */
  formData: ISearchFormData;
  timeoutId;

  @Output() changed: EventEmitter<Object> = new EventEmitter();

  resourceTypes = [
    {
      label: 'Patients + Practitioners',
      value: FhirSearchFn.SearchAll,
    },
    {
      label: 'Patient',
      value: FhirSearchFn.SearchPatients,
    },
    {
      label: 'Practitioners',
      value: FhirSearchFn.SearchPractitioners,
    },
  ];

  constructor() {
    this.formData = { searchText: '', searchFuncSelect: FhirSearchFn.SearchAll };
  }

  onFormDataChanged(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      console.log('search');
      this.changed.emit(this.formData);
    }, 250);
  }
}
