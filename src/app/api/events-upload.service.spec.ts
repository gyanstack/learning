import { TestBed, inject } from '@angular/core/testing';

import { EventsUploadService } from './events-upload.service';

describe('EventsUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsUploadService]
    });
  });

  it('should be created', inject([EventsUploadService], (service: EventsUploadService) => {
    expect(service).toBeTruthy();
  }));
});
