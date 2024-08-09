/* tslint:disable */
/* eslint-disable */
import { Utilisateur } from '../models/utilisateur';
export interface PasswordResetToken {
  expirationTime?: string;
  token?: string;
  tokenExpirationTime?: string;
  token_id?: number;
  utilisateur?: Utilisateur;
}
