/* eslint-disable @angular-eslint/prefer-inject */
// src/app/pages/agregar-cliente/agregar-cliente.page.ts
import { Component, NgZone, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {   IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonList,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  AlertController, } from '@ionic/angular';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-agregar-cliente',
  standalone: true,
  imports: [ CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonList,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,],
  templateUrl: './agregar-cliente.page.html',
  styleUrls: ['./agregar-cliente.page.scss'],
})
export class AgregarClientePage implements OnInit {
  nombre = '';
  ultimosDigitos = '';
  clientes = signal<Cliente[]>([]);

  constructor(
    private clienteService: ClienteService,
    private alertCtrl: AlertController,
    private router: Router 
  ) {}

  async ngOnInit() {
    await this.cargarClientes();
  }

  async cargarClientes() {
   const data = await this.clienteService.obtenerClientes();
    this.clientes.set(data);
  }

  async guardar() {
    if (!this.nombre.trim() || this.ultimosDigitos.length !== 3) {
      this.mostrarAlerta('Completa el nombre y los 3 últimos dígitos.');
      return;
    }

    await this.clienteService.agregarCliente({
      nombre: this.nombre.trim(),
      ultimosDigitos: this.ultimosDigitos,
    });

    setTimeout( async () => {
      
      this.nombre = '';
      this.ultimosDigitos = '';
      await this.cargarClientes();
    }, 100);
  }

  async eliminar(id: string) {
    await this.clienteService.eliminarCliente(id);
    await this.cargarClientes();
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Atención',
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  irAPagoForm(cliente: Cliente) {
    this.router.navigate(['/pages/pago-form'], { state: { cliente } });
  }
}