/* eslint-disable @angular-eslint/prefer-inject */
// src/app/pages/pago-form/pago-form.page.ts
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonBackButton,
  IonButtons,
} from '@ionic/angular';
import { Cliente } from '../../models/cliente.model';
import { Pago } from '../../models/pago.model';
import { PagoService } from '../../services/pago';

@Component({
  selector: 'app-pago-form',
  standalone: true,
  imports: [
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonBackButton,
    IonButtons,
  ],
  templateUrl: './pago-form.page.html',
  styleUrls: ['./pago-form.page.scss'],
})
export class PagoFormPage implements OnInit {
  cliente: Cliente | null = null;
  monto: number | null = null;

  constructor(
    private router: Router,
    private pagoService: PagoService
  ) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    const state = (nav?.extras.state as { cliente: Cliente } | undefined)
      ?? (history.state as { cliente: Cliente });

    if (!state?.cliente) {
      this.router.navigate(['/pages/agregar-cliente']);
      return;
    }
    this.cliente = state.cliente;
  }

  async pagar() {
    if (!this.cliente || !this.monto || this.monto <= 0) return;

    const pago: Pago = {
      clienteId: this.cliente.id,
      nombre: this.cliente.nombre,
      monto: this.monto,
      destino: 'Osito Pay',
      ultimosDigitos: this.cliente.ultimosDigitos,
      fecha: new Date(),
      numeroOperacion: this.pagoService.generarNumeroOperacion(),
    };

    await this.pagoService.guardarPago(pago);

    this.router.navigate(['/pages/pago-comprobante'], { state: { pago } });
  }
}