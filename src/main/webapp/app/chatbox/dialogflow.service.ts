import {Injectable} from '@angular/core';
// import {Observable} from 'rxjs/Rx';
// import 'rxjs/add/operator/map';
import {ChatMessage} from 'app/chatbox/model/chat-message.model';
import {BasicDialogflowQuery} from 'app/chatbox/model/basic-dialogflow-query.model';
import {BasicDialogflowResponse} from 'app/chatbox/model/basic-dialogflow-response.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class DialogflowService {

    private baseURL = 'https://api.dialogflow.com/v1/query?v=20150910';
    // private token: string = 'd2fec3415734470cb989611596f25fcd';

    constructor(private http: HttpClient) {
    }

    public getResponse(message: ChatMessage): Observable<BasicDialogflowResponse> {
        const data = new BasicDialogflowQuery(message.content);

        return this.http
            .post<BasicDialogflowResponse>(this.baseURL, data);
    }

}
