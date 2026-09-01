// src/app/models/pago.model.ts
export interface Pago {
  clienteId: string;
  nombre: string;
  monto: number;
  destino: string;        // "Osito Pay"
  ultimosDigitos: string;
  fecha: Date;
  numeroOperacion: string;
}