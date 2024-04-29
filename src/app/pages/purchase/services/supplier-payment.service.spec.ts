import { TestBed } from '@angular/core/testing';

import { SupplierPaymentService } from './supplier-payment.service';

describe('SupplierPaymentService', () => {
  let service: SupplierPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplierPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
