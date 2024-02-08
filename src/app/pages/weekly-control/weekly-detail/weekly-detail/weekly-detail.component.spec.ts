import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyDetailComponent } from './weekly-detail.component';

describe('WeeklyDetailComponent', () => {
  let component: WeeklyDetailComponent;
  let fixture: ComponentFixture<WeeklyDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeeklyDetailComponent]
    });
    fixture = TestBed.createComponent(WeeklyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
