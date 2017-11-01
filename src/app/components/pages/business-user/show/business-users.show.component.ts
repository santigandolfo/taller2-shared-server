import { Component, Inject, OnInit } from '@angular/core';
import { BusinessUser} from '../../../../entities/business-user.entity';
import { BusinessUsersService } from '../../../../services/business-users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'business-user-show',
  templateUrl: './business-users.show.component.html',
  styleUrls: ['./business-users.show.component.css']
})
export class BusinessUsersShowComponent implements OnInit {

  id: number;
  user: BusinessUser | null;
  error = '';
  constructor(private router: Router, private usersService: BusinessUsersService) {}

  ngOnInit() {
    this.id = 1;
    this.usersService.getById(this.id).then(user => {
      this.user = user;
    });
  }

  delete() {
    this.usersService.delete(this.id).then(res => {
      if (res.success) {
        console.log('deleted');
        this.router.navigate(['/business-users']);
      }else {
        console.log(JSON.stringify(res.json));
      }
    });
  }
}
