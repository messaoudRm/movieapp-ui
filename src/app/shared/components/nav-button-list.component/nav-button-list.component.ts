import { Component } from '@angular/core';
import {MatList, MatListItem} from '@angular/material/list';

@Component({
  selector: 'app-nav-button-list',
  imports: [
    MatList,
    MatListItem
  ],
  templateUrl: './nav-button-list.component.html',
  styleUrl: './nav-button-list.component.scss'
})
export class NavButtonListComponent {

}
