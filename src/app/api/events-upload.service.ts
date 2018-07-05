import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { LogService } from './log.service';
import { environment } from '../../environments/environment';
import { fileTransactionType } from '../shared/util';

@Injectable()
export class EventsUploadService {

  constructor(private http: HttpClient, private logService: LogService) { }

  // upload events
  uploadEvents(eventsInfo: any, fileType: fileTransactionType): any {
    const serviceURL = this.getServiceURL(fileType);

    return this.http.post(serviceURL, eventsInfo).pipe(
      tap(obj => {
        this.logService.log(obj, this, 'uploadEvents');
      }),
      catchError(this.handleError<any>('uploadEvents'))
    );
  }

  private getServiceURL(fileType: fileTransactionType): string {
    let serviceURL: string;
    switch (fileType) {
      case fileTransactionType.BUSINESS_BANKING_TRANSACTION.toString():
        serviceURL = environment.bankingTransactionUploadServiceURL;
        break;
      case fileTransactionType.MANUAL_TRANSACTION.toString():
        serviceURL = environment.manualTransactionUploadServiceURL;
        break;
      case fileTransactionType.NON_TRANSACTION.toString():
        serviceURL = environment.nonTransactionUploadServiceURL;
        break;
      default:
        break;
    }
    return serviceURL;
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
