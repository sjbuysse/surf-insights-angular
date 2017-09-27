import { TestBed, inject } from '@angular/core/testing';

import { SurfspotService } from './surfspot.service';

describe('SurfspotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SurfspotService]
    });
  });

  it('should be created', inject([SurfspotService], (service: SurfspotService) => {
    expect(service).toBeTruthy();
  }));
});
