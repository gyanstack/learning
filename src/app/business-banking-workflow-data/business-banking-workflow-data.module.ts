import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CustomMaterialModuleModule, CustomDirectivesModule } from '../shared';
import { BusinessBankingWorkflowDataComponent } from './business-banking-workflow-data.component';
import { EventsUploadService } from '../api/events-upload.service';
import { BusinessBankingWorkflowDataRoutingModule } from './business-banking-workflow-data-routing.module';
import { UploadFileModule } from '../shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BusinessBankingWorkflowDataRoutingModule,
    CustomMaterialModuleModule,
    CustomDirectivesModule,
    UploadFileModule
  ],
  declarations: [
    BusinessBankingWorkflowDataComponent,
  ],
  providers: [
    EventsUploadService
  ]
})
export class BusinessBankingWorkflowDataModule { }
