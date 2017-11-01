import { Component, Inject, OnInit } from '@angular/core';
import { BusinessUser} from '../../../../entities/business-user.entity';
import { BusinessUsersService } from '../../../../services/business-users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'business-user-edit',
  templateUrl: './business-users.edit.component.html',
  styleUrls: ['./business-users.edit.component.css']
})
export class BusinessUsersEditComponent implements OnInit {

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

  create() {
    alert(JSON.stringify(this.user));
    return null;
  }
}
