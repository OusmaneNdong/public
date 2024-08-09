/* tslint:disable */
/* eslint-disable */
import { Utilisateur } from '../models/utilisateur';
export interface Profile {
  code?: string;
  etat?: string;
  id?: number;
  libelle?: string;
  utilisateur?: Array<Utilisateur>;
}
