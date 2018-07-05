import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NonTransactionRefTableComponent } from './non-transaction-ref-table.component';

const routes: Routes = [
  { path: '', component: NonTransactionRefTableComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class NonTransactionRefTableRoutingModule { }
