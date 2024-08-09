import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { AddDemandeurComponent } from './pages/add-demandeur/add-demandeur.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {RestPasswordComponent} from "./pages/rest-password/rest-password.component";
import {NewPasswordComponent} from "./pages/new-password/new-password.component";
import {ListDemandeComponent} from "./pages/list-demande/list-demande.component";
import {UpdateDemandeurComponent} from "./pages/update-demandeur/update-demandeur.component";
import {VerificationComponent} from "./pages/verification/verification.component";
import {AccessDenyComponent} from "./pages/access-deny/access-deny.component";
import {AdminGuardGuard} from "./security/admin-guard.guard";
import {TokenGuardGuard} from "./security/token-guard.guard";
import {ChangePasswordComponent} from "./pages/change-password/change-password.component";
import {QrCodeComponent} from "./pages/qr-code/qr-code.component";
import {VisualiserComponent} from "./pages/visualiser/visualiser.component";

const routes: Routes = [
  {path: 'connexion', component:LoginComponent},
  {path: 'inscription', component:RegisterComponent},
  {path: 'accueil', component:AccueilComponent},
  {path: 'demandeur', component:AddDemandeurComponent, canActivate:[TokenGuardGuard]},
  {path: 'update-demandeur', component:UpdateDemandeurComponent, canActivate:[TokenGuardGuard]},
  {path: 'verification/:id', component:VerificationComponent, canActivate:[AdminGuardGuard,AdminGuardGuard]},
  {path: 'reset-password', component:RestPasswordComponent},
  {path: 'change-password', component:ChangePasswordComponent, canActivate:[TokenGuardGuard]},
  {path: 'new-password/:token', component:NewPasswordComponent},
  {path: 'verifierscan/:code', component:QrCodeComponent},
  {path: 'visualiser/:id', component:VisualiserComponent, canActivate:[TokenGuardGuard]},
  {path: 'mes-demandes/:id', component:ListDemandeComponent, canActivate:[TokenGuardGuard]},
  {path: 'admin/dashboard', component:DashboardComponent, canActivate:[TokenGuardGuard,AdminGuardGuard]},
  {path: 'access-denied', component:AccessDenyComponent},
  { path: '', redirectTo: 'connexion', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
