/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { download } from '../fn/fileupload/download';
import { Download$Params } from '../fn/fileupload/download';
import { downloadFiles } from '../fn/fileupload/download-files';
import { DownloadFiles$Params } from '../fn/fileupload/download-files';
import { FileUploadResponse } from '../models/file-upload-response';
import { getImageFs } from '../fn/fileupload/get-image-fs';
import { GetImageFs$Params } from '../fn/fileupload/get-image-fs';
import { loadAttestation } from '../fn/fileupload/load-attestation';
import { LoadAttestation$Params } from '../fn/fileupload/load-attestation';
import { loadAttestationByCode } from '../fn/fileupload/load-attestation-by-code';
import { LoadAttestationByCode$Params } from '../fn/fileupload/load-attestation-by-code';
import { uploadFile } from '../fn/fileupload/upload-file';
import { UploadFile$Params } from '../fn/fileupload/upload-file';

@Injectable({ providedIn: 'root' })
export class FileuploadService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `uploadFile()` */
  static readonly UploadFilePath = '/api/uploads/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadFile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadFile$Response(params: UploadFile$Params, context?: HttpContext): Observable<StrictHttpResponse<FileUploadResponse>> {
    return uploadFile(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadFile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadFile(params: UploadFile$Params, context?: HttpContext): Observable<FileUploadResponse> {
    return this.uploadFile$Response(params, context).pipe(
      map((r: StrictHttpResponse<FileUploadResponse>): FileUploadResponse => r.body)
    );
  }

  /** Path part for operation `getImageFs()` */
  static readonly GetImageFsPath = '/api/uploads/loadfromFS/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getImageFs()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImageFs$Response(params: GetImageFs$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<string>>> {
    return getImageFs(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getImageFs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getImageFs(params: GetImageFs$Params, context?: HttpContext): Observable<Array<string>> {
    return this.getImageFs$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<string>>): Array<string> => r.body)
    );
  }

  /** Path part for operation `loadAttestationByCode()` */
  static readonly LoadAttestationByCodePath = '/api/uploads/loadAttestationByCode/{code}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loadAttestationByCode()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadAttestationByCode$Response(params: LoadAttestationByCode$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<string>>> {
    return loadAttestationByCode(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loadAttestationByCode$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadAttestationByCode(params: LoadAttestationByCode$Params, context?: HttpContext): Observable<Array<string>> {
    return this.loadAttestationByCode$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<string>>): Array<string> => r.body)
    );
  }

  /** Path part for operation `loadAttestation()` */
  static readonly LoadAttestationPath = '/api/uploads/loadAttestation/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loadAttestation()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadAttestation$Response(params: LoadAttestation$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<string>>> {
    return loadAttestation(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loadAttestation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadAttestation(params: LoadAttestation$Params, context?: HttpContext): Observable<Array<string>> {
    return this.loadAttestation$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<string>>): Array<string> => r.body)
    );
  }

  /** Path part for operation `download()` */
  static readonly DownloadPath = '/api/uploads/downoad/{file}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `download()` instead.
   *
   * This method doesn't expect any request body.
   */
  download$Response(params: Download$Params, context?: HttpContext): Observable<StrictHttpResponse<Blob>> {
    return download(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `download$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  download(params: Download$Params, context?: HttpContext): Observable<Blob> {
    return this.download$Response(params, context).pipe(
      map((r: StrictHttpResponse<Blob>): Blob => r.body)
    );
  }

  /** Path part for operation `downloadFiles()` */
  static readonly DownloadFilesPath = '/api/uploads/download/{filename}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadFiles()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadFiles$Response(params: DownloadFiles$Params, context?: HttpContext): Observable<StrictHttpResponse<Blob>> {
    return downloadFiles(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `downloadFiles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadFiles(params: DownloadFiles$Params, context?: HttpContext): Observable<Blob> {
    return this.downloadFiles$Response(params, context).pipe(
      map((r: StrictHttpResponse<Blob>): Blob => r.body)
    );
  }

}
