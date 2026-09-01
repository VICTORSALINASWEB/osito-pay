/* eslint-disable @angular-eslint/prefer-inject */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent
} from '@ionic/angular';
import { Pago } from '../../models/pago.model'; 

@Component({
  selector: 'app-pago-comprobante',
  standalone: true,
  imports: [CommonModule, IonContent],
  templateUrl: './pago-comprobante.page.html',
  styleUrls: ['./pago-comprobante.page.scss'],
})
export class PagoComprobantePage {
  pago: Pago | null = null;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = (nav?.extras.state as { pago: Pago } | undefined)
      ?? (history.state as { pago: Pago });

    if (!state?.pago) {
      this.router.navigate(['/pages/agregar-cliente']);
      return;
    }
    this.pago = state.pago;
  }

  irInicio() {
    this.router.navigate(['/pages/agregar-cliente']);
  }
}
