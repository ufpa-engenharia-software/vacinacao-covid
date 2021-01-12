import { Moment } from 'moment';
import { IVacina } from 'app/shared/model/vacina.model';

export interface IPessoa {
  id?: number;
  nome?: string;
  nascimento?: string;
  cadastro?: string;
  dose1?: string;
  dose2?: string;
  vacina?: IVacina;
}

export const defaultValue: Readonly<IPessoa> = {};
