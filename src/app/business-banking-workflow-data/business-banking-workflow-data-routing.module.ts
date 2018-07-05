import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BusinessBankingWorkflowDataComponent } from './business-banking-workflow-data.component';

const businessbankingworkflowRoutes: Routes = [
  { path: '', component: BusinessBankingWorkflowDataComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(businessbankingworkflowRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class  BusinessBankingWorkflowDataRoutingModule { }
