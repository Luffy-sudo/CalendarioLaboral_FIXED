import { Router, Request, Response } from 'express';
import { PaisServicio } from '../services/paises';

const router = Router();

router.get('/listar', (req: Request, res: Response) => {
  res.json(PaisServicio.listar());
});

router.get('/obtener/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const pais = PaisServicio.obtener(id);
  if (!pais) {
    res.status(404).json({ error: 'País no encontrado' });
    return;
  }
  res.json(pais);
});

router.get('/buscar/:nombre', (req: Request, res: Response) => {
  res.json(PaisServicio.buscar(req.params.nombre));
});

router.post('/agregar', (req: Request, res: Response) => {
  const nuevo = PaisServicio.agregar(req.body);
  res.status(201).json(nuevo);
});

router.put('/modificar', (req: Request, res: Response) => {
  const modificado = PaisServicio.modificar(req.body);
  if (!modificado) {
    res.status(404).json({ error: 'País no encontrado para modificar' });
    return;
  }
  res.json(modificado);
});

router.delete('/eliminar/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const resultado = PaisServicio.eliminar(id);
  res.json(resultado);
});

export default router;
