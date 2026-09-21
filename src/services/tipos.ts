import { Tipo } from '../types';
import { tiposCalendario } from '../data/seed';

export class TipoServicio {
  private static tiposList: Tipo[] = [...tiposCalendario];

  static listar(): Tipo[] {
    return [...this.tiposList];
  }

  static obtener(id: number): Tipo | null {
    return this.tiposList.find(t => t.id === Number(id)) || null;
  }

  static buscar(nombre: string): Tipo[] {
    const q = nombre.toLowerCase();
    return this.tiposList.filter(t => t.tipo.toLowerCase().includes(q));
  }

  static agregar(tipo: Omit<Tipo, 'id'> & { id?: number }): Tipo {
    const nextId = this.tiposList.length > 0 ? Math.max(...this.tiposList.map(t => t.id)) + 1 : 1;
    const nuevo: Tipo = { ...tipo, id: nextId };
    this.tiposList.push(nuevo);
    return nuevo;
  }

  static modificar(tipo: Tipo): Tipo | null {
    const index = this.tiposList.findIndex(t => t.id === Number(tipo.id));
    if (index === -1) return null;
    this.tiposList[index] = tipo;
    return tipo;
  }

  static eliminar(id: number): boolean {
    const index = this.tiposList.findIndex(t => t.id === Number(id));
    if (index === -1) return false;
    this.tiposList.splice(index, 1);
    return true;
  }
}
