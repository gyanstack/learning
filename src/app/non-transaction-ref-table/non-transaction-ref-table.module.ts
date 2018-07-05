import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NonTransactionRefTableRoutingModule } from './non-transaction-ref-table-routing.module';
import { CustomMaterialModuleModule, CustomDirectivesModule } from '../shared';
import { NonTransactionRefTableComponent } from './non-transaction-ref-table.component';
import { EventsUploadService, } from '../api/events-upload.service';
import { FileUploadService } from '../services';
import { UploadFileModule } from '../shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NonTransactionRefTableRoutingModule,
    UploadFileModule,
    CustomMaterialModuleModule,
    CustomDirectivesModule
  ],
  declarations: [
    NonTransactionRefTableComponent,
  ],
  providers: [
    EventsUploadService,
    FileUploadService
  ]
})
export class NonTransactionRefTableModule { }
