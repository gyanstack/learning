// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const serviceAddress = '192.168.10.242:8083';

export const environment = {
  production: true,
  enableConsoleLog: false,
  processServiceURL: `${serviceAddress}/metrics/processes/`,
  boComplexityServiceURL: `${serviceAddress}/metrics/complexityrules/`,
  manualTransactionUploadServiceURL: `${serviceAddress}/metrics/events/`,
  nonTransactionUploadServiceURL: `${serviceAddress}/metrics/ntdata/`,
  bankingTransactionUploadServiceURL: `${serviceAddress}/metrics/businessBanking/`,
  eapServiceURL: `${serviceAddress}/metrics/eaprules/`,
  codesServiceURL: `${serviceAddress}/metrics/replacers/`,
  logServiceURL: `${serviceAddress}//metrics/uilogger/`,
  httpOptions: {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    params: new HttpParams()
  }
};
