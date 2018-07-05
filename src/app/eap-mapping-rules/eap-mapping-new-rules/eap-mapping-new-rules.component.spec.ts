import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EapMappingNewRulesComponent } from './eap-mapping-new-rules.component';

describe('EapMappingNewRulesComponent', () => {
  let component: EapMappingNewRulesComponent;
  let fixture: ComponentFixture<EapMappingNewRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EapMappingNewRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EapMappingNewRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
