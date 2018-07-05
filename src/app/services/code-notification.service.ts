import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Codes } from '../model';

@Injectable()
export class CodeNotificationService {

  constructor() { }

  private selectedRuleCodeSource = new Subject<Codes>();

  selectedRuleCode$ = this.selectedRuleCodeSource.asObservable();

  selectedRuleCode(ruleCode: Codes) {
    this.selectedRuleCodeSource.next(ruleCode);
  }

}
