import { TestBed } from '@angular/core/testing';

import { BackendReqService } from './backend-req.service';

describe('BackendReqService', () => {
  let service: BackendReqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendReqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
