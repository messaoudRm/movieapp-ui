import {Injectable} from '@angular/core';
import {UserAction} from '../../models/UserAction';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  userActions: UserAction[] = [
    new UserAction('Home', 'home', ['USER', 'ADMIN', 'SUPER_ADMIN'], 'home'),
    new UserAction('Watched Movies', 'movie', ['USER', 'ADMIN', 'SUPER_ADMIN'], 'watched'),
    new UserAction('Watch Later', 'watch_later', ['USER', 'ADMIN', 'SUPER_ADMIN'], 'watch-later'),
    new UserAction('Favorite Movies', 'favorite', ['USER', 'ADMIN', 'SUPER_ADMIN'], 'favorites'),
    new UserAction('Comments', 'forum', ['USER', 'ADMIN', 'SUPER_ADMIN'], 'comments'),
    new UserAction('Change Password', 'vpn_key', ['USER', 'ADMIN', 'SUPER_ADMIN'], 'changePassword'),
    new UserAction('Change Information', 'person', ['USER', 'ADMIN', 'SUPER_ADMIN'], 'me'),
    new UserAction('Manage Movies', 'library_add', ['ADMIN', 'SUPER_ADMIN'], 'manageMovies'),
    new UserAction('Manage Users', 'supervisor_account', ['SUPER_ADMIN'], 'users'),
  ];

}
