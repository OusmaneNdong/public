/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { generatedAttestationNumber } from '../fn/certification/generated-attestation-number';
import { GeneratedAttestationNumber$Params } from '../fn/certification/generated-attestation-number';

@Injectable({ providedIn: 'root' })
export class CertificationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `generatedAttestationNumber()` */
  static readonly GeneratedAttestationNumberPath = '/api/certification/generatedAttestation/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `generatedAttestationNumber()` instead.
   *
   * This method doesn't expect any request body.
   */
  generatedAttestationNumber$Response(params: GeneratedAttestationNumber$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return generatedAttestationNumber(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `generatedAttestationNumber$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  generatedAttestationNumber(params: GeneratedAttestationNumber$Params, context?: HttpContext): Observable<string> {
    return this.generatedAttestationNumber$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
