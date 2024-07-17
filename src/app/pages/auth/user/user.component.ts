import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Paginator } from 'src/app/shared/models/paginator';
import { User } from '../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  users: User[] = [];
  userId!: string;
  paginator!: Paginator<User>;

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        const page = params['page'] || 1;
        this.loadUsers(page);
        console.log(this.users)
    });
  }

  loadUsers(page: number) {
      this.userService.list(page).subscribe((paginator: Paginator<User>) => {
          this.paginator = paginator;
          this.users = paginator.results;
      });
  }

  setUserId($event: Event): void {
    let button = $event.currentTarget as HTMLElement;
    this.userId = button.id;
  }

  deleteUser() {}

}
