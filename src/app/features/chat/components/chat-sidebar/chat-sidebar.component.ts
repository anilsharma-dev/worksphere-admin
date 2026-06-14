import {
  Component,
  inject
}
from '@angular/core';

import {
  CommonModule
}
from '@angular/common';

import {
  ChatService
}
from '../../../../core/services/chat.service';

@Component({

  selector:
    'app-chat-sidebar',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './chat-sidebar.component.html',

  styleUrl:
    './chat-sidebar.component.scss'

})

export class ChatSidebarComponent {

  chatService =
    inject(
      ChatService
    );

  channels =
    this.chatService.channels;

  activeChannel =
    this.chatService.activeChannel;

  unreadCounts =
    this.chatService.unreadCounts;

  selectChannel(
    channel: string
  ) {

    this.chatService
      .changeChannel(
        channel
      );

  }

  lastMessage(
    channel: string
  ) {

    return this.chatService
      .getLastMessage(
        channel
      );

  }

}