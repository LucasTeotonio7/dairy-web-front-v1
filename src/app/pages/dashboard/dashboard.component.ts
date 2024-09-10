import { Component } from '@angular/core';
import { SupplierPaymentService } from '../purchase/services/supplier-payment.service';
import { AnalysisData } from './models/analysis';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  data!: AnalysisData;

  constructor(private supplierPaymentService: SupplierPaymentService) {}

  ngOnInit(): void {
    this.supplierPaymentService.getAnalysis().subscribe({
      next: (response: AnalysisData) => {
        this.data = response;
      },
      error: (err) => {console.error(err)}
    });
  }
}
