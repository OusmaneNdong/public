import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DemandeurService} from "../../services/services/demandeur.service";
import {DemandeurDto} from "../../services/models/demandeur-dto";
import {Router} from "@angular/router";
import {UtilisateurService} from "../../services/services/utilisateur.service";
import {UtilisateurDto} from "../../services/models/utilisateur-dto";
import Swal from "sweetalert2";
import {FileuploadService} from "../../services/services/fileupload.service";
import {ImageService} from "../../auth/service/image.service";
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-add-demandeur',
  templateUrl: './add-demandeur.component.html',
  styleUrls: ['./add-demandeur.component.css']
})
export class AddDemandeurComponent implements OnInit {
  demandeurDto: DemandeurDto = {adresse: "", lieudenaissance: "", sexe: "", telephone: ""};// = new DemandeurDto();
  demandeurForm!: FormGroup;
  user: UtilisateurDto={}
  myImage!: string;
  uploadedImage!: File;
  isImageUpdated: Boolean=false;
  currentDate = new Date();
  minDate!: string; //= "2016-08-07";

  maxDate= "2024-08-15";
  constructor( private formBuilder: FormBuilder,
               private demandeurService: DemandeurService,
               private router: Router,
               private utilisateur: UtilisateurService,
               private fileService: FileuploadService,
               private imageService: ImageService
  ) { }

  ngOnInit(): void {
    let d = new Date()
    d.setFullYear(d.getFullYear() - 18)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    let year = d.getFullYear()
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    this.minDate = year+"-"+month+"-"+day
    this.getDemandeur(localStorage.getItem("nin") as string)
    this.getUtilsateut(Number(localStorage.getItem("userId")))

    this.demandeurForm = this.formBuilder.group(
      {
        prenom : ['', [Validators.required]],
        nom : ['', [Validators.required]],
        nin : ['', [Validators.required]],
        datedenaissance : ['', [Validators.required]],
        sexe : ['', [Validators.required]],
        lieudenaissance : ['', [Validators.required]],
        adresse : ['', [Validators.required]],
        fonction : ['', [Validators.required]],
        telephone : ['', [Validators.required, Validators.pattern('^\\d{9,14}$')]]
      }
    )
  }

  onCreate() {
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
      // @ts-ignore
      this.demandeurDto.nin = localStorage.getItem("nin");
      this.demandeurService.incription({'body':this.demandeurDto}).subscribe({
        next:(data)=>{
          console.log(data)
          this.imageService.uploadImageFS(this.uploadedImage,data).subscribe({
            next:(response)=>{
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Vos informations sont complètes.",
                showConfirmButton: false,
                timer: 1000
              }).then(() => {
                this.router.navigate(['mes-demandes', data])
              });
            },
            error:(err:any)=>{
              console.log(err)
            }
          })
          //this.router.navigate(['mes-demandes', data])
        },
        error:(err:any)=>{
          console.log(err)
        }
      })
    }

    // @ts-ignore
    /*this.demandeurDto.nin = localStorage.getItem("nin");
    this.demandeurService.incription({'body':this.demandeurDto}).subscribe({
      next:(data)=>{
        console.log(data)
        this.imageService.uploadImageFS(this.uploadedImage,data).subscribe({
          next:(response)=>{
            this.router.navigate(['mes-demandes', data])
          },
          error:(err:any)=>{
            console.log(err)
          }
        })
        //this.router.navigate(['mes-demandes', data])
      },
      error:(err:any)=>{
        console.log(err)
      }
    })*/
    /*console.log(this.uploadedImage)
    this.imageService.uploadImageFS(this.uploadedImage,2).subscribe({
      next:(data)=>{
        console.log(data)
      },
      error:(err:any)=>{
        console.log(err)
      }
    })*/
  }

  getDemandeur(nin:string){
    this.demandeurService.getByNin1({nin:nin}).subscribe({
      next:(data)=>{
        this.router.navigate(['mes-demandes', data.id])
      },
      error:(err: any)=>{
        this.router.navigate(['demandeur'])
    }
    })
  }

  getUtilsateut(id:number){
    this.utilisateur.getById({id:id}).subscribe({
      next:(data)=>{
        this.user = data;
      }
    })
  }

  onImageUpload($event: Event) {
    // @ts-ignore
    if(event.target.files && event.target.files.length) {

      // @ts-ignore
      this.uploadedImage = event.target.files[0];
      console.log(this.uploadedImage)
      this.isImageUpdated =true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => {
        this.myImage = reader.result as string;
      };
    }
  }

}
