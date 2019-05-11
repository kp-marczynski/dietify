import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChatMessage} from 'app/chatbox/model/chat-message.model';
import {DialogflowService} from 'app/chatbox/dialogflow.service';
import {BasicDialogflowResponse} from 'app/chatbox/model/basic-dialogflow-response.model';
import {UserType} from 'app/chatbox/model/user-type.enum';
import {AppWindow} from 'app/chatbox/model/app-window';

const {webkitSpeechRecognition}: AppWindow = <AppWindow>window;

@Component({
    selector: 'jhi-app-chatbox',
    templateUrl: 'chatbox.component.html',
    styleUrls: ['chatbox.component.css']
})
export class ChatboxComponent implements AfterViewChecked, OnInit {

    public newMessage: ChatMessage;
    public messages: ChatMessage[];
    private isMinimized = false;
    private isClosed = false;

    @ViewChild('chatmessages', {read: ElementRef}) chatList: ElementRef;

    constructor(private dialogFlowService: DialogflowService) {
        this.newMessage = new ChatMessage('', UserType.USER);
        this.messages = [
            new ChatMessage('Welcome to Dietify! How may I assist you today?', UserType.BOT, new Date())
        ];
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    ngOnInit() {
        this.scrollToBottom();
    }

    sendMessage() {
        if (this.newMessage.content.trim() !== '') {
            this.newMessage.timestamp = new Date();
            this.messages.push(this.newMessage);
            console.log(this.newMessage);

            this.dialogFlowService.getResponse(this.newMessage).subscribe((res: BasicDialogflowResponse) => {
                console.log(res);
                for (const message of res.result.fulfillment.messages) {
                    this.messages.push(
                        new ChatMessage(message.speech, UserType.BOT, res.timestamp)
                    );
                    this.eventFire(document.getElementById('message-send'), 'click');
                    this.speechSynthesis(message.speech);
                }
            });

            this.newMessage = new ChatMessage('', UserType.USER);
            this.eventFire(document.getElementById('message-send'), 'click');
        }
    }

    private scrollToBottom(): void {
        try {
            this.chatList.nativeElement.scrollTop = this.chatList.nativeElement.scrollHeight + 50;

        } catch (err) {
            console.log('Could not find the "chatList" element.');
        }
    }

    isBot(userType: UserType) {
        return userType === UserType.BOT;
    }

    speechSynthesis(message: string) {
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.pitch = 1.5;
        utterance.volume = 1;
        utterance.rate = 1;
        speechSynthesis.speak(utterance);
    }

    speechRecognition() {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = true;
        recognition.onerror = event => {
            console.log('error!');
        };

        recognition.start();
        console.log('started recognition');
        recognition.onresult = event => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            console.log('finished recognition');
            console.log(finalTranscript);
            if (finalTranscript.trim() !== '') {
                this.newMessage.content = finalTranscript.trim();
                this.sendMessage();
            }
        };
    }

    eventFire(el, etype) {
        if (el.fireEvent) {
            el.fireEvent('on' + etype);
        } else {
            const evObj = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            el.dispatchEvent(evObj);
        }
    }

}
