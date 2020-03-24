import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DodgePage } from './dodge.page';

describe('DodgePage', () => {
  let component: DodgePage;
  let fixture: ComponentFixture<DodgePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodgePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DodgePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
