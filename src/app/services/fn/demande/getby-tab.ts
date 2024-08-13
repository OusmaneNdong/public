/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DemandeDto } from '../../models/demande-dto';

export interface GetbyTab$Params {
  id: number;
}

export function getbyTab(http: HttpClient, rootUrl: string, params: GetbyTab$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: Array<DemandeDto>;
}>> {
  const rb = new RequestBuilder(rootUrl, getbyTab.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      [key: string]: Array<DemandeDto>;
      }>;
    })
  );
}

getbyTab.PATH = '/api/demande/demandebytab/{id}';
