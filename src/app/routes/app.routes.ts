import { NotFoundComponent } from '../components/notfound/notfound.component'

import { Routes } from '@angular/router';
import { UserRoutes } from './user.routes'

var routes: Routes = []

export const AppRoutes: Routes = routes.concat(UserRoutes,[
    { path: '**', component:  NotFoundComponent }
])