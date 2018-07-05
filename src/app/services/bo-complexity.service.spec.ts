import { TestBed, inject } from '@angular/core/testing';

import { BoComplexityService } from './bo-complexity.service';

describe('BoComplexityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoComplexityService]
    });
  });

  it('should be created', inject([BoComplexityService], (service: BoComplexityService) => {
    expect(service).toBeTruthy();
  }));
});
