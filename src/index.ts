import express, { Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import { filtroSeguridad } from './services/seguridad';

import festivosRouter from './routes/festivos';
import calendarioRouter from './routes/calendario';
import paisesRouter from './routes/paises';
import tiposRouter from './routes/tipos';
import tipoFestivosRouter from './routes/tipoFestivos';
import usuariosRouter from './routes/usuarios';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(filtroSeguridad);

// Swagger Documentation endpoints matching Spring Boot OpenAPI spec
app.get('/v3/api-docs', (req: Request, res: Response) => {
  res.json(swaggerSpec);
});
app.use('/swagger-ui', ...(swaggerUi.serve as any), swaggerUi.setup(swaggerSpec) as any);
app.get('/swagger-ui.html', (req: Request, res: Response) => {
  res.redirect('/swagger-ui');
});

// API Routes
app.use('/api/festivos', festivosRouter);
app.use('/api/calendario', calendarioRouter);
app.use('/api/paises', paisesRouter);
app.use('/api/tipos', tiposRouter);
app.use('/api/TipoFestivos', tipoFestivosRouter);
app.use('/api/usuarios', usuariosRouter);

// Interactive web client for testing API in AI Studio preview
app.get('/', (req: Request, res: Response) => {
  res.send(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calendario Laboral API</title>
  <meta name="description" content="API REST para gestión de calendario laboral y festivos">
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
      <p class="subtitle">API REST migrada a Node.js + Express con soporte completo para cálculo de festivos por país, calendario laboral y documentación OpenAPI.</p>
    </header>

    <div class="nav-banner">
      <a href="/swagger-ui" class="btn-link" target="_blank">📄 Explorar Swagger UI / OpenAPI</a>
      <a href="/api/paises/listar" class="btn-link" target="_blank">🌐 Listar Países (JSON)</a>
      <a href="/v3/api-docs" class="btn-link" target="_blank">⚙️ OpenAPI Spec (JSON)</a>
    </div>

    <!-- Módulo 1: Verificar si es festivo -->
    <div class="card">
      <h2>1. Verificar si una fecha es festivo</h2>
      <div class="grid-form">
        <div>
          <label for="verificarPais">País</label>
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

    <!-- Módulo 2: Listar festivos del año -->
    <div class="card">
      <h2>2. Festivos calculados del año (con leyes y pascua)</h2>
      <div class="grid-form">
        <div>
          <label for="listarPais">País</label>
          <select id="listarPais">
            <option value="1">Colombia</option>
            <option value="10">Ecuador</option>
          </select>
        </div>
        <div>
          <label for="listarAño">Año</label>
          <input type="number" id="listarAño" value="2024" min="1970" max="2100">
        </div>
      </div>
      <button class="primary-btn" onclick="cargarFestivos()">Listar Festivos</button>
      <div id="tablaFestivosContainer"></div>
    </div>

    <!-- Módulo 3: Generar Calendario Laboral -->
    <div class="card">
      <h2>3. Calendario laboral del año</h2>
      <div class="grid-form">
        <div>
          <label for="calPais">País</label>
          <select id="calPais">
            <option value="1">Colombia</option>
            <option value="10">Ecuador</option>
          </select>
        </div>
        <div>
          <label for="calAño">Año</label>
          <input type="number" id="calAño" value="2024" min="1970" max="2100">
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
      const [año, mes, dia] = fechaVal.split('-');
      const resEl = document.getElementById('resultadoVerificar');
      
      try {
        const res = await fetch('/api/festivos/verificar/' + idPais + '/' + parseInt(año) + '/' + parseInt(mes) + '/' + parseInt(dia));
        const esFestivo = await res.json();
        resEl.style.display = 'block';
        if (esFestivo === true) {
          resEl.className = 'result-box result-festivo';
          resEl.innerHTML = '🎉 La fecha <strong>' + fechaVal + '</strong> ES DÍA FESTIVO en el país seleccionado.';
        } else {
          resEl.className = 'result-box result-no-festivo';
          resEl.innerHTML = '📅 La fecha <strong>' + fechaVal + '</strong> NO es día festivo (es día normal).';
        }
      } catch (err) {
        resEl.style.display = 'block';
        resEl.className = 'result-box result-no-festivo';
        resEl.innerText = 'Error al consultar endpoint: ' + err.message;
      }
    }

    async function cargarFestivos() {
      const idPais = document.getElementById('listarPais').value;
      const año = document.getElementById('listarAño').value;
      const container = document.getElementById('tablaFestivosContainer');
      container.innerHTML = '<p style="color:#64748b; padding:12px 0;">Cargando festivos...</p>';

      try {
        const res = await fetch('/api/festivos/listar/' + idPais + '/' + año);
        const data = await res.json();
        if (!data || data.length === 0) {
          container.innerHTML = '<p style="color:#64748b; padding:12px 0;">No se encontraron festivos para ese año.</p>';
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
      const año = document.getElementById('calAño').value;
      const container = document.getElementById('tablaCalendarioContainer');
      const resumen = document.getElementById('resumenCalendario');
      container.innerHTML = '<p style="color:#64748b; padding:12px 0;">Generando y consultando calendario...</p>';

      try {
        const res = await fetch('/api/calendario/listar/' + idPais + '/' + año);
        const data = await res.json();
        
        let laborales = 0, fines = 0, festivos = 0;
        data.forEach(d => {
          if (d.tipo.id === 1) laborales++;
          else if (d.tipo.id === 2) fines++;
          else if (d.tipo.id === 3) festivos++;
        });

        resumen.innerHTML = '<div style="display:flex; gap:12px; flex-wrap:wrap;">' +
          '<span class="badge badge-laboral" style="padding:6px 12px; font-size:13px;">Días laborales: ' + laborales + '</span>' +
          '<span class="badge badge-fin" style="padding:6px 12px; font-size:13px;">Fines de semana: ' + fines + '</span>' +
          '<span class="badge badge-festivo" style="padding:6px 12px; font-size:13px;">Días festivos: ' + festivos + '</span>' +
          '</div>';

        let html = '<table><thead><tr><th>Fecha</th><th>Día</th><th>Tipo de Día</th></tr></thead><tbody>';
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

app.listen(PORT, '0.0.0.0', () => {
  console.log('Servidor corriendo en http://0.0.0.0:' + PORT);
  console.log('Documentación Swagger disponible en http://0.0.0.0:' + PORT + '/swagger-ui');
});

export default app;
