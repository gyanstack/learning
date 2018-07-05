import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityHierarchyComponent } from './activity-hierarchy.component';

describe('ActivityHierarchyComponent', () => {
  let component: ActivityHierarchyComponent;
  let fixture: ComponentFixture<ActivityHierarchyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityHierarchyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
