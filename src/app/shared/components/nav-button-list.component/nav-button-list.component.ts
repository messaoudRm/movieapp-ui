import {Component, inject, OnInit} from '@angular/core';
import {MatList, MatListItem} from '@angular/material/list';
import {ActionService} from '../../services/action-service';
import {UserAction} from '../../../models/UserAction';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-button-list',
  imports: [
    MatList,
    MatListItem,
    MatIcon,
    MatButton
  ],
  templateUrl: './nav-button-list.component.html',
  styleUrl: './nav-button-list.component.scss'
})
export class NavButtonListComponent implements OnInit {

  private actionService = inject(ActionService);
  private router = inject(Router);
  protected actionList: Array<UserAction> = [];

  ngOnInit(): void {
    this.actionList = this.actionService.userActions;
  }


  navigeteTo(url: string) {
    this.router.navigate([url]);
  }
}
