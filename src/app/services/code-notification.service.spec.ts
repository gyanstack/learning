import { TestBed, inject } from '@angular/core/testing';

import { CodeNotificationService } from './code-notification.service';

describe('CodeNotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodeNotificationService]
    });
  });

  it('should be created', inject([CodeNotificationService], (service: CodeNotificationService) => {
    expect(service).toBeTruthy();
  }));
});
