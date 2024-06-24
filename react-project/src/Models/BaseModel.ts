
export class BaseModel {

    constructor(){
    }

    private  messages: string[] = [];

    public addMessage(message: string): void {
        this.messages.push(message);
    }

    public showMessages(): string[] {    
        return this.messages;
    }

    public  cleanMessages() {
        this.messages = [];
    }
}