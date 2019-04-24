import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskAllocationComponent } from './risk-allocation.component';

describe('RiskAllocationComponent', () => {
  let component: RiskAllocationComponent;
  let fixture: ComponentFixture<RiskAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
