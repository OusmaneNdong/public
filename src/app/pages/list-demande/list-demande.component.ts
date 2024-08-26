import { Component, OnInit } from '@angular/core';
import {DemandeService} from "../../services/services/demande.service";
import {DemandeDto} from "../../services/models/demande-dto";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {FileuploadService} from "../../services/services/fileupload.service";
import {HttpEvent, HttpEventType} from "@angular/common/http";
import {saveAs} from "file-saver";
import Swal from "sweetalert2";

//import saveAs from 'file-saver';

@Component({
  selector: 'app-list-demande',
  templateUrl: './list-demande.component.html',
  styleUrls: ['./list-demande.component.css']
})
export class ListDemandeComponent implements OnInit {

  demandes: DemandeDto[]=[];
  fileStatus = { status: '', requestType: '', percent: 0 };
  filenames: string[] = [];
  id!: number;

  dec!: DemandeDto[];
  dr!: DemandeDto[];
  da!: DemandeDto[];

  visible!: boolean;
  url!: string;
  constructor(private demandeService: DemandeService, private ac: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    this.id = this.ac.snapshot.params['id'];
    this.getDemandes(this.id);
    this.getDemandeTab(this.id);
    console.log(this.getDemandeTab(this.id));
    
    this.eligible();
  }

  getDemandes(id:number){
    this.demandeService.findByDemandeurId({"id": id}).subscribe({
      next:(data)=>{
        this.demandes = data;
      }
    })
  }

  getDemandeTab(id:number){
    this.demandeService.getbyTab({"id": id}).subscribe({
      next:(data)=>{
        this.dec = data["DEC"];
        this.da = data["DA"];
        this.dr = data["DR"];
        //console.log(this.da)
      }
    })
  }

  upload(id: number | undefined) {
    this.router.navigate(['visualiser', id]);
  }

  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch(httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        } else {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
            {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
        }
        this.fileStatus.status = 'done';
        break;
      default:
        console.log(httpEvent);
        break;

    }
  }

  private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }
  

  onMakeDemande(event: any) {
    this.demandeService.demander({"id": this.ac.snapshot.params['id']}).subscribe({
      next:(data)=>{
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Votre demande est prise en charge...",
          showConfirmButton: false,
          timer: 2000
        })
        this.getDemandes(this.id);
        this.getDemandeTab(this.ac.snapshot.params['id']);
        this.visible = true;

      }
    })
  }
  myFunction() {
    confirm("Souhaitez-vous éffectuer une demande ?");
  }

  eligible(){
    this.demandeService.eligible({id: this.ac.snapshot.params['id']}).subscribe({
      next:(data)=>{
        this.visible = data;
      }
    })
  }

  onDelete(id: number| undefined) {
    const btn = document.getElementById('btn') as HTMLButtonElement | null
    btn?.removeAttribute('disabled')

    console.log("ok")
    this.demandeService.annuler({id: Number(id)}).subscribe({
      next:(data)=>{
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Votre demande est annulée.",
          showConfirmButton: false,
          timer: 2000
        })
        this.visible = true;
        this.getDemandeTab(this.ac.snapshot.params['id']);
      }
    })
    //this.getDemandeTab(id)
  }
}
