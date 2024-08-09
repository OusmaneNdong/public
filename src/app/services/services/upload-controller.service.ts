/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createNewUser2 } from '../fn/upload-controller/create-new-user-2';
import { CreateNewUser2$Params } from '../fn/upload-controller/create-new-user-2';
import { findById1 } from '../fn/upload-controller/find-by-id-1';
import { FindById1$Params } from '../fn/upload-controller/find-by-id-1';
import { getAllUser1 } from '../fn/upload-controller/get-all-user-1';
import { GetAllUser1$Params } from '../fn/upload-controller/get-all-user-1';
import { Upload } from '../models/upload';

@Injectable({ providedIn: 'root' })
export class UploadControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllUser1()` */
  static readonly GetAllUser1Path = '/upload';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUser1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUser1$Response(params?: GetAllUser1$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Upload>>> {
    return getAllUser1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUser1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUser1(params?: GetAllUser1$Params, context?: HttpContext): Observable<Array<Upload>> {
    return this.getAllUser1$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Upload>>): Array<Upload> => r.body)
    );
  }

  /** Path part for operation `createNewUser2()` */
  static readonly CreateNewUser2Path = '/upload';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createNewUser2()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNewUser2$Response(params?: CreateNewUser2$Params, context?: HttpContext): Observable<StrictHttpResponse<Upload>> {
    return createNewUser2(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createNewUser2$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNewUser2(params?: CreateNewUser2$Params, context?: HttpContext): Observable<Upload> {
    return this.createNewUser2$Response(params, context).pipe(
      map((r: StrictHttpResponse<Upload>): Upload => r.body)
    );
  }

  /** Path part for operation `findById1()` */
  static readonly FindById1Path = '/upload/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findById1()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById1$Response(params: FindById1$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<string>>> {
    return findById1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findById1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findById1(params: FindById1$Params, context?: HttpContext): Observable<Array<string>> {
    return this.findById1$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<string>>): Array<string> => r.body)
    );
  }

}
