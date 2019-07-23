import {NgModule} from '@angular/core';
import {ChatboxComponent} from 'app/chatbox/chatbox.component';
import {FormsModule} from '@angular/forms';
import {DialogflowService} from 'app/chatbox/dialogflow.service';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {DietifySharedModule} from 'app/shared';

@NgModule({
    declarations: [
        ChatboxComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        DietifySharedModule
    ],
    providers: [DialogflowService],
    exports: [
        ChatboxComponent
    ]
})
export class ChatboxModule {
}
