import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { PageEvent } from '@angular/material';

import { CodesService, LogService } from '../../api';
import { DialogInfo, Codes, Replacer } from '../../model';
import { MessageService, DialogService } from '../../services';
import {
  selectCodeError, UnsubscribeObservable, fetchingDataMessage,
  resetChangesMessage, boTypeDeal, codesSavedMessage, InputType, defaultNumberValue, defaultStringValue, successResponseCode,
  savingCodesMessage, codesValidationMessage, setControlDirty, boTypeLoan
} from '../../shared/util';
import {
  replacerCodes, rangeValidationCodesField, mandatoryTextValidationCodesField,
  formattedDataCodesKey, unformatTextData, formatTextData, getCodeValue
} from '../../shared/code-util';

@Component({
  selector: 'app-loan-codes',
  templateUrl: './loan-codes.component.html',
  styleUrls: ['./loan-codes.component.css']
})
export class LoanCodesComponent implements OnInit {

  readonly zeroValue = 0;
  readonly oneValue = 1;
  readonly twoValue = 2;
  readonly threeValue = 3;

  isProcessing = false;

  codesDetailForm: FormGroup;
  codes: Codes;

  get finalRangeAverageBottomValue() { return this.codesDetailForm.get('finalRangeAverageBottomValue'); }
  get finalRangeAverageTopValue() { return this.codesDetailForm.get('finalRangeAverageTopValue'); }
  get loanWithRepaymentScheduleAverageBottomValue() { return this.codesDetailForm.get('loanWithRepaymentScheduleAverageBottomValue'); }
  get loanWithRepaymentScheduleAverageTopValue() { return this.codesDetailForm.get('loanWithRepaymentScheduleAverageTopValue'); }
  get lcInDealAverageBottomValue() { return this.codesDetailForm.get('lcInDealAverageBottomValue'); }
  get lcInDealAverageTopValue() { return this.codesDetailForm.get('lcInDealAverageTopValue'); }
  get lendersAverageBottomValue() { return this.codesDetailForm.get('lendersAverageBottomValue'); }
  get lendersAverageTopValue() { return this.codesDetailForm.get('lendersAverageTopValue'); }
  get lendersCriticalTopValue() { return this.codesDetailForm.get('lendersCriticalTopValue'); }
  get repaymentScheduleNoScheduleValue() { return this.codesDetailForm.get('repaymentScheduleNoScheduleValue'); }
  get repaymentScheduleFixedPrincipalPlusInterestDueValue() {
    return this.codesDetailForm.get('repaymentScheduleFixedPrincipalPlusInterestDueValue');
  }
  get repaymentSchedulePrincipalOnlyValue() { return this.codesDetailForm.get('repaymentSchedulePrincipalOnlyValue'); }
  get repaymentSchedulePrincipalOnlyWithBulletAtMaturityValue() {
    return this.codesDetailForm.get('repaymentSchedulePrincipalOnlyWithBulletAtMaturityValue');
  }
  get repaymentScheduleFlexScheduleValue() { return this.codesDetailForm.get('repaymentScheduleFlexScheduleValue'); }
  get repaymentScheduleFixedPaymentPrincipalAndInterestValue() {
    return this.codesDetailForm.get('repaymentScheduleFixedPaymentPrincipalAndInterestValue');
  }
  get stpInterfaceFullSTPValue() { return this.codesDetailForm.get('stpInterfaceFullSTPValue'); }
  get stpInterfacePartialSTPValue() { return this.codesDetailForm.get('stpInterfacePartialSTPValue'); }
  get stpInterfaceManualValue() { return this.codesDetailForm.get('stpInterfaceManualValue'); }
  get escrowAccountYesValue() { return this.codesDetailForm.get('escrowAccountYesValue'); }
  get escrowAccountNoValue() { return this.codesDetailForm.get('escrowAccountNoValue'); }
  get loanPerformanceStatusAccrualValue() { return this.codesDetailForm.get('loanPerformanceStatusAccrualValue'); }
  get loanPerformanceStatusNonAccrualValue() { return this.codesDetailForm.get('loanPerformanceStatusNonAccrualValue'); }
  get loanPerformanceStatusNonAccrualInterestAndFeestoPrincipalValue() {
    return this.codesDetailForm.get('loanPerformanceStatusNonAccrualInterestAndFeestoPrincipalValue');
  }
  get loanPerformanceStatusPartiallyFullyChargedOffValue() {
    return this.codesDetailForm.get('loanPerformanceStatusPartiallyFullyChargedOffValue');
  }
  get dealTypeSoleLenderValue() { return this.codesDetailForm.get('dealTypeSoleLenderValue'); }
  get dealTypeOtherBankAgentValue() { return this.codesDetailForm.get('dealTypeOtherBankAgentValue'); }
  get dealTypeIntercompanyDealsValue() { return this.codesDetailForm.get('dealTypeIntercompanyDealsValue'); }
  get dealTypeBMOagencyValue() { return this.codesDetailForm.get('dealTypeBMOagencyValue'); }
  get productTypesCFDAutoFinanceValue() { return this.codesDetailForm.get('productTypesCFDAutoFinanceValue'); }
  get productTypesCCLOInventoryFinanceValue() { return this.codesDetailForm.get('productTypesCCLOInventoryFinanceValue'); }
  get productTypesFlooringValue() { return this.codesDetailForm.get('productTypesFlooringValue'); }
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
  get productTypesConstructionAadminCartCLCSManagedValue() {
    return this.codesDetailForm.get('productTypesConstructionAadminCartCLCSManagedValue');
  }
  get productTypesTradingFinanceValue() { return this.codesDetailForm.get('productTypesTradingFinanceValue'); }
  get productTypesSupplyChainValue() { return this.codesDetailForm.get('productTypesSupplyChainValue'); }
  get productTypesCommercialMortgageValue() { return this.codesDetailForm.get('productTypesCommercialMortgageValue'); }
  get productTypesEscrowValue() { return this.codesDetailForm.get('productTypesEscrowValue'); }
  get productTypesDepositValue() { return this.codesDetailForm.get('productTypesDepositValue'); }
  get productTypesBankPurchasedBondValue() { return this.codesDetailForm.get('productTypesBankPurchasedBondValue'); }
  get productTypesLCWithTriadValue() { return this.codesDetailForm.get('productTypesLCWithTriadValue'); }
  get productTypesLCWithNoTriadValue() { return this.codesDetailForm.get('productTypesLCWithNoTriadValue'); }
  get crossBorderYesValue() { return this.codesDetailForm.get('crossBorderYesValue'); }
  get crossBorderNoValue() { return this.codesDetailForm.get('crossBorderNoValue'); }
  get collateralNoValue() { return this.codesDetailForm.get('collateralNoValue'); }
  get collateralMarginedValue() { return this.codesDetailForm.get('collateralMarginedValue'); }
  get collateralMarginedSecuritiesValue() { return this.codesDetailForm.get('collateralMarginedSecuritiesValue'); }
  get interestNormalPricingWithBaseAndSpreadValue() { return this.codesDetailForm.get('interestNormalPricingWithBaseAndSpreadValue'); }
  get interestNormalPricingFloorRateValue() { return this.codesDetailForm.get('interestNormalPricingFloorRateValue'); }
  get interestNormalPricingCapRateValue() { return this.codesDetailForm.get('interestNormalPricingCapRateValue'); }

  get interestPricingForMatrixPricingValue() { return this.codesDetailForm.get('interestPricingForMatrixPricingValue'); }
  get billingCFDAccountsValue() { return this.codesDetailForm.get('billingCFDAccountsValue'); }
  get billingEStatementsValue() { return this.codesDetailForm.get('billingEStatementsValue'); }
  get billingMailBillsValue() { return this.codesDetailForm.get('billingMailBillsValue'); }
  get billingLoanIQFaxAndBillsValue() { return this.codesDetailForm.get('billingLoanIQFaxAndBillsValue'); }
  get dealInfraStrucureSAMUValue() { return this.codesDetailForm.get('dealInfraStrucureSAMUValue'); }
  get loanCurrencyUSDAndCADValue() { return this.codesDetailForm.get('loanCurrencyUSDAndCADValue'); }
  get loanCurrencyNonUSDAndCADValue() { return this.codesDetailForm.get('loanCurrencyNonUSDAndCADValue'); }
  get pricingOptionsLowValue() { return this.codesDetailForm.get('pricingOptionsLowValue'); }
  get pricingOptionsAverageValue() { return this.codesDetailForm.get('pricingOptionsAverageValue'); }
  get pricingOptionsHighValue() { return this.codesDetailForm.get('pricingOptionsHighValue'); }
  get segmentGroupNameCodesLowValue() { return this.codesDetailForm.get('segmentGroupNameCodesLowValue'); }
  get segmentGroupNameCodesAverageValue() { return this.codesDetailForm.get('segmentGroupNameCodesAverageValue'); }
  get segmentGroupNameCodesHighValue() { return this.codesDetailForm.get('segmentGroupNameCodesHighValue'); }
  // get loanPerformanceStatusLowValue() { return this.codesDetailForm.get('loanPerformanceStatusLowValue'); }
  // get loanPerformanceStatusAverageValue() { return this.codesDetailForm.get('loanPerformanceStatusAverageValue'); }
  // get loanPerformanceStatusHighValue() { return this.codesDetailForm.get('loanPerformanceStatusHighValue'); }
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
  get productTypesConstructionPrimaryCollateralTypes() {
    return this.codesDetailForm.get('productTypesConstructionPrimaryCollateralTypes');
  }
  get productTypesConstructionAadminCartCLCSManagedMISTypes() {
    return this.codesDetailForm.get('productTypesConstructionAadminCartCLCSManagedMISTypes');
  }
  get productTypesTradeFinanceRiskTypes() { return this.codesDetailForm.get('productTypesTradeFinanceRiskTypes'); }
  get productTypesTradingFinanceRiskTypes() { return this.codesDetailForm.get('productTypesTradingFinanceRiskTypes'); }
  get productTypesLCWithTriadRiskTypes() { return this.codesDetailForm.get('productTypesLCWithTriadRiskTypes'); }
  get productTypesLCWithNoTriadRiskTypes() { return this.codesDetailForm.get('productTypesLCWithNoTriadRiskTypes'); }
  get productTypesBankPurchasedBondRiskTypes() { return this.codesDetailForm.get('productTypesBankPurchasedBondRiskTypes'); }
  get productTypesSupplyChainRiskTypes() { return this.codesDetailForm.get('productTypesSupplyChainRiskTypes'); }
  get productTypesCommercialMortgageRiskTypes() { return this.codesDetailForm.get('productTypesCommercialMortgageRiskTypes'); }
  get productTypesEscrowPricingOption() { return this.codesDetailForm.get('productTypesEscrowPricingOption'); }
  get productTypesEscrowOutstandingType() { return this.codesDetailForm.get('productTypesEscrowOutstandingType'); }
  get productTypesDepositPricingOption() { return this.codesDetailForm.get('productTypesDepositPricingOption'); }
  get productTypesDepositOutstandingType() { return this.codesDetailForm.get('productTypesDepositOutstandingType'); }
  get productTypesFlooringRiskTypes() { return this.codesDetailForm.get('productTypesFlooringRiskTypes'); }
  get productTypesCCLOInventoryFinanceMISCodes() { return this.codesDetailForm.get('productTypesCCLOInventoryFinanceMISCodes'); }
  get straightThroughProcessingSweepMISTypes() { return this.codesDetailForm.get('straightThroughProcessingSweepMISTypes'); }
  get straightThroughProcessingOLBBMISTypes() { return this.codesDetailForm.get('straightThroughProcessingOLBBMISTypes'); }
  get straightThroughProcessingDatascanMISTypes() { return this.codesDetailForm.get('straightThroughProcessingDatascanMISTypes'); }
  get straightThroughProcessingEDriveMISCodes() { return this.codesDetailForm.get('straightThroughProcessingEDriveMISCodes'); }
  get straightThroughProcessingPrimeRevenueMISTypes() { return this.codesDetailForm.get('straightThroughProcessingPrimeRevenueMISTypes'); }

  constructor(private fb: FormBuilder, private codesService: CodesService, private messageService: MessageService,
    private dialogService: DialogService, private logService: LogService, private router: Router) {
    this.createForm(); // initialize form group.
  }

  ngOnInit() {
    // initialize UI.
    this.initializeUI();
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
      const finalCodes = { 'boType': { 'type': 'Loan' }, 'replacers': [] };
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
      this.logService.log(finalCodes, this, 'saveOrUpdateCodes');
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

      // special case for 'lendersAverageTopValue', 'lendersCriticalTopValue'
      if (bottomControlName === 'lendersAverageTopValue' && topControlName === 'lendersCriticalTopValue' &&
        bottomControl.value && topControl.value && (Number(bottomControl.value) + 1) >= Number(topControl.value)) {
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
    const initialCodes = { 'boType': { 'type': 'Loan' }, 'replacers': [] };
    this.codesDetailForm = this.fb.group({
      finalRangeAverageBottomValue:
        [getCodeValue(initialCodes, replacerCodes.finalRangeAverageBottomValue, InputType.String).replacerValue,
        [Validators.required]],
      finalRangeAverageTopValue:
        [getCodeValue(initialCodes, replacerCodes.finalRangeAverageTopValue, InputType.String).replacerValue,
        [Validators.required]],
      loanWithRepaymentScheduleAverageBottomValue:
        [getCodeValue(initialCodes, replacerCodes.loanWithRepaymentScheduleAverageBottomValue, InputType.String).replacerValue,
        [Validators.required]],
      loanWithRepaymentScheduleAverageTopValue:
        [getCodeValue(initialCodes, replacerCodes.loanWithRepaymentScheduleAverageTopValue, InputType.String).replacerValue,
        [Validators.required]],
      lcInDealAverageBottomValue:
        [getCodeValue(initialCodes, replacerCodes.lcInDealAverageBottomValue, InputType.String).replacerValue,
        [Validators.required]],
      lcInDealAverageTopValue:
        [getCodeValue(initialCodes, replacerCodes.lcInDealAverageTopValue, InputType.String).replacerValue,
        [Validators.required]],
      lendersAverageBottomValue:
        [getCodeValue(initialCodes, replacerCodes.lendersAverageBottomValue, InputType.String).replacerValue,
        [Validators.required]],
      lendersAverageTopValue:
        [getCodeValue(initialCodes, replacerCodes.lendersAverageTopValue, InputType.String).replacerValue,
        [Validators.required]],
      lendersCriticalTopValue:
        [getCodeValue(initialCodes, replacerCodes.lendersCriticalTopValue, InputType.String).replacerValue,
        [Validators.required]],
      repaymentScheduleNoScheduleValue:
        [getCodeValue(initialCodes, replacerCodes.repaymentScheduleNoScheduleValue, InputType.Number).replacerValue,
        [Validators.required]],
      repaymentScheduleFixedPrincipalPlusInterestDueValue:
        [getCodeValue(initialCodes, replacerCodes.repaymentScheduleFixedPrincipalPlusInterestDueValue, InputType.Number).replacerValue,
        [Validators.required]],
      repaymentSchedulePrincipalOnlyValue:
        [getCodeValue(initialCodes, replacerCodes.repaymentSchedulePrincipalOnlyValue, InputType.Number).replacerValue,
        [Validators.required]],
      repaymentSchedulePrincipalOnlyWithBulletAtMaturityValue:
        [getCodeValue(initialCodes, replacerCodes.repaymentSchedulePrincipalOnlyWithBulletAtMaturityValue, InputType.Number).replacerValue,
        [Validators.required]],
      repaymentScheduleFlexScheduleValue:
        [getCodeValue(initialCodes, replacerCodes.repaymentScheduleFlexScheduleValue, InputType.Number).replacerValue,
        [Validators.required]],
      repaymentScheduleFixedPaymentPrincipalAndInterestValue:
        [getCodeValue(initialCodes, replacerCodes.repaymentScheduleFixedPaymentPrincipalAndInterestValue, InputType.Number).replacerValue,
        [Validators.required]],
      stpInterfaceFullSTPValue:
        [getCodeValue(initialCodes, replacerCodes.stpInterfaceFullSTPValue, InputType.Number).replacerValue,
        [Validators.required]],
      stpInterfacePartialSTPValue:
        [getCodeValue(initialCodes, replacerCodes.stpInterfacePartialSTPValue, InputType.Number).replacerValue,
        [Validators.required]],
      stpInterfaceManualValue:
        [getCodeValue(initialCodes, replacerCodes.stpInterfaceManualValue, InputType.Number).replacerValue,
        [Validators.required]],
      escrowAccountYesValue:
        [getCodeValue(initialCodes, replacerCodes.escrowAccountYesValue, InputType.Number).replacerValue,
        [Validators.required]],
      escrowAccountNoValue:
        [getCodeValue(initialCodes, replacerCodes.escrowAccountNoValue, InputType.Number).replacerValue,
        [Validators.required]],
      loanPerformanceStatusAccrualValue:
        [getCodeValue(initialCodes, replacerCodes.loanPerformanceStatusAccrualValue, InputType.Number).replacerValue,
        [Validators.required]],
      loanPerformanceStatusNonAccrualValue:
        [getCodeValue(initialCodes, replacerCodes.loanPerformanceStatusNonAccrualValue, InputType.Number).replacerValue,
        [Validators.required]],
      loanPerformanceStatusNonAccrualInterestAndFeestoPrincipalValue:
        [getCodeValue(
          initialCodes, replacerCodes.loanPerformanceStatusNonAccrualInterestAndFeestoPrincipalValue, InputType.Number
        ).replacerValue,
        [Validators.required]],
      loanPerformanceStatusPartiallyFullyChargedOffValue:
        [getCodeValue(initialCodes, replacerCodes.loanPerformanceStatusPartiallyFullyChargedOffValue, InputType.Number).replacerValue,
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
      productTypesCCLOInventoryFinanceValue:
        [getCodeValue(initialCodes, replacerCodes.productTypesCCLOInventoryFinanceValue, InputType.Number).replacerValue,
        [Validators.required]],
      productTypesFlooringValue:
        [getCodeValue(initialCodes, replacerCodes.productTypesFlooringValue, InputType.Number).replacerValue,
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
      productTypesConstructionAadminCartCLCSManagedValue:
        [getCodeValue(initialCodes, replacerCodes.productTypesConstructionAadminCartCLCSManagedValue, InputType.Number).replacerValue,
        [Validators.required]],
      productTypesTradingFinanceValue:
        [getCodeValue(initialCodes, replacerCodes.productTypesTradingFinanceValue, InputType.Number).replacerValue,
        [Validators.required]],
      productTypesSupplyChainValue:
        [getCodeValue(initialCodes, replacerCodes.productTypesSupplyChainValue, InputType.Number).replacerValue,
        [Validators.required]],
      productTypesCommercialMortgageValue:
        [getCodeValue(initialCodes, replacerCodes.productTypesCommercialMortgageValue, InputType.Number).replacerValue,
        [Validators.required]],
      productTypesEscrowValue:
        [getCodeValue(initialCodes, replacerCodes.productTypesEscrowValue, InputType.Number).replacerValue,
        [Validators.required]],
      productTypesDepositValue:
        [getCodeValue(initialCodes, replacerCodes.productTypesDepositValue, InputType.Number).replacerValue,
        [Validators.required]],
      productTypesBankPurchasedBondValue:
        [getCodeValue(initialCodes, replacerCodes.productTypesBankPurchasedBondValue, InputType.Number).replacerValue,
        [Validators.required]],
      productTypesLCWithTriadValue:
        [getCodeValue(initialCodes, replacerCodes.productTypesLCWithTriadValue, InputType.Number).replacerValue,
        [Validators.required]],
      productTypesLCWithNoTriadValue:
        [getCodeValue(initialCodes, replacerCodes.productTypesLCWithNoTriadValue, InputType.Number).replacerValue,
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
      collateralMarginedValue:
        [getCodeValue(initialCodes, replacerCodes.collateralMarginedValue, InputType.Number).replacerValue,
        [Validators.required]],
      collateralMarginedSecuritiesValue:
        [getCodeValue(initialCodes, replacerCodes.collateralMarginedSecuritiesValue, InputType.Number).replacerValue,
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
      billingCFDAccountsValue:
        [getCodeValue(initialCodes, replacerCodes.billingCFDAccountsValue, InputType.Number).replacerValue,
        [Validators.required]],
      billingEStatementsValue:
        [getCodeValue(initialCodes, replacerCodes.billingEStatementsValue, InputType.Number).replacerValue,
        [Validators.required]],
      billingMailBillsValue:
        [getCodeValue(initialCodes, replacerCodes.billingMailBillsValue, InputType.Number).replacerValue,
        [Validators.required]],
      billingLoanIQFaxAndBillsValue:
        [getCodeValue(initialCodes, replacerCodes.billingLoanIQFaxAndBillsValue, InputType.Number).replacerValue,
        [Validators.required]],
      dealInfraStrucureSAMUValue:
        [getCodeValue(initialCodes, replacerCodes.dealInfraStrucureSAMUValue, InputType.Number).replacerValue,
        [Validators.required]],
      loanCurrencyUSDAndCADValue:
        [getCodeValue(initialCodes, replacerCodes.loanCurrencyUSDAndCADValue, InputType.Number).replacerValue,
        [Validators.required]],
      loanCurrencyNonUSDAndCADValue:
        [getCodeValue(initialCodes, replacerCodes.loanCurrencyNonUSDAndCADValue, InputType.Number).replacerValue,
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
      // loanPerformanceStatusLowValue:
      //   [getCodeValue(initialCodes, replacerCodes.loanPerformanceStatusLowValue, InputType.String).replacerValue,
      //   [Validators.required]],
      // loanPerformanceStatusAverageValue:
      //   [getCodeValue(initialCodes, replacerCodes.loanPerformanceStatusAverageValue, InputType.String).replacerValue,
      //   [Validators.required]],
      // loanPerformanceStatusHighValue:
      //   [getCodeValue(initialCodes, replacerCodes.loanPerformanceStatusHighValue, InputType.String).replacerValue,
      //   [Validators.required]],
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
      productTypesConstructionPrimaryCollateralTypes:
        [getCodeValue(initialCodes, replacerCodes.productTypesConstructionPrimaryCollateralTypes, InputType.String).replacerValue,
        [Validators.required]],
      productTypesConstructionAadminCartCLCSManagedMISTypes:
        [getCodeValue(initialCodes, replacerCodes.productTypesConstructionAadminCartCLCSManagedMISTypes, InputType.String).replacerValue,
        [Validators.required]],
      productTypesTradeFinanceRiskTypes:
        [getCodeValue(initialCodes, replacerCodes.productTypesTradeFinanceRiskTypes, InputType.String).replacerValue,
        [Validators.required]],
      productTypesTradingFinanceRiskTypes:
        [getCodeValue(initialCodes, replacerCodes.productTypesTradingFinanceRiskTypes, InputType.String).replacerValue,
        [Validators.required]],
      productTypesLCWithTriadRiskTypes:
        [getCodeValue(initialCodes, replacerCodes.productTypesLCWithTriadRiskTypes, InputType.String).replacerValue,
        [Validators.required]],
      productTypesLCWithNoTriadRiskTypes:
        [getCodeValue(initialCodes, replacerCodes.productTypesLCWithNoTriadRiskTypes, InputType.String).replacerValue,
        [Validators.required]],
      productTypesBankPurchasedBondRiskTypes:
        [getCodeValue(initialCodes, replacerCodes.productTypesBankPurchasedBondRiskTypes, InputType.String).replacerValue,
        [Validators.required]],
      productTypesSupplyChainRiskTypes:
        [getCodeValue(initialCodes, replacerCodes.productTypesSupplyChainRiskTypes, InputType.String).replacerValue,
        [Validators.required]],
      productTypesCommercialMortgageRiskTypes:
        [getCodeValue(initialCodes, replacerCodes.productTypesCommercialMortgageRiskTypes, InputType.String).replacerValue,
        [Validators.required]],
      productTypesEscrowPricingOption:
        [getCodeValue(initialCodes, replacerCodes.productTypesEscrowPricingOption, InputType.String).replacerValue,
        [Validators.required]],
      productTypesEscrowOutstandingType:
        [getCodeValue(initialCodes, replacerCodes.productTypesEscrowOutstandingType, InputType.String).replacerValue,
        [Validators.required]],
      productTypesDepositPricingOption:
        [getCodeValue(initialCodes, replacerCodes.productTypesDepositPricingOption, InputType.String).replacerValue,
        [Validators.required]],
      productTypesDepositOutstandingType:
        [getCodeValue(initialCodes, replacerCodes.productTypesDepositOutstandingType, InputType.String).replacerValue,
        [Validators.required]],
      productTypesFlooringRiskTypes:
        [getCodeValue(initialCodes, replacerCodes.productTypesFlooringRiskTypes, InputType.String).replacerValue,
        [Validators.required]],
      productTypesCCLOInventoryFinanceMISCodes:
        [getCodeValue(initialCodes, replacerCodes.productTypesCCLOInventoryFinanceMISCodes, InputType.String).replacerValue,
        [Validators.required]],
      straightThroughProcessingSweepMISTypes:
        [getCodeValue(initialCodes, replacerCodes.straightThroughProcessingSweepMISTypes, InputType.String).replacerValue,
        [Validators.required]],
      straightThroughProcessingOLBBMISTypes:
        [getCodeValue(initialCodes, replacerCodes.straightThroughProcessingOLBBMISTypes, InputType.String).replacerValue,
        [Validators.required]],
      straightThroughProcessingDatascanMISTypes:
        [getCodeValue(initialCodes, replacerCodes.straightThroughProcessingDatascanMISTypes, InputType.String).replacerValue,
        [Validators.required]],
      straightThroughProcessingEDriveMISCodes:
        [getCodeValue(initialCodes, replacerCodes.straightThroughProcessingEDriveMISCodes, InputType.String).replacerValue,
        [Validators.required]],
      straightThroughProcessingPrimeRevenueMISTypes:
        [getCodeValue(initialCodes, replacerCodes.straightThroughProcessingPrimeRevenueMISTypes, InputType.String).replacerValue,
        [Validators.required]],
    });
  }

  // fetch rulecodes from service and populate ui for those rulecodes.
  initializeUI(message?: string): void {
    this.codesService.getRuleCodes(boTypeLoan).subscribe(
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
      loanWithRepaymentScheduleAverageBottomValue:
        getCodeValue(codes, replacerCodes.loanWithRepaymentScheduleAverageBottomValue, InputType.String).replacerValue,
      loanWithRepaymentScheduleAverageTopValue:
        getCodeValue(codes, replacerCodes.loanWithRepaymentScheduleAverageTopValue, InputType.String).replacerValue,
      lcInDealAverageBottomValue:
        getCodeValue(codes, replacerCodes.lcInDealAverageBottomValue, InputType.String).replacerValue,
      lcInDealAverageTopValue:
        getCodeValue(codes, replacerCodes.lcInDealAverageTopValue, InputType.String).replacerValue,
      lendersAverageBottomValue:
        getCodeValue(codes, replacerCodes.lendersAverageBottomValue, InputType.String).replacerValue,
      lendersAverageTopValue:
        getCodeValue(codes, replacerCodes.lendersAverageTopValue, InputType.String).replacerValue,
      lendersCriticalTopValue:
        getCodeValue(codes, replacerCodes.lendersCriticalTopValue, InputType.String).replacerValue,
      repaymentScheduleNoScheduleValue:
        getCodeValue(codes, replacerCodes.repaymentScheduleNoScheduleValue, InputType.Number).replacerValue,
      repaymentScheduleFixedPrincipalPlusInterestDueValue:
        getCodeValue(codes, replacerCodes.repaymentScheduleFixedPrincipalPlusInterestDueValue, InputType.Number).replacerValue,
      repaymentSchedulePrincipalOnlyValue:
        getCodeValue(codes, replacerCodes.repaymentSchedulePrincipalOnlyValue, InputType.Number).replacerValue,
      repaymentSchedulePrincipalOnlyWithBulletAtMaturityValue:
        getCodeValue(codes, replacerCodes.repaymentSchedulePrincipalOnlyWithBulletAtMaturityValue, InputType.Number).replacerValue,
      repaymentScheduleFlexScheduleValue:
        getCodeValue(codes, replacerCodes.repaymentScheduleFlexScheduleValue, InputType.Number).replacerValue,
      repaymentScheduleFixedPaymentPrincipalAndInterestValue:
        getCodeValue(codes, replacerCodes.repaymentScheduleFixedPaymentPrincipalAndInterestValue, InputType.Number).replacerValue,
      stpInterfaceFullSTPValue:
        getCodeValue(codes, replacerCodes.stpInterfaceFullSTPValue, InputType.Number).replacerValue,
      stpInterfacePartialSTPValue:
        getCodeValue(codes, replacerCodes.stpInterfacePartialSTPValue, InputType.Number).replacerValue,
      stpInterfaceManualValue:
        getCodeValue(codes, replacerCodes.stpInterfaceManualValue, InputType.Number).replacerValue,
      escrowAccountYesValue:
        getCodeValue(codes, replacerCodes.escrowAccountYesValue, InputType.Number).replacerValue,
      escrowAccountNoValue:
        getCodeValue(codes, replacerCodes.escrowAccountNoValue, InputType.Number).replacerValue,
      loanPerformanceStatusAccrualValue:
        getCodeValue(codes, replacerCodes.loanPerformanceStatusAccrualValue, InputType.Number).replacerValue,
      loanPerformanceStatusNonAccrualValue:
        getCodeValue(codes, replacerCodes.loanPerformanceStatusNonAccrualValue, InputType.Number).replacerValue,
      loanPerformanceStatusNonAccrualInterestAndFeestoPrincipalValue:
        getCodeValue(codes, replacerCodes.loanPerformanceStatusNonAccrualInterestAndFeestoPrincipalValue, InputType.Number).replacerValue,
      loanPerformanceStatusPartiallyFullyChargedOffValue:
        getCodeValue(codes, replacerCodes.loanPerformanceStatusPartiallyFullyChargedOffValue, InputType.Number).replacerValue,
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
      productTypesCCLOInventoryFinanceValue:
        getCodeValue(codes, replacerCodes.productTypesCCLOInventoryFinanceValue, InputType.Number).replacerValue,
      productTypesFlooringValue:
        getCodeValue(codes, replacerCodes.productTypesFlooringValue, InputType.Number).replacerValue,
      productTypesCCLODealershipFinanceValue:
        getCodeValue(codes, replacerCodes.productTypesCCLODealershipFinanceValue, InputType.Number).replacerValue,
      // productTypesCCLORealeStateValue:
      // getCodeValue(codes, replacerCodes.productTypesCCLORealeStateValue, InputType.Number).replacerValue,
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
      productTypesConstructionAadminCartCLCSManagedValue:
        getCodeValue(codes, replacerCodes.productTypesConstructionAadminCartCLCSManagedValue, InputType.Number).replacerValue,
      productTypesTradingFinanceValue:
        getCodeValue(codes, replacerCodes.productTypesTradingFinanceValue, InputType.Number).replacerValue,
      productTypesSupplyChainValue:
        getCodeValue(codes, replacerCodes.productTypesSupplyChainValue, InputType.Number).replacerValue,
      productTypesCommercialMortgageValue:
        getCodeValue(codes, replacerCodes.productTypesCommercialMortgageValue, InputType.Number).replacerValue,
      productTypesEscrowValue:
        getCodeValue(codes, replacerCodes.productTypesEscrowValue, InputType.Number).replacerValue,
      productTypesDepositValue:
        getCodeValue(codes, replacerCodes.productTypesDepositValue, InputType.Number).replacerValue,
      productTypesBankPurchasedBondValue:
        getCodeValue(codes, replacerCodes.productTypesBankPurchasedBondValue, InputType.Number).replacerValue,
      productTypesLCWithTriadValue:
        getCodeValue(codes, replacerCodes.productTypesLCWithTriadValue, InputType.Number).replacerValue,
      productTypesLCWithNoTriadValue:
        getCodeValue(codes, replacerCodes.productTypesLCWithNoTriadValue, InputType.Number).replacerValue,
      crossBorderYesValue:
        getCodeValue(codes, replacerCodes.crossBorderYesValue, InputType.Number).replacerValue,
      crossBorderNoValue:
        getCodeValue(codes, replacerCodes.crossBorderNoValue, InputType.Number).replacerValue,
      collateralNoValue:
        getCodeValue(codes, replacerCodes.collateralNoValue, InputType.Number).replacerValue,
      collateralMarginedValue:
        getCodeValue(codes, replacerCodes.collateralMarginedValue, InputType.Number).replacerValue,
      collateralMarginedSecuritiesValue:
        getCodeValue(codes, replacerCodes.collateralMarginedSecuritiesValue, InputType.Number).replacerValue,
      interestNormalPricingWithBaseAndSpreadValue:
        getCodeValue(codes, replacerCodes.interestNormalPricingWithBaseAndSpreadValue, InputType.Number).replacerValue,
      interestNormalPricingFloorRateValue:
        getCodeValue(codes, replacerCodes.interestNormalPricingFloorRateValue, InputType.Number).replacerValue,
      interestNormalPricingCapRateValue:
        getCodeValue(codes, replacerCodes.interestNormalPricingCapRateValue, InputType.Number).replacerValue,

      interestPricingForMatrixPricingValue:
        getCodeValue(codes, replacerCodes.interestPricingForMatrixPricingValue, InputType.Number).replacerValue,
      billingCFDAccountsValue:
        getCodeValue(codes, replacerCodes.billingCFDAccountsValue, InputType.Number).replacerValue,
      billingEStatementsValue:
        getCodeValue(codes, replacerCodes.billingEStatementsValue, InputType.Number).replacerValue,
      billingMailBillsValue:
        getCodeValue(codes, replacerCodes.billingMailBillsValue, InputType.Number).replacerValue,
      billingLoanIQFaxAndBillsValue:
        getCodeValue(codes, replacerCodes.billingLoanIQFaxAndBillsValue, InputType.Number).replacerValue,
      dealInfraStrucureSAMUValue:
        getCodeValue(codes, replacerCodes.dealInfraStrucureSAMUValue, InputType.Number).replacerValue,
      loanCurrencyUSDAndCADValue:
        getCodeValue(codes, replacerCodes.loanCurrencyUSDAndCADValue, InputType.Number).replacerValue,
      loanCurrencyNonUSDAndCADValue:
        getCodeValue(codes, replacerCodes.loanCurrencyNonUSDAndCADValue, InputType.Number).replacerValue,
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
      // loanPerformanceStatusLowValue:
      //   getCodeValue(codes, replacerCodes.loanPerformanceStatusLowValue, InputType.String).replacerValue,
      // loanPerformanceStatusAverageValue:
      //   getCodeValue(codes, replacerCodes.loanPerformanceStatusAverageValue, InputType.String).replacerValue,
      // loanPerformanceStatusHighValue:
      //   getCodeValue(codes, replacerCodes.loanPerformanceStatusHighValue, InputType.String).replacerValue,
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
      productTypesConstructionPrimaryCollateralTypes:
        getCodeValue(codes, replacerCodes.productTypesConstructionPrimaryCollateralTypes, InputType.String).replacerValue,
      productTypesConstructionAadminCartCLCSManagedMISTypes:
        getCodeValue(codes, replacerCodes.productTypesConstructionAadminCartCLCSManagedMISTypes, InputType.String).replacerValue,
      productTypesTradeFinanceRiskTypes:
        getCodeValue(codes, replacerCodes.productTypesTradeFinanceRiskTypes, InputType.String).replacerValue,
      productTypesTradingFinanceRiskTypes:
        getCodeValue(codes, replacerCodes.productTypesTradingFinanceRiskTypes, InputType.String).replacerValue,
      productTypesLCWithTriadRiskTypes:
        getCodeValue(codes, replacerCodes.productTypesLCWithTriadRiskTypes, InputType.String).replacerValue,
      productTypesLCWithNoTriadRiskTypes:
        getCodeValue(codes, replacerCodes.productTypesLCWithNoTriadRiskTypes, InputType.String).replacerValue,
      productTypesBankPurchasedBondRiskTypes:
        getCodeValue(codes, replacerCodes.productTypesBankPurchasedBondRiskTypes, InputType.String).replacerValue,
      productTypesSupplyChainRiskTypes:
        getCodeValue(codes, replacerCodes.productTypesSupplyChainRiskTypes, InputType.String).replacerValue,
      productTypesCommercialMortgageRiskTypes:
        getCodeValue(codes, replacerCodes.productTypesCommercialMortgageRiskTypes, InputType.String).replacerValue,
      productTypesEscrowPricingOption:
        getCodeValue(codes, replacerCodes.productTypesEscrowPricingOption, InputType.String).replacerValue,
      productTypesEscrowOutstandingType:
        getCodeValue(codes, replacerCodes.productTypesEscrowOutstandingType, InputType.String).replacerValue,
      productTypesDepositPricingOption:
        getCodeValue(codes, replacerCodes.productTypesDepositPricingOption, InputType.String).replacerValue,
      productTypesDepositOutstandingType:
        getCodeValue(codes, replacerCodes.productTypesDepositOutstandingType, InputType.String).replacerValue,
      productTypesFlooringRiskTypes:
        getCodeValue(codes, replacerCodes.productTypesFlooringRiskTypes, InputType.String).replacerValue,
      productTypesCCLOInventoryFinanceMISCodes:
        getCodeValue(codes, replacerCodes.productTypesCCLOInventoryFinanceMISCodes, InputType.String).replacerValue,
      straightThroughProcessingSweepMISTypes:
        getCodeValue(codes, replacerCodes.straightThroughProcessingSweepMISTypes, InputType.String).replacerValue,
      straightThroughProcessingOLBBMISTypes:
        getCodeValue(codes, replacerCodes.straightThroughProcessingOLBBMISTypes, InputType.String).replacerValue,
      straightThroughProcessingDatascanMISTypes:
        getCodeValue(codes, replacerCodes.straightThroughProcessingDatascanMISTypes, InputType.String).replacerValue,
      straightThroughProcessingEDriveMISCodes:
        getCodeValue(codes, replacerCodes.straightThroughProcessingEDriveMISCodes, InputType.String).replacerValue,
      straightThroughProcessingPrimeRevenueMISTypes:
        getCodeValue(codes, replacerCodes.straightThroughProcessingPrimeRevenueMISTypes, InputType.String).replacerValue,
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
