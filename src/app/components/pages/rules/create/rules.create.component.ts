import { Component, Inject, OnInit } from '@angular/core';
import { RulesService } from '../../../../services/rules.service';
import { BusinessUsersService } from '../../../../services/business-users.service';
import { BusinessUser } from '../../../../entities/business-user.entity';
import { Rule } from '../../../../entities/rule.entity';
import { Router } from '@angular/router';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'rules-create',
  templateUrl: './rules.create.component.html',
  styleUrls: ['./rules.create.component.css']
})
export class RulesCreateComponent  implements OnInit {

  authUser: BusinessUser | null;
  rule: Rule | null = {
    name: '',
    definition: '{ \"default\": 1300 }',
    belongsTo: ''
  };

  constructor(
    private router: Router,
    private businessUsersService: BusinessUsersService,
    private rulesService: RulesService,
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
    console.log(form);
    if (confirm('Are you sure you want to create rule ' + form.value.name + '?')) {
      this.create();
    }
  }

  create() {
    this.rulesService.create(this.rule).then(res => {
      this.notificationBarService.create({
        message: 'Create succeed',
        type: NotificationType.Success,
        hideDelay: 3000,
      });
      this.router.navigate(['/rules']);
    });
  }

}
