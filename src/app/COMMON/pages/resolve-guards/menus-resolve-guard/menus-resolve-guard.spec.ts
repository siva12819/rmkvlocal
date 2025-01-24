import { TestBed } from '@angular/core/testing';

import { MenusResolveGuard } from './menus-resolve-guard';

describe('MenusResolveGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenusResolveGuard = TestBed.get(MenusResolveGuard);
    expect(service).toBeTruthy();
  });
});
