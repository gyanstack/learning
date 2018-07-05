import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FileInfo } from '../model';

@Injectable()
export class FileUploadService {
  private fileChangeSource = new Subject<FileInfo>();
  private fileClearedSource = new Subject();
  private clearFileSource = new Subject();

  fileChange$ = this.fileChangeSource.asObservable();
  fileCleared$ = this.fileClearedSource.asObservable();
  clearFile$ = this.clearFileSource.asObservable();

  constructor() { }

  // set display message
  fileChanged(fileInfo: FileInfo) {
    this.fileChangeSource.next(fileInfo);
  }

  // notify ui
  fileCleared() {
    this.fileClearedSource.next();
  }

  // notify ui
  clearFile() {
    this.clearFileSource.next();
  }

}
