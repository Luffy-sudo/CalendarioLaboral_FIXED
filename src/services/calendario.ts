import { Calendario, Pais } from '../types';
import { calendarios, paises, tiposCalendario } from '../data/seed';
import { FestivoServicio } from './festivos';
import { ServicioFechas } from './fechas';

const DIAS_SEMANA = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export class CalendarioServicio {
  private static calendarioList: Calendario[] = [...calendarios];

  static generar(idPais: number, año: number): boolean {
    const pais = paises.find(p => p.id === Number(idPais));
    if (!pais) return false;

    const tipoLaboral = tiposCalendario.find(t => t.id === 1)!;
    const tipoFinSemana = tiposCalendario.find(t => t.id === 2)!;
    const tipoFestivo = tiposCalendario.find(t => t.id === 3)!;

    const festivos = FestivoServicio.listarPorPais(idPais, año);
    const festivosSet = new Set(festivos.map(f => f.fecha));

    // Remove existing entries for this country and year to regenerate cleanly
    const prefix = `${año}-`;
    this.calendarioList = this.calendarioList.filter(
      c => !(c.pais.id === Number(idPais) && c.fecha.startsWith(prefix))
    );

    let currentDate = ServicioFechas.crearFechaUTC(año, 1, 1);
    let nextId = this.calendarioList.length > 0 ? Math.max(...this.calendarioList.map(c => c.id)) + 1 : 1;

    while (currentDate.getUTCFullYear() === año) {
      const fechaISO = ServicioFechas.formatearFechaISO(currentDate);
      const diaSemanaIndex = currentDate.getUTCDay(); // 0 = Domingo, 6 = Sábado
      const diaSemanaNombre = DIAS_SEMANA[diaSemanaIndex];

      let tipo = tipoLaboral;
      if (festivosSet.has(fechaISO)) {
        tipo = tipoFestivo;
      } else if (diaSemanaIndex === 0 || diaSemanaIndex === 6) {
        tipo = tipoFinSemana;
      }

      this.calendarioList.push({
        id: nextId++,
        fecha: fechaISO,
        tipo,
        descripcion: diaSemanaNombre,
        pais,
      });

      currentDate = ServicioFechas.agregarDias(currentDate, 1);
    }

    return true;
  }

  static listar(idPais: number, año: number): Calendario[] {
    const prefix = `${año}-`;
    const resultado = this.calendarioList.filter(
      c => c.pais.id === Number(idPais) && c.fecha.startsWith(prefix)
    );

    // If not generated yet for this country and year, generate it automatically
    if (resultado.length === 0) {
      const generado = this.generar(idPais, año);
      if (generado) {
        return this.calendarioList.filter(
          c => c.pais.id === Number(idPais) && c.fecha.startsWith(prefix)
        );
      }
    }

    return resultado;
  }
}
