export class BasicDialogflowResponse {
    id: string;
    lang: string;
    sessionId: string;
    timestamp: Date;
    result: Result;
    status: Status;

}

class Status {
    code: number;
    errorType: string;
}

class Result {
    action: string;
    actionIncomplete: boolean;
    contexts: any[];
    fulfillment: Fulfilment;
    metadata: Metadata;
    parameters: any;
    resolvedQuery: string;
    score: number;
    source: string;
}

class Fulfilment {
    messages: FulfilmentMessage[];
    speech: string;
}

class FulfilmentMessage {
    speech: string;
}

class Metadata {
    intentId: string;
    intentName: string;
    isFallbackIntent: boolean;
    webhookForSlotFillingUsed: boolean;
    webhookUsed: boolean;
}
