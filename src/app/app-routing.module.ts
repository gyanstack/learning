import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'businessobjectsrules',
    loadChildren: 'app/bo-complexity/bo-complexity.module#BoComplexityModule'
  },
  {
    path: 'businessbankingworkflowdata',
    loadChildren: 'app/business-banking-workflow-data/business-banking-workflow-data.module#BusinessBankingWorkflowDataModule'
  },
  {
    path: 'eapmappingrules',
    loadChildren: 'app/eap-mapping-rules/eap-mapping-rules.module#EapMappingRulesModule'
  },
  {
    path: 'nontransactionreftable',
    loadChildren: 'app/non-transaction-ref-table/non-transaction-ref-table.module#NonTransactionRefTableModule'
  },
  {
    path: 'processhierarchy',
    loadChildren: 'app/process-hierarchy/process-hierarchy.module#ProcessHierarchyModule'
  },
  {
    path: 'transactionuploads',
    loadChildren: 'app/transaction-uploads/transaction-uploads.module#TransactionUploadsModule'
  },
  {
    path: 'dealcodes',
    loadChildren: 'app/deal-codes/deal-codes.module#DealCodesModule'
  },
  {
    path: 'loancodes',
    loadChildren: 'app/loan-codes/loan-codes.module#LoanCodesModule'
  },
  {
    path: 'pagenotfound',
    loadChildren: 'app/page-not-found/page-not-found.module#PageNotFoundModule'
  },
  // {
  //   path: '',
  //   redirectTo: '',
  //   pathMatch: 'full'
  // }
  {
    path: '',
    redirectTo: 'processhierarchy',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'pagenotfound',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, // { enableTracing: true } // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
