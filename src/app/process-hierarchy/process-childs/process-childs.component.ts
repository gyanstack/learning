import { Component, AfterViewInit, ViewChild, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { ProcessNodeService } from '../../services';
import { Process, ProcessInfo } from '../../model';

@Component({
  selector: 'app-process-childs',
  templateUrl: './process-childs.component.html',
  styleUrls: ['./process-childs.component.css']
})
export class ProcessChildsComponent implements DoCheck, AfterViewInit {

  displayedColumns = ['name', 'lowSLA', 'weight'];
  dataSource: MatTableDataSource<Process>;

  @Input()
  SelctedNode: Array<Process>;

  // old process to detect any changes.
  oldSelctedNode: Array<Process>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private processNodeService: ProcessNodeService, private route: ActivatedRoute) {}

  ngDoCheck(): void {
    if (!this.SelctedNode) {
      this.oldSelctedNode = [];
      this.dataSource = new MatTableDataSource<Process>([]); // set datasource
      // this.dataSource.paginator = this.paginator; // set paginator
    } else if (this.SelctedNode && JSON.stringify(this.oldSelctedNode) !== JSON.stringify(this.SelctedNode)) {
      this.dataSource = new MatTableDataSource<Process>(this.SelctedNode); // set datasource
      this.paginator.pageIndex = 0;
      this.dataSource.paginator = this.paginator; // set paginator
      this.oldSelctedNode = Array.from<Process>(this.SelctedNode); // set old node
    }
  }

  ngAfterViewInit() {
    if (this.dataSource && this.paginator) {
      this.paginator.pageIndex = 0;
      this.dataSource.paginator = this.paginator; // set paginator
    }
  }

  // Chnage datasource after user click.
  routeSelectedChildProcess(process: ProcessInfo): void {
    if (process.children) {
      this.SelctedNode = process.children;
      this.dataSource = new MatTableDataSource<Process>(this.SelctedNode);
    }
    // Explicitly notify to ProcessHierarchy component
    // as  this.route.firstChild.paramMap.subscribe doesn't work if URL is changing from root url
    // e.g http://localhost:4200/processhierarchy
    this.processNodeService.changeSelectedProcess(process);
  }
}
