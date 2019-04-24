import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskReturnsComponent } from './risk-returns.component';

describe('RiskReturnsComponent', () => {
  let component: RiskReturnsComponent;
  let fixture: ComponentFixture<RiskReturnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskReturnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
