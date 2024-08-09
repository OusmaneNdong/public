/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createNewUser } from '../fn/user-controller/create-new-user';
import { CreateNewUser$Params } from '../fn/user-controller/create-new-user';
import { createNewUser1 } from '../fn/user-controller/create-new-user-1';
import { CreateNewUser1$Params } from '../fn/user-controller/create-new-user-1';
import { findById } from '../fn/user-controller/find-by-id';
import { FindById$Params } from '../fn/user-controller/find-by-id';
import { getAllUser } from '../fn/user-controller/get-all-user';
import { GetAllUser$Params } from '../fn/user-controller/get-all-user';
import { sendMailTest } from '../fn/user-controller/send-mail-test';
import { SendMailTest$Params } from '../fn/user-controller/send-mail-test';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllUser()` */
  static readonly GetAllUserPath = '/user';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUser$Response(params?: GetAllUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<User>>> {
    return getAllUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUser(params?: GetAllUser$Params, context?: HttpContext): Observable<Array<User>> {
    return this.getAllUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<User>>): Array<User> => r.body)
    );
  }

  /** Path part for operation `createNewUser()` */
  static readonly CreateNewUserPath = '/user';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createNewUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNewUser$Response(params?: CreateNewUser$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return createNewUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createNewUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNewUser(params?: CreateNewUser$Params, context?: HttpContext): Observable<User> {
    return this.createNewUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `findById()` */
  static readonly FindByIdPath = '/user/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById$Response(params: FindById$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<string>>> {
    return findById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById(params: FindById$Params, context?: HttpContext): Observable<Array<string>> {
    return this.findById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<string>>): Array<string> => r.body)
    );
  }

  /** Path part for operation `createNewUser1()` */
  static readonly CreateNewUser1Path = '/user/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createNewUser1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNewUser1$Response(params: CreateNewUser1$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return createNewUser1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createNewUser1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNewUser1(params: CreateNewUser1$Params, context?: HttpContext): Observable<number> {
    return this.createNewUser1$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `sendMailTest()` */
  static readonly SendMailTestPath = '/user/send-test';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sendMailTest()` instead.
   *
   * This method doesn't expect any request body.
   */
  sendMailTest$Response(params?: SendMailTest$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return sendMailTest(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sendMailTest$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  sendMailTest(params?: SendMailTest$Params, context?: HttpContext): Observable<string> {
    return this.sendMailTest$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
