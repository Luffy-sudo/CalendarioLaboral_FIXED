export interface TipoFestivo {
  id: number;
  tipo: string;
}

export interface Pais {
  id: number;
  nombre: string;
}

export interface Festivo {
  id: number;
  idPais: number;
  nombre: string;
  dia: number;
  mes: number;
  diasPascua: number;
  idTipo: number;
  tipo?: TipoFestivo;
}

export interface FestivoDto {
  nombre: string;
  fecha: string; // ISO format: YYYY-MM-DD
}

export interface Tipo {
  id: number;
  tipo: string;
}

export interface Calendario {
  id: number;
  fecha: string; // ISO date string YYYY-MM-DD
  tipo: Tipo;
  descripcion: string;
  pais: Pais;
}

export interface Usuario {
  id: number;
  usuario: string;
  nombre: string;
  clave?: string;
  activo: boolean;
  roles?: string;
}

export interface UsuarioLoginDto {
  id?: number;
  usuario?: string;
  nombre?: string;
  token?: string;
  mensaje?: string;
}
