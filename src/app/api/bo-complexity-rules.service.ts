import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { BORule, BOType } from '../model';
import { LogService } from './log.service';

@Injectable()
export class BoComplexityRulesService {

  constructor(private http: HttpClient, private logService: LogService) { }

  // getBOList(): Observable<any> {
  //   return this.http.get('../assets/borules.json')
  //     .map((res: any) => res.json());
  // }

  // fetch complexity rules from service.
  getBOComplexityRules(): Observable<BOType[]> {
    return this.http.get<BOType[]>(environment.boComplexityServiceURL, environment.httpOptions)
      .pipe(
        tap(rule => {
          this.logService.log(rule, this, 'getBOComplexityRules');
        }),
        catchError(this.handleError('getBOComplexityRules', []))
      );
  }

  // fetch complexity rule from service.
  getBOComplexityRule(id: number): Observable<BORule> {
    return this.http.get<BORule>(environment.boComplexityServiceURL + `${id}`, environment.httpOptions)
      .pipe(
        tap(obj => this.logService.log(`fetched BOComplexityRule id=${id}`, this, 'getBOComplexityRule')),
        catchError(this.handleError<BORule>(`getBOComplexityRule`, id))
      );
  }

  // save complexity rule change.
  saveBOComplexityRule(rule: BORule): any {
    return this.http.post<BORule>(environment.boComplexityServiceURL, rule, environment.httpOptions).pipe(
      tap(obj => {
        this.logService.log(`save BOComplexityRule with id=${rule.typeId}`, this, 'saveBOComplexityRule');
      }),
      catchError(this.handleError<BORule>('saveBOComplexityRule', rule))
    );
  }

  // delete BOComplexityRule
  deleteBOComplexityRule(id: number): any {
    return this.http.delete<BORule>(environment.boComplexityServiceURL + `${id}`, environment.httpOptions).pipe(
      tap(obj => {
        this.logService.log(`deleted BOComplexityRule id=${id}`, this, 'deleteBOComplexityRule');
      }),
      catchError(this.handleError<BORule>('deleteBOComplexityRule', id))
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

}
