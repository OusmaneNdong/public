/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DemandeDto } from '../../models/demande-dto';

export interface Annuler$Params {
  id: number;
}

export function annuler(http: HttpClient, rootUrl: string, params: Annuler$Params, context?: HttpContext): Observable<StrictHttpResponse<DemandeDto>> {
  const rb = new RequestBuilder(rootUrl, annuler.PATH, 'get');
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

annuler.PATH = '/api/demande/annuler/{id}';
