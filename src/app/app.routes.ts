// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'pages/agregar-cliente', pathMatch: 'full' },
  { path: 'pages/pago-form', loadComponent: () => import('./pages/pago-form/pago-form.page').then(m => m.PagoFormPage) },
  { path: 'pages/pago-comprobante', loadComponent: () => import('./pages/pago-comprobante/pago-comprobante.page').then(m => m.PagoComprobantePage) },
  { path: 'pages/agregar-cliente', loadComponent: () => import('./pages/agregar-cliente/agregar-cliente.page').then(m => m.AgregarClientePage) },
  { path: 'pages/listado-clientes', loadComponent: () => import('./pages/listado-clientes/listado-clientes.page').then(m => m.ListadoClientesPage) },
  {path: '**',redirectTo: 'pages/agregar-cliente'}
];
