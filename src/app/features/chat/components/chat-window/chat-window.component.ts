import {
  Component,
  OnInit,
  signal
}
from '@angular/core';

import {
  ChatService,
  Message
}
from '../../../../core/services/chat.service';

@Component({
  selector: 'app-chat-window',

  standalone: true,

  imports: [],

  templateUrl:
    './chat-window.component.html',

  styleUrl:
    './chat-window.component.scss'
})

export class ChatWindowComponent
implements OnInit {

  messages: Message[] = [];

  loading =
    signal(true);

  constructor(
    private chatService: ChatService
  ) {}

  ngOnInit(): void {

    setTimeout(() => {

      this.chatService.messages$
        .subscribe(messages => {

          this.messages = messages;

          this.loading.set(false);

        });

    }, 1200);

  }

}