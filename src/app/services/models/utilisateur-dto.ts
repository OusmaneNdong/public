/* tslint:disable */
/* eslint-disable */
import { DemandeurDto } from '../models/demandeur-dto';
export interface UtilisateurDto {
  demandeurDTO?: DemandeurDto;
  email?: string;
  fullName?: string;
  id?: number;
  nin?: string;
  nom?: string;
  passPort?: string;
  prenom?: string;
  signature?: string;
  statut?: boolean;
  typePieces?: string;
}
