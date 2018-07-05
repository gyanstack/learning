import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { LogService } from './log.service';
import { Codes } from '../model';
import { environment } from '../../environments/environment';

@Injectable()
export class CodesService {

  constructor(private http: HttpClient, private logService: LogService) { }

  // getBOList(): Observable<any> {
  //   return this.http.get('../assets/borules.json')
  //     .map((res: any) => res.json());
  // }

  // fetch rule codes from service.
  getRuleCodes(boType: string): Observable<any> {
    // return this.http.get<any>('/assets/codes.json')
    //   .pipe(
    //     tap(rule => {
    //       this.logService.log(rule, this, 'getRuleCodes');
    //     }),
    //     catchError(this.handleError<any>('getRuleCodes'))
    //   );

    return this.http.get<any>(`${environment.codesServiceURL}${boType}`, environment.httpOptions)
      .pipe(
        tap(rule => {
          this.logService.log(rule, this, `getRuleCodes for bo type ${boType}`);
        }),
        catchError(this.handleError('getRuleCodes', []))
      );
  }

  // fetch rulecode from service.
  // getRuleCode(id: number): Observable<RuleCode> {
  //   return this.http.get<RuleCode[]>('/assets/codes.json')
  //     .pipe(
  //       tap(rule => {
  //         this.logService.log(rule, this, 'getRuleCodes');
  //       }),
  //       catchError(this.handleError<RuleCode>('getRuleCodes'))
  //     )[0];
  //   // return this.http.get<RuleCode>(environment.codesServiceURL + `${id}`, environment.httpOptions)
  //   //   .pipe(
  //   //     tap(obj => this.logService.log(`fetched rule code id=${id}`, this, 'getRuleCode')),
  //   //     catchError(this.handleError<RuleCode>(`getRuleCode id=${id}`))
  //   //   );
  // }

  // save rule code change.
  saveRuleCodeS(codes: Codes): any {
    this.logService.log(`Codes - ${codes}`, this, 'saveRuleCode');
    return this.http.post<Codes>(environment.codesServiceURL, codes, environment.httpOptions).pipe(
      tap(obj => {

        this.logService.log(`save Codes`, this, 'saveRuleCode');
      }),
      catchError(this.handleError<Codes>(`saveRuleCode`, codes))
    );
  }

  // delete RuleCode
  // deleteRuleCode(id: number): any {
  //   return this.http.delete<RuleCode>(environment.codesServiceURL + `${id}`, environment.httpOptions).pipe(
  //     tap(obj => {
  //       this.logService.log(`deleted RuleCode id=${id}`, this, 'deleteRuleCode');
  //     }),
  //     catchError(this.handleError<RuleCode>('deleteRuleCode'))
  //   );
  // }

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
