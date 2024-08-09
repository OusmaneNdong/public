/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface Generate$Params {
  idUser: number;
  idDemandeur: number;
  idDemande: number;
  idStructure: number;
}

export function generate(http: HttpClient, rootUrl: string, params: Generate$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
  const rb = new RequestBuilder(rootUrl, generate.PATH, 'get');
  if (params) {
    rb.query('idUser', params.idUser, {});
    rb.query('idDemandeur', params.idDemandeur, {});
    rb.query('idDemande', params.idDemande, {});
    rb.query('idStructure', params.idStructure, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
    })
  );
}

generate.PATH = '/api/attestation/pdf_genere';
