import { Component } from '@angular/core';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {RegisterComponent} from '../register.component/register.component';
import {LoginComponent} from '../login.component/login.component';

@Component({
  selector: 'app-tab-group-auth',
  imports: [
    MatTab,
    MatTabGroup,
    RegisterComponent,
    LoginComponent
  ],
  templateUrl: './tab-group-auth.component.html',
  styleUrl: './tab-group-auth.component.scss'
})
export class TabGroupAuthComponent {

  selectedTabIndex = 0;

  goToLoginTab(): void {
    this.selectedTabIndex = 0;
  }

}
