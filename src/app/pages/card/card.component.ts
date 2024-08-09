import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DemandeDto} from "../../services/models/demande-dto";

export interface InfoStatistique{
  title?: string;
  nombre?: number;
  slug?: string;
  infoStyle?: 'bg-primary' | 'bg-success' | 'bg-warning' | 'bg-danger' | "bg-info";
}
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() infoStatistique: InfoStatistique= {}

  @Input() tDemande: DemandeDto[] = []

  @Output() stringChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  emitInfo(slug: string | undefined){
    this.stringChange.emit(slug);
  }

}
