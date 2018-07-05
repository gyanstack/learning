import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanCodesComponent } from './loan-codes.component';

describe('LoanCodesComponent', () => {
  let component: LoanCodesComponent;
  let fixture: ComponentFixture<LoanCodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanCodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
