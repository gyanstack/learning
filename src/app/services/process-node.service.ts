import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Process } from '../model';

@Injectable()
export class ProcessNodeService {

  constructor() { }

  private updatedProcessessSource = new Subject<Process>();
  private deleteProcessessSource = new Subject<Process>();
  private selectedProcessChangeSource = new Subject<Process>();
  private clearedSelectedProcessSource = new Subject<Process>();

  updateProcess$ = this.updatedProcessessSource.asObservable();
  deleteProcess$ = this.deleteProcessessSource.asObservable();
  selectedProcessChange$ = this.selectedProcessChangeSource.asObservable();
  clearedSelectedProcess$ = this.clearedSelectedProcessSource.asObservable();

  refreshProcessHierarchy(node: Process) {
    this.updatedProcessessSource.next(node);
  }

  deleteProcessHierarchy(node: Process) {
    this.deleteProcessessSource.next(node);
  }

  changeSelectedProcess(node: Process) {
    this.selectedProcessChangeSource.next(node);
  }

  resetSelectedProcessHierarchy() {
    this.clearedSelectedProcessSource.next();
  }
}
