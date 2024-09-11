import { Component } from '@angular/core';
import { SupplierPaymentService } from '../purchase/services/supplier-payment.service';
import { AnalysisData, MonthlyPayment, MainSuppliers } from './models/analysis';

import { EChartsOption } from 'echarts';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  data!: AnalysisData;

  chartOptions!: EChartsOption;
  chartSupplierOptions!: EChartsOption;
  theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';

  constructor(
    private supplierPaymentService: SupplierPaymentService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.supplierPaymentService.getAnalysis().subscribe({
      next: (response: AnalysisData) => {
        this.data = response;
        this.setChartPayment(response.month_to_month);
        this.setChartSupplier(response.main_suppliers);
      },
      error: (err) => {console.error(err)}
    });

    this.themeService.darkMode$.subscribe(isDarkMode => {
      if (isDarkMode) {
        this.theme = 'dark';
      } else {
        this.theme = 'light';
      }
    });
  }

  setChartPayment(monthToMonth: MonthlyPayment[]): void {
    const months = monthToMonth.map(payment => payment.month);
    const totals = monthToMonth.map(payment => payment.total);

    this.chartOptions = {
      xAxis: {
        type: 'category',
        data: months
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: totals,
          type: 'line',
          lineStyle: {
            width: 4 
          },
          symbolSize: 10,
          itemStyle: {
            color: '#5470C6'
          }
        }
      ],
      tooltip: {
        trigger: 'axis', 
        formatter: (params: any) => {
          const month = params[0].name;
          const value = params[0].value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
          return `${month}: ${value}`;
        }
      },
    };
  }

  setChartSupplier(mainSuppliers: MainSuppliers[]): void {
    const supplierNames = mainSuppliers.map(supplier => supplier.name);
  
    this.chartSupplierOptions = {
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          if (Array.isArray(params)) {
            return '';
          }
          return `${params.name}: ${params.value}L (${params.percent}%)`;
        }
      },
      legend: {
        orient: 'horizontal',
        bottom: 10,
        data: supplierNames
      },
      series: [
        {
          name: 'Suppliers',
          type: 'pie',
          radius: '50%',
          data: mainSuppliers,
          label: {
            formatter: (params: any) => {
              if (Array.isArray(params)) {
                return '';
              }
              return `${params.name}: ${params.value}L`;
            }
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }

}
