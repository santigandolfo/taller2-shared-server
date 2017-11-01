import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'side-bar',
  template: `
    <ul id="slide-out" class="side-nav fixed">
      <li>
        <div class="userView">
          <img class="background" src="http://via.placeholder.com/350x150">
        </div>
      </li>
      <li><div class="divider"></div></li>
      <li><a routerLink="/business-users"><i class="material-icons">supervisor_account</i>Business Users</a></li>
      <li><a class="waves-effect" href="#!">Third Link With Waves</a></li>
    </ul>
  `,
  styles: [``]
})
export class SideBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
