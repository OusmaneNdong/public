import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { UtilisateurService } from 'src/app/services/services';
import { AuthenticationRequest } from 'src/app/services/models';
import { AuthService } from 'src/app/auth/service/auth.service';
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;

  user: AuthenticationRequest = {};
  err!:number;
  name!: string;
  private message: any;
  constructor(private auth: UtilisateurService, private authService: AuthService, private router: Router, private active : ActivatedRoute) { }

  ngOnInit(): void {

  }
  

  onLoggedin() {
    this.loading = true;
    console.log(this.user);
    this.auth.authentication({body:this.user}).subscribe({
      next:(data)=>{
      this.loading = false;
        localStorage.setItem('token', data.token as string);
        this.authService.saveToken(data.token as string)
          const helper = new JwtHelperService();
          const decodedToken = helper.decodeToken(data.token as string);
          if (decodedToken.profile ==='user'){
            this.router.navigate(['demandeur']);

          }else{
            this.router.navigate(['admin/dashboard']);
          }

      },
      error:(err:any)=>{
        console.log(err)
        Swal.fire({
                position: "center",
                icon: "error",
                title: "Email ou mot de passe incorrect.",
                showConfirmButton: false,
                timer: 1000
              }).then(() => {
                this.router.navigate(['connexion']);
                window.location.reload();                
              });
      }
    })
  }

  clickMethod() {
    const message = "Are you sure you want to register?"; 
    if (confirm(message)) {
      this.onLoggedin();
    } else {
      this.router.navigate(['connexion']);
    }
  }
  
}
