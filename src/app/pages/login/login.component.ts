import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
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

  user: AuthenticationRequest = {};
  err!:number;
  private message: any;
  constructor(private auth: UtilisateurService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  onLoggedin() {
    console.log(this.user);
    this.auth.authentication({body:this.user}).subscribe({
      next:(data)=>{
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
                title: "Email ou mot de passe inccorrect.",
                showConfirmButton: false,
                timer: 2000
              })
      }
    })
  }
}
