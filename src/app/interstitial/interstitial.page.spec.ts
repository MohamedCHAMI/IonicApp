import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InterstitialPage } from './interstitial.page';

describe('InterstitialPage', () => {
  let component: InterstitialPage;
  let fixture: ComponentFixture<InterstitialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterstitialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InterstitialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
