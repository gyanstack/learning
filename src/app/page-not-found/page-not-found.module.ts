import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { CustomMaterialModuleModule, CustomDirectivesModule } from '../shared';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PageNotFoundRoutingModule,
    CustomMaterialModuleModule,
    CustomDirectivesModule
  ],
  declarations: [
    PageNotFoundComponent,
  ],
  providers: []
})
export class PageNotFoundModule { }
