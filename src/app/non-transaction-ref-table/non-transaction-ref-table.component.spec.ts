import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonTransactionRefTableComponent } from './non-transaction-ref-table.component';

describe('NonTransactionRefTableComponent', () => {
  let component: NonTransactionRefTableComponent;
  let fixture: ComponentFixture<NonTransactionRefTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonTransactionRefTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonTransactionRefTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
