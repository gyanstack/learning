import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LogService } from '../api';

@Injectable()
export class ApplicationErrorHandler implements ErrorHandler {
    constructor(private injector: Injector, private logService: LogService) { }

    handleError(error) {
        // const loggingService = this.injector.get(LoggingService);
        const location = this.injector.get(LocationStrategy);
        const message = error.message ? error.message : error.toString();
        const url = location instanceof PathLocationStrategy
            ? location.path() : '';

        // log data
        this.logService.log(`${message} at location : ${location} and URL: ${url}`, this, 'handleError');

        // Rethrow error.
        throw error;
    }
}
