import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanCodesComponent } from './loan-codes/loan-codes.component';

const routes: Routes = [
  { path: '', component: LoanCodesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanCodesRoutingModule { }
