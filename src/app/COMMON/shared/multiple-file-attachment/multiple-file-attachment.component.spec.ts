import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleFileAttachmentComponent } from './multiple-file-attachment.component';

describe('MultipleFileAttachmentComponent', () => {
  let component: MultipleFileAttachmentComponent;
  let fixture: ComponentFixture<MultipleFileAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleFileAttachmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleFileAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
