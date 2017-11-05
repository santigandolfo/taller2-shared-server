import { Component, Inject, OnInit } from '@angular/core';
import { BusinessUser} from '../../../../entities/business-user.entity';
import { BusinessUsersService } from '../../../../services/business-users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar';
import sortBy from 'sort-by';
@Component({
  selector: 'business-user-edit',
  templateUrl: './business-users.edit.component.html',
  styleUrls: ['./business-users.edit.component.css']
})
export class BusinessUsersEditComponent implements OnInit {

  authUser: BusinessUser | null;
  buser: BusinessUser | null = {
    id: null,
    username: '',
    password: '',
    name: '',
    surname: '',
    role: null
  };

  id: number;
  roleId: number = null;
  roles = [];

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
      this.id = params['id'];
      this.businessUsersService.getById(this.id).then(buser => {
        this.buser = buser;
        if (this.buser.role != null) {
          this.roleId = this.buser.role.id;
        }
      }).catch(err => {
        this.notificationBarService.create({
          message: 'Business User error: ' + err.error,
          type: NotificationType.Error,
          hideDelay: 3000,
        });
      });
    });
    this.businessUsersService.getAllRoles().then(roles => {
      this.roles = roles.sort(sortBy('name'));
    }).catch(err => {
      this.notificationBarService.create({
        message: 'Roles error: ' + err.error,
        type: NotificationType.Error,
        hideDelay: 3000,
      });
    });
  }

  setRole(id) {
    this.roleId = id;
  }

  edit(form: NgForm) {
    form.value.roleId = this.roleId;
    this.businessUsersService.update(form.value, this.id).then(() => {
      this.notificationBarService.create({
        message: 'Edit succeed',
        type: NotificationType.Success,
        hideDelay: 3000,
      });
      this.router.navigate(['/business-users']);
    }).catch(err => {
      this.notificationBarService.create({
        message: 'Edit failed',
        type: NotificationType.Error,
        hideDelay: 3000,
      });
    });
  }
}
