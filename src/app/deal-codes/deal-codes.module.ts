import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CustomMaterialModuleModule, CustomDirectivesModule } from '../shared';
import { DealCodesRoutingModule } from './deal-codes-routing.module';
import { DealCodesComponent } from './deal-codes/deal-codes.component';
import { CodesService } from '../api';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DealCodesRoutingModule,
    CustomMaterialModuleModule,
    CustomDirectivesModule
  ],
  declarations: [DealCodesComponent],
  providers: [
    CodesService
  ]
})
export class DealCodesModule { }
