import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { BusinessUsersListComponent } from './components/pages/business-user/list/business-users.list.component';
import { BusinessUsersShowComponent } from './components/pages/business-user/show/business-users.show.component';
import { BusinessUsersEditComponent } from './components/pages/business-user/edit/business-users.edit.component';
import { BusinessUsersCreateComponent } from './components/pages/business-user/create/business-users.create.component';
import { NotFoundComponent } from './components/pages/notfound/notfound.component';
import { HomeComponent } from './components/pages/home/home.component';

import { SideBarComponent } from './components/utils/sidebar.component';

// Services
import { BusinessUsersService } from './services/business-users.service';

// Routes
const routes: object[] = [
  {
    path: '',
    component: HomeComponent
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
    BusinessUsersListComponent,
    BusinessUsersShowComponent,
    BusinessUsersEditComponent,
    BusinessUsersCreateComponent,
    SideBarComponent,
    NotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [BusinessUsersService],
  bootstrap: [AppComponent]
})
export class AppModule {}
