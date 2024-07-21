import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFirstAccessFormComponent } from './user-first-access-form.component';

describe('UserFirstAccessFormComponent', () => {
  let component: UserFirstAccessFormComponent;
  let fixture: ComponentFixture<UserFirstAccessFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFirstAccessFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserFirstAccessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
