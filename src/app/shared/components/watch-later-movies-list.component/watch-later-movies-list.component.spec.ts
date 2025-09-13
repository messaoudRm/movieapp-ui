import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchLaterMoviesListComponent } from './watch-later-movies-list.component';

describe('WatchLaterMoviesListComponent', () => {
  let component: WatchLaterMoviesListComponent;
  let fixture: ComponentFixture<WatchLaterMoviesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchLaterMoviesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchLaterMoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
