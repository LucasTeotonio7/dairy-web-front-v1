import { TestBed } from '@angular/core/testing';

import { PriceProductSupplierService } from './price-product-supplier.service';

describe('PriceProductSupplierService', () => {
  let service: PriceProductSupplierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceProductSupplierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
