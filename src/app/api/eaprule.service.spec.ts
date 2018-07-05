import { TestBed, inject } from '@angular/core/testing';

import { EapruleService } from './eaprule.service';

describe('EapruleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EapruleService]
    });
  });

  it('should be created', inject([EapruleService], (service: EapruleService) => {
    expect(service).toBeTruthy();
  }));
});
