import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabGroupAuthComponent } from './tab-group-auth.component';

describe('TabGroupAuthComponent', () => {
  let component: TabGroupAuthComponent;
  let fixture: ComponentFixture<TabGroupAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabGroupAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabGroupAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
