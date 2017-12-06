import { Component, Inject } from '@angular/core';
import { RulesService } from '../../../../services/rules.service';
import { BusinessUsersService } from '../../../../services/business-users.service';
import { BusinessUser } from '../../../../entities/business-user.entity';
import { Rule } from '../../../../entities/rule.entity';
import { Router, ActivatedRoute} from '@angular/router';
import { NotificationBarService, NotificationType } from 'angular2-notification-bar';
import { AceEditorComponent } from 'ng2-ace-editor/src/component';
@Component({
  selector: 'rules-show',
  templateUrl: './rules.show.component.html',
  styleUrls: ['./rules.show.component.css']
})
export class RulesShowComponent {

  id: number = null;
  rule: Rule = {
   name: null,
   definition: '',
   belongsTo: '',
   createdAt: '',
   updatedAt: ''
  };

  authUser: BusinessUser | null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private businessUsersService: BusinessUsersService,
    private rulesService: RulesService,
    private notificationBarService: NotificationBarService
  ) {
    businessUsersService.isLoggedIn().then(user => {
      this.authUser = user;
    }).catch(() => {
      this.router.navigate(['/']);
    });
    this.init();
  }

  init() {
    this.route.params
    .subscribe(params => {
      this.id = params['id'];
      this.rulesService.getById(this.id).then(rule => {
        console.log(rule);
        this.rule = rule;
      });
    });
  }

  save() {
    if (this.rule != null) {
      this.rulesService.update(this.rule, this.id).then(rule => {
        this.rule = rule;
        this.notificationBarService.create({
          message: 'Saved!',
          type: NotificationType.Success,
          hideDelay: 3000,
        });
      }).catch(err => {
        console.log(err);
      });
    }
  }

}

