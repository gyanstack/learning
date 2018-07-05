import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoComplexityRulesComponent } from './bo-complexity-rules.component';

describe('BoComplexityRulesComponent', () => {
  let component: BoComplexityRulesComponent;
  let fixture: ComponentFixture<BoComplexityRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoComplexityRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoComplexityRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
