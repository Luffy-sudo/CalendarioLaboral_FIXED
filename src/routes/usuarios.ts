import { Router, Request, Response } from 'express';
import { UsuarioServicio } from '../services/usuarios';

const router = Router();

router.get('/validar/:nombreUsuario/:clave', (req: Request, res: Response) => {
  const { nombreUsuario, clave } = req.params;
  const loginResult = UsuarioServicio.login(nombreUsuario, clave);
  res.json(loginResult);
});

router.get('/listar', (req: Request, res: Response) => {
  res.json(UsuarioServicio.listar());
});

router.get('/obtener/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const usuario = UsuarioServicio.obtener(id);
  if (!usuario) {
    res.status(404).json({ error: 'Usuario no encontrado' });
    return;
  }
  res.json(usuario);
});

router.get('/buscar/:nombre', (req: Request, res: Response) => {
  res.json(UsuarioServicio.buscar(req.params.nombre));
});

router.post('/agregar', (req: Request, res: Response) => {
  const nuevo = UsuarioServicio.agregar(req.body);
  res.status(201).json(nuevo);
});

router.put('/modificar', (req: Request, res: Response) => {
  const modificado = UsuarioServicio.modificar(req.body);
  if (!modificado) {
    res.status(404).json({ error: 'Usuario no encontrado para modificar' });
    return;
  }
  res.json(modificado);
});

router.delete('/eliminar/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const resultado = UsuarioServicio.eliminar(id);
  res.json(resultado);
});

export default router;
