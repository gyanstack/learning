import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TransactionUploadsRoutingModule } from './transaction-uploads-routing.module';
import { CustomMaterialModuleModule, CustomDirectivesModule } from '../shared';
import { TransactionUploadsComponent } from './transaction-uploads.component';
import { EventsUploadService } from '../api/events-upload.service';
import { UploadFileModule } from '../shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TransactionUploadsRoutingModule,
    UploadFileModule,
    CustomMaterialModuleModule,
    CustomDirectivesModule
  ],
  declarations: [
    TransactionUploadsComponent,
  ],
  providers: [
    EventsUploadService
  ]
})
export class TransactionUploadsModule { }
