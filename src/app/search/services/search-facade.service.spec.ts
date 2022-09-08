import { HttpClient, HttpHandler } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { PatientSearchService } from './patient-search.service';
import { PractitionerSearchService } from './practitioner-search.service';
import { SearchFacadeService } from './search-facade.service';

/**
 * Optionale Zusatzaufgabe
 */
describe('SearchFacadeService', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [HttpClient, HttpHandler, PatientSearchService, PractitionerSearchService, SearchFacadeService],
    });
  });
  // tslint:disable:no-empty
  test('should init', () => {
    const searchFacade = TestBed.get(SearchFacadeService);

    inject([SearchFacadeService], (injectService: SearchFacadeService) => {
      expect(injectService).toBe(searchFacade);
    });
  });

  test('should find patients', () => {
    inject([SearchFacadeService], (injectService: SearchFacadeService) => {
      const result = injectService.searchPatients('');

      expect(result).toBeTruthy();
    });
  });

  test('should find practitioners', () => {
    inject([SearchFacadeService], (injectService: SearchFacadeService) => {
      const result = injectService.searchPractitioners('');

      expect(result).toBeTruthy();
    });
  });

  test('should find both', () => {
    inject([SearchFacadeService], (injectService: SearchFacadeService) => {
      const result = injectService.searchAll('');

      expect(result).toBeTruthy();
    });
  });

  test('merge arrays', () => {});
});
