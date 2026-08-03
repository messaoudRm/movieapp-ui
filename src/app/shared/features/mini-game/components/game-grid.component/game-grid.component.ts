import { Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { GameState } from '../../models/gameState';
import { GameConnectionService } from '../../services/game-connection-service';

@Component({
  selector: 'app-game-grid',
  imports: [
    MatButton,
    MatChip,
    MatChipSet
  ],
  templateUrl: './game-grid.component.html',
  styleUrl: './game-grid.component.scss'
})
export class GameGridComponent implements OnInit, OnDestroy {

  private gameConnection = inject(GameConnectionService);

  private destroy$ = new Subject<void>();
  protected state: GameState | null = null;
  protected readonly cellSize = 30;

  ngOnInit(): void {
    this.gameConnection.connect();

    this.gameConnection.getState()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: state => {
          this.state = state;
        },
        error: err => {
          console.error('Failed to receive game state', err);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.gameConnection.disconnect();
  }

  protected toPixelsX(position: { y: number }): number {
    return position.y * this.cellSize;
  }

  protected toPixelsY(position: { x: number }): number {
    return position.x * this.cellSize;
  }

  protected restart(): void {
    this.gameConnection.restartGame();
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const key = event.key.toLowerCase();

    if (['d', 'q', 'z', 's'].includes(key)) {
      event.preventDefault();
      this.gameConnection.sendKey(key);
    }
  }
}
