import {Routes} from '@angular/router';
import {LoginComponent} from './auth/components/login.component/login.component';
import {RegisterComponent} from './auth/components/register.component/register.component';
import {NotFoundComponent} from './shared/components/not-found.component/not-found.component';
import {NavFrameComponent} from './shared/components/nav-frame.component/nav-frame.component';
import {authGuard} from './core/guards/auth-guard';
import {MovieComponent} from './shared/components/movie.component/movie.component';
import {Movie} from './models/Movie';
import {MovieListComponent} from './shared/components/movie-list.component/movie-list.component';

export const routes: Routes = [{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full',
}, {
  path: 'home',
  component: NavFrameComponent,
  canActivate: [authGuard]
}, {
  path: 'movie',
  children: [{
    path: '',
    component: MovieListComponent,
  }, {
    path: ':id',
    component: MovieComponent,
  }]
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'register',
  component: RegisterComponent
}, {
  path: '**',
  component: NotFoundComponent,
},];
