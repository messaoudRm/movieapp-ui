import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCommentListComponent } from './user-comment-list.component';

describe('UserCommentListComponent', () => {
  let component: UserCommentListComponent;
  let fixture: ComponentFixture<UserCommentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCommentListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
