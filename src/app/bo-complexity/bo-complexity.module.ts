import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CustomMaterialModuleModule, CustomDirectivesModule } from '../shared';
import { BoComplexityRoutingModule } from './bo-complexity-routing.module';
import { BoComplexityRulesComponent } from './bo-complexity-rules/bo-complexity-rules.component';
import { BoComplexityRulesCenterComponent } from './bo-complexity-rules-center/bo-complexity-rules-center.component';
import { BoComplexityService } from '../services';
import { BoComplexityRulesService } from '../api';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModuleModule,
    BoComplexityRoutingModule,
    CustomDirectivesModule
  ],
  declarations: [
    BoComplexityRulesComponent,
    BoComplexityRulesCenterComponent
  ],
  providers: [
    BoComplexityService,
    BoComplexityRulesService
  ]
})
export class BoComplexityModule { }
