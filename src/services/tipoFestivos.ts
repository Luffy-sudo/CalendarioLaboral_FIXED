import { TipoFestivo } from '../types';
import { tiposFestivos } from '../data/seed';

export class TipoFestivoServicio {
  private static tiposFestivosList: TipoFestivo[] = [...tiposFestivos];

  static listar(): TipoFestivo[] {
    return [...this.tiposFestivosList];
  }

  static obtener(id: number): TipoFestivo | null {
    return this.tiposFestivosList.find(t => t.id === Number(id)) || null;
  }

  static buscar(nombre: string): TipoFestivo[] {
    const q = nombre.toLowerCase();
    return this.tiposFestivosList.filter(t => t.tipo.toLowerCase().includes(q));
  }

  static agregar(tipoFestivo: Omit<TipoFestivo, 'id'> & { id?: number }): TipoFestivo {
    const nextId =
      this.tiposFestivosList.length > 0 ? Math.max(...this.tiposFestivosList.map(t => t.id)) + 1 : 1;
    const nuevo: TipoFestivo = { ...tipoFestivo, id: nextId };
    this.tiposFestivosList.push(nuevo);
    return nuevo;
  }

  static modificar(tipoFestivo: TipoFestivo): TipoFestivo | null {
    const index = this.tiposFestivosList.findIndex(t => t.id === Number(tipoFestivo.id));
    if (index === -1) return null;
    this.tiposFestivosList[index] = tipoFestivo;
    return tipoFestivo;
  }

  static eliminar(id: number): boolean {
    const index = this.tiposFestivosList.findIndex(t => t.id === Number(id));
    if (index === -1) return false;
    this.tiposFestivosList.splice(index, 1);
    return true;
  }
}
