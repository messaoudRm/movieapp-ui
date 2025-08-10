import {Component, input, InputSignal} from '@angular/core';
import {MatDrawer, MatDrawerContainer} from '@angular/material/sidenav';
import {MatButton} from '@angular/material/button';
import {NavButtonListComponent} from '../nav-button-list.component/nav-button-list.component';

@Component({
  selector: 'app-side-nav',
  imports: [
    MatDrawerContainer,
    MatDrawer,
    MatButton,
    NavButtonListComponent
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  showFiller : InputSignal<boolean> = input( false);
}
