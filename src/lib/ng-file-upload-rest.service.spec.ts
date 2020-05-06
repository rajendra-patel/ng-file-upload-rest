import { TestBed } from '@angular/core/testing';

import { NgFileUploadRestService } from './ng-file-upload-rest.service';

describe('NgFileUploadRestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgFileUploadRestService = TestBed.get(NgFileUploadRestService);
    expect(service).toBeTruthy();
  });
});
