import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ProcessHierarchyCenterComponent } from './process-hierarchy-center';
import { ProcessHierarchyComponent } from './process-hierarchy/process-hierarchy.component';
import { ProcessHierarchyDetailComponent } from './process-hierarchy-detail/process-hierarchy-detail.component';
import { ProcessHierarchyCenterHomeComponent } from './process-hierarchy-center-home';

const processHierarchyRoutes: Routes = [
    {
      path: '',
      component: ProcessHierarchyCenterComponent,
      children: [
        // {
        //   path: '',
        //   component: ProcessHierarchyComponent,
        //   children: [
            {
              path: ':id',
              component: ProcessHierarchyDetailComponent
            },
            {
              path: 'new',
              component: ProcessHierarchyDetailComponent
            },
            {
              path: '',
              component: ProcessHierarchyCenterHomeComponent
            }
        //   ]
        // }
      ]
    }
  ];

  @NgModule({
      imports: [
          RouterModule.forChild(processHierarchyRoutes)
      ],
      exports: [
          RouterModule
      ]
  })
  export class ProcessHierarchyRoutingModule {}
