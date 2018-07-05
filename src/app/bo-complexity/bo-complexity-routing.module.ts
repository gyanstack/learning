import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { BoComplexityRulesCenterComponent } from './bo-complexity-rules-center/bo-complexity-rules-center.component';
// import { BoComplexityRulesComponent } from './bo-complexity-rules/bo-complexity-rules.component';
// import { SharedComponentModule } from '../shared-component/shared-component.module';

const BoComplexityRoutes: Routes = [
  { path: '', component: BoComplexityRulesCenterComponent }
];

@NgModule({
  imports: [
    // SharedComponentModule,
    RouterModule.forChild(BoComplexityRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BoComplexityRoutingModule { }
