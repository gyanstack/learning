import { MessageSource } from './appenums';

export interface Message {
    message: string;
    severity: number; // Possible values : 1- Information, 2- Warning, 3- Error.
    source: MessageSource;
}
