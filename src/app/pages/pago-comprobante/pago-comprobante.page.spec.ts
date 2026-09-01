import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoComprobantePage } from './pago-comprobante.page';

describe('PagoComprobantePage', () => {
  let component: PagoComprobantePage;
  let fixture: ComponentFixture<PagoComprobantePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoComprobantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
