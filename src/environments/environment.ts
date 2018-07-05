// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

// const serviceAddress = '192.168.1.5:8083';
// const serviceAddress = '172.16.10.172:8083';
const serviceAddress = '192.168.10.199:8083';
// const serviceAddress = window.location.origin;

export const environment = {
  production: false,
  enableConsoleLog: true,
  processServiceURL: `http://${serviceAddress}/metrics/processes/`,
  boComplexityServiceURL: `http://${serviceAddress}/metrics/complexityrules/`,
  manualTransactionUploadServiceURL: `http://${serviceAddress}/metrics/events/`,
  nonTransactionUploadServiceURL: `http://${serviceAddress}/metrics/ntdata/`,
  bankingTransactionUploadServiceURL: `http://${serviceAddress}/metrics/businessBanking/`,
  eapServiceURL: `http://${serviceAddress}/metrics/eaprules/`,
  codesServiceURL: `http://${serviceAddress}/metrics/replacers/`,
  logServiceURL: `http://${serviceAddress}//metrics/uilogger/`,
  httpOptions: {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    params: new HttpParams()
  }
};
