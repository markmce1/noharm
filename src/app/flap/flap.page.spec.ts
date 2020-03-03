import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FlapPage } from './flap.page';

describe('FlapPage', () => {
  let component: FlapPage;
  let fixture: ComponentFixture<FlapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FlapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
