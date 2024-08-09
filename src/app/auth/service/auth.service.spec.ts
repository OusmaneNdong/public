import { TestBed } from '@angular/core/testing';
import { UtilisateurService } from 'src/app/services/services';

describe('AuthService', () => {
  let service: UtilisateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilisateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
