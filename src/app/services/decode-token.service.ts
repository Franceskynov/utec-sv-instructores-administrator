import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class DecodeTokenService {

  constructor() { }

  public decodePayload(): any {
    const token = 'token';
    const helper = new JwtHelperService();
    if (localStorage.getItem(token)) {
      return  helper.decodeToken(
        localStorage.getItem(token)
      );
    } else {
      return {
        iss: null,
        iat: null,
        exp: null,
        nbf: null,
        jti: null,
        sub: null,
        prv: null,
        role: null,
        is_admin: null,
        descrpcn: null,
        username: null,
        email: null,
        people: null
      };
    }
  }
}
