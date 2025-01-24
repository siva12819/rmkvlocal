import { TestBed, inject, waitForAsync } from "@angular/core/testing";

import { AuthendicationGuard } from "./authendication-guard.guard";

describe("AuthendicationGuardGuard", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthendicationGuard]
    });
  });

  it("should ...", inject(
    [AuthendicationGuard],
    (guard: AuthendicationGuard) => {
      expect(guard).toBeTruthy();
    }
  ));
});
