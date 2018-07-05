import { Component, OnInit, Inject } from '@angular/core';
import { EapRule } from '../../model/eaprule';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-eap-mapping-advance-rules',
  templateUrl: './eap-mapping-advance-rules.component.html',
  styleUrls: ['./eap-mapping-advance-rules.component.css']
})
export class EapMappingAdvanceRulesComponent implements OnInit {
/*Class variables*/
  heading: string; ruleDefinition: string; ruleActivity: string;

  /*Class constructor*/
  constructor(
    public dialogRef: MatDialogRef<EapMappingAdvanceRulesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  /*Initialize the class*/
  ngOnInit() {
    this.heading = (this.data.ruleType === 'GUIDED') ? 'GUIDED RULE' : 'ADVANCE RULE';
    this.ruleDefinition = this.data.rule.advance;
    this.ruleActivity = this.data.rule.activityName;
  }

}
