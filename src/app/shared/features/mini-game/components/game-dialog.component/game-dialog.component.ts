import { Component } from '@angular/core';
import { MatDialogClose } from '@angular/material/dialog';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { GameGridComponent } from '../game-grid.component/game-grid.component';

@Component({
  selector: 'app-game-dialog',
  imports: [
    MatCard,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatDialogClose,
    GameGridComponent
  ],
  templateUrl: './game-dialog.component.html',
  styleUrl: './game-dialog.component.scss'
})
export class GameDialogComponent {
}
