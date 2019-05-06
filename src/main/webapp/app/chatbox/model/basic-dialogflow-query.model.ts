export class BasicDialogflowQuery {
    query: string;
    lang: string = 'en';
    sessionId: string = '12345';

    constructor(query: string) {
        this.query = query;
    }
}
