import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionUploadsComponent } from './transaction-uploads.component';

describe('TransactionUploadsComponent', () => {
  let component: TransactionUploadsComponent;
  let fixture: ComponentFixture<TransactionUploadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionUploadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionUploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
