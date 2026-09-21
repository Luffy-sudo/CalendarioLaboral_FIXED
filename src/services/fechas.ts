export class ServicioFechas {
  /**
   * Calcula el Domingo de Ramos (inicio de Semana Santa)
   */
  static getInicioSemanaSanta(año: number): Date {
    const a = año % 19;
    const b = año % 4;
    const c = año % 7;
    const d = (19 * a + 24) % 30;
    const dias = d + (2 * b + 4 * c + 6 * d + 5) % 7;

    let dia = 15 + dias;
    let mes = 3; // Marzo

    if (dia > 31) {
      dia -= 31;
      mes = 4; // Abril
    }

    return new Date(Date.UTC(año, mes - 1, dia));
  }

  /**
   * Domingo de Pascua = Inicio Semana Santa + 7 días
   */
  static getPascua(año: number): Date {
    return this.agregarDias(this.getInicioSemanaSanta(año), 7);
  }

  static agregarDias(fecha: Date, dias: number): Date {
    const resultado = new Date(fecha.getTime());
    resultado.setUTCDate(resultado.getUTCDate() + dias);
    return resultado;
  }

  /**
   * Ley Emiliani (según Ley 51 de 1983): Si cae en otro día, se traslada al siguiente lunes.
   */
  static siguienteLunes(fecha: Date): Date {
    const diaSemana = fecha.getUTCDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
    const diasHastaLunes = (1 - diaSemana + 7) % 7;
    return diasHastaLunes === 0 ? fecha : this.agregarDias(fecha, diasHastaLunes);
  }

  /**
   * Ley Puente Viernes (utilizada en Ecuador para mover a viernes si cae entre semana/fin de semana)
   */
  static puenteViernes(fecha: Date): Date {
    const diaSemana = fecha.getUTCDay(); // 0 = Dom, 1 = Lun, 2 = Mar, 3 = Mie, 4 = Jue, 5 = Vie, 6 = Sab
    if (diaSemana === 2) {
      // Martes -> lunes anterior
      return this.agregarDias(fecha, -1);
    } else if (diaSemana === 3 || diaSemana === 4) {
      // Miércoles o Jueves -> viernes de esa semana
      return this.agregarDias(fecha, 5 - diaSemana);
    } else if (diaSemana === 6) {
      // Sábado -> viernes anterior
      return this.agregarDias(fecha, -1);
    } else if (diaSemana === 0) {
      // Domingo -> lunes siguiente
      return this.agregarDias(fecha, 1);
    }
    return fecha;
  }

  static formatearFechaISO(fecha: Date): string {
    const y = fecha.getUTCFullYear();
    const m = String(fecha.getUTCMonth() + 1).padStart(2, '0');
    const d = String(fecha.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  static crearFechaUTC(año: number, mes: number, dia: number): Date {
    return new Date(Date.UTC(año, mes - 1, dia));
  }
}
