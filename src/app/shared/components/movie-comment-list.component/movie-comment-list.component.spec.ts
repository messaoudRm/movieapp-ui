import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCommentListComponent } from './movie-comment-list.component';

describe('MovieCommentListComponent', () => {
  let component: MovieCommentListComponent;
  let fixture: ComponentFixture<MovieCommentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCommentListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
