import { TestBed, inject } from '@angular/core/testing';

import { ImageResizerService } from './image-resizer.service';

describe('ImageResizerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageResizerService]
    });
  });

  it('should be created', inject([ImageResizerService], (service: ImageResizerService) => {
    expect(service).toBeTruthy();
  }));
});
