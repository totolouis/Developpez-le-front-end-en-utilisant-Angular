import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { olympicResolver } from './olympic.resolver';

describe('olympicResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => olympicResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
