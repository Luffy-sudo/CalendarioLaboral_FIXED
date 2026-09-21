import { Router, Request, Response } from 'express';
import { FestivoServicio } from '../services/festivos';

const router = Router();

router.get('/listar', (req: Request, res: Response) => {
  res.json(FestivoServicio.listar());
});

router.get('/obtener/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const festivo = FestivoServicio.obtener(id);
  if (!festivo) {
    res.status(404).json({ error: 'Festivo no encontrado' });
    return;
  }
  res.json(festivo);
});

router.get('/buscar/:nombre', (req: Request, res: Response) => {
  res.json(FestivoServicio.buscar(req.params.nombre));
});

router.post('/agregar', (req: Request, res: Response) => {
  const nuevo = FestivoServicio.agregar(req.body);
  res.status(201).json(nuevo);
});

router.put('/modificar', (req: Request, res: Response) => {
  const modificado = FestivoServicio.modificar(req.body);
  if (!modificado) {
    res.status(404).json({ error: 'Festivo no encontrado para modificar' });
    return;
  }
  res.json(modificado);
});

router.delete('/eliminar/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const resultado = FestivoServicio.eliminar(id);
  res.json(resultado);
});

router.get('/verificar/:idPais/:anio/:mes/:dia', (req: Request, res: Response) => {
  const idPais = parseInt(req.params.idPais, 10);
  const anio = parseInt(req.params.anio, 10);
  const mes = parseInt(req.params.mes, 10);
  const dia = parseInt(req.params.dia, 10);

  if (isNaN(idPais) || isNaN(anio) || isNaN(mes) || isNaN(dia) || mes < 1 || mes > 12 || dia < 1 || dia > 31) {
    res.status(400).send('Fecha inválida');
    return;
  }

  const esFestivo = FestivoServicio.verificar(idPais, anio, mes, dia);
  res.json(esFestivo);
});

router.get('/listar/:idPais/:anio', (req: Request, res: Response) => {
  const idPais = parseInt(req.params.idPais, 10);
  const anio = parseInt(req.params.anio, 10);

  if (isNaN(idPais) || isNaN(anio)) {
    res.status(400).json({ error: 'Parámetros inválidos' });
    return;
  }

  const lista = FestivoServicio.listarPorPais(idPais, anio);
  res.json(lista);
});

export default router;
