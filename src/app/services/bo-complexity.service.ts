import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Process } from '../model';

@Injectable()
export class BoComplexityService {

  constructor() { }

  private updatedBOTypeSource = new Subject<Process>();

  updatedBOType$ = this.updatedBOTypeSource.asObservable();

  refreshBOTypeList() {
    this.updatedBOTypeSource.next();
  }
}
