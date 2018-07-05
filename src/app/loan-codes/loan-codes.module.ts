import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CustomMaterialModuleModule, CustomDirectivesModule } from '../shared';
import { LoanCodesRoutingModule } from './loan-codes-routing.module';
import { LoanCodesComponent } from './loan-codes/loan-codes.component';
import { CodesService } from '../api';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoanCodesRoutingModule, CustomMaterialModuleModule,
    CustomDirectivesModule
  ],
  declarations: [LoanCodesComponent],
  providers: [
    CodesService
  ]
})
export class LoanCodesModule { }
