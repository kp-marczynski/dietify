import {UserType} from 'app/chatbox/model/user-type.enum';

export class ChatMessage {
    content: string;
    timestamp: Date;
    userType: UserType;

    constructor(content: string, userType: UserType, timestamp?: Date) {
        this.content = content;
        this.timestamp = timestamp;
        this.userType = userType;
    }
}
