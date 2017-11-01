import { Component, Inject, OnInit } from '@angular/core';
import { BusinessUser} from '../../../../entities/business-user.entity';
import { BusinessUsersService } from '../../../../services/business-users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'business-user-create',
  templateUrl: './business-users.create.component.html',
  styleUrls: ['./business-users.create.component.css']
})
export class BusinessUsersCreateComponent implements OnInit {

  user: BusinessUser | null;
  constructor(private router: Router, private usersService: BusinessUsersService) {}

  ngOnInit() {
    this.user = {
      id: 0,
      username: '',
      password: '',
      name: '',
      surname: '',
      role: null
    };
  }

  create() {
    alert(JSON.stringify(this.user));
    return null;
  }
}
