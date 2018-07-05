import { TestBed, inject } from '@angular/core/testing';

import { ProcessNodeService } from './process-node.service';

describe('ProcessNodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessNodeService]
    });
  });

  it('should be created', inject([ProcessNodeService], (service: ProcessNodeService) => {
    expect(service).toBeTruthy();
  }));
});
