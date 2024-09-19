import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

import { DateService } from 'src/app/shared/services/date.service';
import { Paginator } from 'src/app/shared/models/paginator';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  users: User[] = [];
  userId!: string;
  paginator!: Paginator<User>;
  isLoading = true;

  constructor(
    private userService: UserService, 
    private route: ActivatedRoute,
    private toastService: ToastService,
    private dateService: DateService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        const page = params['page'] || 1;
        this.loadUsers(page);
    });
  }

  loadUsers(page: number) {
      this.userService.list(page).subscribe((paginator: Paginator<User>) => {
          this.paginator = paginator;
          this.users = paginator.results;
          this.isLoading = false;
      });
  }

  setUserId($event: Event): void {
    let button = $event.currentTarget as HTMLElement;
    this.userId = button.id;
  }

  delete() : void {
    this.userService.delete(this.userId).subscribe({
      next: (response) => {
        this.toastService.showToastSuccess('Usuário', 'Usuário excluído com sucesso!');
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.ngOnInit();
      }
    });
  }

  formatDateTime(datetime: string ) {
    return this.dateService.formatDateTime(datetime);
  }

}
