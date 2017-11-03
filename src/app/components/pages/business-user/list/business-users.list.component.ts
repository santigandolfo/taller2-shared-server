import { Component, Inject, OnInit } from '@angular/core';
import { BusinessUser} from '../../../../entities/business-user.entity';
import { BusinessUsersService } from '../../../../services/business-users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'business-user-list',
  templateUrl: './business-users.list.component.html',
  styleUrls: ['./business-users.list.component.css']
})
export class BusinessUsersListComponent implements OnInit {

  authUser: BusinessUser | null;
  busers: BusinessUser[] | null;
  constructor(private router: Router, private businessUsersService: BusinessUsersService) {
    businessUsersService.isLoggedIn().then(user => {
      this.authUser = user;
    }).catch(() => {
      this.router.navigate(['/']);
    });
  }

  ngOnInit() {
    this.businessUsersService.getAll().then(res => {
      this.busers = res.json;
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

  delete(anId) {
    this.businessUsersService.delete(anId).then(res => {
      if (res.success) {
        console.log('deleted');
        this.busers = this.busers.filter(user => {
          return user.id !== anId;
        });
      }else {
        console.log(JSON.stringify(res.json));
      }
    });
  }
}


