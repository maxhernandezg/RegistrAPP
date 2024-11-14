import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../api.service'; // Servicio API
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClasesComponent } from './clases.component';

describe('ClasesComponent', () => {
  let component: ClasesComponent;
  let fixture: ComponentFixture<ClasesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasesComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      providers: [ ApiService ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
