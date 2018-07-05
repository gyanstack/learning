import { Component, OnInit, } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
// import { filter } from 'lodash';

import { BoComplexityRulesService } from '../../api/bo-complexity-rules.service';
import { BOType } from '../../model';
import { MessageService, BoComplexityService } from '../../services';

@Component({
  selector: 'app-bo-complexity-rules-center',
  templateUrl: './bo-complexity-rules-center.component.html',
  styleUrls: ['./bo-complexity-rules-center.component.css']
})
export class BoComplexityRulesCenterComponent implements OnInit {

  BOTypes: BOType[];
  FilteredBOTypes: BOType[];

  constructor(private boSevice: BoComplexityRulesService, private messageService: MessageService,
    private boComplexityService: BoComplexityService) { }

  ngOnInit() {
    // populate ui
    this.getBoList();

    // register to refresh ui.
    this.boComplexityService.updatedBOType$.subscribe(obj => {
      this.getBoList();
      this.filterBusinessObjects();
    });
  }

  // fetch bo rules from service and populate ui for those rules.
  getBoList(): void {
    this.boSevice.getBOComplexityRules().subscribe(
      data => {
        if (data) {
          this.BOTypes = data.map((o) => {
            return new BOType(o);
          });
          this.FilteredBOTypes = this.BOTypes.map(x => Object.assign({}, x));
        }
      },
      (err: any) => {
        this.messageService.setErrorMessage(err);
      });
  }

  // set updated rule list after filter change.
  filterBusinessObjects(): void {
    // this.FilteredBOTypes = filter(this.BOTypes.map(x => Object.assign({}, x)), function (o) {
    //   return o.isSelected === true;
    // });
  }
}

