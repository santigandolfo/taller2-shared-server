import { Component, Inject, OnInit } from '@angular/core';
import { RulesService } from '../../../../services/rules.service';
import { BusinessUsersService } from '../../../../services/business-users.service';
import { BusinessUser } from '../../../../entities/business-user.entity';
import { Rule } from '../../../../entities/rule.entity';
import { Router } from '@angular/router';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar';
@Component({
  selector: 'rules-list',
  templateUrl: './rules.list.component.html',
  styleUrls: ['./rules.list.component.css']
})
export class RulesListComponent implements OnInit {

  rules: Rule[] | null;
  authUser: BusinessUser | null;
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
    this.rulesService.getAll().then(rules => {
      console.log(rules);
      this.rules = rules;
    });
  }

  show(rule) {
    this.router.navigate(['rules/show', rule.id]);
  }

  deletable() {
    return true;
  }

  deletionAttempt(rule) {
    if (confirm('Are you sure you want to delete rule ' + rule.name + '?')) {
      this.delete(rule.id);
    }
  }

  delete(anId) {
    this.rules = this.rules.filter(user => {
      return user.id !== anId;
    });
  }

}

