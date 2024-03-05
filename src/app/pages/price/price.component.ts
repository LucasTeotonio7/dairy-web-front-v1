import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Paginator } from 'src/app/shared/models/paginator';
import { Price } from './models/price';
import { PriceService } from './services/price.service';


@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent {
  prices: Price[] = [];
  paginator!: Paginator<Price>;
  priceId!: string;

  constructor(
    private priceService: PriceService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        const page = params['page'] || 1;
        this.loadPrices(page);
    });
  }

  loadPrices(page: number) {
    this.priceService.list(page).subscribe((paginator: Paginator<Price>) => {
        this.paginator = paginator;
        this.prices = paginator.results;
    });
  }

  setPriceId($event: Event): void {
    let button = $event.currentTarget as HTMLElement;
    this.priceId = button.id;
  }

  deletePrice() {
    this.priceService.delete(this.priceId).subscribe({
        next: (response) => {
            alert('preço excluída!');
        },
        error: (error) => {
            console.error(error);
        },
        complete: () => {
          this.ngOnInit();
        }
    });
  }
}
