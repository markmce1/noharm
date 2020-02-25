import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RPGPage } from './rpg.page';

describe('RPGPage', () => {
  let component: RPGPage;
  let fixture: ComponentFixture<RPGPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RPGPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RPGPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
