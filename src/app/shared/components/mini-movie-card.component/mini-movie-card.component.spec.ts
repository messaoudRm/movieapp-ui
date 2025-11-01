import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniMovieCardComponent } from './mini-movie-card.component';

describe('MiniMovieCardComponent', () => {
  let component: MiniMovieCardComponent;
  let fixture: ComponentFixture<MiniMovieCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniMovieCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniMovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
