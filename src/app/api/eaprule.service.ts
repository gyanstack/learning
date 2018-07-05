import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { EapRule } from '../model/eaprule';
import { LogService } from './log.service';
import { environment } from '../../environments/environment';


@Injectable()
export class EapruleService {
  constructor(private httpClient: HttpClient, private logService: LogService
  ) { }

  // Fecth EAP rules from server
  getEapRules(): Observable<any[]> {
    return this.httpClient.get<any[]>(environment.eapServiceURL, environment.httpOptions)
      .pipe(
        tap(rule => {
          this.logService.log(rule, this, 'getEapRules');
        }),
        catchError(this.handleError('getEapRules', []))
      );
  }

  // Fetch selected eap rule details.
  getEapRule(id: number): Observable<any> {
    return this.httpClient.get<any>(environment.eapServiceURL + `${id}`, environment.httpOptions)
      .pipe(
        tap(obj => {
          this.logService.log(`fetched EapRule id=${id} - ${obj}`, this, 'getEapRule');
        }),
        catchError(this.handleError<any>(`getEapRule`, id))
      );
  }

  getRuleValue(field: string, searchText: string, startIndex: number, endIndex: number): Observable<any> {
    environment.httpOptions.params = new HttpParams()
      .set('field', field)
      .set('value', searchText)
      .set('startIndex', startIndex.toString())
      .set('endIndex', endIndex.toString())      ;
    return this.httpClient.get<any>(environment.eapServiceURL + 'text/', environment.httpOptions)
      .pipe(
        tap(obj => {
          this.logService.log(`fetched RuleValue searchText=${searchText} - ${obj}`, this, 'getRuleValue');
        }),
        catchError(this.handleError<any>(`getRuleValue`, searchText))
      );
  }

  // getRuleQueryConfig_old(): Observable<any> {
  //   return this.httpClient.get('../assets/eaprules-config.json')
  //     .map((config: any) => {
  //       Object.getOwnPropertyNames(config).forEach(element => {
  //         this.logService.log(element);
  //       });
  //       return config;
  //     });
  // }

  // getRuleQueryConfig(): any {
  //   const config = {
  //     fields: {
  //       "eventSource": { name: "Event Source", type: 'string' },
  //       "eventType": { name: "Event Type", type: 'string' },
  //       "eventName": { name: "Event Name", type: 'string' },
  //       "lob": { name: "Line of Business", type: 'string' },
  //       "boRefId": { name: "BO Reference Id", type: 'number' },
  //       "transactionId": { name: "Transaction Id", type: 'number' },
  //       "userName": { name: "User Name", type: 'string' }
  //     }
  //   };
  //   return config;
  // }

  saveRule(eapRule: EapRule): any {
    return this.httpClient.post<EapRule>(environment.eapServiceURL, eapRule, environment.httpOptions).pipe(
      tap(obj => {
        this.logService.log(obj, this, 'saveRule');
      }),
      catchError(this.handleError<EapRule>('saveProcess', eapRule))
    );
  }

  deleteRule(id: number): any {
    return this.httpClient.delete<EapRule>(environment.eapServiceURL + `${id}`, environment.httpOptions).pipe(
      tap(obj => {
        this.logService.log(obj, this, 'deleteRule');
      }),
      catchError(this.handleError<EapRule>('saveProcess', id))
    );
  }

  // error handling.
  private handleError<T>(operation = 'operation', data?: any, result?: T) {
    return (error: any) => {
      try {
        this.logService.logErrorWithData(error, JSON.stringify(data));
      } catch (error) {
        this.logService.logDataToConsole(error);
      }
      // Let the app keep running by returning an empty result.
      // return of(result as T);
      return Observable.throw(error);
    };
  }

  /*Don't Delete- Below code is considered as reference point.*/
  // getRuleQueryConfig_Backup(): any {
  //   let config = {
  //     fields: {
  //       "id": { name: "Age", type: 'number' },
  //       "gender": {
  //         name: "Gender",
  //         type: 'category',
  //         options: [
  //           { name: "Male", value: "m" },
  //           { name: "Female", value: "f" }
  //         ]
  //       },
  //       "name": { name: "Name", type: 'string' },
  //       "educated": { name: "College Degree?", type: 'boolean' },
  //       "birthday": { name: "Birthday", type: 'date' },
  //       "school": { name: "School", type: 'string', nullable: true },
  //       "occupation": {
  //         name: "Occupation",
  //         type: 'string',
  //         options: [
  //           { name: "Student", value: "student" },
  //           { name: "Teacher", value: "teacher" },
  //           { name: "Unemployed", value: "unemployed" },
  //           { name: "Scientist", value: "scientist" }
  //         ]
  //       }
  //     }
  //   };
  //   return config;
  // }

}
