import { TestBed, inject } from '@angular/core/testing';

import { SprinterService } from './sprinter.service';

describe('SprinterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SprinterService]
    });
  });

  it('should be created', inject([SprinterService], (service: SprinterService) => {
    expect(service).toBeTruthy();
  }));
});
