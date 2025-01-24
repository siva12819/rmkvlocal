import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfirmationDeleteComponent } from './confirmation-delete.component';

describe('ConfirmationDeleteComponent', () => {
  let component: ConfirmationDeleteComponent;
  let fixture: ComponentFixture<ConfirmationDeleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
