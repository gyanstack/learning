import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SprinterService {

  constructor() { }

  private showSprinterSource = new Subject();
  private hideSprinterSource = new Subject();

  showSprinter$ = this.showSprinterSource.asObservable();
  hideSprinter$ = this.hideSprinterSource.asObservable();

  // show sprinter
  showSprinter() {
    this.showSprinterSource.next();
  }

  // hide sprinter
  hideSprinter() {
    this.hideSprinterSource.next();
  }
}
