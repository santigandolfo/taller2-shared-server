import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NotificationBarModule } from 'angular2-notification-bar';
// Components
import { AppComponent } from './app.component';

import { UsersListComponent } from './components/pages/user/list/users.list.component';
import { UsersShowComponent } from './components/pages/user/show/users.show.component';

import { BusinessUsersListComponent } from './components/pages/business-user/list/business-users.list.component';
import { BusinessUsersShowComponent } from './components/pages/business-user/show/business-users.show.component';
import { BusinessUsersEditComponent } from './components/pages/business-user/edit/business-users.edit.component';
import { BusinessUsersCreateComponent } from './components/pages/business-user/create/business-users.create.component';

import { RulesListComponent } from './components/pages/rules/list/rules.list.component';


import { NotFoundComponent } from './components/pages/notfound/notfound.component';
import { HomeComponent } from './components/pages/home/home.component';

import { SideBarComponent } from './components/utils/sidebar.component';

// Services
import { UsersService } from './services/users.service';
import { BusinessUsersService } from './services/business-users.service';
import { RulesService } from './services/rules.service';
import { RulesShowComponent } from './components/pages/rules/show/rules.show.component';

// Routes
const routes: object[] = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'rules',
    component: RulesListComponent
  },
  {
    path: 'rules/show/:id',
    component: RulesShowComponent
  },
  {
    path: 'users',
    component: UsersListComponent
  },
  {
    path: 'users/show/:id',
    component: UsersShowComponent
  },
  {
    path: 'business-users',
    component: BusinessUsersListComponent
  },
  {
    path: 'business-users/create',
    component: BusinessUsersCreateComponent
  },
  {
    path: 'business-users/show/:id',
    component: BusinessUsersShowComponent
  },
  {
    path: 'business-users/edit/:id',
    component: BusinessUsersEditComponent
  },
  { path: '**', component:  NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UsersShowComponent,
    BusinessUsersListComponent,
    BusinessUsersShowComponent,
    BusinessUsersEditComponent,
    BusinessUsersCreateComponent,
    RulesListComponent,
    RulesShowComponent,
    SideBarComponent,
    NotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NotificationBarModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    UsersService,
    BusinessUsersService,
    RulesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
