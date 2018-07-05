import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { CustomMaterialModuleModule } from './custom-material-module.module';
import { BoComplexityRuleDetailComponent } from '../../bo-complexity/bo-complexity-rule-detail/bo-complexity-rule-detail.component';
import { EapMappingNewRulesComponent } from '../../eap-mapping-rules/eap-mapping-new-rules/eap-mapping-new-rules.component';
import { ActivityHierarchyComponent } from '../../eap-mapping-rules/activity-hierarchy/activity-hierarchy.component';
import { QueryBuilderComponent } from '../../eap-mapping-rules/query-builder/query-builder.component';
import { TextInputComponent } from '../../eap-mapping-rules/text-input/text-input.component';
import { EapMappingAdvanceRulesComponent } from '../../eap-mapping-rules/eap-mapping-advance-rules/eap-mapping-advance-rules.component';
import { BoComplexityRulesService, EapruleService, ProcessService, CodesService } from '../../api';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModuleModule
  ],
  entryComponents: [
    BoComplexityRuleDetailComponent, EapMappingNewRulesComponent, TextInputComponent, EapMappingAdvanceRulesComponent
  ],
  declarations: [
    BoComplexityRuleDetailComponent,
    EapMappingNewRulesComponent,
    ActivityHierarchyComponent,
    QueryBuilderComponent,
    TextInputComponent,
    EapMappingAdvanceRulesComponent
  ],
  providers: [
    BoComplexityRulesService,
    EapruleService,
    ProcessService,
    CodesService
  ]
})
export class DialogComponentModule { }
