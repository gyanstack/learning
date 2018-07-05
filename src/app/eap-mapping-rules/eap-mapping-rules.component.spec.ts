import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EapMappingRulesComponent } from './eap-mapping-rules.component';

describe('EapMappingRulesComponent', () => {
  let component: EapMappingRulesComponent;
  let fixture: ComponentFixture<EapMappingRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EapMappingRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EapMappingRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
