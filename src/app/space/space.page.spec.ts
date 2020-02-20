import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpacePage } from './space.page';

describe('SpacePage', () => {
  let component: SpacePage;
  let fixture: ComponentFixture<SpacePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpacePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
