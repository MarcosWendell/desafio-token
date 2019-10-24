import { TestBed } from '@angular/core/testing';

import { ApplyCssErrorService } from './apply-css-error.service';

describe('ApplyCssErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplyCssErrorService = TestBed.get(ApplyCssErrorService);
    expect(service).toBeTruthy();
  });
});
