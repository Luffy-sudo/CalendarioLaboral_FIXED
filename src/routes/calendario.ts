import { Router, Request, Response } from 'express';
import { CalendarioServicio } from '../services/calendario';

const router = Router();

router.get('/generar/:idPais/:anio', (req: Request, res: Response) => {
  const idPais = parseInt(req.params.idPais, 10);
  const anio = parseInt(req.params.anio, 10);

  if (isNaN(idPais) || isNaN(anio)) {
    res.status(400).json({ error: 'Parámetros inválidos' });
    return;
  }

  const resultado = CalendarioServicio.generar(idPais, anio);
  res.json(resultado);
});

router.get('/listar/:idPais/:anio', (req: Request, res: Response) => {
  const idPais = parseInt(req.params.idPais, 10);
  const anio = parseInt(req.params.anio, 10);

  if (isNaN(idPais) || isNaN(anio)) {
    res.status(400).json({ error: 'Parámetros inválidos' });
    return;
  }

  const calendario = CalendarioServicio.listar(idPais, anio);
  res.json(calendario);
});

export default router;
