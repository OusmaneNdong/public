/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DemandeDto } from '../../models/demande-dto';

export interface GetById2$Params {
  id: number;
}

export function getById2(http: HttpClient, rootUrl: string, params: GetById2$Params, context?: HttpContext): Observable<StrictHttpResponse<DemandeDto>> {
  const rb = new RequestBuilder(rootUrl, getById2.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<DemandeDto>;
    })
  );
}

getById2.PATH = '/api/demande/demandeDetails/{id}';
