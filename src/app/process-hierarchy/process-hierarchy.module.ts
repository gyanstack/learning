import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProcessHierarchyCenterComponent } from './process-hierarchy-center';
import { ProcessHierarchyComponent } from './process-hierarchy/process-hierarchy.component';
import { ProcessHierarchyDetailComponent } from './process-hierarchy-detail/process-hierarchy-detail.component';
import { ProcessHierarchyCenterHomeComponent } from './process-hierarchy-center-home';
import { ProcessChildsComponent } from './process-childs/process-childs.component';

import { ProcessHierarchyRoutingModule } from './process-hierarchy-routing.module';

import { ProcessNodeService } from '../services';

import { CustomMaterialModuleModule, CustomDirectivesModule } from '../shared';
import { ProcessService } from '../api';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProcessHierarchyRoutingModule,
    CustomMaterialModuleModule,
    CustomDirectivesModule
  ],
  declarations: [
    ProcessHierarchyCenterComponent,
    ProcessHierarchyComponent,
    ProcessHierarchyDetailComponent,
    ProcessHierarchyCenterHomeComponent,
    ProcessChildsComponent
  ],
  providers: [
    ProcessNodeService,
    ProcessService
  ]
})
export class ProcessHierarchyModule {
}
