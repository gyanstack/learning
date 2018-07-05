import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadFileComponent } from './upload-file.component';
import { CustomMaterialModuleModule } from '../../module/custom-material-module.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CustomMaterialModuleModule
  ],
  declarations: [UploadFileComponent],
  exports: [UploadFileComponent]
})
export class UploadFileModule { }
