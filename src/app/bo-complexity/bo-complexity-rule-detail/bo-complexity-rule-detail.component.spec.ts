import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoComplexityRuleDetailComponent } from './bo-complexity-rule-detail.component';

describe('BoComplexityRuleDetailComponent', () => {
  let component: BoComplexityRuleDetailComponent;
  let fixture: ComponentFixture<BoComplexityRuleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoComplexityRuleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoComplexityRuleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
