import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoHeightDirective } from './auto-height.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AutoHeightDirective
  ],
  exports: [
    AutoHeightDirective
  ]
})
export class CustomDirectivesModule { }
