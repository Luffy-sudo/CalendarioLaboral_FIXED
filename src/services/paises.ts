import { Pais } from '../types';
import { paises } from '../data/seed';

export class PaisServicio {
  private static paisesList: Pais[] = [...paises];

  static listar(): Pais[] {
    return [...this.paisesList].sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  static obtener(id: number): Pais | null {
    return this.paisesList.find(p => p.id === Number(id)) || null;
  }

  static buscar(nombre: string): Pais[] {
    const q = nombre.toLowerCase();
    return this.paisesList.filter(p => p.nombre.toLowerCase().includes(q));
  }

  static agregar(pais: Omit<Pais, 'id'> & { id?: number }): Pais {
    const nextId = this.paisesList.length > 0 ? Math.max(...this.paisesList.map(p => p.id)) + 1 : 1;
    const nuevo: Pais = { ...pais, id: nextId };
    this.paisesList.push(nuevo);
    return nuevo;
  }

  static modificar(pais: Pais): Pais | null {
    const index = this.paisesList.findIndex(p => p.id === Number(pais.id));
    if (index === -1) return null;
    this.paisesList[index] = pais;
    return pais;
  }

  static eliminar(id: number): boolean {
    const index = this.paisesList.findIndex(p => p.id === Number(id));
    if (index === -1) return false;
    this.paisesList.splice(index, 1);
    return true;
  }
}
