/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AssessmentsConfigService } from './assessmentsConfig.service';

describe('Service: AssessmentsConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssessmentsConfigService]
    });
  });

  it('should ...', inject([AssessmentsConfigService], (service: AssessmentsConfigService) => {
    expect(service).toBeTruthy();
  }));
});
