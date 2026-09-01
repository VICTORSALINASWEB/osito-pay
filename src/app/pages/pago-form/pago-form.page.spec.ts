import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoFormPage } from './pago-form.page';

describe('PagoFormPage', () => {
  let component: PagoFormPage;
  let fixture: ComponentFixture<PagoFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
