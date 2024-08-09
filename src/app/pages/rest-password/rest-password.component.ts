import { Component, OnInit } from '@angular/core';
import {EmailRequest} from "../../services/models/email-request";
import {UtilisateurService} from "../../services/services/utilisateur.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-rest-password',
  templateUrl: './rest-password.component.html',
  styleUrls: ['./rest-password.component.css']
})
export class RestPasswordComponent implements OnInit {

  email: EmailRequest = {}
  err: number | undefined;
  constructor(private auth: UtilisateurService, private router: Router) { }

  ngOnInit(): void {
  }

  onReset() {
    console.log(this.email)
    this.auth.resetPasswordRequest({body: this.email}).subscribe({
      next:(data)=>{
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Un mail vous a été envoyé vous avez 15 mn avant que le token expire ! ",
          showConfirmButton: false,
          timer: 1000
        }).then(() => {
          this.router.navigate(['/connexion']);

        });
      },
      error:(err:any)=>{
        if (err.error.errorMessage==='EMAIL_NOT_EXIT'){
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Cet email n'exite pas dans notre base de donnée.",
            showConfirmButton: false,
            timer: 6000
          }).then(() => {
            this.router.navigate(['/connexion']);

          });
        }
      }
    })
  }

  onBack() {
    this.router.navigate(['connexion'])
  }
}
