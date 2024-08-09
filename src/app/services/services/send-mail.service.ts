/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { rejeted } from '../fn/send-mail/rejeted';
import { Rejeted$Params } from '../fn/send-mail/rejeted';

@Injectable({ providedIn: 'root' })
export class SendMailService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `rejeted()` */
  static readonly RejetedPath = '/api/mail/mail_rejete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `rejeted()` instead.
   *
   * This method doesn't expect any request body.
   */
  rejeted$Response(params: Rejeted$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return rejeted(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `rejeted$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  rejeted(params: Rejeted$Params, context?: HttpContext): Observable<number> {
    return this.rejeted$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

}
