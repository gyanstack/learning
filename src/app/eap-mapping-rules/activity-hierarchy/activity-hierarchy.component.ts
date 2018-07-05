import { Component, OnInit, Input, AfterViewInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Process, ProcessInfo } from '../../model';
import { ProcessService } from '../../api/process.service';
import { MessageService } from '../../services';


@Component({
  selector: 'app-activity-hierarchy',
  templateUrl: './activity-hierarchy.component.html',
  styleUrls: ['./activity-hierarchy.component.css']
})

export class ActivityHierarchyComponent implements OnInit {
  @Input() activity: any;

  @Output() onActivitySelected = new EventEmitter<Process>();

  processes: ProcessInfo[];
  constructor(
    private processService: ProcessService,
    private messageService: MessageService
  ) { }
  ngOnInit(): void {
    this.setupActivities();
  }

  // select activity of loaded rule.
  setupActivities(): void {
    this.processes = [];
    this.processService.getProcesses().subscribe(
      data => {
        if (data) {
          data.forEach(process => {
            this.processes.push(new ProcessInfo(process));
          });

          const selectedNode = this.getNodeById(this.processes, this.activity.id);
          if (selectedNode) {
            // select node in activity hierarchy
            this.selectNodeById(this.processes, selectedNode.id);
            // expand selected node
            this.expandChildNodesNodes(this.processes, selectedNode.id);
          }

          // emit event for activity selection.
          this.onActivitySelected.emit(selectedNode);
        }
      },
      (err: any) => {
        this.messageService.setErrorMessage(err);
      }
    );
  }

  // select node on mouse click.
  selectActivity(_process: ProcessInfo) {
    _process.isSelected = true;
    this.activity.id = _process.id;
    this.activity.isValid = true;
    // select node in activity hierarchy
    this.selectNodeById(this.processes, _process.id);

    // emit event for activity selection.
    this.onActivitySelected.emit(_process);

    // this.messageService.setDisplayMessage('The selected activity id is:{' + _process.id + '}' + _process.name);
  }

  // select node from process hierarchy
  getNodeById(data: Array<Process>, id: number): Process {
    let selectedProcess: Process;
    data.forEach(node => {
      if (node.id === id) {
        selectedProcess = node;
      } else {
        if (!selectedProcess && node.children && node.children.length > 0) {
          selectedProcess = this.getNodeById(node.children, id);
        }
      }
    });
    return selectedProcess;
  }

  //  first unselect all nodes and then select node by id.
  selectNodeById(data: Array<Process>, id: number): void {
    data.forEach(node => {
      if (node.id === id) {
        node.isSelected = true;
      } else {
        node.isSelected = false;
      }
      if (node.children && node.children.length > 0) {
        this.selectNodeById(node.children, id);
      }
    });
  }

  // expand node from process hierarchy
  expandChildNodesNodes(data: Array<Process>, id: number): boolean {
    return data.some(node => {
      if (node.id === id) {
        node.isFieldExpanded = true;
        return true;
      }
      if (node.children && node.children.length > 0) {
        const isExpanded = this.expandChildNodesNodes(node.children, id);
        if (!node.isFieldExpanded) {
          node.isFieldExpanded = isExpanded;
        }
        return isExpanded;
      }
      return false;
    });
  }
}
