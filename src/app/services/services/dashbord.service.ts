/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { DemandeDto } from '../models/demande-dto';
import { getAppouved } from '../fn/dashbord/get-appouved';
import { GetAppouved$Params } from '../fn/dashbord/get-appouved';
import { getCount } from '../fn/dashbord/get-count';
import { GetCount$Params } from '../fn/dashbord/get-count';
import { getCours } from '../fn/dashbord/get-cours';
import { GetCours$Params } from '../fn/dashbord/get-cours';
import { getDemandeAppouved } from '../fn/dashbord/get-demande-appouved';
import { GetDemandeAppouved$Params } from '../fn/dashbord/get-demande-appouved';
import { getdemandeCount } from '../fn/dashbord/getdemande-count';
import { GetdemandeCount$Params } from '../fn/dashbord/getdemande-count';
import { getdemandeCours } from '../fn/dashbord/getdemande-cours';
import { GetdemandeCours$Params } from '../fn/dashbord/getdemande-cours';
import { getDemandeRejected } from '../fn/dashbord/get-demande-rejected';
import { GetDemandeRejected$Params } from '../fn/dashbord/get-demande-rejected';
import { getRejected } from '../fn/dashbord/get-rejected';
import { GetRejected$Params } from '../fn/dashbord/get-rejected';

@Injectable({ providedIn: 'root' })
export class DashbordService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getCount()` */
  static readonly GetCountPath = '/api/dashbord/total';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCount$Response(params?: GetCount$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return getCount(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCount(params?: GetCount$Params, context?: HttpContext): Observable<number> {
    return this.getCount$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getRejected()` */
  static readonly GetRejectedPath = '/api/dashbord/total-rejetees';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRejected()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRejected$Response(params?: GetRejected$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return getRejected(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getRejected$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRejected(params?: GetRejected$Params, context?: HttpContext): Observable<number> {
    return this.getRejected$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getCours()` */
  static readonly GetCoursPath = '/api/dashbord/total-cours';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCours()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCours$Response(params?: GetCours$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return getCours(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCours$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCours(params?: GetCours$Params, context?: HttpContext): Observable<number> {
    return this.getCours$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getAppouved()` */
  static readonly GetAppouvedPath = '/api/dashbord/total-approuvees';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAppouved()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAppouved$Response(params?: GetAppouved$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return getAppouved(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAppouved$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAppouved(params?: GetAppouved$Params, context?: HttpContext): Observable<number> {
    return this.getAppouved$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getdemandeCount()` */
  static readonly GetdemandeCountPath = '/api/dashbord/demande/total';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getdemandeCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  getdemandeCount$Response(params?: GetdemandeCount$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<DemandeDto>>> {
    return getdemandeCount(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getdemandeCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getdemandeCount(params?: GetdemandeCount$Params, context?: HttpContext): Observable<Array<DemandeDto>> {
    return this.getdemandeCount$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<DemandeDto>>): Array<DemandeDto> => r.body)
    );
  }

  /** Path part for operation `getDemandeRejected()` */
  static readonly GetDemandeRejectedPath = '/api/dashbord/demande/total-rejetees';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDemandeRejected()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDemandeRejected$Response(params?: GetDemandeRejected$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<DemandeDto>>> {
    return getDemandeRejected(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getDemandeRejected$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDemandeRejected(params?: GetDemandeRejected$Params, context?: HttpContext): Observable<Array<DemandeDto>> {
    return this.getDemandeRejected$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<DemandeDto>>): Array<DemandeDto> => r.body)
    );
  }

  /** Path part for operation `getdemandeCours()` */
  static readonly GetdemandeCoursPath = '/api/dashbord/demande/total-cours';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getdemandeCours()` instead.
   *
   * This method doesn't expect any request body.
   */
  getdemandeCours$Response(params?: GetdemandeCours$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<DemandeDto>>> {
    return getdemandeCours(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getdemandeCours$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getdemandeCours(params?: GetdemandeCours$Params, context?: HttpContext): Observable<Array<DemandeDto>> {
    return this.getdemandeCours$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<DemandeDto>>): Array<DemandeDto> => r.body)
    );
  }

  /** Path part for operation `getDemandeAppouved()` */
  static readonly GetDemandeAppouvedPath = '/api/dashbord/demande/total-approuvees';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDemandeAppouved()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDemandeAppouved$Response(params?: GetDemandeAppouved$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<DemandeDto>>> {
    return getDemandeAppouved(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getDemandeAppouved$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDemandeAppouved(params?: GetDemandeAppouved$Params, context?: HttpContext): Observable<Array<DemandeDto>> {
    return this.getDemandeAppouved$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<DemandeDto>>): Array<DemandeDto> => r.body)
    );
  }

}
