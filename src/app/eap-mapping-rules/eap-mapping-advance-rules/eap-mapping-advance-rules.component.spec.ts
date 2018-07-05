import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EapMappingAdvanceRulesComponent } from './eap-mapping-advance-rules.component';

describe('EapMappingAdvanceRulesComponent', () => {
  let component: EapMappingAdvanceRulesComponent;
  let fixture: ComponentFixture<EapMappingAdvanceRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EapMappingAdvanceRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EapMappingAdvanceRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
