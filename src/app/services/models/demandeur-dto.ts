/* tslint:disable */
/* eslint-disable */
import { Demande } from '../models/demande';
import { UtilisateurDto } from '../models/utilisateur-dto';
export interface DemandeurDto {
  adresse: string;
  completed?: boolean;
  datedenaissance?: string;
  demandeDTO?: Demande;
  displayPicture?: Array<string>;
  email?: string;
  fonction?: string;
  fullName?: string;
  id?: number;
  lieudenaissance: string;
  nin?: string;
  nom?: string;
  prenom?: string;
  scannernin?: string;
  sexe: string;
  statut?: string;
  telephone: string;
  type?: string;
  userId?: number;
  utilisateurDTO?: UtilisateurDto;
}
