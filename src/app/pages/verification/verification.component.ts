import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SendMailService} from "../../services/services/send-mail.service";
import {AttestationService} from "../../services/services/attestation.service";
import {DemandeService} from "../../services/services/demande.service";
import {DemandeDto} from "../../services/models/demande-dto";
import {DomSanitizer} from "@angular/platform-browser";
import {FileuploadService} from "../../services/services/fileupload.service";
import Swal from "sweetalert2";
import {ApiConfiguration} from "../../services/api-configuration";
import {MailService} from "../../services/services/mail.service";

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  currentDemande: DemandeDto={};
  urlSafe: any;

  loading: boolean = false;
  loadingReject: boolean = false;
  constructor(
    private ac: ActivatedRoute,
    private demandeService: DemandeService,
    private router: Router,
    private mailService: SendMailService,
    private attestationService: AttestationService,
    private santizer: DomSanitizer,
    private fileUpladService: FileuploadService,
    private apiUrl: ApiConfiguration,
    private mailServices: MailService
  ) { }

  ngOnInit(): void {

    this.demandeService.getById2({id: this.ac.snapshot.params['id']}).subscribe({
      next:(data)=>{
        this.currentDemande = data
        this.urlSafe = this.santizer.bypassSecurityTrustResourceUrl(this.apiUrl.rootUrl+"/api/uploads/loadfromFS/"+this.currentDemande.demandeurDTO?.id);
      }
    })
  }

  onApproved() {
    this.loading = true;
    this.attestationService.generate({idUser:Number(localStorage.getItem("userId")),idDemandeur:Number(this.currentDemande.demandeurDTO?.id),idDemande:Number(this.currentDemande.id),idStructure:1}).subscribe({
      next:(data)=>{
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Attestation envoyée au demandeur",
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          this.router.navigate(['admin/dashboard']);
        })
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }

  onBack() {
    this.router.navigate(['admin/dashboard'])
  }

  onRejected() {
    this.mailService.rejeted({id: this.ac.snapshot.params['id']}).subscribe({
      next:(data)=>{
        this.router.navigate(['admin/dashboard'])
      }
    })
  }

  rejectInternet(currentDemande: DemandeDto) {
    this.loadingReject = true;
    this.mailServices.sendMailRejectInterne({id: Number(currentDemande.id)}).subscribe({
      next:(data)=>{
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Demande rejetée car le demandeur est un agent de l'Etat",
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          this.router.navigate(['admin/dashboard']);
        })
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  rejectExtern(currentDemande: DemandeDto) {
    this.loadingReject = true;
    this.mailServices.sendMailRejectexterne({id: Number(currentDemande.id)}).subscribe({
      next:(data)=>{
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Demande rejetée pour non conformité des données",
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          this.router.navigate(['admin/dashboard']);
        })
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }
}
