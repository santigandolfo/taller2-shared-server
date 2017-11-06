import { Component, Inject, OnInit } from '@angular/core';
import { BusinessUser} from '../../../../entities/business-user.entity';
import { BusinessUsersService } from '../../../../services/business-users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'business-user-create',
  templateUrl: './business-users.create.component.html',
  styleUrls: ['./business-users.create.component.css']
})
export class BusinessUsersCreateComponent implements OnInit {

  authUser: BusinessUser | null;
  buser: BusinessUser | null = {
    username: '',
    password: '',
    name: '',
    surname: '',
    role: null
  };

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
  }

  creationAttempt(form: NgForm) {
    if (confirm('Are you sure you want to create @' + form.value.username + '?')) {
      this.create(form);
    }
  }

  create(form: NgForm) {
    this.businessUsersService.create(form.value).then(res => {
      this.notificationBarService.create({
        message: 'Create succeed',
        type: NotificationType.Success,
        hideDelay: 3000,
      });
      this.router.navigate(['/business-users']);
    }).catch(err => {
      this.notificationBarService.create({
        message: 'Create failed: ' + err,
        type: NotificationType.Error,
        hideDelay: 3000,
      });
    });
  }
}
