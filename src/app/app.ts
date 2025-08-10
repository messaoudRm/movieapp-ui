import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ToolBarComponent} from './shared/components/tool-bar.component/tool-bar.component';
import {SideNavComponent} from './shared/components/side-nav.component/side-nav.component';
import {SearchBarComponent} from './shared/components/search-bar.component/search-bar.component';
import {NavFrameComponent} from './shared/components/nav-frame.component/nav-frame.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolBarComponent, SideNavComponent, SearchBarComponent, NavFrameComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'movieapp-ui';
}
