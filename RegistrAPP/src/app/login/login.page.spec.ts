import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { ApiService } from '../api.service'; // Servicio API
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Módulo de pruebas para HttpClient

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa HttpClientTestingModule
      declarations: [LoginPage],
      providers: [ApiService], // Proveer ApiService
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a login method', () => {
    expect(component.login).toBeDefined();
  });

  it('should have a ingresar method', () => {
    expect(component.ingresar).toBeDefined();
  });

});
