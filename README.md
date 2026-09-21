# Calendario Laboral API

API REST para la gestión de calendario laboral, festivos y cálculo de fechas para diferentes países (Colombia, Ecuador, etc.).

Migrada de Java / Spring Boot a Node.js + Express con soporte completo de tipos TypeScript, cálculo de días festivos mediante la Ley Emiliani (Ley 51 de 1983) y algoritmos de Pascua, y documentación interactiva OpenAPI / Swagger UI.

## Endpoints Principales

- `GET /api/festivos/verificar/{idPais}/{año}/{mes}/{dia}`: Verifica si una fecha específica es día festivo.
- `GET /api/festivos/listar/{idPais}/{año}`: Retorna la lista de festivos calculados para un país y año determinado.
- `GET /api/festivos/listar`: Retorna el catálogo base de festivos.
- `GET /api/calendario/generar/{idPais}/{año}`: Genera el calendario laboral del año.
- `GET /api/calendario/listar/{idPais}/{año}`: Lista los 365/366 días clasificados en días laborales, fines de semana y festivos.
- `GET /api/paises/listar`: Lista todos los países registrados.
- `GET /api/usuarios/validar/{nombreUsuario}/{clave}`: Valida credenciales y genera token JWT.
- `GET /swagger-ui`: Documentación interactiva Swagger / OpenAPI.

## Ejecución

- Desarrollo: `npm run dev`
- Compilación: `npm run build`
- Inicio: `npm start`
