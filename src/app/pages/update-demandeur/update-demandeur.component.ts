import {Component, OnInit, ViewChild} from '@angular/core';
import {DemandeurDto} from "../../services/models/demandeur-dto";
import {DemandeurService} from "../../services/services/demandeur.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {ApiConfiguration} from "../../services/api-configuration";
import {ImageService} from "../../auth/service/image.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-update-demandeur',
  templateUrl: './update-demandeur.component.html',
  styleUrls: ['./update-demandeur.component.css']
})
export class UpdateDemandeurComponent implements OnInit {

  currentDemandeur: DemandeurDto = {adresse: "", lieudenaissance: "", sexe: "", telephone: ""}
  urlSafe: any;

  myImage!: string;
  uploadedImage!: File;
  isImageUpdated: Boolean=false;

  constructor(private demandeurService: DemandeurService, private ac: ActivatedRoute,
              private santizer: DomSanitizer, private apiUrl: ApiConfiguration, private imageService: ImageService, private router: Router) { }

  ngOnInit(): void {
    this.demandeurService.getByNin1({nin: localStorage.getItem("nin") as string}).subscribe({
      next:(data)=>{
        this.currentDemandeur = data;
        this.urlSafe = this.santizer.bypassSecurityTrustResourceUrl(this.apiUrl.rootUrl+"/api/uploads/loadfromFS/"+this.currentDemandeur.id);
        console.log(data)
      }
    })

  }

  onUpdate() {
    console.log("image "+this.uploadedImage)
      //console.log(this.currentDemandeur)
      this.demandeurService.updateDemandeur({body: this.currentDemandeur}).subscribe({
        next:(data)=>{
          if (this.uploadedImage!=undefined){
            console.log("size "+this.uploadedImage.size)
            this.imageService.uploadImageFS(this.uploadedImage,Number(this.currentDemandeur.id)).subscribe({
              next:(response)=>{
                this.router.navigate(['mes-demandes', this.currentDemandeur.id])
              },
              error:(err:any)=>{
                this.router.navigate(['mes-demandes', this.currentDemandeur.id])
              }
            })
          }
          this.router.navigate(['mes-demandes', this.currentDemandeur.id])
        },
        error:(err:any)=>{
          this.router.navigate(['mes-demandes', this.currentDemandeur.id])
        }
      })
    /*console.log(this.currentDemandeur)
    this.demandeurService.updateDemandeur({body: this.currentDemandeur}).subscribe({
      next:(data)=>{
        this.imageService.uploadImageFS(this.uploadedImage,Number(this.currentDemandeur.id)).subscribe({
          next:(response)=>{
            this.router.navigate(['mes-demandes', this.currentDemandeur.id])
          },
          error:(err:any)=>{
            this.router.navigate(['mes-demandes', this.currentDemandeur.id])
          }
        })
      },
      error:(err:any)=>{
        this.router.navigate(['mes-demandes', this.currentDemandeur.id])
      }
    })*/
  }

  onImageUpload($event: Event) {
    // @ts-ignore
    if(event.target.files && event.target.files.length) {
      // @ts-ignore
      this.uploadedImage = event.target.files[0];
      // @ts-ignore
      if (this.uploadedImage.size>2000000){
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Veuillez choisir un fichier de moins de 2Mo.",
          showConfirmButton: false,
          timer: 6000
        })

        // @ts-ignore
        document.getElementById("file").value= null;
        // @ts-ignore
        document.getElementById("fonction").value= null;
      }
      else if(!this.uploadedImage.type.includes("application/pdf") && !this.uploadedImage.type.includes("image/")){
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Veuillez choisir un fichier image ou pdf.",
          showConfirmButton: false,
          timer: 6000
        })

        // @ts-ignore
        document.getElementById("file").value= null;
        // @ts-ignore
        document.getElementById("fonction").value= null;
      }
      else{
        this.isImageUpdated =true;
        const reader = new FileReader();
        reader.readAsDataURL(this.uploadedImage);
        reader.onload = () => {
          this.myImage = reader.result as string;
        };
      }

    }
  }
}
