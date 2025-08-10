import {Component, signal} from '@angular/core';
import {ToolBarComponent} from '../tool-bar.component/tool-bar.component';
import {SideNavComponent} from '../side-nav.component/side-nav.component';

@Component({
  selector: 'app-nav-frame',
  imports: [
    ToolBarComponent,
    SideNavComponent
  ],
  templateUrl: './nav-frame.component.html',
  styleUrl: './nav-frame.component.scss'
})
export class NavFrameComponent {
  showFiller = signal(false);

  toggleFiller() {
    this.showFiller.set(!this.showFiller());
  }

}
