import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessBankingWorkflowDataComponent } from './business-banking-workflow-data.component';

describe('BusinessBankingWorkflowDataComponent', () => {
  let component: BusinessBankingWorkflowDataComponent;
  let fixture: ComponentFixture<BusinessBankingWorkflowDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessBankingWorkflowDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessBankingWorkflowDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
