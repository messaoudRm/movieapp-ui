import {Component, input, InputSignal} from '@angular/core';
import {MatDrawer, MatDrawerContainer} from '@angular/material/sidenav';
import {NavButtonListComponent} from '../nav-button-list.component/nav-button-list.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-side-nav',
  imports: [
    MatDrawerContainer,
    MatDrawer,
    NavButtonListComponent,
    RouterOutlet
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  showFiller : InputSignal<boolean> = input( false);
}
