import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgFileUploadRestComponent } from './ng-file-upload-rest.component';

describe('NgFileUploadRestComponent', () => {
  let component: NgFileUploadRestComponent;
  let fixture: ComponentFixture<NgFileUploadRestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgFileUploadRestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgFileUploadRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
