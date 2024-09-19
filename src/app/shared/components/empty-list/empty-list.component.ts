import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-list',
  templateUrl: './empty-list.component.html',
  styleUrls: ['./empty-list.component.css']
})
export class EmptyListComponent {

  @Input() listingName: string = 'itens';
  @Input() isLoading: boolean = false;

}
