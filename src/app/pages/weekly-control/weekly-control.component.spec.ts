import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyControlComponent } from './weekly-control.component';

describe('WeeklyControlComponent', () => {
  let component: WeeklyControlComponent;
  let fixture: ComponentFixture<WeeklyControlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeeklyControlComponent]
    });
    fixture = TestBed.createComponent(WeeklyControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
