import { Component } from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-search-bar',
  imports: [
    MatFormField,
    MatIcon,
    MatInput,
    MatIconButton,
    MatLabel,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

}
