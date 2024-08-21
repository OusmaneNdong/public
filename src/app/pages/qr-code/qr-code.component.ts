import { Component, OnInit } from '@angular/core';
import {DemandeDto} from "../../services/models/demande-dto";
import {ActivatedRoute, Router} from "@angular/router";
import {DemandeService} from "../../services/services/demande.service";
import {ApiConfiguration} from "../../services/api-configuration";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {

  currentDemande: DemandeDto={};

  urlSafe: any
  constructor(
    private ac: ActivatedRoute,
    private demandeService: DemandeService,
    private apiUrl: ApiConfiguration,
    private santizer: DomSanitizer

  ) { }

  ngOnInit(): void {
    console.log(this.ac.snapshot.params['code'])
    console.log(this.ac.snapshot.params['code'])
    this.demandeService.getByQrCode({code: this.ac.snapshot.params['code']}).subscribe({
      next:(data)=>{
        this.currentDemande = data
        
      }
    })
    this.urlSafe = this.santizer.bypassSecurityTrustResourceUrl(  this.apiUrl.rootUrl +"/api/uploads/loadAttestationByCode/"+this.ac.snapshot.params['code']);
  }

}
