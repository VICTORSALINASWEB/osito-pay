/* eslint-disable @angular-eslint/prefer-inject */
// src/app/services/pago.service.ts
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Pago } from '../models/pago.model';

@Injectable({ providedIn: 'root' })
export class PagoService {
  private _storage: Storage | null = null;
  private readonly KEY = 'pagos';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  private async ready() {
    if (!this._storage) await this.init();
  }

  generarNumeroOperacion(): string {
    return Math.floor(100000000 + Math.random() * 900000000).toString();
  }

  async guardarPago(pago: Pago) {
    await this.ready();
    const pagos = await this.obtenerPagos();
    pagos.push(pago);
    await this._storage?.set(this.KEY, pagos);
  }

  async obtenerPagos(): Promise<Pago[]> {
    await this.ready();
    const data = await this._storage?.get(this.KEY);
    return data ?? [];
  }
}