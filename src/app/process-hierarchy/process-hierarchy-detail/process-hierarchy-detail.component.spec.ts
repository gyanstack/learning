import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessHierarchyDetailComponent } from './process-hierarchy-detail.component';

describe('ProcessHierarchyDetailComponent', () => {
  let component: ProcessHierarchyDetailComponent;
  let fixture: ComponentFixture<ProcessHierarchyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessHierarchyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessHierarchyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
