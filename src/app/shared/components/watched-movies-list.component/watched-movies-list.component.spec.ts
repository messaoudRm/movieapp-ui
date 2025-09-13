import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchedMoviesListComponent } from './watched-movies-list.component';

describe('WatchedMoviesListComponent', () => {
  let component: WatchedMoviesListComponent;
  let fixture: ComponentFixture<WatchedMoviesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchedMoviesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchedMoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
