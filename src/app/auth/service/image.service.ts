import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {FileUploadResponse} from "../../services/models/file-upload-response";
import {ApiConfiguration} from "../../services/api-configuration";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http: HttpClient, private apiConfig: ApiConfiguration) { }

  uploadImageFS(file: File, idDemandeur : number): Observable<FileUploadResponse>{
    const imageFormData = new FormData();
    imageFormData.append('file', file);
    const url = `${this.apiConfig.rootUrl + '/api/uploads'}/${idDemandeur}`;
    return this.http.post<FileUploadResponse>(url, imageFormData);
  }

}
