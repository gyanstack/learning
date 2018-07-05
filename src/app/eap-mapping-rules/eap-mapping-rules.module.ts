import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EapMappingRulesRoutingModule } from './eap-mapping-rules-routing.module';
import { EapMappingRulesComponent } from './eap-mapping-rules.component';
import { CustomMaterialModuleModule, CustomDirectivesModule } from '../shared';
import { EapruleService } from '../api';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EapMappingRulesRoutingModule,
    CustomMaterialModuleModule,
    CustomDirectivesModule
  ],
  declarations: [EapMappingRulesComponent],
  providers: [
    EapruleService
  ]
})
export class EapMappingRulesModule { }
