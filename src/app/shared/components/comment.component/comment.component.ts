import {Component, Input} from '@angular/core';
import {
  MatCard,
  MatCardContent,
} from '@angular/material/card';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {DatePipe} from '@angular/common';
import { Comment } from '../../../models/Comment';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-comment',
  imports: [
    MatCardContent,
    MatChip,
    DatePipe,
    MatCard,
    MatChipSet,
    MatIcon,
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {

  @Input() comment!: Comment;

}
