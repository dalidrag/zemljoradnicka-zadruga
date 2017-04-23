/***********************************************************/
import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { AuthService }      from '../deljeno/auth.service';
/***********************************************************/

/**
 * Ovu klasu koristi ruter da odluci sme li korisnik
 * da udje u aplikacuju zavisno od toga da li je ulogovan
 *
 * @class AuthGuard
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.userId) { return true; }
    else {
      // Naviguj na pocetnu stranicu
      this.router.navigate(['pocetna-strana']);
      return false;
    }
  }
}
