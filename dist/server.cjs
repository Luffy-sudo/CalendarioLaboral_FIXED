"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var import_express7 = __toESM(require("express"));
var import_cors = __toESM(require("cors"));
var import_swagger_ui_express = __toESM(require("swagger-ui-express"));

// src/swagger.ts
var swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "API Calendario Laboral",
    description: "API REST para gesti\xF3n de calendario laboral, c\xE1lculo y verificaci\xF3n de d\xEDas festivos por pa\xEDs",
    version: "1.0.0"
  },
  servers: [
    {
      url: "/",
      description: "Servidor Actual"
    }
  ],
  components: {
    securitySchemes: {
      Bearer: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Ingresa el token JWT obtenido del endpoint de validaci\xF3n"
      }
    },
    schemas: {
      FestivoDto: {
        type: "object",
        properties: {
          nombre: { type: "string", example: "A\xF1o nuevo" },
          fecha: { type: "string", format: "date", example: "2024-01-01" }
        }
      },
      Festivo: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          idPais: { type: "integer", example: 1 },
          nombre: { type: "string", example: "A\xF1o nuevo" },
          dia: { type: "integer", example: 1 },
          mes: { type: "integer", example: 1 },
          diasPascua: { type: "integer", example: 0 },
          idTipo: { type: "integer", example: 1 }
        }
      },
      Pais: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nombre: { type: "string", example: "COLOMBIA" }
        }
      },
      Calendario: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          fecha: { type: "string", format: "date", example: "2024-01-01" },
          tipo: {
            type: "object",
            properties: {
              id: { type: "integer", example: 3 },
              tipo: { type: "string", example: "D\xEDa festivo " }
            }
          },
          descripcion: { type: "string", example: "Lunes" },
          pais: {
            type: "object",
            properties: {
              id: { type: "integer", example: 1 },
              nombre: { type: "string", example: "COLOMBIA" }
            }
          }
        }
      },
      Usuario: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          usuario: { type: "string", example: "frayosorio" },
          nombre: { type: "string", example: "Fray Le\xF3n Osorio Rivera" },
          activo: { type: "boolean", example: true },
          roles: { type: "string", example: "ADMIN" }
        }
      }
    }
  },
  paths: {
    "/api/festivos/verificar/{idPais}/{a\xF1o}/{mes}/{dia}": {
      get: {
        tags: ["Festivos"],
        summary: "Verificar si una fecha es festivo en un pa\xEDs",
        parameters: [
          { name: "idPais", in: "path", required: true, schema: { type: "integer", default: 1 } },
          { name: "a\xF1o", in: "path", required: true, schema: { type: "integer", default: 2024 } },
          { name: "mes", in: "path", required: true, schema: { type: "integer", default: 1 } },
          { name: "dia", in: "path", required: true, schema: { type: "integer", default: 1 } }
        ],
        responses: {
          200: {
            description: "Retorna true si es festivo, false si no",
            content: { "application/json": { schema: { type: "boolean" } } }
          }
        }
      }
    },
    "/api/festivos/listar/{idPais}/{a\xF1o}": {
      get: {
        tags: ["Festivos"],
        summary: "Listar todos los festivos calculados para un pa\xEDs y a\xF1o",
        parameters: [
          { name: "idPais", in: "path", required: true, schema: { type: "integer", default: 1 } },
          { name: "a\xF1o", in: "path", required: true, schema: { type: "integer", default: 2024 } }
        ],
        responses: {
          200: {
            description: "Lista de festivos del a\xF1o",
            content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/FestivoDto" } } } }
          }
        }
      }
    },
    "/api/festivos/listar": {
      get: {
        tags: ["Festivos"],
        summary: "Listar cat\xE1logo de definiciones de festivos",
        responses: {
          200: {
            description: "Lista de festivos base",
            content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Festivo" } } } }
          }
        }
      }
    },
    "/api/calendario/generar/{idPais}/{a\xF1o}": {
      get: {
        tags: ["Calendario"],
        summary: "Generar calendario laboral anual para un pa\xEDs",
        parameters: [
          { name: "idPais", in: "path", required: true, schema: { type: "integer", default: 1 } },
          { name: "a\xF1o", in: "path", required: true, schema: { type: "integer", default: 2024 } }
        ],
        responses: {
          200: {
            description: "Resultado de la generaci\xF3n (true si fue exitoso)",
            content: { "application/json": { schema: { type: "boolean" } } }
          }
        }
      }
    },
    "/api/calendario/listar/{idPais}/{a\xF1o}": {
      get: {
        tags: ["Calendario"],
        summary: "Listar calendario laboral anual clasificado (laboral, fin de semana, festivo)",
        parameters: [
          { name: "idPais", in: "path", required: true, schema: { type: "integer", default: 1 } },
          { name: "a\xF1o", in: "path", required: true, schema: { type: "integer", default: 2024 } }
        ],
        responses: {
          200: {
            description: "Lista detallada de fechas del calendario",
            content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Calendario" } } } }
          }
        }
      }
    },
    "/api/paises/listar": {
      get: {
        tags: ["Pa\xEDses"],
        summary: "Listar todos los pa\xEDses",
        responses: {
          200: {
            description: "Lista de pa\xEDses",
            content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Pais" } } } }
          }
        }
      }
    },
    "/api/usuarios/validar/{nombreUsuario}/{clave}": {
      get: {
        tags: ["Usuarios"],
        summary: "Validar credenciales y obtener token JWT",
        parameters: [
          { name: "nombreUsuario", in: "path", required: true, schema: { type: "string", default: "frayosorio" } },
          { name: "clave", in: "path", required: true, schema: { type: "string", default: "123" } }
        ],
        responses: {
          200: {
            description: "Datos del usuario autenticado con su token JWT",
            content: { "application/json": { schema: { type: "object" } } }
          }
        }
      }
    },
    "/api/usuarios/listar": {
      get: {
        tags: ["Usuarios"],
        summary: "Listar usuarios registrados",
        responses: {
          200: {
            description: "Lista de usuarios",
            content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Usuario" } } } }
          }
        }
      }
    }
  }
};

// src/services/seguridad.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var SECRETO = process.env.JWT_SECRET || "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";
var SeguridadServicio = class {
  static generarToken(nombreUsuario) {
    return import_jsonwebtoken.default.sign(
      { sub: nombreUsuario },
      SECRETO,
      { expiresIn: "30m" }
    );
  }
  static verificarToken(token) {
    try {
      return import_jsonwebtoken.default.verify(token, SECRETO);
    } catch {
      return null;
    }
  }
};
function filtroSeguridad(req, res, next) {
  if (req.path.startsWith("/api/usuarios/validar") || req.path.startsWith("/swagger-ui") || req.path.startsWith("/v3/api-docs") || req.path.startsWith("/api-docs") || req.path === "/" || req.path.endsWith(".html") || req.path.endsWith(".css") || req.path.endsWith(".js") || req.path.endsWith(".ico")) {
    next();
    return;
  }
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    next();
    return;
  }
  const token = authHeader.substring(7);
  const decoded = SeguridadServicio.verificarToken(token);
  if (!decoded) {
    res.status(403).json({ error: "Token JWT inv\xE1lido o expirado" });
    return;
  }
  req.user = decoded;
  next();
}

// src/routes/festivos.ts
var import_express = require("express");

// src/data/seed.ts
var tiposFestivos = [
  { id: 1, tipo: "Fijo" },
  { id: 2, tipo: "Ley Puente Festivo" },
  { id: 3, tipo: "Basado en Pascua" },
  { id: 4, tipo: "Basado en Pascua y Ley Puente Festivo" },
  { id: 5, tipo: "Ley Puente Festivo Viernes" }
];
var paises = [
  { id: 1, nombre: "COLOMBIA" },
  { id: 2, nombre: "ARGENTINA" },
  { id: 3, nombre: "BOLIVIA" },
  { id: 4, nombre: "BRASIL" },
  { id: 5, nombre: "CANADA" },
  { id: 6, nombre: "COSTA RICA" },
  { id: 7, nombre: "REPUBLICA DOMINICANA" },
  { id: 8, nombre: "CUBA" },
  { id: 9, nombre: "CHILE" },
  { id: 10, nombre: "ECUADOR" },
  { id: 11, nombre: "ESTADOS UNIDOS DE AM\xC9RICA" },
  { id: 12, nombre: "GUATEMALA" },
  { id: 13, nombre: "HONDURAS" },
  { id: 14, nombre: "M\xC9XICO" },
  { id: 15, nombre: "NICARAGUA" },
  { id: 16, nombre: "PANAMA" },
  { id: 17, nombre: "PARAGUAY" },
  { id: 18, nombre: "PERU" },
  { id: 19, nombre: "URUGUAY" },
  { id: 20, nombre: "VENEZUELA" },
  { id: 21, nombre: "ESPA\xD1A" }
];
var tiposCalendario = [
  { id: 1, tipo: "D\xEDa laboral" },
  { id: 2, tipo: "Fin de Semana " },
  { id: 3, tipo: "D\xEDa festivo " }
];
var festivos = [
  // Colombia (IdPais: 1)
  { id: 1, idPais: 1, dia: 1, mes: 1, nombre: "A\xF1o nuevo", idTipo: 1, diasPascua: 0 },
  { id: 2, idPais: 1, dia: 6, mes: 1, nombre: "Santos Reyes", idTipo: 2, diasPascua: 0 },
  { id: 3, idPais: 1, dia: 19, mes: 3, nombre: "San Jos\xE9", idTipo: 2, diasPascua: 0 },
  { id: 4, idPais: 1, dia: 0, mes: 0, nombre: "Jueves Santo", idTipo: 3, diasPascua: -3 },
  { id: 5, idPais: 1, dia: 0, mes: 0, nombre: "Viernes Santo", idTipo: 3, diasPascua: -2 },
  { id: 6, idPais: 1, dia: 0, mes: 0, nombre: "Domingo de Pascua", idTipo: 3, diasPascua: 0 },
  { id: 7, idPais: 1, dia: 1, mes: 5, nombre: "D\xEDa del Trabajo", idTipo: 1, diasPascua: 0 },
  { id: 8, idPais: 1, dia: 0, mes: 0, nombre: "Ascensi\xF3n del Se\xF1or", idTipo: 4, diasPascua: 40 },
  { id: 9, idPais: 1, dia: 0, mes: 0, nombre: "Corpus Christi", idTipo: 4, diasPascua: 61 },
  { id: 10, idPais: 1, dia: 0, mes: 0, nombre: "Sagrado Coraz\xF3n de Jes\xFAs", idTipo: 4, diasPascua: 68 },
  { id: 11, idPais: 1, dia: 29, mes: 6, nombre: "San Pedro y San Pablo", idTipo: 2, diasPascua: 0 },
  { id: 12, idPais: 1, dia: 20, mes: 7, nombre: "Independencia Colombia", idTipo: 1, diasPascua: 0 },
  { id: 13, idPais: 1, dia: 7, mes: 8, nombre: "Batalla de Boyac\xE1", idTipo: 1, diasPascua: 0 },
  { id: 14, idPais: 1, dia: 15, mes: 8, nombre: "Asunci\xF3n de la Virgen", idTipo: 2, diasPascua: 0 },
  { id: 15, idPais: 1, dia: 12, mes: 10, nombre: "D\xEDa de la Raza", idTipo: 2, diasPascua: 0 },
  { id: 16, idPais: 1, dia: 1, mes: 11, nombre: "Todos los santos", idTipo: 2, diasPascua: 0 },
  { id: 17, idPais: 1, dia: 11, mes: 11, nombre: "Independencia de Cartagena", idTipo: 2, diasPascua: 0 },
  { id: 18, idPais: 1, dia: 8, mes: 12, nombre: "Inmaculada Concepci\xF3n", idTipo: 1, diasPascua: 0 },
  { id: 19, idPais: 1, dia: 25, mes: 12, nombre: "Navidad", idTipo: 1, diasPascua: 0 },
  // Ecuador (IdPais: 10)
  { id: 20, idPais: 10, dia: 1, mes: 1, nombre: "A\xF1o nuevo", idTipo: 1, diasPascua: 0 },
  { id: 21, idPais: 10, dia: 0, mes: 0, nombre: "Carnaval 1", idTipo: 3, diasPascua: -43 },
  { id: 22, idPais: 10, dia: 0, mes: 0, nombre: "Carnaval 2", idTipo: 3, diasPascua: -42 },
  { id: 23, idPais: 10, dia: 0, mes: 0, nombre: "Viernes Santo", idTipo: 3, diasPascua: -2 },
  { id: 24, idPais: 10, dia: 1, mes: 5, nombre: "D\xEDa del Trabajo", idTipo: 5, diasPascua: 0 },
  { id: 25, idPais: 10, dia: 24, mes: 5, nombre: "Batalla de Pichincha", idTipo: 1, diasPascua: 0 },
  { id: 26, idPais: 10, dia: 10, mes: 8, nombre: "Primer Grito de Independencia", idTipo: 5, diasPascua: 0 },
  { id: 27, idPais: 10, dia: 9, mes: 10, nombre: "Independencia de Guayaquil", idTipo: 5, diasPascua: 0 },
  { id: 28, idPais: 10, dia: 2, mes: 11, nombre: "D\xEDa de los Difuntos", idTipo: 5, diasPascua: 0 },
  { id: 29, idPais: 10, dia: 3, mes: 11, nombre: "Independencia de Cuenca", idTipo: 5, diasPascua: 0 },
  { id: 30, idPais: 10, dia: 25, mes: 12, nombre: "Navidad", idTipo: 5, diasPascua: 0 }
];
var usuarios = [
  {
    id: 1,
    usuario: "frayosorio",
    nombre: "Fray Le\xF3n Osorio Rivera",
    clave: "123",
    activo: true,
    roles: "ADMIN"
  }
];
var calendarios = [];

// src/services/fechas.ts
var ServicioFechas = class {
  /**
   * Calcula el Domingo de Ramos (inicio de Semana Santa)
   */
  static getInicioSemanaSanta(a\u00F1o) {
    const a = a\u00F1o % 19;
    const b = a\u00F1o % 4;
    const c = a\u00F1o % 7;
    const d = (19 * a + 24) % 30;
    const dias = d + (2 * b + 4 * c + 6 * d + 5) % 7;
    let dia = 15 + dias;
    let mes = 3;
    if (dia > 31) {
      dia -= 31;
      mes = 4;
    }
    return new Date(Date.UTC(a\u00F1o, mes - 1, dia));
  }
  /**
   * Domingo de Pascua = Inicio Semana Santa + 7 días
   */
  static getPascua(a\u00F1o) {
    return this.agregarDias(this.getInicioSemanaSanta(a\u00F1o), 7);
  }
  static agregarDias(fecha, dias) {
    const resultado = new Date(fecha.getTime());
    resultado.setUTCDate(resultado.getUTCDate() + dias);
    return resultado;
  }
  /**
   * Ley Emiliani (según Ley 51 de 1983): Si cae en otro día, se traslada al siguiente lunes.
   */
  static siguienteLunes(fecha) {
    const diaSemana = fecha.getUTCDay();
    const diasHastaLunes = (1 - diaSemana + 7) % 7;
    return diasHastaLunes === 0 ? fecha : this.agregarDias(fecha, diasHastaLunes);
  }
  /**
   * Ley Puente Viernes (utilizada en Ecuador para mover a viernes si cae entre semana/fin de semana)
   */
  static puenteViernes(fecha) {
    const diaSemana = fecha.getUTCDay();
    if (diaSemana === 2) {
      return this.agregarDias(fecha, -1);
    } else if (diaSemana === 3 || diaSemana === 4) {
      return this.agregarDias(fecha, 5 - diaSemana);
    } else if (diaSemana === 6) {
      return this.agregarDias(fecha, -1);
    } else if (diaSemana === 0) {
      return this.agregarDias(fecha, 1);
    }
    return fecha;
  }
  static formatearFechaISO(fecha) {
    const y = fecha.getUTCFullYear();
    const m = String(fecha.getUTCMonth() + 1).padStart(2, "0");
    const d = String(fecha.getUTCDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  static crearFechaUTC(a\u00F1o, mes, dia) {
    return new Date(Date.UTC(a\u00F1o, mes - 1, dia));
  }
};

// src/services/festivos.ts
var FestivoServicio = class {
  static festivosList = [...festivos];
  static listar() {
    return [...this.festivosList].map((f) => ({
      ...f,
      tipo: tiposFestivos.find((t) => t.id === f.idTipo)
    })).sort((a, b) => a.nombre.localeCompare(b.nombre));
  }
  static obtener(id) {
    const festivo = this.festivosList.find((f) => f.id === id);
    if (!festivo) return null;
    return {
      ...festivo,
      tipo: tiposFestivos.find((t) => t.id === festivo.idTipo)
    };
  }
  static buscar(nombre) {
    const q = nombre.toLowerCase();
    return this.festivosList.filter((f) => f.nombre.toLowerCase().includes(q)).map((f) => ({
      ...f,
      tipo: tiposFestivos.find((t) => t.id === f.idTipo)
    }));
  }
  static agregar(festivo) {
    const nextId = this.festivosList.length > 0 ? Math.max(...this.festivosList.map((f) => f.id)) + 1 : 1;
    const nuevo = {
      ...festivo,
      id: nextId,
      tipo: tiposFestivos.find((t) => t.id === festivo.idTipo)
    };
    this.festivosList.push(nuevo);
    return nuevo;
  }
  static modificar(festivo) {
    const index = this.festivosList.findIndex((f) => f.id === festivo.id);
    if (index === -1) return null;
    this.festivosList[index] = {
      ...festivo,
      tipo: tiposFestivos.find((t) => t.id === festivo.idTipo)
    };
    return this.festivosList[index];
  }
  static eliminar(id) {
    const index = this.festivosList.findIndex((f) => f.id === id);
    if (index === -1) return false;
    this.festivosList.splice(index, 1);
    return true;
  }
  static listarPorPais(idPais, a\u00F1o) {
    const festivosPais = this.festivosList.filter((f) => f.idPais === Number(idPais));
    const fechasFestivos = [];
    for (const festivo of festivosPais) {
      let fechaFestivo;
      switch (festivo.idTipo) {
        case 1: {
          fechaFestivo = ServicioFechas.crearFechaUTC(a\u00F1o, festivo.mes, festivo.dia);
          fechasFestivos.push({
            nombre: festivo.nombre,
            fecha: ServicioFechas.formatearFechaISO(fechaFestivo)
          });
          break;
        }
        case 2: {
          const baseDate = ServicioFechas.crearFechaUTC(a\u00F1o, festivo.mes, festivo.dia);
          fechaFestivo = ServicioFechas.siguienteLunes(baseDate);
          fechasFestivos.push({
            nombre: festivo.nombre,
            fecha: ServicioFechas.formatearFechaISO(fechaFestivo)
          });
          break;
        }
        case 3: {
          const pascua = ServicioFechas.getPascua(a\u00F1o);
          fechaFestivo = ServicioFechas.agregarDias(pascua, festivo.diasPascua);
          fechasFestivos.push({
            nombre: festivo.nombre,
            fecha: ServicioFechas.formatearFechaISO(fechaFestivo)
          });
          break;
        }
        case 4: {
          const pascua = ServicioFechas.getPascua(a\u00F1o);
          const fechaCalculada = ServicioFechas.agregarDias(pascua, festivo.diasPascua);
          fechaFestivo = ServicioFechas.siguienteLunes(fechaCalculada);
          fechasFestivos.push({
            nombre: festivo.nombre,
            fecha: ServicioFechas.formatearFechaISO(fechaFestivo)
          });
          break;
        }
        case 5: {
          const baseDate = ServicioFechas.crearFechaUTC(a\u00F1o, festivo.mes, festivo.dia);
          fechaFestivo = ServicioFechas.puenteViernes(baseDate);
          fechasFestivos.push({
            nombre: festivo.nombre,
            fecha: ServicioFechas.formatearFechaISO(fechaFestivo)
          });
          break;
        }
        default:
          break;
      }
    }
    return fechasFestivos.sort((a, b) => a.fecha.localeCompare(b.fecha));
  }
  static verificar(idPais, a\u00F1o, mes, dia) {
    const festivosDelA\u00F1o = this.listarPorPais(idPais, a\u00F1o);
    const fechaBuscada = ServicioFechas.formatearFechaISO(ServicioFechas.crearFechaUTC(a\u00F1o, mes, dia));
    return festivosDelA\u00F1o.some((f) => f.fecha === fechaBuscada);
  }
};

// src/routes/festivos.ts
var router = (0, import_express.Router)();
router.get("/listar", (req, res) => {
  res.json(FestivoServicio.listar());
});
router.get("/obtener/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const festivo = FestivoServicio.obtener(id);
  if (!festivo) {
    res.status(404).json({ error: "Festivo no encontrado" });
    return;
  }
  res.json(festivo);
});
router.get("/buscar/:nombre", (req, res) => {
  res.json(FestivoServicio.buscar(req.params.nombre));
});
router.post("/agregar", (req, res) => {
  const nuevo = FestivoServicio.agregar(req.body);
  res.status(201).json(nuevo);
});
router.put("/modificar", (req, res) => {
  const modificado = FestivoServicio.modificar(req.body);
  if (!modificado) {
    res.status(404).json({ error: "Festivo no encontrado para modificar" });
    return;
  }
  res.json(modificado);
});
router.delete("/eliminar/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const resultado = FestivoServicio.eliminar(id);
  res.json(resultado);
});
router.get("/verificar/:idPais/:anio/:mes/:dia", (req, res) => {
  const idPais = parseInt(req.params.idPais, 10);
  const anio = parseInt(req.params.anio, 10);
  const mes = parseInt(req.params.mes, 10);
  const dia = parseInt(req.params.dia, 10);
  if (isNaN(idPais) || isNaN(anio) || isNaN(mes) || isNaN(dia) || mes < 1 || mes > 12 || dia < 1 || dia > 31) {
    res.status(400).send("Fecha inv\xE1lida");
    return;
  }
  const esFestivo = FestivoServicio.verificar(idPais, anio, mes, dia);
  res.json(esFestivo);
});
router.get("/listar/:idPais/:anio", (req, res) => {
  const idPais = parseInt(req.params.idPais, 10);
  const anio = parseInt(req.params.anio, 10);
  if (isNaN(idPais) || isNaN(anio)) {
    res.status(400).json({ error: "Par\xE1metros inv\xE1lidos" });
    return;
  }
  const lista = FestivoServicio.listarPorPais(idPais, anio);
  res.json(lista);
});
var festivos_default = router;

// src/routes/calendario.ts
var import_express2 = require("express");

// src/services/calendario.ts
var DIAS_SEMANA = ["Domingo", "Lunes", "Martes", "Mi\xE9rcoles", "Jueves", "Viernes", "S\xE1bado"];
var CalendarioServicio = class {
  static calendarioList = [...calendarios];
  static generar(idPais, a\u00F1o) {
    const pais = paises.find((p) => p.id === Number(idPais));
    if (!pais) return false;
    const tipoLaboral = tiposCalendario.find((t) => t.id === 1);
    const tipoFinSemana = tiposCalendario.find((t) => t.id === 2);
    const tipoFestivo = tiposCalendario.find((t) => t.id === 3);
    const festivos2 = FestivoServicio.listarPorPais(idPais, a\u00F1o);
    const festivosSet = new Set(festivos2.map((f) => f.fecha));
    const prefix = `${a\u00F1o}-`;
    this.calendarioList = this.calendarioList.filter(
      (c) => !(c.pais.id === Number(idPais) && c.fecha.startsWith(prefix))
    );
    let currentDate = ServicioFechas.crearFechaUTC(a\u00F1o, 1, 1);
    let nextId = this.calendarioList.length > 0 ? Math.max(...this.calendarioList.map((c) => c.id)) + 1 : 1;
    while (currentDate.getUTCFullYear() === a\u00F1o) {
      const fechaISO = ServicioFechas.formatearFechaISO(currentDate);
      const diaSemanaIndex = currentDate.getUTCDay();
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
        pais
      });
      currentDate = ServicioFechas.agregarDias(currentDate, 1);
    }
    return true;
  }
  static listar(idPais, a\u00F1o) {
    const prefix = `${a\u00F1o}-`;
    const resultado = this.calendarioList.filter(
      (c) => c.pais.id === Number(idPais) && c.fecha.startsWith(prefix)
    );
    if (resultado.length === 0) {
      const generado = this.generar(idPais, a\u00F1o);
      if (generado) {
        return this.calendarioList.filter(
          (c) => c.pais.id === Number(idPais) && c.fecha.startsWith(prefix)
        );
      }
    }
    return resultado;
  }
};

// src/routes/calendario.ts
var router2 = (0, import_express2.Router)();
router2.get("/generar/:idPais/:anio", (req, res) => {
  const idPais = parseInt(req.params.idPais, 10);
  const anio = parseInt(req.params.anio, 10);
  if (isNaN(idPais) || isNaN(anio)) {
    res.status(400).json({ error: "Par\xE1metros inv\xE1lidos" });
    return;
  }
  const resultado = CalendarioServicio.generar(idPais, anio);
  res.json(resultado);
});
router2.get("/listar/:idPais/:anio", (req, res) => {
  const idPais = parseInt(req.params.idPais, 10);
  const anio = parseInt(req.params.anio, 10);
  if (isNaN(idPais) || isNaN(anio)) {
    res.status(400).json({ error: "Par\xE1metros inv\xE1lidos" });
    return;
  }
  const calendario = CalendarioServicio.listar(idPais, anio);
  res.json(calendario);
});
var calendario_default = router2;

// src/routes/paises.ts
var import_express3 = require("express");

// src/services/paises.ts
var PaisServicio = class {
  static paisesList = [...paises];
  static listar() {
    return [...this.paisesList].sort((a, b) => a.nombre.localeCompare(b.nombre));
  }
  static obtener(id) {
    return this.paisesList.find((p) => p.id === Number(id)) || null;
  }
  static buscar(nombre) {
    const q = nombre.toLowerCase();
    return this.paisesList.filter((p) => p.nombre.toLowerCase().includes(q));
  }
  static agregar(pais) {
    const nextId = this.paisesList.length > 0 ? Math.max(...this.paisesList.map((p) => p.id)) + 1 : 1;
    const nuevo = { ...pais, id: nextId };
    this.paisesList.push(nuevo);
    return nuevo;
  }
  static modificar(pais) {
    const index = this.paisesList.findIndex((p) => p.id === Number(pais.id));
    if (index === -1) return null;
    this.paisesList[index] = pais;
    return pais;
  }
  static eliminar(id) {
    const index = this.paisesList.findIndex((p) => p.id === Number(id));
    if (index === -1) return false;
    this.paisesList.splice(index, 1);
    return true;
  }
};

// src/routes/paises.ts
var router3 = (0, import_express3.Router)();
router3.get("/listar", (req, res) => {
  res.json(PaisServicio.listar());
});
router3.get("/obtener/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const pais = PaisServicio.obtener(id);
  if (!pais) {
    res.status(404).json({ error: "Pa\xEDs no encontrado" });
    return;
  }
  res.json(pais);
});
router3.get("/buscar/:nombre", (req, res) => {
  res.json(PaisServicio.buscar(req.params.nombre));
});
router3.post("/agregar", (req, res) => {
  const nuevo = PaisServicio.agregar(req.body);
  res.status(201).json(nuevo);
});
router3.put("/modificar", (req, res) => {
  const modificado = PaisServicio.modificar(req.body);
  if (!modificado) {
    res.status(404).json({ error: "Pa\xEDs no encontrado para modificar" });
    return;
  }
  res.json(modificado);
});
router3.delete("/eliminar/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const resultado = PaisServicio.eliminar(id);
  res.json(resultado);
});
var paises_default = router3;

// src/routes/tipos.ts
var import_express4 = require("express");

// src/services/tipos.ts
var TipoServicio = class {
  static tiposList = [...tiposCalendario];
  static listar() {
    return [...this.tiposList];
  }
  static obtener(id) {
    return this.tiposList.find((t) => t.id === Number(id)) || null;
  }
  static buscar(nombre) {
    const q = nombre.toLowerCase();
    return this.tiposList.filter((t) => t.tipo.toLowerCase().includes(q));
  }
  static agregar(tipo) {
    const nextId = this.tiposList.length > 0 ? Math.max(...this.tiposList.map((t) => t.id)) + 1 : 1;
    const nuevo = { ...tipo, id: nextId };
    this.tiposList.push(nuevo);
    return nuevo;
  }
  static modificar(tipo) {
    const index = this.tiposList.findIndex((t) => t.id === Number(tipo.id));
    if (index === -1) return null;
    this.tiposList[index] = tipo;
    return tipo;
  }
  static eliminar(id) {
    const index = this.tiposList.findIndex((t) => t.id === Number(id));
    if (index === -1) return false;
    this.tiposList.splice(index, 1);
    return true;
  }
};

// src/routes/tipos.ts
var router4 = (0, import_express4.Router)();
router4.get("/listar", (req, res) => {
  res.json(TipoServicio.listar());
});
router4.get("/obtener/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const tipo = TipoServicio.obtener(id);
  if (!tipo) {
    res.status(404).json({ error: "Tipo no encontrado" });
    return;
  }
  res.json(tipo);
});
router4.get("/buscar/:nombre", (req, res) => {
  res.json(TipoServicio.buscar(req.params.nombre));
});
router4.post("/agregar", (req, res) => {
  const nuevo = TipoServicio.agregar(req.body);
  res.status(201).json(nuevo);
});
router4.put("/modificar", (req, res) => {
  const modificado = TipoServicio.modificar(req.body);
  if (!modificado) {
    res.status(404).json({ error: "Tipo no encontrado para modificar" });
    return;
  }
  res.json(modificado);
});
router4.delete("/eliminar/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const resultado = TipoServicio.eliminar(id);
  res.json(resultado);
});
var tipos_default = router4;

// src/routes/tipoFestivos.ts
var import_express5 = require("express");

// src/services/tipoFestivos.ts
var TipoFestivoServicio = class {
  static tiposFestivosList = [...tiposFestivos];
  static listar() {
    return [...this.tiposFestivosList];
  }
  static obtener(id) {
    return this.tiposFestivosList.find((t) => t.id === Number(id)) || null;
  }
  static buscar(nombre) {
    const q = nombre.toLowerCase();
    return this.tiposFestivosList.filter((t) => t.tipo.toLowerCase().includes(q));
  }
  static agregar(tipoFestivo) {
    const nextId = this.tiposFestivosList.length > 0 ? Math.max(...this.tiposFestivosList.map((t) => t.id)) + 1 : 1;
    const nuevo = { ...tipoFestivo, id: nextId };
    this.tiposFestivosList.push(nuevo);
    return nuevo;
  }
  static modificar(tipoFestivo) {
    const index = this.tiposFestivosList.findIndex((t) => t.id === Number(tipoFestivo.id));
    if (index === -1) return null;
    this.tiposFestivosList[index] = tipoFestivo;
    return tipoFestivo;
  }
  static eliminar(id) {
    const index = this.tiposFestivosList.findIndex((t) => t.id === Number(id));
    if (index === -1) return false;
    this.tiposFestivosList.splice(index, 1);
    return true;
  }
};

// src/routes/tipoFestivos.ts
var router5 = (0, import_express5.Router)();
router5.get("/listar", (req, res) => {
  res.json(TipoFestivoServicio.listar());
});
router5.get("/obtener/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const tipoFestivo = TipoFestivoServicio.obtener(id);
  if (!tipoFestivo) {
    res.status(404).json({ error: "TipoFestivo no encontrado" });
    return;
  }
  res.json(tipoFestivo);
});
router5.get("/buscar/:nombre", (req, res) => {
  res.json(TipoFestivoServicio.buscar(req.params.nombre));
});
router5.post("/agregar", (req, res) => {
  const nuevo = TipoFestivoServicio.agregar(req.body);
  res.status(201).json(nuevo);
});
router5.put("/modificar", (req, res) => {
  const modificado = TipoFestivoServicio.modificar(req.body);
  if (!modificado) {
    res.status(404).json({ error: "TipoFestivo no encontrado para modificar" });
    return;
  }
  res.json(modificado);
});
router5.delete("/eliminar/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const resultado = TipoFestivoServicio.eliminar(id);
  res.json(resultado);
});
var tipoFestivos_default = router5;

// src/routes/usuarios.ts
var import_express6 = require("express");

// src/services/usuarios.ts
var UsuarioServicio = class {
  static usuariosList = [...usuarios];
  static login(nombreUsuario, clave) {
    const usuario = this.usuariosList.find(
      (u) => u.usuario.toLowerCase() === nombreUsuario.toLowerCase() && u.clave === clave
    );
    if (usuario && usuario.activo) {
      const token = SeguridadServicio.generarToken(usuario.usuario);
      return {
        id: usuario.id,
        usuario: usuario.usuario,
        nombre: usuario.nombre,
        token
      };
    }
    return {
      mensaje: "Usuario o contrase\xF1a incorrectos"
    };
  }
  static listar() {
    return this.usuariosList.map(({ clave, ...u }) => ({ ...u }));
  }
  static obtener(id) {
    const user = this.usuariosList.find((u) => u.id === Number(id));
    if (!user) return null;
    const { clave, ...rest } = user;
    return rest;
  }
  static buscar(nombre) {
    const q = nombre.toLowerCase();
    return this.usuariosList.filter((u) => u.nombre.toLowerCase().includes(q) || u.usuario.toLowerCase().includes(q)).map(({ clave, ...u }) => ({ ...u }));
  }
  static agregar(usuario) {
    const nextId = this.usuariosList.length > 0 ? Math.max(...this.usuariosList.map((u) => u.id)) + 1 : 1;
    const nuevo = {
      id: nextId,
      usuario: usuario.usuario,
      nombre: usuario.nombre,
      clave: usuario.clave || "123",
      activo: usuario.activo ?? true,
      roles: usuario.roles || "USER"
    };
    this.usuariosList.push(nuevo);
    const { clave, ...rest } = nuevo;
    return rest;
  }
  static modificar(usuario) {
    const index = this.usuariosList.findIndex((u) => u.id === Number(usuario.id));
    if (index === -1) return null;
    const existing = this.usuariosList[index];
    this.usuariosList[index] = {
      ...existing,
      ...usuario,
      clave: usuario.clave || existing.clave
    };
    const { clave, ...rest } = this.usuariosList[index];
    return rest;
  }
  static eliminar(id) {
    const index = this.usuariosList.findIndex((u) => u.id === Number(id));
    if (index === -1) return false;
    this.usuariosList.splice(index, 1);
    return true;
  }
};

// src/routes/usuarios.ts
var router6 = (0, import_express6.Router)();
router6.get("/validar/:nombreUsuario/:clave", (req, res) => {
  const { nombreUsuario, clave } = req.params;
  const loginResult = UsuarioServicio.login(nombreUsuario, clave);
  res.json(loginResult);
});
router6.get("/listar", (req, res) => {
  res.json(UsuarioServicio.listar());
});
router6.get("/obtener/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const usuario = UsuarioServicio.obtener(id);
  if (!usuario) {
    res.status(404).json({ error: "Usuario no encontrado" });
    return;
  }
  res.json(usuario);
});
router6.get("/buscar/:nombre", (req, res) => {
  res.json(UsuarioServicio.buscar(req.params.nombre));
});
router6.post("/agregar", (req, res) => {
  const nuevo = UsuarioServicio.agregar(req.body);
  res.status(201).json(nuevo);
});
router6.put("/modificar", (req, res) => {
  const modificado = UsuarioServicio.modificar(req.body);
  if (!modificado) {
    res.status(404).json({ error: "Usuario no encontrado para modificar" });
    return;
  }
  res.json(modificado);
});
router6.delete("/eliminar/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const resultado = UsuarioServicio.eliminar(id);
  res.json(resultado);
});
var usuarios_default = router6;

// src/index.ts
var app = (0, import_express7.default)();
var PORT = 3e3;
app.use((0, import_cors.default)());
app.use(import_express7.default.json());
app.use(filtroSeguridad);
app.get("/v3/api-docs", (req, res) => {
  res.json(swaggerSpec);
});
app.use("/swagger-ui", ...import_swagger_ui_express.default.serve, import_swagger_ui_express.default.setup(swaggerSpec));
app.get("/swagger-ui.html", (req, res) => {
  res.redirect("/swagger-ui");
});
app.use("/api/festivos", festivos_default);
app.use("/api/calendario", calendario_default);
app.use("/api/paises", paises_default);
app.use("/api/tipos", tipos_default);
app.use("/api/TipoFestivos", tipoFestivos_default);
app.use("/api/usuarios", usuarios_default);
app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calendario Laboral API</title>
  <meta name="description" content="API REST para gesti\xF3n de calendario laboral y festivos">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #f8fafc;
      --card-bg: #ffffff;
      --border: #e2e8f0;
      --text: #0f172a;
      --text-muted: #64748b;
      --primary: #2563eb;
      --primary-hover: #1d4ed8;
      --success: #16a34a;
      --warning: #d97706;
      --danger: #dc2626;
      --radius: 12px;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', -apple-system, sans-serif; }
    body { background: var(--bg); color: var(--text); padding: 32px 20px; line-height: 1.5; }
    .container { max-width: 900px; margin: 0 auto; }
    header { margin-bottom: 28px; }
    h1 { font-size: 28px; font-weight: 700; color: #1e293b; letter-spacing: -0.02em; }
    p.subtitle { color: var(--text-muted); font-size: 15px; margin-top: 6px; }
    .nav-banner { display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap; }
    .btn-link { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; background: #e0e7ff; color: #3730a3; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 600; transition: background 0.15s; }
    .btn-link:hover { background: #c7d2fe; }
    .card { background: var(--card-bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
    .card h2 { font-size: 18px; font-weight: 600; margin-bottom: 16px; color: #1e293b; display: flex; align-items: center; justify-content: space-between; }
    .grid-form { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 16px; }
    label { display: block; font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 6px; }
    select, input { width: 100%; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px; outline: none; background: #fff; }
    select:focus, input:focus { border-color: var(--primary); ring: 2px rgba(37,99,235,0.2); }
    button.primary-btn { padding: 10px 20px; background: var(--primary); color: #fff; border: none; border-radius: 8px; font-weight: 600; font-size: 14px; cursor: pointer; transition: background 0.15s; }
    button.primary-btn:hover { background: var(--primary-hover); }
    .result-box { margin-top: 16px; padding: 16px; border-radius: 8px; font-size: 14px; display: none; }
    .result-festivo { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; font-weight: 600; }
    .result-no-festivo { background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px; }
    th { text-align: left; padding: 10px 14px; background: #f8fafc; color: #64748b; font-weight: 600; border-bottom: 1px solid var(--border); }
    td { padding: 10px 14px; border-bottom: 1px solid #f1f5f9; }
    tr:last-child td { border-bottom: none; }
    .badge { display: inline-block; padding: 3px 8px; border-radius: 6px; font-size: 12px; font-weight: 600; }
    .badge-festivo { background: #fee2e2; color: #b91c1c; }
    .badge-fin { background: #fef3c7; color: #b45309; }
    .badge-laboral { background: #dbeafe; color: #1d4ed8; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Calendario Laboral API</h1>
      <p class="subtitle">API REST migrada a Node.js + Express con soporte completo para c\xE1lculo de festivos por pa\xEDs, calendario laboral y documentaci\xF3n OpenAPI.</p>
    </header>

    <div class="nav-banner">
      <a href="/swagger-ui" class="btn-link" target="_blank">\u{1F4C4} Explorar Swagger UI / OpenAPI</a>
      <a href="/api/paises/listar" class="btn-link" target="_blank">\u{1F310} Listar Pa\xEDses (JSON)</a>
      <a href="/v3/api-docs" class="btn-link" target="_blank">\u2699\uFE0F OpenAPI Spec (JSON)</a>
    </div>

    <!-- M\xF3dulo 1: Verificar si es festivo -->
    <div class="card">
      <h2>1. Verificar si una fecha es festivo</h2>
      <div class="grid-form">
        <div>
          <label for="verificarPais">Pa\xEDs</label>
          <select id="verificarPais">
            <option value="1">Colombia</option>
            <option value="10">Ecuador</option>
          </select>
        </div>
        <div>
          <label for="verificarFecha">Fecha a verificar</label>
          <input type="date" id="verificarFecha" value="2024-03-29">
        </div>
      </div>
      <button class="primary-btn" onclick="verificarFestivo()">Consultar Fecha</button>
      <div id="resultadoVerificar" class="result-box"></div>
    </div>

    <!-- M\xF3dulo 2: Listar festivos del a\xF1o -->
    <div class="card">
      <h2>2. Festivos calculados del a\xF1o (con leyes y pascua)</h2>
      <div class="grid-form">
        <div>
          <label for="listarPais">Pa\xEDs</label>
          <select id="listarPais">
            <option value="1">Colombia</option>
            <option value="10">Ecuador</option>
          </select>
        </div>
        <div>
          <label for="listarA\xF1o">A\xF1o</label>
          <input type="number" id="listarA\xF1o" value="2024" min="1970" max="2100">
        </div>
      </div>
      <button class="primary-btn" onclick="cargarFestivos()">Listar Festivos</button>
      <div id="tablaFestivosContainer"></div>
    </div>

    <!-- M\xF3dulo 3: Generar Calendario Laboral -->
    <div class="card">
      <h2>3. Calendario laboral del a\xF1o</h2>
      <div class="grid-form">
        <div>
          <label for="calPais">Pa\xEDs</label>
          <select id="calPais">
            <option value="1">Colombia</option>
            <option value="10">Ecuador</option>
          </select>
        </div>
        <div>
          <label for="calA\xF1o">A\xF1o</label>
          <input type="number" id="calA\xF1o" value="2024" min="1970" max="2100">
        </div>
      </div>
      <button class="primary-btn" onclick="cargarCalendario()">Cargar Calendario Laboral</button>
      <div id="resumenCalendario" style="margin-top: 14px;"></div>
      <div id="tablaCalendarioContainer" style="max-height: 400px; overflow-y: auto; margin-top: 12px;"></div>
    </div>
  </div>

  <script>
    async function verificarFestivo() {
      const idPais = document.getElementById('verificarPais').value;
      const fechaVal = document.getElementById('verificarFecha').value;
      if (!fechaVal) return;
      const [a\xF1o, mes, dia] = fechaVal.split('-');
      const resEl = document.getElementById('resultadoVerificar');
      
      try {
        const res = await fetch('/api/festivos/verificar/' + idPais + '/' + parseInt(a\xF1o) + '/' + parseInt(mes) + '/' + parseInt(dia));
        const esFestivo = await res.json();
        resEl.style.display = 'block';
        if (esFestivo === true) {
          resEl.className = 'result-box result-festivo';
          resEl.innerHTML = '\u{1F389} La fecha <strong>' + fechaVal + '</strong> ES D\xCDA FESTIVO en el pa\xEDs seleccionado.';
        } else {
          resEl.className = 'result-box result-no-festivo';
          resEl.innerHTML = '\u{1F4C5} La fecha <strong>' + fechaVal + '</strong> NO es d\xEDa festivo (es d\xEDa normal).';
        }
      } catch (err) {
        resEl.style.display = 'block';
        resEl.className = 'result-box result-no-festivo';
        resEl.innerText = 'Error al consultar endpoint: ' + err.message;
      }
    }

    async function cargarFestivos() {
      const idPais = document.getElementById('listarPais').value;
      const a\xF1o = document.getElementById('listarA\xF1o').value;
      const container = document.getElementById('tablaFestivosContainer');
      container.innerHTML = '<p style="color:#64748b; padding:12px 0;">Cargando festivos...</p>';

      try {
        const res = await fetch('/api/festivos/listar/' + idPais + '/' + a\xF1o);
        const data = await res.json();
        if (!data || data.length === 0) {
          container.innerHTML = '<p style="color:#64748b; padding:12px 0;">No se encontraron festivos para ese a\xF1o.</p>';
          return;
        }
        let html = '<table><thead><tr><th>Nombre del Festivo</th><th>Fecha Calculada</th></tr></thead><tbody>';
        data.forEach(item => {
          html += '<tr><td><strong>' + item.nombre + '</strong></td><td><span class="badge badge-festivo">' + item.fecha + '</span></td></tr>';
        });
        html += '</tbody></table>';
        container.innerHTML = html;
      } catch (err) {
        container.innerHTML = '<p style="color:#dc2626;">Error: ' + err.message + '</p>';
      }
    }

    async function cargarCalendario() {
      const idPais = document.getElementById('calPais').value;
      const a\xF1o = document.getElementById('calA\xF1o').value;
      const container = document.getElementById('tablaCalendarioContainer');
      const resumen = document.getElementById('resumenCalendario');
      container.innerHTML = '<p style="color:#64748b; padding:12px 0;">Generando y consultando calendario...</p>';

      try {
        const res = await fetch('/api/calendario/listar/' + idPais + '/' + a\xF1o);
        const data = await res.json();
        
        let laborales = 0, fines = 0, festivos = 0;
        data.forEach(d => {
          if (d.tipo.id === 1) laborales++;
          else if (d.tipo.id === 2) fines++;
          else if (d.tipo.id === 3) festivos++;
        });

        resumen.innerHTML = '<div style="display:flex; gap:12px; flex-wrap:wrap;">' +
          '<span class="badge badge-laboral" style="padding:6px 12px; font-size:13px;">D\xEDas laborales: ' + laborales + '</span>' +
          '<span class="badge badge-fin" style="padding:6px 12px; font-size:13px;">Fines de semana: ' + fines + '</span>' +
          '<span class="badge badge-festivo" style="padding:6px 12px; font-size:13px;">D\xEDas festivos: ' + festivos + '</span>' +
          '</div>';

        let html = '<table><thead><tr><th>Fecha</th><th>D\xEDa</th><th>Tipo de D\xEDa</th></tr></thead><tbody>';
        data.forEach(item => {
          let badgeClass = item.tipo.id === 3 ? 'badge-festivo' : (item.tipo.id === 2 ? 'badge-fin' : 'badge-laboral');
          html += '<tr><td>' + item.fecha + '</td><td>' + item.descripcion + '</td><td><span class="badge ' + badgeClass + '">' + item.tipo.tipo.trim() + '</span></td></tr>';
        });
        html += '</tbody></table>';
        container.innerHTML = html;
      } catch (err) {
        container.innerHTML = '<p style="color:#dc2626;">Error: ' + err.message + '</p>';
      }
    }

    // Auto-load festivos on startup
    window.addEventListener('DOMContentLoaded', () => {
      cargarFestivos();
    });
  </script>
</body>
</html>`);
});
app.listen(PORT, "0.0.0.0", () => {
  console.log("Servidor corriendo en http://0.0.0.0:" + PORT);
  console.log("Documentaci\xF3n Swagger disponible en http://0.0.0.0:" + PORT + "/swagger-ui");
});
var index_default = app;
//# sourceMappingURL=server.cjs.map
