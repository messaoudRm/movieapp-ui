import {Component, inject, output, signal} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {SearchBarComponent} from '../search-bar.component/search-bar.component';
import {ThemeService} from '../../services/ThemeService';
import {Theme} from '../../../models/Theme';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-tool-bar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSlideToggle, SearchBarComponent, FormsModule],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.scss'
})
export class ToolBarComponent {
  menuClick = output<void>();
  private readonly themeService = inject(ThemeService);
  isChecked = signal(false);

  onToggle(checked: boolean) {
    this.isChecked.set(checked);
    this.changeTheme(checked ? 'dark' : 'light');
  }

  changeTheme(theme: Theme) {
    this.themeService.toggleTheme(theme);
  }

}
