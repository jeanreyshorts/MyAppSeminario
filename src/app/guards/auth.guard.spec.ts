import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

import { authGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: authGuard;
  let storageSpy: jasmine.SpyObj<Storage>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const storageMock = jasmine.createSpyObj('Storage', ['get']);
    const routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      providers: [
        authGuard,
        { provide: Storage, useValue: storageMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(authGuard);
    storageSpy = TestBed.inject(Storage) as jasmine.SpyObj<Storage>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if user exists', async () => {
    storageSpy.get.and.returnValue(Promise.resolve({ email: 'test@example.com' }));
    const result = await guard.canActivate();
    expect(result).toBeTrue();
  });

  it('should block activation and navigate to login if no user', async () => {
    storageSpy.get.and.returnValue(Promise.resolve(null));
    const result = await guard.canActivate();
    expect(result).toBeFalse();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/login', { replaceUrl: true });
  });
});
