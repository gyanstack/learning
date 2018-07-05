import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoComplexityRulesCenterComponent } from './bo-complexity-rules-center.component';

describe('BoComplexityRulesCenterComponent', () => {
  let component: BoComplexityRulesCenterComponent;
  let fixture: ComponentFixture<BoComplexityRulesCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoComplexityRulesCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoComplexityRulesCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
