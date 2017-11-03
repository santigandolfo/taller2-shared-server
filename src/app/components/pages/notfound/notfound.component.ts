import { Component, OnInit } from '@angular/core';
import { BusinessUser} from '../../../entities/business-user.entity';
import { BusinessUsersService } from '../../../services/business-users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotFoundComponent implements OnInit {

  authUser: BusinessUser | null;
  constructor(private router: Router, private businessUsersService: BusinessUsersService) {
    businessUsersService.isLoggedIn().then(user => {
      this.authUser = user;
    }).catch(() => {
      this.router.navigate(['/']);
    });
  }
  ngOnInit() {
  }

}
