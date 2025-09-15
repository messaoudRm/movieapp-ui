import { Component } from '@angular/core';
import {NavFrameComponent} from './shared/components/nav-frame.component/nav-frame.component';

@Component({
  selector: 'app-root',
  imports: [NavFrameComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'movieapp-ui';
}
