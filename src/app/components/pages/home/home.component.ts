import { Component, OnInit } from '@angular/core';
import { Credentials } from '../../../entities/credentials.entity';
import { NgForm } from '@angular/forms';
import { BusinessUsersService } from '../../../services/business-users.service';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  credentials: Credentials;
  constructor(
    private router: Router,
    private businessUsersService: BusinessUsersService,
    private notificationBarService: NotificationBarService
  ) {}

  ngOnInit() {
    this.credentials = { username: '', password: ''};
  }

  login(form: NgForm) {
    this.businessUsersService.authenticate(this.credentials).then(res => {
      this.notificationBarService.create({
         message: 'Login success: ' + this.credentials.username,
         type: NotificationType.Success,
         hideDelay: 3000,
      });
      this.router.navigate(['/business-users']);
    }).catch(err => {
      this.notificationBarService.create({
        message: 'Login Fail: ' + err.error,
        type: NotificationType.Error,
        hideDelay: 3000
      });
    });
  }

}
