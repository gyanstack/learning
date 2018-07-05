import { Component, OnInit } from '@angular/core';
// import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { PageEvent } from '@angular/material';

import { CodesService, LogService } from '../../api';
import { DialogInfo, Codes, Replacer } from '../../model';
import { MessageService, DialogService } from '../../services';
import {
  selectCodeError, UnsubscribeObservable, fetchingDataMessage,
  resetChangesMessage, boTypeDeal, codesSavedMessage, InputType, defaultNumberValue, defaultStringValue, successResponseCode,
  savingCodesMessage, codesValidationMessage, setControlDirty
} from '../../shared/util';
import {
  replacerCodes, rangeValidationCodesField, mandatoryTextValidationCodesField,
  formattedDataCodesKey, unformatTextData, formatTextData, getCodeValue
} from '../../shared/code-util';

@Component({
  selector: 'app-deal-codes',
  templateUrl: './deal-codes.component.html',
  styleUrls: ['./deal-codes.component.css']
})
export class DealCodesComponent implements OnInit {

  readonly zeroValue = 0;
  readonly oneValue = 1;
  readonly twoValue = 2;
  readonly threeValue = 3;

  isProcessing = false;

  codesDetailForm: FormGroup;
  codes: Codes;

  get finalRangeAverageBottomValue() { return this.codesDetailForm.get('finalRangeAverageBottomValue'); }
  get finalRangeAverageTopValue() { return this.codesDetailForm.get('finalRangeAverageTopValue'); }
  get borrowersAverageBottomValue() { return this.codesDetailForm.get('borrowersAverageBottomValue'); }
  get borrowersAverageTopValue() { return this.codesDetailForm.get('borrowersAverageTopValue'); }
  get lendersAverageBottomValue() { return this.codesDetailForm.get('lendersAverageBottomValue'); }
  get lendersAverageTopValue() { return this.codesDetailForm.get('lendersAverageTopValue'); }
  get facilitiesAverageBottomValue() { return this.codesDetailForm.get('facilitiesAverageBottomValue'); }
  get facilitiesAverageTopValue() { return this.codesDetailForm.get('facilitiesAverageTopValue'); }
  get multiCurrencyAverageBottomValue() { return this.codesDetailForm.get('multiCurrencyAverageBottomValue'); }
  get multiCurrencyAverageTopValue() { return this.codesDetailForm.get('multiCurrencyAverageTopValue'); }
  get pricingOptionAverageBottomValue() { return this.codesDetailForm.get('pricingOptionAverageBottomValue'); }
  get pricingOptionAverageTopValue() { return this.codesDetailForm.get('pricingOptionAverageTopValue'); }
  get riskTypeAverageBottomValue() { return this.codesDetailForm.get('riskTypeAverageBottomValue'); }
  get riskTypeAverageTopValue() { return this.codesDetailForm.get('riskTypeAverageTopValue'); }
  get sublimitsAverageBottomValue() { return this.codesDetailForm.get('sublimitsAverageBottomValue'); }
  get sublimitsAverageTopValue() { return this.codesDetailForm.get('sublimitsAverageTopValue'); }
  get loanWithRepaymentScheduleAverageBottomValue() { return this.codesDetailForm.get('loanWithRepaymentScheduleAverageBottomValue'); }
  get loanWithRepaymentScheduleAverageTopValue() { return this.codesDetailForm.get('loanWithRepaymentScheduleAverageTopValue'); }
  get dealTypeSoleLenderValue() { return this.codesDetailForm.get('dealTypeSoleLenderValue'); }
  get dealTypeOtherBankAgentValue() { return this.codesDetailForm.get('dealTypeOtherBankAgentValue'); }
  get dealTypeIntercompanyDealsValue() { return this.codesDetailForm.get('dealTypeIntercompanyDealsValue'); }
  get dealTypeBMOagencyValue() { return this.codesDetailForm.get('dealTypeBMOagencyValue'); }
  get productTypesCFDAutoFinanceValue() { return this.codesDetailForm.get('productTypesCFDAutoFinanceValue'); }
  get productTypesCCLODealershipFinanceValue() { return this.codesDetailForm.get('productTypesCCLODealershipFinanceValue'); }
  // get productTypesCCLORealeStateValue() { return this.codesDetailForm.get('productTypesCCLORealeStateValue'); }
  get productTypesTradingValue() { return this.codesDetailForm.get('productTypesTradingValue'); }
  get productTypesOverdraftLineValue() { return this.codesDetailForm.get('productTypesOverdraftLineValue'); }
  get productTypesPrimeRevenueIntegrationValue() { return this.codesDetailForm.get('productTypesPrimeRevenueIntegrationValue'); }
  get productTypesSweeptoLoanValue() { return this.codesDetailForm.get('productTypesSweeptoLoanValue'); }
  get productTypesOLBBValue() { return this.codesDetailForm.get('productTypesOLBBValue'); }
  get productTypesConstructionValue() { return this.codesDetailForm.get('productTypesConstructionValue'); }
  get productTypesBrokerValue() { return this.codesDetailForm.get('productTypesBrokerValue'); }
  get productTypesCFDABLValue() { return this.codesDetailForm.get('productTypesCFDABLValue'); }
  get productTypesCCLOABLValue() { return this.codesDetailForm.get('productTypesCCLOABLValue'); }
  get productTypesCCLOInventoryFinanceValue() { return this.codesDetailForm.get('productTypesCCLOInventoryFinanceValue'); }
  get productTypesFlooringValue() { return this.codesDetailForm.get('productTypesFlooringValue'); }
  get productTypesConstructionAadminCartCLCSManagedValue() {
    return this.codesDetailForm.get('productTypesConstructionAadminCartCLCSManagedValue');
  }
  get productTypesTradeFinanceValue() { return this.codesDetailForm.get('productTypesTradeFinanceValue'); }
  get productTypesSupplyChainValue() { return this.codesDetailForm.get('productTypesSupplyChainValue'); }
  get productTypesCommercialMortgageValue() { return this.codesDetailForm.get('productTypesCommercialMortgageValue'); }
  get crossBorderYesValue() { return this.codesDetailForm.get('crossBorderYesValue'); }
  get crossBorderNoValue() { return this.codesDetailForm.get('crossBorderNoValue'); }
  get collateralNoValue() { return this.codesDetailForm.get('collateralNoValue'); }
  get collateralPrimaryValue() { return this.codesDetailForm.get('collateralPrimaryValue'); }
  get collateralBBCValue() { return this.codesDetailForm.get('collateralBBCValue'); }
  get interestNormalPricingWithBaseAndSpreadValue() { return this.codesDetailForm.get('interestNormalPricingWithBaseAndSpreadValue'); }
  get interestNormalPricingFloorRateValue() { return this.codesDetailForm.get('interestNormalPricingFloorRateValue'); }
  get interestNormalPricingCapRateValue() { return this.codesDetailForm.get('interestNormalPricingCapRateValue'); }

  get interestPricingForMatrixPricingValue() { return this.codesDetailForm.get('interestPricingForMatrixPricingValue'); }
  get dealInfraStrucureSAMUValue() { return this.codesDetailForm.get('dealInfraStrucureSAMUValue'); }
  get pricingOptionsLowValue() { return this.codesDetailForm.get('pricingOptionsLowValue'); }
  get pricingOptionsAverageValue() { return this.codesDetailForm.get('pricingOptionsAverageValue'); }
  get pricingOptionsHighValue() { return this.codesDetailForm.get('pricingOptionsHighValue'); }
  get segmentGroupNameCodesLowValue() { return this.codesDetailForm.get('segmentGroupNameCodesLowValue'); }
  get segmentGroupNameCodesAverageValue() { return this.codesDetailForm.get('segmentGroupNameCodesAverageValue'); }
  get segmentGroupNameCodesHighValue() { return this.codesDetailForm.get('segmentGroupNameCodesHighValue'); }
  get dealTypesIintercompanyDealsRiskTypesValue() { return this.codesDetailForm.get('dealTypesIintercompanyDealsRiskTypesValue'); }
  get productTypesCFDAutoFinanaceMISCodes() { return this.codesDetailForm.get('productTypesCFDAutoFinanaceMISCodes'); }
  get productTypesCCLODealershipFinanaceMISCodes() { return this.codesDetailForm.get('productTypesCCLODealershipFinanaceMISCodes'); }
  get productTypesPrimeRevenueIntegrationMISCodes() { return this.codesDetailForm.get('productTypesPrimeRevenueIntegrationMISCodes'); }
  get productTypesSweepToLoanMISCodes() { return this.codesDetailForm.get('productTypesSweepToLoanMISCodes'); }
  get productTypesOLBBMISCodes() { return this.codesDetailForm.get('productTypesOLBBMISCodes'); }
  get productTypesCFDABLMISCodes() { return this.codesDetailForm.get('productTypesCFDABLMISCodes'); }
  get productTypesCCLOABLMISCodes() { return this.codesDetailForm.get('productTypesCCLOABLMISCodes'); }
  get productTypesOverdraftRiskTypes() { return this.codesDetailForm.get('productTypesOverdraftRiskTypes'); }
  get productTypesPricingOptions() { return this.codesDetailForm.get('productTypesPricingOptions'); }
  get productTypesFlooringRiskTypes() { return this.codesDetailForm.get('productTypesFlooringRiskTypes'); }
  get productTypesConstructionPrimaryCollateralTypes() {
    return this.codesDetailForm.get('productTypesConstructionPrimaryCollateralTypes');
  }
  get productTypesConstructionAadminCartCLCSManagedMISTypes() {
    return this.codesDetailForm.get('productTypesConstructionAadminCartCLCSManagedMISTypes');
  }
  get productTypesTradeFinanceRiskTypes() { return this.codesDetailForm.get('productTypesTradeFinanceRiskTypes'); }
  get productTypesSupplyChainRiskTypes() { return this.codesDetailForm.get('productTypesSupplyChainRiskTypes'); }
  get productTypesCommercialMortgageRiskTypes() { return this.codesDetailForm.get('productTypesCommercialMortgageRiskTypes'); }
  get productTypesCCLOInventoryFinanceMISCodes() { return this.codesDetailForm.get('productTypesCCLOInventoryFinanceMISCodes'); }
  constructor(private fb: FormBuilder, private codesService: CodesService, private messageService: MessageService,
    private dialogService: DialogService, private logService: LogService, private router: Router) {
    this.createForm(); // initialize form group.
  }

  ngOnInit() {
    // initialize UI.
    this.initializeUI();
    // Subscribe for changes
    // this.subscribeForChanges();

  }

  // save codes
  saveCodes() {
    try {
      // save data.
      this.saveOrUpdateCodes();
    } catch (error) {
      this.stopProcessingWithError(error, 'saveOrUpdateCodes');
    }
  }

  // reset ui
  cancelUI() {
    // start processing
    this.startProcessing(resetChangesMessage);
    // initialize UI.
    this.initializeUI();
  }

  handleServiceResponse(res: any): void {
    if (res.responseCode === successResponseCode) {
      this.initializeUI(codesSavedMessage);
      this.logService.log(res, this, 'handleServiceResponse');
    } else if (res.errors && res.errors.length > 0) {
      this.stopProcessingWithError(res.errors[0], 'handleServiceResponse');
    } else {
      this.stopProcessingWithError(null, 'handleServiceResponse');
    }
  }

  saveOrUpdateCodes(): void {
    // start processing
    this.startProcessing(savingCodesMessage);
    // form value.
    const formModel = this.codesDetailForm.value;
    // validate codes
    if (this.validateUI(formModel)) {
      const finalCodes = { 'boType': { 'type': 'Deal' }, 'replacers': [] };
      Object.keys(formModel).forEach(element => {
        // console.log(element);
        // console.log(replacerCodes[element]);
        // console.log(formModel[element]);
        const originalCode = getCodeValue(this.codes, replacerCodes[element]);
        const code = {
          'id': originalCode.id,
          'replacerName': replacerCodes[element],
          'replacerValue': formatTextData(element, formModel[element])
        };
        finalCodes.replacers.push(code);
      });
      this.codesService.saveRuleCodeS(finalCodes)
        .subscribe(rtn => {
          this.handleServiceResponse(rtn);
        },
          (err: any) => {
            this.stopProcessingWithError(err, 'saveOrUpdateCodes');
          });
    } else {
      this.stopProcessingWithError(codesValidationMessage, 'saveOrUpdateCodes');
    }
  }

  validateUI(formModel: any): boolean {
    let isValidUI = true;
    // validateRangeControl
    for (let index = 0; index < rangeValidationCodesField.length; index++) {
      if (!this.validateRangeControl(rangeValidationCodesField[index][0], rangeValidationCodesField[index][1])) {
        isValidUI = false;
      }
    }

    // NOT REQUIRED AS PER BUSINESS.
    // // mandatory Text Validation
    // for (let index = 0; index < mandatoryTextValidationCodesField.length; index++) {
    //   if (!this.mandatoryTextValidationControl(mandatoryTextValidationCodesField[index])) {
    //     isValidUI = false;
    //   }
    // }

    return isValidUI;
  }

  // validateRangeControl
  validateRangeControl(bottomControlName: string, topControlName: string): boolean {
    let isValidControl = true;
    const bottomControl = this.codesDetailForm.get(bottomControlName);
    const topControl = this.codesDetailForm.get(topControlName);

    if (bottomControl && topControl) {
      // reset controls
      // bottomControl.setErrors(null);
      // topControl.setErrors(null);

      if (!bottomControl.value || Number(bottomControl.value) < 0) {
        isValidControl = false;
        setControlDirty(bottomControl);
      }

      if (!topControl.value || +topControl.value < 0) {
        isValidControl = false;
        setControlDirty(topControl);
      }

      if (bottomControl.value && topControl.value && Number(bottomControl.value) > Number(topControl.value)) {
        isValidControl = false;
        setControlDirty(bottomControl);
        setControlDirty(topControl);
      }
    }
    return isValidControl;
  }

  // mandatoryTextValidationControl
  mandatoryTextValidationControl(controlName: string): boolean {
    let isValidControl = true;
    const bottomControl = this.codesDetailForm.get(controlName);

    if (bottomControl) {

      if (!bottomControl.value || !bottomControl.value.trim()) {
        isValidControl = false;
        setControlDirty(bottomControl);
      }
    }
    return isValidControl;
  }

  // initialize form group.
  createForm() {
    const initialCodes = { 'boType': { 'type': 'Deal' }, 'replacers': [] };
    this.codesDetailForm = this.fb.group({
      finalRangeAverageBottomValue:
        [getCodeValue(initialCodes, replacerCodes.finalRangeAverageBottomValue, InputType.String).replacerValue,
        [Validators.required]],
      finalRangeAverageTopValue:
        [getCodeValue(initialCodes, replacerCodes.finalRangeAverageTopValue, InputType.String).replacerValue,
        [Validators.required]],
      borrowersAverageBottomValue:
        [getCodeValue(initialCodes, replacerCodes.borrowersAverageBottomValue, InputType.String).replacerValue,
        [Validators.required]],
      borrowersAverageTopValue:
        [getCodeValue(initialCodes, replacerCodes.borrowersAverageTopValue, InputType.String).replacerValue,
        [Validators.required]],
      lendersAverageBottomValue:
        [getCodeValue(initialCodes, replacerCodes.lendersAverageBottomValue, InputType.String).replacerValue,
        [Validators.required]],
      lendersAverageTopValue:
        [getCodeValue(initialCodes, replacerCodes.lendersAverageTopValue, InputType.String).replacerValue,
        [Validators.required]],
      facilitiesAverageBottomValue:
        [getCodeValue(initialCodes, replacerCodes.facilitiesAverageBottomValue, InputType.String).replacerValue,
        [Validators.required]],
      facilitiesAverageTopValue:
        [getCodeValue(initialCodes, replacerCodes.facilitiesAverageTopValue, InputType.String).replacerValue,
        [Validators.required]],
      multiCurrencyAverageBottomValue:
        [getCodeValue(initialCodes, replacerCodes.multiCurrencyAverageBottomValue, InputType.String).replacerValue,
        [Validators.required]],
      multiCurrencyAverageTopValue:
        [getCodeValue(initialCodes, replacerCodes.multiCurrencyAverageTopValue, InputType.String).replacerValue,
        [Validators.required]],
      pricingOptionAverageBottomValue:
        [getCodeValue(initialCodes, replacerCodes.pricingOptionAverageBottomValue, InputType.String).replacerValue,
        [Validators.required]],
      pricingOptionAverageTopValue:
        [getCodeValue(initialCodes, replacerCodes.pricingOptionAverageTopValue, InputType.String).replacerValue,
        [Validators.required]],
      riskTypeAverageBottomValue:
        [getCodeValue(initialCodes, replacerCodes.riskTypeAverageBottomValue, InputType.String).replacerValue,
        [Validators.required]],
      riskTypeAverageTopValue:
        [getCodeValue(initialCodes, replacerCodes.riskTypeAverageTopValue, InputType.String).replacerValue,
        [Validators.required]],
      sublimitsAverageBottomValue:
        [getCodeValue(initialCodes, replacerCodes.sublimitsAverageBottomValue, InputType.String).replacerValue,
        [Validators.required]],
      sublimitsAverageTopValue:
        [getCodeValue(initialCodes, replacerCodes.sublimitsAverageTopValue, InputType.String).replacerValue,
        [Validators.required]],
      loanWithRepaymentScheduleAverageBottomValue:
        [getCodeValue(initialCodes, replacerCodes.loanWithRepaymentScheduleAverageBottomValue, InputType.String).replacerValue,
        [Validators.required]],
      loanWithRepaymentScheduleAverageTopValue:
        [getCodeValue(initialCodes, replacerCodes.loanWithRepaymentScheduleAverageTopValue, InputType.String).replacerValue,
        [Validators.required]],
      dealTypeSoleLenderValue:
        [getCodeValue(initialCodes, replacerCodes.dealTypeSoleLenderValue, InputType.Number).replacerValue,
        [Validators.required]],
      dealTypeOtherBankAgentValue:
        [getCodeValue(initialCodes, replacerCodes.dealTypeOtherBankAgentValue, InputType.Number).replacerValue,
        [Validators.required]],
      dealTypeIntercompanyDealsValue:
        [getCodeValue(initialCodes, replacerCodes.dealTypeIntercompanyDealsValue, InputType.Number).replacerValue,
        [Validators.required]],
      dealTypeBMOagencyValue:
        [getCodeValue(initialCodes, replacerCodes.dealTypeBMOagencyValue, InputType.Number).replacerValue, [Validators.required]],
      productTypesCFDAutoFinanceValue:
        [getCodeValue(initialCodes, replacerCodes.productTypesCFDAutoFinanceValue, InputType.Number).replacerValue,
        [Validators.required]],
      productTypesCCLODealershipFinanceValue:
        [getCodeValue(initialCodes, replacerCodes.productTypesCCLODealershipFinanceValue, InputType.Number).replacerValue,
        [Validators.required]],
      // productTypesCCLORealeStateValue:
      //   [getCodeValue(initialCodes, replacerCodes.productTypesCCLORealeStateValue, InputType.Number).replacerValue,
      //   [Validators.required]],
      productTypesTradingValue:
        [getCodeValue(initialCodes, replacerCodes.productTypesTradingValue, InputType.Number).replacerValue,
        [Validators.required]],
      productTypesOverdraftLineValue:
        [getCodeValue(initialCodes, replacerCodes.productTypesOverdraftLineValue, InputType.Number).replacerValue,
        [Validators.required]],
      productTypesPrimeRevenueIntegrationValue:
        [getCodeValue(initialCodes, replacerCodes.productTypesPrimeRevenueIntegrationValue, InputType.Number).replacerValue,
        [Validators.required]],
      productTypesSweeptoLoanValue:
        [getCodeValue(initialCodes, replacerCodes.productTypesSweeptoLoanValue, InputType.Number).replacerValue,
        [Validators.required]],
      productTypesOLBBValue:
        [getCodeValue(initialCodes, replacerCodes.productTypesOLBBValue, InputType.Number).replacerValue,
        [Validators.required]],
      productTypesConstructionValue:
        [getCodeValue(initialCodes, replacerCodes.productTypesConstructionValue, InputType.Number).replacerValue,
        [Validators.required]],
      productTypesBrokerValue:
        [getCodeValue(initialCodes, replacerCodes.productTypesBrokerValue, InputType.Number).replacerValue,
        [Validators.required]],
      productTypesCFDABLValue:
        [getCodeValue(initialCodes, replacerCodes.productTypesCFDABLValue, InputType.Number).replacerValue,
        [Validators.required]],
      productTypesCCLOABLValue:
        [getCodeValue(initialCodes, replacerCodes.productTypesCCLOABLValue, InputType.Number).replacerValue,
        [Validators.required]],
      productTypesCCLOInventoryFinanceValue:
        [getCodeValue(initialCodes, replacerCodes.productTypesCCLOInventoryFinanceValue, InputType.Number).replacerValue,
        [Validators.required]],
      productTypesFlooringValue:
        [getCodeValue(initialCodes, replacerCodes.productTypesFlooringValue, InputType.Number).replacerValue,
        [Validators.required]],
      productTypesConstructionAadminCartCLCSManagedValue:
        [getCodeValue(initialCodes, replacerCodes.productTypesConstructionAadminCartCLCSManagedValue, InputType.Number).replacerValue,
        [Validators.required]],
      productTypesTradeFinanceValue:
        [getCodeValue(initialCodes, replacerCodes.productTypesTradeFinanceValue, InputType.Number).replacerValue,
        [Validators.required]],
      productTypesSupplyChainValue:
        [getCodeValue(initialCodes, replacerCodes.productTypesSupplyChainValue, InputType.Number).replacerValue,
        [Validators.required]],
      productTypesCommercialMortgageValue:
        [getCodeValue(initialCodes, replacerCodes.productTypesCommercialMortgageValue, InputType.Number).replacerValue,
        [Validators.required]],
      crossBorderYesValue:
        [getCodeValue(initialCodes, replacerCodes.crossBorderYesValue, InputType.Number).replacerValue,
        [Validators.required]],
      crossBorderNoValue:
        [getCodeValue(initialCodes, replacerCodes.crossBorderNoValue, InputType.Number).replacerValue,
        [Validators.required]],
      collateralNoValue:
        [getCodeValue(initialCodes, replacerCodes.collateralNoValue, InputType.Number).replacerValue,
        [Validators.required]],
      collateralPrimaryValue:
        [getCodeValue(initialCodes, replacerCodes.collateralPrimaryValue, InputType.Number).replacerValue,
        [Validators.required]],
      collateralBBCValue:
        [getCodeValue(initialCodes, replacerCodes.collateralBBCValue, InputType.Number).replacerValue,
        [Validators.required]],
      interestNormalPricingWithBaseAndSpreadValue:
        [getCodeValue(initialCodes, replacerCodes.interestNormalPricingWithBaseAndSpreadValue, InputType.Number).replacerValue,
        [Validators.required]],
      interestNormalPricingFloorRateValue:
        [getCodeValue(initialCodes, replacerCodes.interestNormalPricingFloorRateValue, InputType.Number).replacerValue,
        [Validators.required]],
      interestNormalPricingCapRateValue:
        [getCodeValue(initialCodes, replacerCodes.interestNormalPricingCapRateValue, InputType.Number).replacerValue,
        [Validators.required]],

      interestPricingForMatrixPricingValue:
        [getCodeValue(initialCodes, replacerCodes.interestPricingForMatrixPricingValue, InputType.Number).replacerValue,
        [Validators.required]],
      dealInfraStrucureSAMUValue:
        [getCodeValue(initialCodes, replacerCodes.dealInfraStrucureSAMUValue, InputType.Number).replacerValue,
        [Validators.required]],
      pricingOptionsLowValue:
        [getCodeValue(initialCodes, replacerCodes.pricingOptionsLowValue, InputType.String).replacerValue,
        [Validators.required]],
      pricingOptionsAverageValue:
        [getCodeValue(initialCodes, replacerCodes.pricingOptionsAverageValue, InputType.String).replacerValue,
        [Validators.required]],
      pricingOptionsHighValue:
        [getCodeValue(initialCodes, replacerCodes.pricingOptionsHighValue, InputType.String).replacerValue,
        [Validators.required]],
      segmentGroupNameCodesLowValue:
        [getCodeValue(initialCodes, replacerCodes.segmentGroupNameCodesLowValue, InputType.String).replacerValue,
        [Validators.required]],
      segmentGroupNameCodesAverageValue:
        [getCodeValue(initialCodes, replacerCodes.segmentGroupNameCodesAverageValue, InputType.String).replacerValue,
        [Validators.required]],
      segmentGroupNameCodesHighValue:
        [getCodeValue(initialCodes, replacerCodes.segmentGroupNameCodesHighValue, InputType.String).replacerValue,
        [Validators.required]],
      dealTypesIintercompanyDealsRiskTypesValue:
        [getCodeValue(initialCodes, replacerCodes.dealTypesIintercompanyDealsRiskTypesValue, InputType.String).replacerValue,
        [Validators.required]],
      productTypesCFDAutoFinanaceMISCodes:
        [getCodeValue(initialCodes, replacerCodes.productTypesCFDAutoFinanaceMISCodes, InputType.String).replacerValue,
        [Validators.required]],
      productTypesCCLODealershipFinanaceMISCodes:
        [getCodeValue(initialCodes, replacerCodes.productTypesCCLODealershipFinanaceMISCodes, InputType.String).replacerValue,
        [Validators.required]],
      productTypesPrimeRevenueIntegrationMISCodes:
        [getCodeValue(initialCodes, replacerCodes.productTypesPrimeRevenueIntegrationMISCodes, InputType.String).replacerValue,
        [Validators.required]],
      productTypesSweepToLoanMISCodes:
        [getCodeValue(initialCodes, replacerCodes.productTypesSweepToLoanMISCodes, InputType.String).replacerValue,
        [Validators.required]],
      productTypesOLBBMISCodes:
        [getCodeValue(initialCodes, replacerCodes.productTypesOLBBMISCodes, InputType.String).replacerValue,
        [Validators.required]],
      productTypesCFDABLMISCodes:
        [getCodeValue(initialCodes, replacerCodes.productTypesCFDABLMISCodes, InputType.String).replacerValue,
        [Validators.required]],
      productTypesCCLOABLMISCodes:
        [getCodeValue(initialCodes, replacerCodes.productTypesCCLOABLMISCodes, InputType.String).replacerValue,
        [Validators.required]],
      productTypesOverdraftRiskTypes:
        [getCodeValue(initialCodes, replacerCodes.productTypesOverdraftRiskTypes, InputType.String).replacerValue,
        [Validators.required]],
      productTypesPricingOptions:
        [getCodeValue(initialCodes, replacerCodes.productTypesPricingOptions, InputType.String).replacerValue,
        [Validators.required]],
      productTypesFlooringRiskTypes:
        [getCodeValue(initialCodes, replacerCodes.productTypesFlooringRiskTypes, InputType.String).replacerValue,
        [Validators.required]],
      productTypesConstructionPrimaryCollateralTypes:
        [getCodeValue(initialCodes, replacerCodes.productTypesConstructionPrimaryCollateralTypes, InputType.String).replacerValue,
        [Validators.required]],
      productTypesConstructionAadminCartCLCSManagedMISTypes:
        [getCodeValue(initialCodes, replacerCodes.productTypesConstructionAadminCartCLCSManagedMISTypes, InputType.String).replacerValue,
        [Validators.required]],
      productTypesTradeFinanceRiskTypes:
        [getCodeValue(initialCodes, replacerCodes.productTypesTradeFinanceRiskTypes, InputType.String).replacerValue,
        [Validators.required]],
      productTypesSupplyChainRiskTypes:
        [getCodeValue(initialCodes, replacerCodes.productTypesSupplyChainRiskTypes, InputType.String).replacerValue,
        [Validators.required]],
      productTypesCommercialMortgageRiskTypes:
        [getCodeValue(initialCodes, replacerCodes.productTypesCommercialMortgageRiskTypes, InputType.String).replacerValue,
        [Validators.required]],
      productTypesCCLOInventoryFinanceMISCodes:
        [getCodeValue(initialCodes, replacerCodes.productTypesCCLOInventoryFinanceMISCodes, InputType.String).replacerValue,
        [Validators.required]]
    });
  }

  // fetch rulecodes from service and populate ui for those rulecodes.
  initializeUI(message?: string): void {
    this.codesService.getRuleCodes(boTypeDeal).subscribe(
      data => {
        if (data) {
          this.codes = data;
          this.resetForm(data);
          this.stopProcessing(message);
        }
      },
      (err: any) => {
        this.stopProcessingWithError(err, 'initializeUI');
      });
  }

  // reset UI.
  resetForm(codes: Codes) {
    this.codesDetailForm.reset({
      finalRangeAverageBottomValue:
        getCodeValue(codes, replacerCodes.finalRangeAverageBottomValue, InputType.String).replacerValue,
      finalRangeAverageTopValue:
        getCodeValue(codes, replacerCodes.finalRangeAverageTopValue, InputType.String).replacerValue,
      borrowersAverageBottomValue:
        getCodeValue(codes, replacerCodes.borrowersAverageBottomValue, InputType.String).replacerValue,
      borrowersAverageTopValue:
        getCodeValue(codes, replacerCodes.borrowersAverageTopValue, InputType.String).replacerValue,
      lendersAverageBottomValue:
        getCodeValue(codes, replacerCodes.lendersAverageBottomValue, InputType.String).replacerValue,
      lendersAverageTopValue:
        getCodeValue(codes, replacerCodes.lendersAverageTopValue, InputType.String).replacerValue,
      facilitiesAverageBottomValue:
        getCodeValue(codes, replacerCodes.facilitiesAverageBottomValue, InputType.String).replacerValue,
      facilitiesAverageTopValue:
        getCodeValue(codes, replacerCodes.facilitiesAverageTopValue, InputType.String).replacerValue,
      multiCurrencyAverageBottomValue:
        getCodeValue(codes, replacerCodes.multiCurrencyAverageBottomValue, InputType.String).replacerValue,
      multiCurrencyAverageTopValue:
        getCodeValue(codes, replacerCodes.multiCurrencyAverageTopValue, InputType.String).replacerValue,
      pricingOptionAverageBottomValue:
        getCodeValue(codes, replacerCodes.pricingOptionAverageBottomValue, InputType.String).replacerValue,
      pricingOptionAverageTopValue:
        getCodeValue(codes, replacerCodes.pricingOptionAverageTopValue, InputType.String).replacerValue,
      riskTypeAverageBottomValue:
        getCodeValue(codes, replacerCodes.riskTypeAverageBottomValue, InputType.String).replacerValue,
      riskTypeAverageTopValue:
        getCodeValue(codes, replacerCodes.riskTypeAverageTopValue, InputType.String).replacerValue,
      sublimitsAverageBottomValue:
        getCodeValue(codes, replacerCodes.sublimitsAverageBottomValue, InputType.String).replacerValue,
      sublimitsAverageTopValue:
        getCodeValue(codes, replacerCodes.sublimitsAverageTopValue, InputType.String).replacerValue,
      loanWithRepaymentScheduleAverageBottomValue:
        getCodeValue(codes, replacerCodes.loanWithRepaymentScheduleAverageBottomValue, InputType.String).replacerValue,
      loanWithRepaymentScheduleAverageTopValue:
        getCodeValue(codes, replacerCodes.loanWithRepaymentScheduleAverageTopValue, InputType.String).replacerValue,
      dealTypeSoleLenderValue:
        getCodeValue(codes, replacerCodes.dealTypeSoleLenderValue, InputType.Number).replacerValue,
      dealTypeOtherBankAgentValue:
        getCodeValue(codes, replacerCodes.dealTypeOtherBankAgentValue, InputType.Number).replacerValue,
      dealTypeIntercompanyDealsValue:
        getCodeValue(codes, replacerCodes.dealTypeIntercompanyDealsValue, InputType.Number).replacerValue,
      dealTypeBMOagencyValue:
        getCodeValue(codes, replacerCodes.dealTypeBMOagencyValue, InputType.Number).replacerValue,
      productTypesCFDAutoFinanceValue:
        getCodeValue(codes, replacerCodes.productTypesCFDAutoFinanceValue, InputType.Number).replacerValue,
      productTypesCCLODealershipFinanceValue:
        getCodeValue(codes, replacerCodes.productTypesCCLODealershipFinanceValue, InputType.Number).replacerValue,
      // productTypesCCLORealeStateValue:
      //   getCodeValue(codes, replacerCodes.productTypesCCLORealeStateValue, InputType.Number).replacerValue,
      productTypesTradingValue:
        getCodeValue(codes, replacerCodes.productTypesTradingValue, InputType.Number).replacerValue,
      productTypesOverdraftLineValue:
        getCodeValue(codes, replacerCodes.productTypesOverdraftLineValue, InputType.Number).replacerValue,
      productTypesPrimeRevenueIntegrationValue:
        getCodeValue(codes, replacerCodes.productTypesPrimeRevenueIntegrationValue, InputType.Number).replacerValue,
      productTypesSweeptoLoanValue:
        getCodeValue(codes, replacerCodes.productTypesSweeptoLoanValue, InputType.Number).replacerValue,
      productTypesOLBBValue:
        getCodeValue(codes, replacerCodes.productTypesOLBBValue, InputType.Number).replacerValue,
      productTypesConstructionValue:
        getCodeValue(codes, replacerCodes.productTypesConstructionValue, InputType.Number).replacerValue,
      productTypesBrokerValue:
        getCodeValue(codes, replacerCodes.productTypesBrokerValue, InputType.Number).replacerValue,
      productTypesCFDABLValue:
        getCodeValue(codes, replacerCodes.productTypesCFDABLValue, InputType.Number).replacerValue,
      productTypesCCLOABLValue:
        getCodeValue(codes, replacerCodes.productTypesCCLOABLValue, InputType.Number).replacerValue,
      productTypesCCLOInventoryFinanceValue:
        getCodeValue(codes, replacerCodes.productTypesCCLOInventoryFinanceValue, InputType.Number).replacerValue,
      productTypesFlooringValue:
        getCodeValue(codes, replacerCodes.productTypesFlooringValue, InputType.Number).replacerValue,
      productTypesConstructionAadminCartCLCSManagedValue:
        getCodeValue(codes, replacerCodes.productTypesConstructionAadminCartCLCSManagedValue, InputType.Number).replacerValue,
      productTypesTradeFinanceValue:
        getCodeValue(codes, replacerCodes.productTypesTradeFinanceValue, InputType.Number).replacerValue,
      productTypesSupplyChainValue:
        getCodeValue(codes, replacerCodes.productTypesSupplyChainValue, InputType.Number).replacerValue,
      productTypesCommercialMortgageValue:
        getCodeValue(codes, replacerCodes.productTypesCommercialMortgageValue, InputType.Number).replacerValue,
      crossBorderYesValue:
        getCodeValue(codes, replacerCodes.crossBorderYesValue, InputType.Number).replacerValue,
      crossBorderNoValue:
        getCodeValue(codes, replacerCodes.crossBorderNoValue, InputType.Number).replacerValue,
      collateralNoValue:
        getCodeValue(codes, replacerCodes.collateralNoValue, InputType.Number).replacerValue,
      collateralPrimaryValue:
        getCodeValue(codes, replacerCodes.collateralPrimaryValue, InputType.Number).replacerValue,
      collateralBBCValue:
        getCodeValue(codes, replacerCodes.collateralBBCValue, InputType.Number).replacerValue,
      interestNormalPricingWithBaseAndSpreadValue:
        getCodeValue(codes, replacerCodes.interestNormalPricingWithBaseAndSpreadValue, InputType.Number).replacerValue,
      interestNormalPricingFloorRateValue:
        getCodeValue(codes, replacerCodes.interestNormalPricingFloorRateValue, InputType.Number).replacerValue,
      interestNormalPricingCapRateValue:
        getCodeValue(codes, replacerCodes.interestNormalPricingCapRateValue, InputType.Number).replacerValue,

      interestPricingForMatrixPricingValue:
        getCodeValue(codes, replacerCodes.interestPricingForMatrixPricingValue, InputType.Number).replacerValue,
      dealInfraStrucureSAMUValue:
        getCodeValue(codes, replacerCodes.dealInfraStrucureSAMUValue, InputType.Number).replacerValue,
      pricingOptionsLowValue:
        getCodeValue(codes, replacerCodes.pricingOptionsLowValue, InputType.String).replacerValue,
      pricingOptionsAverageValue:
        getCodeValue(codes, replacerCodes.pricingOptionsAverageValue, InputType.String).replacerValue,
      pricingOptionsHighValue:
        getCodeValue(codes, replacerCodes.pricingOptionsHighValue, InputType.String).replacerValue,
      segmentGroupNameCodesLowValue:
        getCodeValue(codes, replacerCodes.segmentGroupNameCodesLowValue, InputType.String).replacerValue,
      segmentGroupNameCodesAverageValue:
        getCodeValue(codes, replacerCodes.segmentGroupNameCodesAverageValue, InputType.String).replacerValue,
      segmentGroupNameCodesHighValue:
        getCodeValue(codes, replacerCodes.segmentGroupNameCodesHighValue, InputType.String).replacerValue,
      dealTypesIintercompanyDealsRiskTypesValue:
        getCodeValue(codes, replacerCodes.dealTypesIintercompanyDealsRiskTypesValue, InputType.String).replacerValue,
      productTypesCFDAutoFinanaceMISCodes:
        getCodeValue(codes, replacerCodes.productTypesCFDAutoFinanaceMISCodes, InputType.String).replacerValue,
      productTypesCCLODealershipFinanaceMISCodes:
        getCodeValue(codes, replacerCodes.productTypesCCLODealershipFinanaceMISCodes, InputType.String).replacerValue,
      productTypesPrimeRevenueIntegrationMISCodes:
        getCodeValue(codes, replacerCodes.productTypesPrimeRevenueIntegrationMISCodes, InputType.String).replacerValue,
      productTypesSweepToLoanMISCodes:
        getCodeValue(codes, replacerCodes.productTypesSweepToLoanMISCodes, InputType.String).replacerValue,
      productTypesOLBBMISCodes:
        getCodeValue(codes, replacerCodes.productTypesOLBBMISCodes, InputType.String).replacerValue,
      productTypesCFDABLMISCodes:
        getCodeValue(codes, replacerCodes.productTypesCFDABLMISCodes, InputType.String).replacerValue,
      productTypesCCLOABLMISCodes:
        getCodeValue(codes, replacerCodes.productTypesCCLOABLMISCodes, InputType.String).replacerValue,
      productTypesOverdraftRiskTypes:
        getCodeValue(codes, replacerCodes.productTypesOverdraftRiskTypes, InputType.String).replacerValue,
      productTypesPricingOptions:
        getCodeValue(codes, replacerCodes.productTypesPricingOptions, InputType.String).replacerValue,
      productTypesFlooringRiskTypes:
        getCodeValue(codes, replacerCodes.productTypesFlooringRiskTypes, InputType.String).replacerValue,
      productTypesConstructionPrimaryCollateralTypes:
        getCodeValue(codes, replacerCodes.productTypesConstructionPrimaryCollateralTypes, InputType.String).replacerValue,
      productTypesConstructionAadminCartCLCSManagedMISTypes:
        getCodeValue(codes, replacerCodes.productTypesConstructionAadminCartCLCSManagedMISTypes, InputType.String).replacerValue,
      productTypesTradeFinanceRiskTypes:
        getCodeValue(codes, replacerCodes.productTypesTradeFinanceRiskTypes, InputType.String).replacerValue,
      productTypesSupplyChainRiskTypes:
        getCodeValue(codes, replacerCodes.productTypesSupplyChainRiskTypes, InputType.String).replacerValue,
      productTypesCommercialMortgageRiskTypes:
        getCodeValue(codes, replacerCodes.productTypesCommercialMortgageRiskTypes, InputType.String).replacerValue,
      productTypesCCLOInventoryFinanceMISCodes:
        getCodeValue(codes, replacerCodes.productTypesCCLOInventoryFinanceMISCodes, InputType.String).replacerValue
    });
  }

  // change event of checkbox.
  changeCheckBox(event, codeKey: string, val: number) {
    if (!event.checked) {
      this.codesDetailForm.get(codeKey).setValue(this.zeroValue);
      // event.source.checked = true;
    } else {
      this.codesDetailForm.get(codeKey).setValue(val);
    }
  }

  // start processing
  startProcessing(message: string) {
    this.isProcessing = true;
    // show srpinter
    // this.sprinterService.showSprinter();
    // notify ui about progress.
    this.messageService.setProgressMessage(message);
  }

  // stop processing
  hideProcessing() {
    this.isProcessing = false;
    // hide srpinter
    // this.sprinterService.hideSprinter();
    this.messageService.hideMessageNotification();
  }

  // stop processing
  stopProcessing(message?: string) {
    this.isProcessing = false;
    // hide srpinter
    // this.sprinterService.hideSprinter();
    if (!message) {
      this.messageService.hideMessageNotification();
    } else {
      this.messageService.setDisplayMessage(message);
    }
  }
  // stop processing with error
  stopProcessingWithError(err: any, method: string) {
    this.isProcessing = false;
    // hide srpinter
    // this.sprinterService.hideSprinter();
    this.messageService.setErrorMessage(err);
    this.logService.logError(err, this.router.url, method);
  }

}
