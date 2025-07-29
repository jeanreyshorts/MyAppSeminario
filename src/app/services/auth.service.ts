import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  // Inicializar Storage
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Registrar usuario (guardar en storage)
  async register(email: string, password: string): Promise<void> {
    if (!this._storage) {
      await this.init();
    }
    // Guardar usuario simple (puedes mejorar seguridad)
    await this._storage?.set('user', { email, password });
  }

  // Login: validar usuario y contraseña
  async login(email: string, password: string): Promise<boolean> {
    if (!this._storage) {
      await this.init();
    }
    const user = await this._storage?.get('user');
    if (user && user.email === email && user.password === password) {
      return true;
    }
    return false;
  }

  // Método para obtener usuario logueado (opcional)
  async getUser() {
    if (!this._storage) {
      await this.init();
    }
    return await this._storage?.get('user');
  }

  // Logout (eliminar usuario)
  async logout() {
    if (!this._storage) {
      await this.init();
    }
    await this._storage?.remove('user');
  }
}
