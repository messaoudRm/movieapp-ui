import { TestBed } from '@angular/core/testing';

import { WatchLaterMoviesService } from './watch-later-movies-service';

describe('WatchLaterMoviesService', () => {
  let service: WatchLaterMoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatchLaterMoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
