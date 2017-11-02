import { Component, OnInit } from '@angular/core';
import { BusinessUsersService } from '../../services/business-users.service';
@Component({
  selector: 'side-bar',
  template: `
    <ul id="slide-out" class="side-nav fixed">
      <li>
        <div class="user-view">
          <div class="background">
            <img src="assets/img/sidebar_background.jpg">
          </div>
          <a href="#!user"><img class="circle" src="http://placehold.it/72x72"></a>
          <a href="#!name"><span class="white-text name nomargin">{{ username }}</span></a>
          <a href="#!email"><span class="white-text email nomargin">{{ email }}</span></a>
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
    </ul>
  `,
  styles: [``]
})
export class SideBarComponent implements OnInit {

  private username: string;
  private email: string;
  constructor(private businessUsersService: BusinessUsersService) { }

  ngOnInit() {
    this.username = 'Christian Angelone';
    this. email = 'christiangelone@gmailcom';
  }
}
