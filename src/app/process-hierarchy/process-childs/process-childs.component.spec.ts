import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessChildsComponent } from './process-childs.component';

describe('ProcessChildsComponent', () => {
  let component: ProcessChildsComponent;
  let fixture: ComponentFixture<ProcessChildsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessChildsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessChildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
