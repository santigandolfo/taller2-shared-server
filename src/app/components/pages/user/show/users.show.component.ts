import { Component, Inject, OnInit } from '@angular/core';
import { BusinessUser} from '../../../../entities/business-user.entity';
import { User } from '../../../../entities/users.entity';
import { UsersService } from '../../../../services/users.service';
import { BusinessUsersService } from '../../../../services/business-users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar';
@Component({
  selector: 'users-show',
  templateUrl: './users.show.component.html',
  styleUrls: ['./users.show.component.css']
})
export class UsersShowComponent implements OnInit {

  user: User | null;
  authUser: BusinessUser | null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private businessUsersService: BusinessUsersService,
    private notificationBarService: NotificationBarService
  ) {
    businessUsersService.isLoggedIn().then(user => {
      this.authUser = user;
    }).catch(() => {
      this.router.navigate(['/']);
    });
  }

  ngOnInit() {
    this.route.params
    .subscribe(params => {
      this.usersService.getById(params['id']).then(user => {
        this.user = user;
      }).catch(err => {
        this.notificationBarService.create({
          message: 'User error: ' + err.error,
          type: NotificationType.Error,
          hideDelay: 3000,
        });
      });
    });
  }
}
