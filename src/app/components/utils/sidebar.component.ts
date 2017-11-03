import { Component, Input, OnInit } from '@angular/core';
import { BusinessUsersService } from '../../services/business-users.service';
import { BusinessUser } from '../../entities/business-user.entity';
import { Router } from '@angular/router';
@Component({
  selector: 'side-bar',
  template: `
    <ul id="slide-out" class="side-nav fixed">
      <li>
        <div class="user-view">
          <div class="background">
            <img src="assets/img/sidebar_background.jpg">
          </div>
          <img class="circle" src="http://placehold.it/72x72">
          <a href="!#"><span class="white-text name nomargin">{{ user.name }}  {{ user.surname }}</span></a>
          <span class="white-text email nomargin">@{{ user.username }} ({{user.role.name}})</span>
        </div>
      </li>
      <li>
        <a routerLink="/business-users">
          <i class="material-icons">supervisor_account</i>Business Users
        </a>
      </li>
      <li>
        <a routerLink="/users">
          <i class="material-icons">person_pin_circle</i>Users
        </a>
      </li>
      <li>
      <a href="" (click)="logout()">
        <i class="material-icons">exit_to_app</i>Logout
      </a>
    </li>
    </ul>
  `,
  styles: [``]
})
export class SideBarComponent implements OnInit {

  @Input() user: BusinessUser | any;
  constructor(private router: Router, private businessUsersService: BusinessUsersService) { }

  ngOnInit() {
    if (this.user == null) {
      this.user = {
        username: '',
        name: '',
        surname: '',
        role: {
          name: ''
        }
      };
    }
  }

  logout() {
    this.businessUsersService.logout().then(() => {
      this.router.navigate(['/']);
    });
  }
}
