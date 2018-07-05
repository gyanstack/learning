import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppInitializerService } from '../api/app-initializer.service';

export function getQueryBuilderSettings(appInitializerService: AppInitializerService) {
  return () => appInitializerService.initializeRuleQueryConfig();
}

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    AppInitializerService,
    { provide: APP_INITIALIZER, useFactory: getQueryBuilderSettings, deps: [AppInitializerService], multi: true },
  ]
})
export class AppInitializerModule { }
