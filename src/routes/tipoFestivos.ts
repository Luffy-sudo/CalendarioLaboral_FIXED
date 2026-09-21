import { Router, Request, Response } from 'express';
import { TipoFestivoServicio } from '../services/tipoFestivos';

const router = Router();

router.get('/listar', (req: Request, res: Response) => {
  res.json(TipoFestivoServicio.listar());
});

router.get('/obtener/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const tipoFestivo = TipoFestivoServicio.obtener(id);
  if (!tipoFestivo) {
    res.status(404).json({ error: 'TipoFestivo no encontrado' });
    return;
  }
  res.json(tipoFestivo);
});

router.get('/buscar/:nombre', (req: Request, res: Response) => {
  res.json(TipoFestivoServicio.buscar(req.params.nombre));
});

router.post('/agregar', (req: Request, res: Response) => {
  const nuevo = TipoFestivoServicio.agregar(req.body);
  res.status(201).json(nuevo);
});

router.put('/modificar', (req: Request, res: Response) => {
  const modificado = TipoFestivoServicio.modificar(req.body);
  if (!modificado) {
    res.status(404).json({ error: 'TipoFestivo no encontrado para modificar' });
    return;
  }
  res.json(modificado);
});

router.delete('/eliminar/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const resultado = TipoFestivoServicio.eliminar(id);
  res.json(resultado);
});

export default router;
