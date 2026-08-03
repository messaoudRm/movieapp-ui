import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import { GameState } from '../models/gameState';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameConnectionService {
  private client: Client | null = null;
  private state$ = new Subject<GameState>();

  connect(): void {
    if (this.client) {
      return;
    }

    this.client = new Client({
      brokerURL: `${environment.miniGameApiUrl}/game-ws`,
      onConnect: () => {
        this.client?.subscribe('/topic/game-state', (message) => {
          this.state$.next(JSON.parse(message.body) as GameState);
        });
        this.restartGame();
      },
    });
    this.client.activate();
  }

  disconnect(): void {
    this.client?.deactivate();
    this.client = null;
  }

  sendKey(key: string): void {
    this.client?.publish({ destination: '/app/input', body: key });
  }

  restartGame(): void {
    this.client?.publish({ destination: '/app/restart', body: '' });
  }

  getState(): Observable<GameState> {
    return this.state$.asObservable();
  }
}
