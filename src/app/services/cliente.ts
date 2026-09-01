/* eslint-disable @angular-eslint/prefer-inject */
// src/app/services/cliente.service.ts
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Cliente } from '../models/cliente.model';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private _storage: Storage | null = null;
  private readonly KEY = 'clientes';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  private async ready() {
    if (!this._storage) await this.init();
  }

  async agregarCliente(cliente: Omit<Cliente, 'id'>): Promise<Cliente> {
    await this.ready();
    const clientes = await this.obtenerClientes();
    const nuevo: Cliente = { ...cliente, id: Date.now().toString() };
    clientes.push(nuevo);
    await this._storage?.set(this.KEY, clientes);
    return nuevo;
  }

  async obtenerClientes(): Promise<Cliente[]> {
    await this.ready();
    const data = await this._storage?.get(this.KEY);
    return data ?? [];
  }

  async obtenerClientePorId(id: string): Promise<Cliente | undefined> {
    const clientes = await this.obtenerClientes();
    return clientes.find(c => c.id === id);
  }

  async eliminarCliente(id: string) {
    await this.ready();
    const clientes = await this.obtenerClientes();
    const filtrados = clientes.filter(c => c.id !== id);
    await this._storage?.set(this.KEY, filtrados);
  }
}