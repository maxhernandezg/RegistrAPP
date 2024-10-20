import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocenteHomePage } from './docente-home.page';

describe('DocenteHomePage', () => {
  let component: DocenteHomePage;
  let fixture: ComponentFixture<DocenteHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
