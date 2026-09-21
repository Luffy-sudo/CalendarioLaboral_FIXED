import { Usuario, UsuarioLoginDto } from '../types';
import { usuarios } from '../data/seed';
import { SeguridadServicio } from './seguridad';

export class UsuarioServicio {
  private static usuariosList: Usuario[] = [...usuarios];

  static login(nombreUsuario: string, clave: string): UsuarioLoginDto {
    const usuario = this.usuariosList.find(
      u => u.usuario.toLowerCase() === nombreUsuario.toLowerCase() && u.clave === clave
    );

    if (usuario && usuario.activo) {
      const token = SeguridadServicio.generarToken(usuario.usuario);
      return {
        id: usuario.id,
        usuario: usuario.usuario,
        nombre: usuario.nombre,
        token,
      };
    }

    return {
      mensaje: 'Usuario o contraseña incorrectos',
    };
  }

  static listar(): Usuario[] {
    return this.usuariosList.map(({ clave, ...u }) => ({ ...u }));
  }

  static obtener(id: number): Usuario | null {
    const user = this.usuariosList.find(u => u.id === Number(id));
    if (!user) return null;
    const { clave, ...rest } = user;
    return rest as Usuario;
  }

  static buscar(nombre: string): Usuario[] {
    const q = nombre.toLowerCase();
    return this.usuariosList
      .filter(u => u.nombre.toLowerCase().includes(q) || u.usuario.toLowerCase().includes(q))
      .map(({ clave, ...u }) => ({ ...u }));
  }

  static agregar(usuario: Omit<Usuario, 'id'> & { id?: number }): Usuario {
    const nextId = this.usuariosList.length > 0 ? Math.max(...this.usuariosList.map(u => u.id)) + 1 : 1;
    const nuevo: Usuario = {
      id: nextId,
      usuario: usuario.usuario,
      nombre: usuario.nombre,
      clave: usuario.clave || '123',
      activo: usuario.activo ?? true,
      roles: usuario.roles || 'USER',
    };
    this.usuariosList.push(nuevo);
    const { clave, ...rest } = nuevo;
    return rest as Usuario;
  }

  static modificar(usuario: Usuario): Usuario | null {
    const index = this.usuariosList.findIndex(u => u.id === Number(usuario.id));
    if (index === -1) return null;
    const existing = this.usuariosList[index];
    this.usuariosList[index] = {
      ...existing,
      ...usuario,
      clave: usuario.clave || existing.clave,
    };
    const { clave, ...rest } = this.usuariosList[index];
    return rest as Usuario;
  }

  static eliminar(id: number): boolean {
    const index = this.usuariosList.findIndex(u => u.id === Number(id));
    if (index === -1) return false;
    this.usuariosList.splice(index, 1);
    return true;
  }
}
