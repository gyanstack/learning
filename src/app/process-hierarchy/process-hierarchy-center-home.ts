import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: `
  <div class="contentWrapper" appAutoHeight>
    <p>Welcome to Process Hierarchy</p>
    <div class="row">
      <div class="col-md-6">
        <button mat-raised-button color="theme-blue" (click)="createprocess()">Create Process</button>
      </div>
    </div>
  </div>
  `
})
export class ProcessHierarchyCenterHomeComponent {
  constructor(private router: Router) { }

  // redirect to add new process screen.
  createprocess() {
    this.router.navigate(['/processhierarchy/new']);
  }
}
