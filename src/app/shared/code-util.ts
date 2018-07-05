import { Codes, Replacer } from '../model';
import { InputType, defaultNumberValue, defaultStringValue } from './util';

export enum replacerCodes {
    finalRangeAverageBottomValue = 'FINAL_RANGE_AVERAGE_BOTTOM',
    finalRangeAverageTopValue = 'FINAL_RANGE_AVERAGE_TOP',
    borrowersAverageBottomValue = 'BORROWERS_AVERAGE_BOTTOM',
    borrowersAverageTopValue = 'BORROWERS_AVERAGE_TOP',
    lendersAverageBottomValue = 'LENDERS_AVERAGE_BOTTOM',
    lendersAverageTopValue = 'LENDERS_AVERAGE_TOP',
    lendersCriticalTopValue = 'LENDERS_CRITICAL_TOP',
    facilitiesAverageBottomValue = 'FACILITIES_AVERAGE_BOTTOM',
    facilitiesAverageTopValue = 'FACILITIES_AVERAGE_TOP',
    multiCurrencyAverageBottomValue = 'MULTICURRENCY_AVERAGE_BOTTOM',
    multiCurrencyAverageTopValue = 'MULTICURRENCY_AVERAGE_TOP',
    pricingOptionAverageBottomValue = 'PRICING_OPTION_AVERAGE_BOTTOM',
    pricingOptionAverageTopValue = 'PRICING_OPTION_AVERAGE_TOP',
    riskTypeAverageBottomValue = 'RISKTYPE_AVERAGE_BOTTOM',
    riskTypeAverageTopValue = 'RISKTYPE_AVERAGE_TOP',
    sublimitsAverageBottomValue = 'SUBLIMITS_AVERAGE_BOTTOM',
    sublimitsAverageTopValue = 'SUBLIMITS_AVERAGE_TOP',
    loanWithRepaymentScheduleAverageBottomValue = 'REPAYMENT_SCHEDULE_AVERAGE_BOTTOM',
    loanWithRepaymentScheduleAverageTopValue = 'REPAYMENT_SCHEDULE_AVERAGE_TOP',
    lcInDealAverageBottomValue = 'LC_IN_A_DEAL_AVERAGE_BOTTOM',
    lcInDealAverageTopValue = 'LC_IN_A_DEAL_AVERAGE_TOP',
    repaymentScheduleNoScheduleValue = 'REPAYMENT_SCHEDULE_NO_SCHEDULE',
    repaymentScheduleFixedPrincipalPlusInterestDueValue = 'REPAYMENT_SCHEDULE_FIXED_PRINCIPAL_PLUS_INTEREST_DUE',
    repaymentSchedulePrincipalOnlyValue = 'REPAYMENT_SCHEDULE_PRINCIPAL_ONLY',
    repaymentSchedulePrincipalOnlyWithBulletAtMaturityValue = 'REPAYMENT_SCHEDULE_PRINCIPAL_ONLY_WITH_BULLET_AT_MATURITY',
    repaymentScheduleFlexScheduleValue = 'REPAYMENT_SCHEDULE_FLEX_SCHEDULE',
    repaymentScheduleFixedPaymentPrincipalAndInterestValue = 'REPAYMENT_SCHEDULE_FIXED_PAYMENT_PRINCIPAL_AND_INTEREST',
    stpInterfaceFullSTPValue = 'STP_INTERFACE_FULL_STP',
    stpInterfacePartialSTPValue = 'STP_INTERFACE_PARTIAL_STP',
    stpInterfaceManualValue = 'STP_INTERFACE_MANUAL',
    escrowAccountYesValue = 'ESCROW_ACCOUNT_YES',
    escrowAccountNoValue = 'ESCROW_ACCOUNT_NO',
    loanPerformanceStatusAccrualValue = 'LOAN_PERFORMANCE_STATUS_ACCRUAL',
    loanPerformanceStatusNonAccrualValue = 'LOAN_PERFORMANCE_STATUS_NON_ACCRUAL',
    loanPerformanceStatusNonAccrualInterestAndFeestoPrincipalValue =
    'LOAN_PERFORMANCE_STATUS_NON_ACCRUAL_INTEREST_AND_FEES_TO_PRINCIPAL',
    loanPerformanceStatusPartiallyFullyChargedOffValue = 'LOAN_PERFORMANCE_STATUS_PARTIALLY_FULLY_CHARGED_OFF',
    dealTypeSoleLenderValue = 'DEALTYPE_SOLELENDER',
    dealTypeOtherBankAgentValue = 'DEALTYPE_OTHERBANKAGENT',
    dealTypeIntercompanyDealsValue = 'DEALTYPE_INTERCOMPANYDEALS',
    dealTypeBMOagencyValue = 'DEALTYPE_BMOAGENCY',
    productTypesCFDAutoFinanceValue = 'PT_CFDAUTO_FINANCE',
    productTypesCCLOInventoryFinanceValue = 'PT_CCLO_INVENTORY_FINANCE',
    productTypesCCLODealershipFinanceValue = 'PT_CCLO_DEALERSHIP_FINANCE',
    productTypesCCLORealeStateValue = 'PT_CCLOREALESTATE',
    productTypesTradingValue = 'PT_TRADING',
    productTypesOverdraftLineValue = 'PT_OVERDRAFTLINE',
    productTypesPrimeRevenueIntegrationValue = 'PT_PRIMEREVENUE__INTEGRATION',
    productTypesSweeptoLoanValue = 'PT_SWEEPTOLOAN',
    productTypesOLBBValue = 'PT_OLBB',
    productTypesConstructionValue = 'PT_CONSTRUCTION',
    productTypesBrokerValue = 'PT_BROKER',
    productTypesCFDABLValue = 'PT_CFDABL',
    productTypesCCLOABLValue = 'PT_CCLOABL',
    productTypesFlooringValue = 'PT_FLOORING',
    productTypesConstructionAadminCartCLCSManagedValue = 'PT_CONSTRUCTION_AADMIN_CART_CLCS_MANAGED',
    productTypesTradeFinanceValue = 'PT_TRADE_FINANCE',
    productTypesTradingFinanceValue = 'PT_TRADING_FINANCE',
    productTypesSupplyChainValue = 'PT_SUPPLY_CHAIN',
    productTypesCommercialMortgageValue = 'PT_COMMERCIAL_MORTGAGE',
    productTypesEscrowValue = 'PT_ESCROW',
    productTypesDepositValue = 'PT_DEPOSIT',
    productTypesBankPurchasedBondValue = 'PT_BANK_PURCHASED_BOND',
    productTypesLCWithTriadValue = 'PT_LC_WITH_TRIAD',
    productTypesLCWithNoTriadValue = 'PT_LC_WITH_NO_TRIAD',
    crossBorderYesValue = 'CORSS_BORDER_YES',
    crossBorderNoValue = 'CORSS_BORDER_NO',
    collateralNoValue = 'COLLATERAL_NO',
    collateralMarginedValue = 'COLLATERAL_MARGINED',
    collateralPrimaryValue = 'COLLATERAL_PRIMARY',
    collateralBBCValue = 'COLLATERAL_BBC',
    collateralMarginedSecuritiesValue = 'COLLATERAL_MARGINED_SECURITIES',
    interestNormalPricingWithBaseAndSpreadValue = 'PRICING_WITH_BASE_AND_SPREAD',
    interestNormalPricingFloorRateValue = 'FLOOR_RATE',
    interestNormalPricingCapRateValue = 'CAP_RATE',
    interestPricingForMatrixPricingValue = 'PRICING_FOR_MATRIX_PRICING',
    billingCFDAccountsValue = 'billing_CFD_Accounts',
    billingEStatementsValue = 'billing_E_Statements',
    billingMailBillsValue = 'billing_Mail_Bills',
    billingLoanIQFaxAndBillsValue = 'billing_Loan_IQ_Fax_And_Bills',
    dealInfraStrucureSAMUValue = 'DEAL_INFRA_STRUCURE_SAMU',
    loanCurrencyUSDAndCADValue = 'LOAN_CURRENCY_USD_AND_CAD',
    loanCurrencyNonUSDAndCADValue = 'LOAN_CURRENCY_NON_USD_AND_CAD',
    pricingOptionsLowValue = 'PRICING_OPTIONS_LOW',
    pricingOptionsAverageValue = 'PRICING_OPTIONS_AVERAGE',
    pricingOptionsHighValue = 'PRICING_OPTIONS_HIGH',
    segmentGroupNameCodesLowValue = 'SEGMENT_GROUP_NAME_LOW',
    segmentGroupNameCodesAverageValue = 'SEGMENT_GROUP_NAME_AVERAGE',
    segmentGroupNameCodesHighValue = 'SEGMENT_GROUP_NAME_HIGH',
    loanPerformanceStatusLowValue = 'LOAN_PERFORMANCE_STATUS_LOW',
    loanPerformanceStatusAverageValue = 'LOAN_PERFORMANCE_STATUS_AVERAGE',
    loanPerformanceStatusHighValue = 'LOAN_PERFORMANCE_STATUS_HIGH',
    dealTypesIintercompanyDealsRiskTypesValue = 'INTERCOMPANY_DEALS_RISK_TYPES',
    productTypesCFDAutoFinanaceMISCodes = 'PT_CFD_AUTO_FINANACE_MIS_CODES',
    productTypesCCLODealershipFinanaceMISCodes = 'PT_CCLO_DEALERSHIP_FINANACE_MIS_CODES',
    productTypesPrimeRevenueIntegrationMISCodes = 'PT_PRIME_REVENUE_INTEGRATION_MIS_CODES',
    productTypesSweepToLoanMISCodes = 'PT_SWEEP_TO_LOAN_MIS_CODES',
    productTypesOLBBMISCodes = 'PT_OLBB_MIS_CODES',
    productTypesCFDABLMISCodes = 'PT_CFDABL_MIS_CODES',
    productTypesCCLOABLMISCodes = 'PT_CCLOABL_MIS_CODES',
    productTypesOverdraftRiskTypes = 'PT_OVERDRAFT_RISK_TYPES',
    productTypesPricingOptions = 'PT_PRICING_OPTIONS',
    productTypesFlooringRiskTypes = 'PT_FLOORING_RISK_TYPES',
    productTypesConstructionPrimaryCollateralTypes = 'PT_CONSTRUCTION_PRIMARY_COLLATERAL_TYPES',
    productTypesConstructionAadminCartCLCSManagedMISTypes = 'PT_CONSTRUCTION_AADMIN_CART_CLCS_MANAGED_MIS_TYPES',
    productTypesTradeFinanceRiskTypes = 'PT_TRADE_FINANCE_RISK_TYPES',
    productTypesTradingFinanceFacilityTypes = 'PT_TRADING_FINANCE_FACILITY_TYPES',
    productTypesLCWithTriadRiskTypes = 'PT_LC_WITH_TRIAD_RISK_TYPES',
    productTypesLCWithNoTriadRiskTypes = 'PT_LC_WITH_NO_TRIAD_RISK_TYPES',
    productTypesBankPurchasedBondRiskTypes = 'PT_BANK_PURCHASED_BOND_RISK_TYPES',
    productTypesTradingFinanceRiskTypes = 'PT_TRADING_FINANCE_RISK_TYPES',
    productTypesSupplyChainRiskTypes = 'PT_SUPPLY_CHAIN_RISK_TYPES',
    productTypesCommercialMortgageRiskTypes = 'PT_COMMERCIAL_MORTGAGE_RISK_TYPES',
    productTypesEscrowPricingOption = 'PT_ESCROW_PRICING_OPTIONS',
    productTypesEscrowOutstandingType = 'PT_ESCROW_OUTSTANDING_TYPES',
    productTypesDepositPricingOption = 'PT_DEPOSIT_PRICING_OPTIONS',
    productTypesDepositOutstandingType = 'PT_DEPOSIT_OUTSTANDING_TYPES',
    productTypesCCLOInventoryFinanceMISCodes = 'PT_CCLO_INVENTORY_FINANCE_CODES',
    straightThroughProcessingSweepMISTypes = 'STRAIGHT_THROUGH_PROCESSING_SWEEP_MIS_TYPES',
    straightThroughProcessingOLBBMISTypes = 'STRAIGHT_THROUGH_PROCESSING_OLBB_MIS_TYPES',
    straightThroughProcessingDatascanMISTypes = 'STRAIGHT_THROUGH_PROCESSING_DATASCAN_MIS_TYPES',
    straightThroughProcessingEDriveMISCodes = 'STRAIGHT_THROUGH_PROCESSING_EDRIVE_MIS_CODES',
    straightThroughProcessingPrimeRevenueMISTypes = 'STRAIGHT_THROUGH_PROCESSING_PRIME_REVENUE_MIS_TYPES'
}

export const rangeValidationCodesField: string[][] = [
    ['finalRangeAverageBottomValue', 'finalRangeAverageTopValue'],
    ['borrowersAverageBottomValue', 'borrowersAverageTopValue'],
    ['lendersAverageBottomValue', 'lendersAverageTopValue'],
    ['lendersAverageTopValue', 'lendersCriticalTopValue'],
    ['facilitiesAverageBottomValue', 'facilitiesAverageTopValue'],
    ['multiCurrencyAverageBottomValue', 'multiCurrencyAverageTopValue'],
    ['pricingOptionAverageBottomValue', 'pricingOptionAverageTopValue'],
    ['riskTypeAverageBottomValue', 'riskTypeAverageTopValue'],
    ['sublimitsAverageBottomValue', 'sublimitsAverageTopValue'],
    ['loanWithRepaymentScheduleAverageBottomValue', 'loanWithRepaymentScheduleAverageTopValue'],
    ['lcInDealAverageBottomValue', 'lcInDealAverageTopValue']
];

export const mandatoryTextValidationCodesField: string[] = [
    'pricingOptionsLowValue',
    'pricingOptionsAverageValue',
    'pricingOptionsHighValue',
    'segmentGroupNameCodesLowValue',
    'segmentGroupNameCodesAverageValue',
    'segmentGroupNameCodesHighValue',
    'loanPerformanceStatusLowValue',
    'loanPerformanceStatusAverageValue',
    'loanPerformanceStatusHighValue',
    'dealTypesIintercompanyDealsRiskTypesValue',
    'productTypesCFDAutoFinanaceMISCodes',
    'productTypesCCLODealershipFinanaceMISCodes',
    'productTypesPrimeRevenueIntegrationMISCodes',
    'productTypesSweepToLoanMISCodes',
    'productTypesOLBBMISCodes',
    'productTypesCFDABLMISCodes',
    'productTypesCCLOABLMISCodes',
    'productTypesOverdraftRiskTypes',
    'productTypesPricingOptions',
    'productTypesFlooringRiskTypes',
    'productTypesConstructionPrimaryCollateralTypes',
    'productTypesConstructionAadminCartCLCSManagedMISTypes',
    'productTypesTradeFinanceRiskTypes',
    'productTypesLCWithTriadRiskTypes',
    'productTypesLCWithNoTriadRiskTypes',
    'productTypesBankPurchasedBondRiskTypes',
    'productTypesTradingFinanceFacilityTypes',
    'productTypesTradingFinanceRiskTypes',
    'productTypesSupplyChainRiskTypes',
    'productTypesCommercialMortgageRiskTypes',
    'productTypesEscrowPricingOption',
    'productTypesEscrowOutstandingType',
    'productTypesDepositPricingOption',
    'productTypesDepositOutstandingType',
    'productTypesCCLOInventoryFinanceMISCodes',
    'straightThroughProcessingSweepMISTypes',
    'straightThroughProcessingOLBBMISTypes',
    'straightThroughProcessingDatascanMISTypes',
    'straightThroughProcessingEDriveMISCodes',
    'straightThroughProcessingPrimeRevenueMISTypes'
];

export const formattedDataCodesKey: string[] = [
    'PRICING_OPTIONS_LOW',
    'PRICING_OPTIONS_AVERAGE',
    'PRICING_OPTIONS_HIGH',
    'SEGMENT_GROUP_NAME_LOW',
    'SEGMENT_GROUP_NAME_AVERAGE',
    'SEGMENT_GROUP_NAME_HIGH',
    'LOAN_PERFORMANCE_STATUS_LOW',
    'LOAN_PERFORMANCE_STATUS_AVERAGE',
    'LOAN_PERFORMANCE_STATUS_HIGH',
    'INTERCOMPANY_DEALS_RISK_TYPES',
    'PT_CFD_AUTO_FINANACE_MIS_CODES',
    'PT_CCLO_DEALERSHIP_FINANACE_MIS_CODES',
    'PT_PRIME_REVENUE_INTEGRATION_MIS_CODES',
    'PT_SWEEP_TO_LOAN_MIS_CODES',
    'PT_OLBB_MIS_CODES',
    'PT_CFDABL_MIS_CODES',
    'PT_CCLOABL_MIS_CODES',
    'PT_OVERDRAFT_RISK_TYPES',
    'PT_PRICING_OPTIONS',
    'PT_FLOORING_RISK_TYPES',
    'PT_CONSTRUCTION_PRIMARY_COLLATERAL_TYPES',
    'PT_CONSTRUCTION_AADMIN_CART_CLCS_MANAGED_MIS_TYPES',
    'PT_TRADE_FINANCE_RISK_TYPES',
    'PT_LC_WITH_TRIAD_RISK_TYPES',
    'PT_LC_WITH_NO_TRIAD_RISK_TYPES',
    'PT_BANK_PURCHASED_BOND_RISK_TYPES',
    'PT_TRADING_FINANCE_FACILITY_TYPES',
    'PT_TRADING_FINANCE_RISK_TYPES',
    'PT_SUPPLY_CHAIN_RISK_TYPES',
    'PT_COMMERCIAL_MORTGAGE_RISK_TYPES',
    'PT_ESCROW_PRICING_OPTIONS',
    'PT_ESCROW_OUTSTANDING_TYPES',
    'PT_DEPOSIT_PRICING_OPTIONS',
    'PT_DEPOSIT_OUTSTANDING_TYPES',
    'PT_CCLO_INVENTORY_FINANCE_CODES',
    'STRAIGHT_THROUGH_PROCESSING_SWEEP_MIS_TYPES',
    'STRAIGHT_THROUGH_PROCESSING_OLBB_MIS_TYPES',
    'STRAIGHT_THROUGH_PROCESSING_DATASCAN_MIS_TYPES',
    'STRAIGHT_THROUGH_PROCESSING_EDRIVE_MIS_CODES',
    'STRAIGHT_THROUGH_PROCESSING_PRIME_REVENUE_MIS_TYPES'
];

export function formatTextData(key: string, data: string): string {
    let formattedText = data;
    if (mandatoryTextValidationCodesField.includes(key) && !formattedText) {
        formattedText = ' ';
    } else if (formattedText && mandatoryTextValidationCodesField.includes(key)) {
        const textList = formattedText.split(',');
        if (textList.length > 0) {
            formattedText = '"';
            for (let index = 0; index < textList.length; index++) {
                const originalText = textList[index].replace(/[,"]/g, '');
                if (originalText && originalText.trim() !== '') {
                    if (formattedText !== '"') {
                        formattedText += ',"';
                    }
                    formattedText += originalText.trim() + '"';
                }
            }
        }
    }
    return formattedText;
}

export function unformatTextData(key: string, data: string): string {
    let unformattedText = data;
    if (unformattedText && formattedDataCodesKey.includes(key)) {
        const textList = unformattedText.split(',');
        if (textList.length > 0) {
            unformattedText = '';
            for (let index = 0; index < textList.length; index++) {
                const originalText = textList[index].replace(/[,"]/g, '');
                if (originalText && originalText.trim() !== '') {
                    if (unformattedText !== '') {
                        unformattedText += ',';
                    }
                    unformattedText += originalText;
                }
            }
        }
    }
    return unformattedText;
}

// fetch code value from codes.
export function getCodeValue(codes: Codes, key: string, defaultValueType?: InputType): Replacer {
    let codeObj = { 'id': -1, 'replacerName': '', 'replacerValue': '' };
    if (codes && codes.replacers && codes.replacers.length > 0) {
        codeObj = codes.replacers.find(code => code.replacerName === key);
        if (!codeObj) {
            if (defaultValueType === InputType.Number) {
                codeObj = { 'id': -1, 'replacerName': key, 'replacerValue': defaultNumberValue.toString() };
            } else {
                codeObj = { 'id': -1, 'replacerName': key, 'replacerValue': defaultStringValue };
            }
        }
    } else if (defaultValueType === InputType.Number) {
        codeObj.replacerName = key;
        codeObj.replacerValue = defaultNumberValue.toString();
    } else if (defaultValueType === InputType.String) {
        codeObj.replacerName = key;
        codeObj.replacerValue = defaultStringValue;
    }
    codeObj.replacerValue = unformatTextData(key, codeObj.replacerValue);
    return codeObj;
}
