import { IPessoa } from 'app/shared/model/pessoa.model';

export interface IVacina {
  id?: number;
  nome?: string;
  fabricante?: string;
  vacinados?: IPessoa[];
}

export const defaultValue: Readonly<IVacina> = {};
