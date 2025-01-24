import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChildMenuItemsComponent } from './child-menu-items.component';

describe('ChildMenuItemsComponent', () => {
  let component: ChildMenuItemsComponent;
  let fixture: ComponentFixture<ChildMenuItemsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildMenuItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildMenuItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
