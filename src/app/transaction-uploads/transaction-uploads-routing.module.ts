import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransactionUploadsComponent } from './transaction-uploads.component';

const routes: Routes = [
  { path: '', component: TransactionUploadsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TransactionUploadsRoutingModule { }
