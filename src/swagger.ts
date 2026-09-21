export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'API Calendario Laboral',
    description: 'API REST para gestión de calendario laboral, cálculo y verificación de días festivos por país',
    version: '1.0.0',
  },
  servers: [
    {
      url: '/',
      description: 'Servidor Actual',
    },
  ],
  components: {
    securitySchemes: {
      Bearer: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Ingresa el token JWT obtenido del endpoint de validación',
      },
    },
    schemas: {
      FestivoDto: {
        type: 'object',
        properties: {
          nombre: { type: 'string', example: 'Año nuevo' },
          fecha: { type: 'string', format: 'date', example: '2024-01-01' },
        },
      },
      Festivo: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          idPais: { type: 'integer', example: 1 },
          nombre: { type: 'string', example: 'Año nuevo' },
          dia: { type: 'integer', example: 1 },
          mes: { type: 'integer', example: 1 },
          diasPascua: { type: 'integer', example: 0 },
          idTipo: { type: 'integer', example: 1 },
        },
      },
      Pais: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          nombre: { type: 'string', example: 'COLOMBIA' },
        },
      },
      Calendario: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          fecha: { type: 'string', format: 'date', example: '2024-01-01' },
          tipo: {
            type: 'object',
            properties: {
              id: { type: 'integer', example: 3 },
              tipo: { type: 'string', example: 'Día festivo ' },
            },
          },
          descripcion: { type: 'string', example: 'Lunes' },
          pais: {
            type: 'object',
            properties: {
              id: { type: 'integer', example: 1 },
              nombre: { type: 'string', example: 'COLOMBIA' },
            },
          },
        },
      },
      Usuario: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          usuario: { type: 'string', example: 'frayosorio' },
          nombre: { type: 'string', example: 'Fray León Osorio Rivera' },
          activo: { type: 'boolean', example: true },
          roles: { type: 'string', example: 'ADMIN' },
        },
      },
    },
  },
  paths: {
    '/api/festivos/verificar/{idPais}/{año}/{mes}/{dia}': {
      get: {
        tags: ['Festivos'],
        summary: 'Verificar si una fecha es festivo en un país',
        parameters: [
          { name: 'idPais', in: 'path', required: true, schema: { type: 'integer', default: 1 } },
          { name: 'año', in: 'path', required: true, schema: { type: 'integer', default: 2024 } },
          { name: 'mes', in: 'path', required: true, schema: { type: 'integer', default: 1 } },
          { name: 'dia', in: 'path', required: true, schema: { type: 'integer', default: 1 } },
        ],
        responses: {
          200: {
            description: 'Retorna true si es festivo, false si no',
            content: { 'application/json': { schema: { type: 'boolean' } } },
          },
        },
      },
    },
    '/api/festivos/listar/{idPais}/{año}': {
      get: {
        tags: ['Festivos'],
        summary: 'Listar todos los festivos calculados para un país y año',
        parameters: [
          { name: 'idPais', in: 'path', required: true, schema: { type: 'integer', default: 1 } },
          { name: 'año', in: 'path', required: true, schema: { type: 'integer', default: 2024 } },
        ],
        responses: {
          200: {
            description: 'Lista de festivos del año',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/FestivoDto' } } } },
          },
        },
      },
    },
    '/api/festivos/listar': {
      get: {
        tags: ['Festivos'],
        summary: 'Listar catálogo de definiciones de festivos',
        responses: {
          200: {
            description: 'Lista de festivos base',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Festivo' } } } },
          },
        },
      },
    },
    '/api/calendario/generar/{idPais}/{año}': {
      get: {
        tags: ['Calendario'],
        summary: 'Generar calendario laboral anual para un país',
        parameters: [
          { name: 'idPais', in: 'path', required: true, schema: { type: 'integer', default: 1 } },
          { name: 'año', in: 'path', required: true, schema: { type: 'integer', default: 2024 } },
        ],
        responses: {
          200: {
            description: 'Resultado de la generación (true si fue exitoso)',
            content: { 'application/json': { schema: { type: 'boolean' } } },
          },
        },
      },
    },
    '/api/calendario/listar/{idPais}/{año}': {
      get: {
        tags: ['Calendario'],
        summary: 'Listar calendario laboral anual clasificado (laboral, fin de semana, festivo)',
        parameters: [
          { name: 'idPais', in: 'path', required: true, schema: { type: 'integer', default: 1 } },
          { name: 'año', in: 'path', required: true, schema: { type: 'integer', default: 2024 } },
        ],
        responses: {
          200: {
            description: 'Lista detallada de fechas del calendario',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Calendario' } } } },
          },
        },
      },
    },
    '/api/paises/listar': {
      get: {
        tags: ['Países'],
        summary: 'Listar todos los países',
        responses: {
          200: {
            description: 'Lista de países',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Pais' } } } },
          },
        },
      },
    },
    '/api/usuarios/validar/{nombreUsuario}/{clave}': {
      get: {
        tags: ['Usuarios'],
        summary: 'Validar credenciales y obtener token JWT',
        parameters: [
          { name: 'nombreUsuario', in: 'path', required: true, schema: { type: 'string', default: 'frayosorio' } },
          { name: 'clave', in: 'path', required: true, schema: { type: 'string', default: '123' } },
        ],
        responses: {
          200: {
            description: 'Datos del usuario autenticado con su token JWT',
            content: { 'application/json': { schema: { type: 'object' } } },
          },
        },
      },
    },
    '/api/usuarios/listar': {
      get: {
        tags: ['Usuarios'],
        summary: 'Listar usuarios registrados',
        responses: {
          200: {
            description: 'Lista de usuarios',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Usuario' } } } },
          },
        },
      },
    },
  },
};
