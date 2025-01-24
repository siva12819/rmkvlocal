import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServerDownComponent } from './server-down.component';

describe('ServerDownComponent', () => {
  let component: ServerDownComponent;
  let fixture: ComponentFixture<ServerDownComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
