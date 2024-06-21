
export class BaseModel {

    constructor(){
    }

    private  messages: string[] = [];

    public addMessage(message: string): void {
        this.messages.push(message);
    }

    public showMessages(): string[] {
        //if (this.messages.length > 0) {
            //console.error('Errors: \n' + this.messages.join('\n'));
            return this.messages;
        //}
    }
}