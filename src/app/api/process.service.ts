import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { ProcessInfo, Process } from '../model';
import { LogService } from './log.service';

@Injectable()
export class ProcessService {

  constructor(private http: HttpClient, private logService: LogService) { }

  // get process list from server.
  getProcesses(): Observable<ProcessInfo[]> {
    return this.http.get<ProcessInfo[]>(environment.processServiceURL, environment.httpOptions)
      .pipe(
        tap(process => {
          this.logService.log(process, this, 'getProcesses');
        }),
        catchError(this.handleError('getProcesses', []))
      );
  }

  // get process from server.
  getProcess(id: number): Observable<any> {
    return this.http.get<ProcessInfo>(environment.processServiceURL + `${id}`, environment.httpOptions)
      .pipe(
        tap(obj => this.logService.log(`fetched process id=${id}`, this, 'getProcess')),
        catchError(this.handleError<any>(`getProcess`, id))
      );
  }

  // save process change.
  saveProcess(process: Process): any {
    return this.http.post<ProcessInfo>(environment.processServiceURL, process, environment.httpOptions).pipe(
      tap(obj => {
        if (process) {
          this.logService.log(`save process with id=${process.id}`, this, 'saveProcess');
        }
      }),
      catchError(this.handleError<ProcessInfo>('saveProcess', process))
    );
  }

  // delete process
  deleteProcess(id: number): any {
    return this.http.delete<ProcessInfo>(environment.processServiceURL + `${id}`, environment.httpOptions).pipe(
      tap(obj => {
        this.logService.log(`deleted process id=${id}`, this, 'deleteProcess');
      }),
      catchError(this.handleError<ProcessInfo>('deleteProcess', id))
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

  // removeFromProcesses(data: Array<Process>, idToDelete: number, parentId: number): number {
  //   let pId = 0;
  //   data.some(node => {
  //     if (pId > 0) {
  //       return true;
  //     }
  //     if (node.id === idToDelete) {
  //       pId = parentId;
  //       node.isActive = false;
  //       return true;
  //     }
  //     if (node.children && node.children.length > 0 && pId === 0) {
  //       pId = this.removeFromProcesses(node.children, idToDelete, node.id);
  //     }
  //     return (pId > 0);
  //   });
  //   return pId;
  // }

  // removeFromProcesses(processes, id: number) {
  //   processes = processes.filter((child) => { return child.id !== id })
  //     .map((child) => { return this.removeFromProcesses(child, id) });

  //   // parent.children = parent.children
  //   //     .filter(function(child){ return child.name !== childNameToRemove})
  //   //     .map(function(child){ return this.removeFromProcesses(child, childNameToRemove)});
  //   // return parent;
  // }



  // findSelectedNode(data: Array<Process>, id: number): Process {
  //   let process: Process;
  //   data.some(node => {
  //     let isSelected = false;
  //     if (process) {
  //       return true;
  //     }
  //     if (node.id === id) {
  //       isSelected = true;
  //       process = node;
  //       return true;
  //     }
  //     if (node.children && node.children.length > 0 && !isSelected) {
  //       process = this.findSelectedNode(node.children, id);
  //     }
  //     return isSelected;
  //   });
  //   return process;
  // }

  // sleep(milliseconds: number) {
  //   const start = new Date().getTime();
  //   for (let i = 0; i < 1e7; i++) {
  //     if ((new Date().getTime() - start) > milliseconds) {
  //       break;
  //     }
  //   }
  // }
}
