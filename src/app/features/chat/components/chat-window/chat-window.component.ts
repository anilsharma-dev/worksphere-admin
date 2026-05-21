import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ChatService,
  Message
} from '../../../../core/services/chat.service';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule],
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