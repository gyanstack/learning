import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EapMappingRulesComponent } from './eap-mapping-rules.component';

const routes: Routes = [
  { path: '', component: EapMappingRulesComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class EapMappingRulesRoutingModule { }
