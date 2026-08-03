import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class GameLauncherService {
  private dialog = inject(MatDialog);

  async open(): Promise<void> {
    // Lazy loaded : chargé seulement à l'ouverture, pas au démarrage de l'app
    const { GameDialogComponent } = await import('../components/game-dialog.component/game-dialog.component');

    this.dialog.open(GameDialogComponent, {
      autoFocus: false,
    });
  }
}
