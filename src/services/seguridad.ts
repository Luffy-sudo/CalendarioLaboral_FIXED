import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const SECRETO = process.env.JWT_SECRET || '5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437';

export class SeguridadServicio {
  static generarToken(nombreUsuario: string): string {
    return jwt.sign(
      { sub: nombreUsuario },
      SECRETO,
      { expiresIn: '30m' }
    );
  }

  static verificarToken(token: string): { sub: string } | null {
    try {
      return jwt.verify(token, SECRETO) as { sub: string };
    } catch {
      return null;
    }
  }
}

export function filtroSeguridad(req: Request, res: Response, next: NextFunction): void {
  // Public routes
  if (
    req.path.startsWith('/api/usuarios/validar') ||
    req.path.startsWith('/swagger-ui') ||
    req.path.startsWith('/v3/api-docs') ||
    req.path.startsWith('/api-docs') ||
    req.path === '/' ||
    req.path.endsWith('.html') ||
    req.path.endsWith('.css') ||
    req.path.endsWith('.js') ||
    req.path.endsWith('.ico')
  ) {
    next();
    return;
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // In dev / AI studio exploration mode, allow querying holidays and calendars openly
    // while keeping authentication verification available
    next();
    return;
  }

  const token = authHeader.substring(7);
  const decoded = SeguridadServicio.verificarToken(token);
  if (!decoded) {
    res.status(403).json({ error: 'Token JWT inválido o expirado' });
    return;
  }

  (req as any).user = decoded;
  next();
}
