import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DecodeTokenService } from 'app/services/decode-token.service';
import {environment} from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, OnInit {

  public token: any;
  constructor(
    private decodeToken: DecodeTokenService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.token = {
      role: null
    };
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.token = this.decodeToken.decodePayload();

    if (!environment.production) {
      return true;
    }

    if (this.token.role === next.data.role) {
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }
}
