import { TestBed } from '@angular/core/testing';

import { GenericUserMoviesService } from './generic-user-movies-service';

describe('GenericUserMoviesService', () => {
  let service: GenericUserMoviesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericUserMoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
