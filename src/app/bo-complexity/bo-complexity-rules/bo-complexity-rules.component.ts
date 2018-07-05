import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, DoCheck, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { BoComplexityRuleDetailComponent } from '../bo-complexity-rule-detail/bo-complexity-rule-detail.component';
import { BoComplexityRulesService } from '../../api/bo-complexity-rules.service';
import { BOType, BORule, DialogInfo } from '../../model';
import { LogService } from '../../api';
import { MessageService, BoComplexityService, DialogService } from '../../services';
import { UnsubscribeObservable } from '../../shared/util';

@Component({
  selector: 'app-bo-complexity-rules',
  templateUrl: './bo-complexity-rules.component.html',
  styleUrls: ['./bo-complexity-rules.component.css']
})
export class BoComplexityRulesComponent implements OnInit, DoCheck, AfterViewInit {

  displayedColumns = ['name', 'isRuleDefined'];
  dataSource: MatTableDataSource<BOType>;

  @Input()
  BOTypes: Array<BOType>;
  OldBOTypes: Array<BOType>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private messageService: MessageService, private dialogService: DialogService,
    private logService: LogService, private router: Router,
    private boSevice: BoComplexityRulesService, private boComplexityService: BoComplexityService) { }

  ngOnInit() {
  }

  ngDoCheck(): void {
    if (!this.BOTypes) {
      this.OldBOTypes = [];
      this.dataSource = new MatTableDataSource<BOType>([]);
    } else if (this.BOTypes && JSON.stringify(this.OldBOTypes) !== JSON.stringify(this.BOTypes)) {
      this.dataSource = new MatTableDataSource<BOType>(this.BOTypes);
      this.paginator.pageIndex = 0;
      this.dataSource.paginator = this.paginator; // set paginator
      this.OldBOTypes = Array.from<BOType>(this.BOTypes); // set old node
    }
  }

  ngAfterViewInit() {
    if (this.dataSource && this.paginator) {
      this.paginator.pageIndex = 0;
      this.dataSource.paginator = this.paginator; // set paginator
    }
  }

  openRule(item: BOType): void {
    this.setBoComplexityRule(item.id);
  }

  // open complexity rule detail.
  setBoComplexityRule(ruleId: number): void {
    this.boSevice.getBOComplexityRule(ruleId).subscribe(
      data => {
        if (data) {
          const item = data;
          const dialogInfo: DialogInfo = { control: BoComplexityRuleDetailComponent, data: { item: item }, height: 'auto', width: '800px' };

          this.dialogService.showDialogBox(dialogInfo);
          let afterDialogClosedSubscription: Subscription;
          afterDialogClosedSubscription = this.dialogService.afterDialogClosed$.subscribe(result => {
            try {
              if (result) {
                // unsubcribe instance.
                UnsubscribeObservable(afterDialogClosedSubscription);

                // refresh bo complexity type.
                this.boComplexityService.refreshBOTypeList();

              }
            } catch (error) {
              // unsubcribe instance.
              UnsubscribeObservable(afterDialogClosedSubscription);

              this.logService.logError(error, this.router.url, 'refreshBOTypeList');
            }
          });
        }

        // if (data) {
        //   const item = new BORule(data);
        //   const dialogRef = this.dialog.open(BoComplexityRuleDetailComponent, {
        //     height: 'auto',
        //     width: '800px',
        //     data: { item: item }
        //   });

        //   dialogRef.afterClosed().subscribe(result => {
        //     // refresh bo complexity type.
        //     this.boComplexityService.refreshBOTypeList();
        //   });
        // }
      },
      (err: any) => {
        this.messageService.setErrorMessage(err);
      }
    );
  }
}
