import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { LogService } from './log.service';
import { QueryBuilderConfiguration } from '../settings/app-settings';

@Injectable()
export class AppInitializerService {

  constructor(private httpClient: HttpClient, private logService: LogService) { }

  // Initialize configuration for query builder.
  initializeRuleQueryConfig(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get('../assets/eaprules-config.json').subscribe(config => {
        Object.getOwnPropertyNames(config).forEach(element => {
          // set app setting for querybuilder cofiguration.
          QueryBuilderConfiguration.fields[element] = config[element];
        });
        this.logService.log(QueryBuilderConfiguration, this, 'initializeRuleQueryConfig');
        resolve();
      });
    });
  }

}
