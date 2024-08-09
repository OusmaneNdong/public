import { Component, OnInit } from '@angular/core';
import {PasswordRequest} from "../../services/models/password-request";
import {UtilisateurService} from "../../services/services/utilisateur.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {AuthService} from "../../auth/service/auth.service";
import {authentication} from "../../services/fn/utilisateur/authentication";
import {DemandeurService} from "../../services/services/demandeur.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePassword: PasswordRequest = {}
  err!: number;
  constructor(private auth: UtilisateurService, private router: Router, private authentication: AuthService, private demandeurService: DemandeurService) { }

  ngOnInit(): void {
    // @ts-ignore
    //this.changePassword.email = localStorage.getItem("email");
  }

  onChange() {
    // @ts-ignore
    this.changePassword.email = localStorage.getItem("email")
    console.log(this.changePassword)
    this.auth.changePassword({body: this.changePassword}).subscribe({
      next:(data)=>{
        Swal.fire({
          position: "center",
          icon: "success",
          title: "mot de passe modifiée! ",
          showConfirmButton: false,
          timer: 2000
        }).then(() => {
          this.authentication.logout();
        });
      },
      error:(err:any)=>{
        console.log("erreur ="+err.error.errorMessage);
        if (err.error.errorMessage==='NOT_MATCH_PASSWORD') {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Les mots de passe ne correspondent pas ",
            showConfirmButton: false,
            timer: 2000
          })
        }
        if (err.error.errorMessage==='NOT_MATCH_PASSWORD_OLD') {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "L'ancien mot de passe saisit n'est pas correct",
            showConfirmButton: false,
            timer: 2000
          })
        }
      }
    })
  }

  listDemande() {
    this.demandeurService.getByNin1({nin: localStorage.getItem("nin") as string}).subscribe({
      next:(data)=>{
        this.router.navigate(['/mes-demandes', data.id])
      }
    })
  }
}
