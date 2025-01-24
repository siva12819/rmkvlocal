import { TestBed } from '@angular/core/testing';

import { SupplierMasterService } from './supplier-master.service';

describe('SupplierMasterService', () => {
  let service: SupplierMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
