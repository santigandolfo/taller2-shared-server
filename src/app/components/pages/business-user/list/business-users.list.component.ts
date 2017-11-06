import { Component, Inject, OnInit } from '@angular/core';
import { BusinessUser} from '../../../../entities/business-user.entity';
import { BusinessUsersService } from '../../../../services/business-users.service';
import { Router } from '@angular/router';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar';
@Component({
  selector: 'business-user-list',
  templateUrl: './business-users.list.component.html',
  styleUrls: ['./business-users.list.component.css']
})
export class BusinessUsersListComponent implements OnInit {

  authUser: BusinessUser | null;
  busers: BusinessUser[] | null;
  constructor(
    private router: Router,
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

  canCreate() {
    const can = this.authUser.role != null && this.authUser.role.create_bs_users;
    return can;
  }

  ngOnInit() {
    this.businessUsersService.getAll().then(busers => {
      this.busers = busers;
    });
  }

  deletable(buser) {
    if (buser.role != null) {
      return buser.role.buser_deletable && this.authUser.role.delete_bs_users;
    }else {
      return true;
    }
  }

  edit(buser: BusinessUser) {
    this.router.navigate(['/business-users/edit', buser.id]);
  }

  show(buser: BusinessUser) {
    this.router.navigate(['/business-users/show', buser.id]);
  }

  deletionAttempt(user) {
    if (confirm('Are you sure you want to delete @' + user.username + '?')) {
      this.delete(user.id);
    }
  }

  delete(anId) {
    this.businessUsersService.delete(anId).then(res => {
        this.notificationBarService.create({
          message: 'Deletion succeed',
          type: NotificationType.Success,
          hideDelay: 3000,
        });
        this.busers = this.busers.filter(user => {
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


