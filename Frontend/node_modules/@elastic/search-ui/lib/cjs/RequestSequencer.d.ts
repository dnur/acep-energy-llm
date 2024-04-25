declare type RequestSequence = number;
export default class RequestSequencer {
    requestSequence: RequestSequence;
    lastCompleted: RequestSequence;
    next(): RequestSequence;
    isOldRequest(request: RequestSequence): boolean;
    completed(request: RequestSequence): void;
}
export {};
