import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommandRoutingModule } from './Command-routing.module';
import { CommandComponent } from './Command.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { CommonModule } from '@angular/common';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommandRoutingModule,
    NzButtonModule,
    NzCardModule,
    FormsModule,
    NzInputModule,
    NzMessageModule,
    NzGridModule,
    NzPageHeaderModule,
    NzTagModule,
    NzCommentModule,
    CommonModule,
    NgZorroAntdModule
  ],
  declarations: [CommandComponent],
  bootstrap: [CommandComponent],
  exports: [CommandComponent]
})
export class CommandModule { }
