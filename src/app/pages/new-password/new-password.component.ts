import { Component, OnInit } from '@angular/core';
import {TokenPasswordRequest} from "../../services/models/token-password-request";
import {UtilisateurService} from "../../services/services/utilisateur.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  err: number | undefined;
  newPassworRequest: TokenPasswordRequest = {};

  constructor(private auth: UtilisateurService, private ac: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  onChange() {
    this.newPassworRequest.token = this.ac.snapshot.params['token']
    console.log(this.newPassworRequest)
    this.auth.changePasswordTest({body: this.newPassworRequest}).subscribe({
      next:(data)=>{
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Mot de passe réinitialiser.",
          showConfirmButton: false,
          timer: 1000
        }).then(() => {
          this.router.navigate(['connexion']);
        });
      }
    })
  }
}
