import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealCodesComponent } from './deal-codes/deal-codes.component';

const routes: Routes = [
  { path: '', component: DealCodesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealCodesRoutingModule { }
