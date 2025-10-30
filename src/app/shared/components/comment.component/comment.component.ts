import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  MatCard,
  MatCardContent,
} from '@angular/material/card';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {DatePipe} from '@angular/common';
import { Comment } from '../../../models/Comment';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-comment',
  imports: [
    MatCardContent,
    MatChip,
    DatePipe,
    MatCard,
    MatChipSet,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {

  @Input() comment!: Comment;
  @Input() showDelete = false;
  @Output() delete = new EventEmitter<number>();

  onDeleteClick(): void {
    this.delete.emit(this.comment.id);
  }

}
