import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { environment } from '../../environments/environment';
import { defaultError } from '../shared/util';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LogService {

  constructor(private http: HttpClient) { }

  // log message
  log(logMessage: any, className: any, methodName?: string): void {
    // let message: any;
    // if (logMessage instanceof Array) {
    const message = JSON.stringify(logMessage);
    // } else {
    //   message = logMessage;
    // }
    this.sendLog(message, className, methodName);
  }

  // log error.
  public logErrorWithData(error?: any, data?: any, path?: string, operation?: string): void {
    if (!error) {
      error = defaultError;
    }
    this.sendError(error, path, operation, data);
  }

  // log error.
  public logError(error?: any, path?: string, operation?: string): void {
    if (!error) {
      error = defaultError;
    }
    this.sendError(error, path, operation);
  }

  private sendLog(message: any, className: any, methodName?: string) {
    if (environment.enableConsoleLog) {
      this.sendLogToConsole(message, className, methodName);
    }
    this.sendLogToServer(message, className, methodName).subscribe(ret => { });
  }

  private sendError(error: any, path?: string, operation?: string, data?: any) {
    if (environment.enableConsoleLog) {
      this.sendErrorToConsole(error, path, operation, data);
    }
    this.sendErrorToServer(error, path, operation, data).subscribe(ret => { });
  }

  // log to console.
  private sendLogToConsole(message: any, className: any, methodName?: string): void {
    if (console && console.group && console.error && !environment.production) {
      console.group(className.constructor.name);
      if (methodName) {
        console.log(methodName);
      }
      console.log(message);
      console.groupEnd();
    }
  }

  private sendErrorToConsole(error: any, path?: string, operation?: string, data?: any): void {
    if (console && console.group && console.error) {

      console.group('Error Log Service');
      if (data) {
        console.error(`data: ${data}`);
      }
      if (path) {
        console.error(`path: ${path}`);
      }
      if (operation) {
        console.error(`operation: ${operation}`);
      }
      console.error(JSON.stringify(error));
      if (error.message) {
        console.error(error.message);
      }
      if (error.stack) {
        console.error(error.stack);
      }
      console.groupEnd();

    }
  }

  // send error to server.
  sendErrorToServer(error: any, path?: string, operation?: string, data?: any): any {
    let logMessage = '\r\n';
    if (data) {
      logMessage += `\r\n Data: ${data}`;
    }
    if (path) {
      logMessage += `\r\n Path: ${path}`;
    }
    if (operation) {
      logMessage += `\r\n Operation: ${operation}`;
    }
    logMessage += `\r\n Error: ${JSON.stringify(error)}`;
    if (error.message) {
      logMessage += `\r\n Error Message: ${error.message}`;
    }
    if (error.stack) {
      logMessage += `\r\n Error Stack: ${error.stack}`;
    }
    logMessage += `\r\n`;
    return this.http.post<string>(`${environment.logServiceURL}error`, logMessage).pipe(
      tap(rtn => {
        // this.logDataToConsole(rtn);
      }),
      catchError(this.handleError<any>('sendLogToServer'))
    );
  }

  // send log to server.
  sendLogToServer(message: any, className: any, methodName?: string): any {
    let logMessage = '\r\n';
    logMessage += `\r\n Class: ${className.constructor.name}`;
    if (methodName) {
      logMessage += `\r\n Method: ${methodName}`;
    }
    logMessage += `\r\n Message: ${message}`;
    logMessage += `\r\n`;
    return this.http.post<string>(`${environment.logServiceURL}info`, logMessage).pipe(
      tap(rtn => {
        // this.logDataToConsole(rtn);
      }),
      catchError(this.handleError<any>('sendLogToServer'))
    );
  }

  // Log details on console.
  // This method is extra check to log exception in console when ui will unable to lof exception via method - logErrorWithData
  logDataToConsole(error: any) {
    if (console && console.group && console.error) {
      console.log(`Error while sending error log :-`);
      if (error.message) {
        console.error(error.message);
      }
      if (error.stack) {
        console.error(error.stack);
      }
      console.groupEnd();

    }
  }

  // error handling.
  private handleError<T>(operation = 'operation', data?: any, result?: T) {
    return (error: any) => {
      this.logDataToConsole(error);
      return null;
    };
  }
}
