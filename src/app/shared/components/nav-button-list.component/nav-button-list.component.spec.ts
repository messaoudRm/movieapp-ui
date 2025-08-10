import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavButtonListComponent } from './nav-button-list.component';

describe('NavButtonListComponent', () => {
  let component: NavButtonListComponent;
  let fixture: ComponentFixture<NavButtonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavButtonListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavButtonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
