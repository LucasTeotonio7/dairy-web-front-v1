import { Component, Input } from '@angular/core';
import { Paginator } from '../../models/paginator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
  @Input() paginator!: Paginator<any>;
  @Input() listingName: string = 'itens';
  currentPage!: number;

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.currentPage = +params['page'] || 1;
    });
  }

  canDisplayPagination() : boolean {
    if (this.paginator) {
        return !(this.paginator.page_size >= this.paginator.count);
    }
    return false;
  }

  getShowingRange(): string {
    if (this.paginator) {
      const startEntry = (this.paginator.page_number - 1) * this.paginator.page_size + 1;
      const endEntry = Math.min(startEntry + this.paginator.quantity_displayed - 1, this.paginator.count);

      return `${startEntry}~${endEntry} de ${this.paginator.count} ${this.listingName.toLowerCase()}`;
    }
    return '';
  }

}
