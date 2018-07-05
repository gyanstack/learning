import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealCodesComponent } from './deal-codes.component';

describe('DealCodesComponent', () => {
  let component: DealCodesComponent;
  let fixture: ComponentFixture<DealCodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealCodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
