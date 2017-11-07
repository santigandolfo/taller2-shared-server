import { Component, Inject, OnInit } from '@angular/core';
import { BusinessUser} from '../../../../entities/business-user.entity';
import { User } from '../../../../entities/users.entity';
import { BusinessUsersService } from '../../../../services/business-users.service';
import { UsersService } from '../../../../services/users.service';
import { Router } from '@angular/router';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar';
@Component({
  selector: 'users-list',
  templateUrl: './users.list.component.html',
  styleUrls: ['./users.list.component.css']
})
export class UsersListComponent implements OnInit {

  authUser: BusinessUser | null;
  users: User[] | null;
  constructor(
    private router: Router,
    private usersService: UsersService,
    private businessUsersService: BusinessUsersService,
    private notificationBarService: NotificationBarService
  ) {
    businessUsersService.isLoggedIn().then(user => {
      this.authUser = user;
      console.log(this.authUser);
    }).catch(() => {
      this.router.navigate(['/']);
    });
  }

  ngOnInit() {
    this.usersService.getAll().then(users => {
      this.users = users;
    });
  }

  deletable(buser) {
    return this.authUser.role != null && this.authUser.role.delete_users;
  }

  show(user: User) {
    this.router.navigate(['users/show', user.id]);
  }

  deletionAttempt(user) {
    if (confirm('Are you sure you want to delete @' + user.username + '?')) {
      this.delete(user.id);
    }
  }

  delete(anId) {
    this.usersService.delete(anId).then(res => {
        this.notificationBarService.create({
          message: 'Deletion succeed',
          type: NotificationType.Success,
          hideDelay: 3000,
        });
        this.users = this.users.filter(user => {
          return user.id !== anId;
        });
    }).catch(err => {
      this.notificationBarService.create({
        message: 'Deletion failed: ' + err,
        type: NotificationType.Error,
        hideDelay: 3000,
      });
    });
  }
}
