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
  @Input() link!: string;
  currentPage!: number;

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentPage = +params['page'] || 1;
    });
  }

  canDisplayPagination(): boolean {
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

  getVisiblePages(currentPage: number, totalPages: number, maxVisible: number = 3): (number | string)[] {
    const pages: (number | string)[] = [];
    const half = Math.floor(maxVisible / 2);
    
    let start = Math.max(2, currentPage - half);
    let end = Math.min(totalPages - 1, currentPage + half);

    pages.push(1);

    if (start > 2) {
      pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push('...');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  }
}
