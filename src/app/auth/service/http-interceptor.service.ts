import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.url.includes('/authentication') || !req.url.includes('/register') || !req.url.includes('/loadAttestationByCode') || !req.url.includes('/forget-password') || !req.url.includes('/password-reset-request') || !req.url.includes('/reset-password')) {
      const token = localStorage.getItem('token');
      if (token) {
        // assigner le token;
        const authReq = req.clone({
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token
          })
        });
        return next.handle(authReq);
      }
    }
    return next.handle(req);
  }
  //"/users/register/**", "/users/verifyEmail/**"
  /*constructor(private authService : AuthService) {}
  exclude_array : string[] = ['/inscription','/connexion','/verifyEmail'];
  toExclude(url :string)
  {
    var length = this.exclude_array.length;
    for(var i = 0; i < length; i++) {
      if (url.search(this.exclude_array[i]) != -1)
        return true;
    }
    return false;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const toExclude = "/login";
//tester s'il sagit de login, on n'ajoute pas le header Authorization //puisqu'on a pas encode de JWT (il est null)
    if(!this.toExclude(request.url)){
      let jwt = this.authService.getToken();
      let reqWithToken = request.clone( {
        setHeaders: { Authorization : "Bearer "+jwt}
      })
      return next.handle(reqWithToken);
    }
    return next.handle(request);
  }*/

}
