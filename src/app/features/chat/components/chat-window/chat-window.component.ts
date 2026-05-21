import { Component } from '@angular/core';


import {
  ChatService,
  Message
} from '../../../../core/services/chat.service';

@Component({
    selector: 'app-chat-window',
    imports: [],
    templateUrl: './chat-window.component.html',
    styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent {

  messages: Message[] = [];

  constructor(
    private chatService: ChatService
  ) {

    this.chatService.messages$
      .subscribe(messages => {
        this.messages = messages;
      });

  }

}