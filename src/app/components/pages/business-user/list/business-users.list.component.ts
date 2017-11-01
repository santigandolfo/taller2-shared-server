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

  users: BusinessUser[] | null;
  constructor(private router: Router, private usersService: BusinessUsersService) {}

  ngOnInit() {
    this.usersService.getAll().then((users: BusinessUser[]) =>
      this.users = users
    );
  }

  edit(buser: BusinessUser) {
    this.router.navigate(['/business-users/edit', buser.id]);
  }

  delete(anId) {
    this.usersService.delete(anId).then(res => {
      if (res.success) {
        console.log('deleted');
        this.users = this.users.filter(user => {
          return user.id !== anId;
        });
      }else {
        console.log(JSON.stringify(res.json));
      }
    });
  }
}


