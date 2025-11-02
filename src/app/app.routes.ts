import {Routes} from '@angular/router';
import {NotFoundComponent} from './shared/components/not-found.component/not-found.component';
import {authGuard} from './core/guards/auth-guard';
import {MovieListComponent} from './shared/components/movie-list.component/movie-list.component';
import {MovieDetailsComponent} from './shared/components/movie-details.component/movie-details.component';
import {UserDetailsComponent} from './shared/components/user-details.component/user-details.component';
import {UserListComponent} from './shared/components/user-list.component/user-list.component';
import {
  FavoriteMoviesListComponent
} from './shared/components/favorite-movies-list.component/favorite-movies-list.component';
import {
  WatchedMoviesListComponent
} from './shared/components/watched-movies-list.component/watched-movies-list.component';
import {
  WatchLaterMoviesListComponent
} from './shared/components/watch-later-movies-list.component/watch-later-movies-list.component';
import {UserCommentListComponent} from './shared/components/user-comment-list.component/user-comment-list.component';
import {TabGroupAuthComponent} from './auth/components/tab-group-auth.component/tab-group-auth.component';

export const routes: Routes = [{
  path: '',
  redirectTo: 'register',
  pathMatch: 'full',
},{
  path: 'auth',
  component: TabGroupAuthComponent
}, {
  path: 'home',
  component: MovieListComponent,
  canActivate: [authGuard]
}, {
  path: 'movie',
  canActivate: [authGuard],
  children: [{
    path: '',
    component: MovieListComponent,
  }, {
    path: ':id',
    component: MovieDetailsComponent,
  }]
}, {
  path: 'me',
  canActivate: [authGuard],
  component: UserDetailsComponent
}, {
  path: 'users',
  canActivate: [authGuard],
  component: UserListComponent
},{
  path: 'favorites',
  canActivate: [authGuard],
  component: FavoriteMoviesListComponent
},{
  path: 'watched',
  canActivate: [authGuard],
  component: WatchedMoviesListComponent
},{
  path: 'watch-later',
  canActivate: [authGuard],
  component: WatchLaterMoviesListComponent
},{
  path: 'comments',
  canActivate: [authGuard],
  component: UserCommentListComponent
},{
  path: '**',
  component: NotFoundComponent,
},];
