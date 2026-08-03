import { Component, inject } from '@angular/core';
import { GameLauncherService } from '../../features/mini-game/services/game-launcher-service';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  private gameLauncher = inject(GameLauncherService);

  openGame(): void {
    this.gameLauncher.open().catch(err => {
      console.error('Failed to open game', err);
    });
  }
}
