/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { sendEmail } from '../fn/notif/send-email';
import { SendEmail$Params } from '../fn/notif/send-email';

@Injectable({ providedIn: 'root' })
export class NotifService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `sendEmail()` */
  static readonly SendEmailPath = '/api/mail';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sendEmail()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sendEmail$Response(params: SendEmail$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return sendEmail(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sendEmail$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sendEmail(params: SendEmail$Params, context?: HttpContext): Observable<string> {
    return this.sendEmail$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
