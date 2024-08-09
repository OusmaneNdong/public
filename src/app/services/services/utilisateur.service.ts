/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { authentication } from '../fn/utilisateur/authentication';
import { Authentication$Params } from '../fn/utilisateur/authentication';
import { AuthenticationResponse } from '../models/authentication-response';
import { changePassword } from '../fn/utilisateur/change-password';
import { ChangePassword$Params } from '../fn/utilisateur/change-password';
import { changePasswordTest } from '../fn/utilisateur/change-password-test';
import { ChangePasswordTest$Params } from '../fn/utilisateur/change-password-test';
import { findAll } from '../fn/utilisateur/find-all';
import { FindAll$Params } from '../fn/utilisateur/find-all';
import { getById } from '../fn/utilisateur/get-by-id';
import { GetById$Params } from '../fn/utilisateur/get-by-id';
import { getByNin } from '../fn/utilisateur/get-by-nin';
import { GetByNin$Params } from '../fn/utilisateur/get-by-nin';
import { registration } from '../fn/utilisateur/registration';
import { Registration$Params } from '../fn/utilisateur/registration';
import { resetPasswordRequest } from '../fn/utilisateur/reset-password-request';
import { ResetPasswordRequest$Params } from '../fn/utilisateur/reset-password-request';
import { UtilisateurDto } from '../models/utilisateur-dto';

@Injectable({ providedIn: 'root' })
export class UtilisateurService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `changePasswordTest()` */
  static readonly ChangePasswordTestPath = '/api/utilisateur/reset-password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changePasswordTest()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePasswordTest$Response(params: ChangePasswordTest$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return changePasswordTest(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changePasswordTest$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePasswordTest(params: ChangePasswordTest$Params, context?: HttpContext): Observable<number> {
    return this.changePasswordTest$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `registration()` */
  static readonly RegistrationPath = '/api/utilisateur/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registration()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registration$Response(params: Registration$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>> {
    return registration(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registration$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registration(params: Registration$Params, context?: HttpContext): Observable<AuthenticationResponse> {
    return this.registration$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthenticationResponse>): AuthenticationResponse => r.body)
    );
  }

  /** Path part for operation `resetPasswordRequest()` */
  static readonly ResetPasswordRequestPath = '/api/utilisateur/password-reset-request';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resetPasswordRequest()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  resetPasswordRequest$Response(params: ResetPasswordRequest$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return resetPasswordRequest(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `resetPasswordRequest$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  resetPasswordRequest(params: ResetPasswordRequest$Params, context?: HttpContext): Observable<number> {
    return this.resetPasswordRequest$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `changePassword()` */
  static readonly ChangePasswordPath = '/api/utilisateur/change-password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changePassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePassword$Response(params: ChangePassword$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return changePassword(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changePassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changePassword(params: ChangePassword$Params, context?: HttpContext): Observable<number> {
    return this.changePassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `authentication()` */
  static readonly AuthenticationPath = '/api/utilisateur/authentication';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authentication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authentication$Response(params: Authentication$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthenticationResponse>> {
    return authentication(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authentication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authentication(params: Authentication$Params, context?: HttpContext): Observable<AuthenticationResponse> {
    return this.authentication$Response(params, context).pipe(
      map((r: StrictHttpResponse<AuthenticationResponse>): AuthenticationResponse => r.body)
    );
  }

  /** Path part for operation `getById()` */
  static readonly GetByIdPath = '/api/utilisateur/utilisateurDetails/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById$Response(params: GetById$Params, context?: HttpContext): Observable<StrictHttpResponse<UtilisateurDto>> {
    return getById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById(params: GetById$Params, context?: HttpContext): Observable<UtilisateurDto> {
    return this.getById$Response(params, context).pipe(
      map((r: StrictHttpResponse<UtilisateurDto>): UtilisateurDto => r.body)
    );
  }

  /** Path part for operation `getByNin()` */
  static readonly GetByNinPath = '/api/utilisateur/nin/{nin}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getByNin()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByNin$Response(params: GetByNin$Params, context?: HttpContext): Observable<StrictHttpResponse<UtilisateurDto>> {
    return getByNin(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getByNin$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByNin(params: GetByNin$Params, context?: HttpContext): Observable<UtilisateurDto> {
    return this.getByNin$Response(params, context).pipe(
      map((r: StrictHttpResponse<UtilisateurDto>): UtilisateurDto => r.body)
    );
  }

  /** Path part for operation `findAll()` */
  static readonly FindAllPath = '/api/utilisateur/getUtilisateur';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll$Response(params?: FindAll$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UtilisateurDto>>> {
    return findAll(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll(params?: FindAll$Params, context?: HttpContext): Observable<Array<UtilisateurDto>> {
    return this.findAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UtilisateurDto>>): Array<UtilisateurDto> => r.body)
    );
  }

}
