import { Component } from '@angular/core';

@Component(
    {
        template: `
        <div class="row cclBreadcrumb">
        <div class="col-md-3 breadcrumbLeft">
            ProcessInfo Hierarchy
            <i class="breadcrumbIcon">
                <img src="assets/images/img-process.png">
            </i>
        </div>
        <div class="col-md-9 headWrapper">
            <h2>ProcessInfo Details</h2>
        </div>
    </div>
    <div class="row cus-table">
        <div class="col-md-3 cus-table-cell side-pan-grey remove-tree-container-padding">
            <app-process-hierarchy>Loading...</app-process-hierarchy>
        </div>
        <div class="col-md-9 cus-table-cell cus-table-right-cell">
            <router-outlet></router-outlet>
        </div>
    </div>
    <div class="clear-fix"></div>`
    })
export class ProcessHierarchyCenterComponent {}
