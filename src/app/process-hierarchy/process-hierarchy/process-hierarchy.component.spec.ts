import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessHierarchyComponent } from './process-hierarchy.component';

describe('ProcesshierarchyComponent', () => {
  let component: ProcessHierarchyComponent;
  let fixture: ComponentFixture<ProcessHierarchyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessHierarchyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
