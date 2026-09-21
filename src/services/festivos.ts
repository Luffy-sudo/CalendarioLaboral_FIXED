import { Festivo, FestivoDto } from '../types';
import { festivos, tiposFestivos } from '../data/seed';
import { ServicioFechas } from './fechas';

export class FestivoServicio {
  private static festivosList: Festivo[] = [...festivos];

  static listar(): Festivo[] {
    return [...this.festivosList]
      .map(f => ({
        ...f,
        tipo: tiposFestivos.find(t => t.id === f.idTipo),
      }))
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  static obtener(id: number): Festivo | null {
    const festivo = this.festivosList.find(f => f.id === id);
    if (!festivo) return null;
    return {
      ...festivo,
      tipo: tiposFestivos.find(t => t.id === festivo.idTipo),
    };
  }

  static buscar(nombre: string): Festivo[] {
    const q = nombre.toLowerCase();
    return this.festivosList
      .filter(f => f.nombre.toLowerCase().includes(q))
      .map(f => ({
        ...f,
        tipo: tiposFestivos.find(t => t.id === f.idTipo),
      }));
  }

  static agregar(festivo: Omit<Festivo, 'id'> & { id?: number }): Festivo {
    const nextId = this.festivosList.length > 0 ? Math.max(...this.festivosList.map(f => f.id)) + 1 : 1;
    const nuevo: Festivo = {
      ...festivo,
      id: nextId,
      tipo: tiposFestivos.find(t => t.id === festivo.idTipo),
    };
    this.festivosList.push(nuevo);
    return nuevo;
  }

  static modificar(festivo: Festivo): Festivo | null {
    const index = this.festivosList.findIndex(f => f.id === festivo.id);
    if (index === -1) return null;
    this.festivosList[index] = {
      ...festivo,
      tipo: tiposFestivos.find(t => t.id === festivo.idTipo),
    };
    return this.festivosList[index];
  }

  static eliminar(id: number): boolean {
    const index = this.festivosList.findIndex(f => f.id === id);
    if (index === -1) return false;
    this.festivosList.splice(index, 1);
    return true;
  }

  static listarPorPais(idPais: number, año: number): FestivoDto[] {
    const festivosPais = this.festivosList.filter(f => f.idPais === Number(idPais));
    const fechasFestivos: FestivoDto[] = [];

    for (const festivo of festivosPais) {
      let fechaFestivo: Date;

      switch (festivo.idTipo) {
        case 1: {
          // Fijo
          fechaFestivo = ServicioFechas.crearFechaUTC(año, festivo.mes, festivo.dia);
          fechasFestivos.push({
            nombre: festivo.nombre,
            fecha: ServicioFechas.formatearFechaISO(fechaFestivo),
          });
          break;
        }

        case 2: {
          // Ley Puente Festivo (Ley 51 de 1983 Emiliani)
          const baseDate = ServicioFechas.crearFechaUTC(año, festivo.mes, festivo.dia);
          fechaFestivo = ServicioFechas.siguienteLunes(baseDate);
          fechasFestivos.push({
            nombre: festivo.nombre,
            fecha: ServicioFechas.formatearFechaISO(fechaFestivo),
          });
          break;
        }

        case 3: {
          // Basado en Pascua
          const pascua = ServicioFechas.getPascua(año);
          fechaFestivo = ServicioFechas.agregarDias(pascua, festivo.diasPascua);
          fechasFestivos.push({
            nombre: festivo.nombre,
            fecha: ServicioFechas.formatearFechaISO(fechaFestivo),
          });
          break;
        }

        case 4: {
          // Basado en Pascua y Ley Puente Festivo
          const pascua = ServicioFechas.getPascua(año);
          const fechaCalculada = ServicioFechas.agregarDias(pascua, festivo.diasPascua);
          fechaFestivo = ServicioFechas.siguienteLunes(fechaCalculada);
          fechasFestivos.push({
            nombre: festivo.nombre,
            fecha: ServicioFechas.formatearFechaISO(fechaFestivo),
          });
          break;
        }

        case 5: {
          // Ley Puente Festivo Viernes (Ecuador)
          const baseDate = ServicioFechas.crearFechaUTC(año, festivo.mes, festivo.dia);
          fechaFestivo = ServicioFechas.puenteViernes(baseDate);
          fechasFestivos.push({
            nombre: festivo.nombre,
            fecha: ServicioFechas.formatearFechaISO(fechaFestivo),
          });
          break;
        }

        default:
          break;
      }
    }

    return fechasFestivos.sort((a, b) => a.fecha.localeCompare(b.fecha));
  }

  static verificar(idPais: number, año: number, mes: number, dia: number): boolean {
    const festivosDelAño = this.listarPorPais(idPais, año);
    const fechaBuscada = ServicioFechas.formatearFechaISO(ServicioFechas.crearFechaUTC(año, mes, dia));
    return festivosDelAño.some(f => f.fecha === fechaBuscada);
  }
}
