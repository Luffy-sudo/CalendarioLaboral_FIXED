import { Router, Request, Response } from 'express';
import { TipoServicio } from '../services/tipos';

const router = Router();

router.get('/listar', (req: Request, res: Response) => {
  res.json(TipoServicio.listar());
});

router.get('/obtener/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const tipo = TipoServicio.obtener(id);
  if (!tipo) {
    res.status(404).json({ error: 'Tipo no encontrado' });
    return;
  }
  res.json(tipo);
});

router.get('/buscar/:nombre', (req: Request, res: Response) => {
  res.json(TipoServicio.buscar(req.params.nombre));
});

router.post('/agregar', (req: Request, res: Response) => {
  const nuevo = TipoServicio.agregar(req.body);
  res.status(201).json(nuevo);
});

router.put('/modificar', (req: Request, res: Response) => {
  const modificado = TipoServicio.modificar(req.body);
  if (!modificado) {
    res.status(404).json({ error: 'Tipo no encontrado para modificar' });
    return;
  }
  res.json(modificado);
});

router.delete('/eliminar/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const resultado = TipoServicio.eliminar(id);
  res.json(resultado);
});

export default router;
