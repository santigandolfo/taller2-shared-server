import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router';

//Components
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { NotFoundComponent } from './components/notfound/notfound.component';
import { HomeComponent } from './components/home/home.component';

//Routes
//import { AppRoutes } from './routes/app.routes';

let routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  { path: '**', component:  NotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
