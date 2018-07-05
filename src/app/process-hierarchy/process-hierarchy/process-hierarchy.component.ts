import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Process, ProcessInfo } from '../../model';

import { ProcessService, LogService } from '../../api';
import { ProcessNodeService, MessageService } from '../../services';
import { UnsubscribeObservable } from '../../shared/util';

@Component({
  selector: 'app-process-hierarchy',
  templateUrl: './process-hierarchy.component.html',
  styleUrls: ['./process-hierarchy.component.css']
})


export class ProcessHierarchyComponent implements OnInit, OnDestroy {
  processes: ProcessInfo[];
  selectedProcessChangeSubscription: Subscription;
  updateProcessSubscription: Subscription;
  deleteProcessSubscription: Subscription;
  clearedSelectedProcessSubscription: Subscription;

  // id: number;
  selectedProcess: Process;
  downImagePath: string;
  rightImagePath: string;
  openImagePath: string;
  closeImagePath: string;

  // treeModel: TreeModel;
  // selectedNode: TreeNode;
  // @ViewChild('tree') treeComponent: TreeComponent;

  constructor(private processService: ProcessService,
    private messageService: MessageService,
    private processNodeService: ProcessNodeService,
    private route: ActivatedRoute, private router: Router, private logService: LogService) { }

  ngOnInit(): void {
    // initialize image path.
    this.setInitialImagePath();
    // register for url change
    this.getProcessWithSelectedNode();
    // register for process heirachy change.
    this.updateUIAfterProcessHierarchyChange();
  }

  ngOnDestroy() {
    // unsubcribe old instances and avoid memory leaks.
    UnsubscribeObservable(this.selectedProcessChangeSubscription);
    UnsubscribeObservable(this.updateProcessSubscription);
    UnsubscribeObservable(this.deleteProcessSubscription);
    UnsubscribeObservable(this.clearedSelectedProcessSubscription);
  }

  // initialize image path.
  setInitialImagePath(): void {
    this.downImagePath = '../../assets/down.png';
    this.rightImagePath = '../../assets/right.png';
    this.openImagePath = '../../assets/open.png';
    this.closeImagePath = '../../assets/close.png';
  }

  // register for url change and update UI accordingly.
  getProcessWithSelectedNode(): void {
    if (this.route.firstChild.paramMap) {
      this.route.firstChild.paramMap.subscribe(
        (params: ParamMap) => {
          const id: number = +params.get('id');
          if (!this.processes || this.processes == null) {
            this.processes = [];
            this.processService.getProcesses().subscribe(
              data => {
                if (data) {
                  data.forEach(process => {
                    this.processes.push(new ProcessInfo(process));
                  });
                }

                if (this.processes.length === 0) {
                  this.router.navigate(['/processhierarchy/new']);
                } else {
                  // this.processes = [new ProcessInfo(data)];
                  this.expandAndSelectNode(this.processes, id);
                }
              },
              (err: any) => {
                this.messageService.setErrorMessage(err);
              }
            );
          } else {
            if (this.processes.length === 0) {
              this.router.navigate(['/processhierarchy/new']);
            } else {
              this.expandAndSelectNode(this.processes, id);
            }
          }
        }
      );
    }

    // this.processNodeService.childNode$.subscribe(
    //   obj => {
    //     this.expandAndSelectNode(this.processes, obj.id);
    //   }
    // )

  }

  // register for process heirachy change.
  updateUIAfterProcessHierarchyChange(): void {

    // subscribe for route chnage when user clicks on child process in child component
    this.selectedProcessChangeSubscription = this.processNodeService.selectedProcessChange$.subscribe(
      obj => {
        this.expandAndSelectNode(this.processes, obj.id);
      });

    // subscribe for new child or any update in existing process
    this.updateProcessSubscription = this.processNodeService.updateProcess$.subscribe(
      updatedProcess => {
        this.logService.log(updatedProcess, this, 'updateUIAfterProcessHierarchyChange');
        if (!this.processes || this.processes == null) {
          this.processes = [];
          this.processService.getProcesses().subscribe(
            data => {
              if (data) {
                data.forEach(process => {
                  this.processes.push(new ProcessInfo(process));
                });
              }
              if (this.processes.length === 0) {
                this.router.navigate(['/processhierarchy/new']);
              } else {
                // update tree.
                this.updateNodeAndTreeSelection(updatedProcess);
              }
            },
            (err: any) => {
              this.messageService.setErrorMessage(err);
            }
          );
        } else {
          // update tree.
          this.updateNodeAndTreeSelection(updatedProcess);
        }
      }
    );

    // delete process from tree
    // subscribe for new child or any update in existing process
    this.deleteProcessSubscription = this.processNodeService.deleteProcess$.subscribe(
      deletedProcess => {
        // delete selected node
        this.deleteSelectedNode(this.processes, deletedProcess);

        // set parent node
        this.setSelectedNode(this.processes, deletedProcess.parentId);
      });

    // clear process tree selection.
    this.clearedSelectedProcessSubscription = this.processNodeService.clearedSelectedProcess$.subscribe(obj => {
      // clear selection.
      this.setSelectedNode(this.processes, -1);
    });
  }

  // Update selected tree node.
  updateNodeAndTreeSelection(updatedProcess: Process) {
    if (updatedProcess) {
      // special case for root node
      if (!updatedProcess.parentId || updatedProcess.parentId === null) {
        const isChildExist = this.processes.findIndex(child => child.id === updatedProcess.id);
        if (isChildExist < 0) {
          this.processes.unshift(new ProcessInfo(updatedProcess));
        }
      }
      this.updateSelectedNode(this.processes, updatedProcess);
      this.expandAndSelectNode(this.processes, updatedProcess.id);
    }
  }

  // update selected node information.
  updateSelectedNode(processList: Array<Process>, updatedNode: Process) {
    const isUpdated = processList.some(node => {
      if (node.id === updatedNode.id) {
        node.id = updatedNode.id;
        node.parentId = updatedNode.parentId;
        node.name = updatedNode.name;
        node.lowSLA = updatedNode.lowSLA;
        node.averageSLA = updatedNode.averageSLA;
        node.highSLA = updatedNode.highSLA;
        node.weight = updatedNode.weight;
        // node.isSelected = false; // Leave this as it is.
        node.isActive = true;
        node.createdOn = updatedNode.createdOn;
        // node.isFieldExpanded = true; // Leave this as it is.
        node.isEAPRuleAssociated = updatedNode.isEAPRuleAssociated;
        if (updatedNode.children) {
          updatedNode.children.sort((leftChild, rightChild): number => {
            if (leftChild.id > rightChild.id) {
              return -1;
            }
            if (leftChild.id < rightChild.id) {
              return 1;
            }
            return 0;
          });
          updatedNode.children.forEach(childNode => {
            const isChildExist = node.children.findIndex(child => child.id === childNode.id);
            if (isChildExist >= 0) {
              this.updateSelectedNode(node.children, childNode);
            } else {
              node.children.unshift(new ProcessInfo(childNode));
            }
          });
        }
        return true;
      } else if (node.children && node.children.length > 0) {
        const isExpanded = this.updateSelectedNode(node.children, updatedNode);
        return isExpanded;
      }
      return false;
    });
    if (!isUpdated) {
      this.addNewNode(processList, updatedNode);
    }
    return isUpdated;
  }

  // add new node in tree
  addNewNode(processList: Array<Process>, updatedNode: Process): boolean {
    const isAdded = processList.some(node => {
      if (node.id === updatedNode.parentId) {
        node.children.unshift(new ProcessInfo(updatedNode));
        return true;
      } else if (node.children && node.children.length > 0) {
        const isChildAdded = this.addNewNode(node.children, updatedNode);
        return isChildAdded;
      }
      return false;
    });
    return isAdded;
  }

  // delete node from tree.
  deleteSelectedNode(processList: Array<Process>, updatedNode: Process) {
    this.hideDeletedNode(processList, updatedNode);
  }

  // hide deleted tree from node.
  hideDeletedNode(processList: Array<Process>, updatedNode: Process): boolean {
    const isDeleted = processList.some(node => {
      if (node.id === updatedNode.id) {
        node.isActive = false;
        return true;
      } else if (node.children && node.children.length > 0) {
        const isChildDeleted = this.hideDeletedNode(node.children, updatedNode);
        return isChildDeleted;
      }
      return false;
    });
    return isDeleted;
  }

  // expand and set node as selected
  expandAndSelectNode(data: Array<Process>, id: number) {
    this.setSelectedNode(data, id);
    if (this.selectedProcess != null) {
      this.expandChildNodesNodes(data, id);
    }
  }

  // select node from process hierarchy
  setSelectedNode(data: Array<Process>, id: number): void {
    data.forEach(node => {
      if (node.id === id) {
        node.isSelected = true;
        this.selectedProcess = node;
      } else {
        node.isSelected = false;
      }
      if (node.children && node.children.length > 0) {
        this.setSelectedNode(node.children, id);
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

  // // expand node from process hierarchy
  // expandChildNodesNodes(data: Array<Process>, id: number): boolean {
  //   return data.some(node => {
  //     let isExpanded: boolean;
  //     if (node.id === id) {
  //       // isExpanded = true;
  //       // node.isFieldExpanded = true;
  //       return true;
  //     }
  //     if (node.children && node.children.length > 0 && !isExpanded) {
  //       isExpanded = this.expandChildNodesNodes(node.children, id);
  //     }
  //     if (!node.isFieldExpanded) {
  //       node.isFieldExpanded = isExpanded;
  //     }
  //     return isExpanded;
  //   });
  // }

  // Update selected node
  selectItem(item: ProcessInfo): void {
    this.setSelectedNode(this.processes, item.id);
  }

  // addChildNodes(data: Array<Process>, updatedNode: Process): boolean {
  //   if (!data)
  //     return false;
  //   return data.some(node => {
  //     let isChildAdded: boolean;
  //     if (node.id === updatedNode.id) {
  //       isChildAdded = true;
  //       _.merge(node, updatedNode);
  //       node.isSelected = true;
  //       node.isFieldExpanded = true;
  //       return true;
  //     }
  //     if (node.children && node.children.length > 0 && !isChildAdded)
  //       isChildAdded = this.addChildNodes(node.children, updatedNode);
  //     return isChildAdded;
  //   });
  // }

  // getProcessWithSelectedNode(): void {
  //   this.processes = this.processService.getProcesses();
  //   //this.id = this.route.snapshot.paramMap.get('name');
  //   if (this.route.firstChild.paramMap) {
  //     this.route.firstChild.paramMap.subscribe(
  //       (params: ParamMap) => {
  //         this.id = +params.get('id');
  //         this.setExpandedTrueForSelectedNode(this.processes);
  //         if (this.treeModel) {
  //           this.selectedNode = this.treeModel.getNodeById(this.id);
  //           this.processNodeService.setSelectedNode(this.selectedNode.data);
  //           this.treeModel.setExpandedNode(this.treeModel, this.selectedNode);
  //         }
  //       }
  //     );
  //   }
  // }

  // setExpandedTrueForSelectedNode(data: Array<ProcessInfo>): boolean {
  //   let isExpanded: boolean;
  //   data.some(node => {
  //     if (isExpanded)
  //       return false;
  //     if (node.id === this.id) {
  //       isExpanded = node.isFieldExpanded = true;
  //     }
  //     if (node.children && node.children.length > 0 && !isExpanded)
  //       isExpanded = node.isFieldExpanded = this.setExpandedTrueForSelectedNode(node.children);
  //     else
  //       isExpanded = node.isFieldExpanded;
  //   });
  //   return isExpanded;
  // }

  // onActivated = ($event) => {
  //   this.processNodeService.setSelectedNode($event.node.data);
  // }

  // //Hack-as refresh/manual URL change-event Activate is not firing.
  // onInitialized = ($event) => {
  //   if (this.id > 0) {
  //     this.treeModel = $event.treeModel;
  //     this.selectedNode = this.treeModel.getNodeById(this.id);
  //     this.processNodeService.setSelectedNode(this.selectedNode.data);

  //   }
  // }

  // options: ITreeOptions = {
  //   displayField: 'name',
  //   isExpandedField: 'isFieldExpanded',
  //   idField: 'id',
  //   //hasChildrenField: 'hasChildren',
  //   actionMapping: {
  //     mouse: {
  //       dblClick: (tree, node, $event) => {
  //         if (node.hasChildren) TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
  //       }
  //     }
  //   },
  //   nodeHeight: 23,
  //   allowDrag: (node) => {
  //     return true;
  //   },
  //   allowDrop: (node) => {
  //     return true;
  //   },
  //   useVirtualScroll: true,
  //   animateExpand: true,
  //   animateSpeed: 30,
  //   animateAcceleration: 1.2
  // }
}
