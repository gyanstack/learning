import { TestBed, inject } from '@angular/core/testing';

import { BoComplexityRulesService } from './bo-complexity-rules.service';

describe('BoComplexityRulesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoComplexityRulesService]
    });
  });

  it('should be created', inject([BoComplexityRulesService], (service: BoComplexityRulesService) => {
    expect(service).toBeTruthy();
  }));
});
