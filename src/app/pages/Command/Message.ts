import { format } from 'date-fns';

export class Message {
    static msg: Message[] = []

    public time: string = ""
    public msg: string = ""

    constructor(public direction: string, msg: any) {
        if (typeof msg == "string") {
            this.msg = msg
        } else {
            this.msg = JSON.stringify(msg)
        }
        this.time = format(new Date(), "YYYY-MM-DD HH:mm:ss:SSS")
    }
}