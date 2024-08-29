import { Component, OnInit } from '@angular/core';
import {DemandeDto} from "../../services/models/demande-dto";
import {DemandeService} from "../../services/services/demande.service";
import {getAllDemande} from "../../services/fn/demande/get-all-demande";
import {DashbordService} from "../../services/services/dashbord.service";
import {InfoStatistique} from "../card/card.component";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  p:  any=1;
  itemsPerPages!:number;
  totalItems: any;
  demandes: DemandeDto[] = [];
  aDemande: DemandeDto[]=[];

  statisques: Array<InfoStatistique> = [];
  naDemande: any;
  neDemande: any;
  ntDemande: any;
  nrDemande: any;
  titre = "La liste des demandes";
  name: any;

  itemsPerPage: number = 10;

  noDataFound: boolean = false;

  constructor(private demandeService: DemandeService, private dashbordService: DashbordService) { }

  ngOnInit(): void {
    this.getAllDemande();
  }

  getAllDemande(){
    this.initialize();
    this.demandeService.findAllDemande({statut: 'cours'}).subscribe({
      next:(data)=>{
        this.demandes = data;
      }
    })
  }

  private async initialize(){

    this.naDemande = await lastValueFrom(
      this.dashbordService.getAppouved()
    );

    this.neDemande = await lastValueFrom(
      this.dashbordService.getCours()
    )

    this.ntDemande = await lastValueFrom(
      this.dashbordService.getCount()
    )

    this.nrDemande = await lastValueFrom(
      this.dashbordService.getRejected()
    )

    this.statisques = [
      {
        title: "Toutes les demandes",
        nombre: this.ntDemande,
        infoStyle: "bg-info",
        slug: "all"
      },
      {
        title: "Demandes en cours",
        nombre: this.neDemande,
        infoStyle: "bg-warning",
        slug: "Cours"
      },
      {
        title: "Demandes approuvees",
        nombre: this.naDemande,
        infoStyle: "bg-success",
        slug: "Approuvée",
      },
      {
        title: "Demandes rejetees",
        nombre: this.nrDemande,
        infoStyle: "bg-danger",
        slug: "Rejetée"
      }
    ]
  }

  onStatut(val: string) {
    if(val==="all"){
      this.titre = "La liste des demandes";
      this.demandeService.findDemandeActif().subscribe((response:any)=>{
        this.demandes = response;
      })
    }else{
      this.titre = "La liste des demandes "+val;
      this.demandeService.findAllDemande({"statut": val}).subscribe((response:any)=>{
        this.demandes = response;
      })
      console.log(val);
    }
  }

  Search() {
    if (this.name === "") {
      this.ngOnInit();
    } else {
      const filteredDemandes = this.demandes.filter(r => {
        return (
          r.statut?.toLocaleLowerCase().includes(this.name.toLocaleLowerCase()) ||
          r.demandeurDTO?.prenom?.toLocaleLowerCase().includes(this.name.toLocaleLowerCase()) ||
          r.demandeurDTO?.nom?.toLocaleLowerCase().includes(this.name.toLocaleLowerCase()) ||
          r.demandeurDTO?.telephone?.toLocaleLowerCase().includes(this.name.toLocaleLowerCase()) ||
          r.demandeurDTO?.datedenaissance?.toLocaleLowerCase().includes(this.name.toLocaleLowerCase()) ||
          r.demandeurDTO?.lieudenaissance?.toLocaleLowerCase().includes(this.name.toLocaleLowerCase())
        );
      });
      this.demandes = filteredDemandes;
      this.noDataFound = this.demandes.length === 0;
    }
  }

  refresh(){
    window.location.reload();
  }

}
