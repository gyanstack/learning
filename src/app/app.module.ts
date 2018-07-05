import '../polyfills';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER, ApplicationRef, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpModule } from '@angular/http';
import { CdkTableModule } from '@angular/cdk/table';

import { ApplicationErrorHandler } from './handler';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CustomMaterialModuleModule, CustomDirectivesModule } from './shared';

import { DialogComponentModule } from './shared';
import { AppInitializerModule } from './app-initializer/app-initializer.module';
import { LogService } from './api';
import { MessageComponent } from './message/message.component';
import { MessageService, DialogService, SprinterService } from './services';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    CustomMaterialModuleModule,
    ReactiveFormsModule,
    AppInitializerModule,
    AppRoutingModule,
    CustomDirectivesModule,
    DialogComponentModule
  ],
  entryComponents: [AppComponent, MessageComponent],
  providers: [
    MessageService,
    DialogService,
    LogService,
    SprinterService,
    {
      provide: ErrorHandler,
      useClass: ApplicationErrorHandler
    }, { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
    , { provide: MAT_SNACK_BAR_DATA, useValue: {} },
    { provide: MatSnackBarRef, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
