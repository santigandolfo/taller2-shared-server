import { Component, Inject, OnInit } from '@angular/core';
import { BusinessUser} from '../../../../entities/business-user.entity';
import { BusinessUsersService } from '../../../../services/business-users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar';
@Component({
  selector: 'business-user-show',
  templateUrl: './business-users.show.component.html',
  styleUrls: ['./business-users.show.component.css']
})
export class BusinessUsersShowComponent implements OnInit {

  buser: BusinessUser | null;
  authUser: BusinessUser | null;
  numberOfAllowedPermissions: number;
  permissions: string[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
      this.businessUsersService.getById(params['id']).then(buser => {
        this.buser = buser;
        this.numberOfAllowedPermissions = this.allowedPermissions().length;
        this.permissions = this.allowedPermissions();
      }).catch(err => {
        this.notificationBarService.create({
          message: 'Business User error: ' + err.error,
          type: NotificationType.Error,
          hideDelay: 3000,
        });
      });
    });
  }

  allowedPermissions() {
    const permissions = [];
    for (const key of Object.keys(this.buser.role)){
      if (key !== 'id' && key !== 'name' && this.buser.role[key] !== false) {
        permissions.push(key);
      }
    }
    return permissions;
  }

  goToEdit() {
    console.log('click');
    this.router.navigate(['business-users/edit', this.buser.id]);
  }
}
