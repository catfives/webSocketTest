export class Proto {
    static protos: Proto[] = [
        //登录网关

    ];

    public color: string = "";
    constructor(
        public protoStr: any,
        public title: string,
        color?: string
    ) {
        if (color != "" || color != null) {
            this.color = color
        } else {
            this.color = this.getColor()
        }
    }

    private getColor(): string {
        let color = [
            "magenta", "red", "volcano", "orange", "gold", "#f50", "green", "cyan", "blue", "geekblue", "purple",
            "#2db7f5", "#87d068", "#108ee9"
        ]
        let idx = Math.floor(Math.random() * color.length)
        return color[idx]
    }

}
