import { Component, OnInit, ElementRef } from '@angular/core';
import { CommandService } from './Command.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Proto } from './Proto';
import { Message } from './Message';
// import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { GlobalConfig } from './GlobalConfig';
import { element } from 'protractor';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-Mahjong',
  providers: [CommandService],
  templateUrl: './Command.component.html',
  styleUrls: ['./Command.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandComponent implements OnInit {
  private messageModule: NzMessageService = null
  private title: string = ""
  public userInfo: { account: string, headImg: string, name: string } = { account: "", headImg: "http://www.baidu.com", name: "你好啊" }
  private loginUrl: string = "http://127.0.0.1:8989/testLogin"
  private _uid: number = 0
  private _token: string = ""

  private sendProto: string = ""

  private setProto(proto: string): void {
    this.sendProto = JSON.stringify(proto)
  }

  constructor(private Service: CommandService, messageModule: NzMessageService, private el: ElementRef,
    private route: ActivatedRoute, ) {
    this.messageModule = messageModule
    this._uid = Number(window.localStorage.getItem("uid"))
    this._token = window.localStorage.getItem("token")
    GlobalConfig.title = "WebSocket网页调试"
    // Message.msg = Message.msg.concat([new Message('我是message', {})])
    Proto.protos = [
      // new Proto({ id: "login", data: { token: "470f3c2b627bce19763e4d45852eb05d", uid: 779185 } }, "登录网关"),
      // new Proto({ id: "create", data: { type: "gymj", opt: { group: 0, pay: 0, type: 0 } } }, "创建房间")
    ]

    this.Service.GetProtoList().subscribe(data => {
      this.protolist = data.protos
    })


  }


  private signLogin(): void {
    if (this.userInfo.account == "" || this.userInfo.account == null) {
      this.messageModule.create("error", "请填写你的登录信息")
      return
    }
    if (this._uid != 0 && this._token != null) {
      return
    }
    this.Service.TestLoginPost(this.loginUrl, {
      "sign": "95650690", "data": { account: this.userInfo.account, name: this.userInfo.name, headimg: this.userInfo.headImg }
    }).subscribe(data => {
      if (data.data.code && data.data.code != 0) {
        this.messageModule.create("error", data.data.msg)
        return
      }
    })
  }


  private Clear(): void {
    this.data = []
    this.messageModule.create("success", "清屏完成")
  }
  private getKey(version: number): string {
    // key:= env.Config().ProductKey
    // if len(key) > 8 {
    //   return key
    // }

    switch (version) {
      case 0:
        return "Zjh.Qren.Com.CHLL-4Po5+QS8L=HH99"
      case 1:
        return "yangyanjunmemedaiskey"
      default:
        return "352dbf4dcdace7206b3ffebf5cc624f5"
    }
  }

  private CopyMessage(msg: string): void {
    console.log(msg)
    document.execCommand("copy", false, JSON.stringify(msg))
    this.messageModule.create("success", "复制成功")
  }

  private SendMessageBak() {
    let data = [new Message('我是message', { a: 1, b: 2 })]
    this.data = this.data.concat(data)
    this.protos.push(new Proto({ a: 1, b: 2 }, "你好啊"))
    let div = this.el.nativeElement.querySelectorAll("#div")
    setTimeout(() => { div[0].scrollTop = div[0].scrollHeight }, 1);
    console.log(div[0])
  }

  private ws: WebSocket = null
  private connected: boolean = false
  private url: string = "127.0.0.1:8201/ws"

  private SendMessage() {
    if (!this.connected) {
      this.messageModule.create("error", "连接已断开")
      return
    }
    this.ws.send(this.sendProto)
    let data = [new Message('Client -> Server', this.sendProto)]
    this.data = this.data.concat(data)
    this.sendProto = ""
  }
  private ConnectedWebSocket() {
    if (this.url == "") {
      this.messageModule.create("error", "连接地址不能为空")
      return
    } else if (this.connected == true) {
      this.messageModule.create("error", "请勿重新连接")
      return
    }
    let url = this.url
    if (url.indexOf("ws://") == -1) {
      url = "ws://" + url
    }
    this.ws = new WebSocket(url)
    this.ws.onopen = this._Open.bind(this)
    this.ws.onclose = this._OnClose.bind(this)
    this.ws.onmessage = this._OnMessage.bind(this)
    // this.ws.onopen = this._Open.bind(this)
  }


  private _Open(): void {
    this.connected = true
    this.messageModule.create("success", "连接服务器成功！")
    let data = [new Message('Client -> Server', "连接服务器成功!")]
    this.data = this.data.concat(data)
  }
  private _OnClose(): void {
    this.messageModule.create("success", "与服务连接已经被断开")
    let data = [new Message('Server -> Client', "与服务连接已经被断开!")]
    this.data = this.data.concat(data)
    this.connected = false
  }
  private _OnMessage(d: MessageEvent): void {
    let data = [new Message('Server -> Client', d.data)]
    this.data = this.data.concat(data)
  }

  private CloseWebSocket() {
    if (!this.connected) {
      this.messageModule.create("error", "已经断开的WebSocket连接")
      return
    }
    this.ws.close()
    this.ws = null
  }
  private protolist: { filPath: string, name: string }[] = []
  private selectedValue = 0

  private protos: Proto[] = []
  private data: Message[] = []

  protoChange(idx: number) {
    this.protos = []
    this.Service.getProto(this.protolist[idx].filPath).subscribe(data => {
      if (data != null) {
        let p = data.protos
        let dat: Proto[] = []
        for (let i = 0; i < p.length; i++) {
          let tmp = p[i]
          let pro = new Proto(tmp.proto, tmp.name, tmp.color)
          this.protos.push(pro)
        }
      }
    })
  }
  ngOnInit() {
    this.title = GlobalConfig.title
    this.protos = Proto.protos
    this.data = Message.msg
    console.log(this.protolist)

    let cb = () => {
      if (this.protolist.length > 0) {
        let id = this.route.snapshot.params['id']
        if (id > this.protolist.length) {
          this.protoChange(0)
          this.selectedValue = 0
        } else {
          this.protoChange(id)
          this.selectedValue = id
        }
        console.log(this.selectedValue)
      } else {
        setTimeout(() => {
          cb()
        }, 0.3);
      }

    }
    setTimeout(() => {
      cb()
    }, 0.3);

  }

}
