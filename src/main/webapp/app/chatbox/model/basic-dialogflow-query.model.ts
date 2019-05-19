export class BasicDialogflowQuery {
    query: string;
    lang = 'en';
    sessionId = '12345';

    constructor(query: string) {
        this.query = query;
    }
}
