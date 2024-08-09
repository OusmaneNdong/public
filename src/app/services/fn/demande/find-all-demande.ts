/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DemandeDto } from '../../models/demande-dto';

export interface FindAllDemande$Params {
  statut: string;
}

export function findAllDemande(http: HttpClient, rootUrl: string, params: FindAllDemande$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<DemandeDto>>> {
  const rb = new RequestBuilder(rootUrl, findAllDemande.PATH, 'get');
  if (params) {
    rb.path('statut', params.statut, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<DemandeDto>>;
    })
  );
}

findAllDemande.PATH = '/api/demande/getStatut/{statut}';
