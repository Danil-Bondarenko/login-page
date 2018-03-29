import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordVTokenComponent } from './reset-password-v-token.component';

describe('ResetPasswordVTokenComponent', () => {
  let component: ResetPasswordVTokenComponent;
  let fixture: ComponentFixture<ResetPasswordVTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordVTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordVTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
