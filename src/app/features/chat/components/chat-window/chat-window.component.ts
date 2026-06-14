import {
  Component,
  OnInit,
  signal,
  computed,
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
    'app-chat-window',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './chat-window.component.html',

  styleUrl:
    './chat-window.component.scss'

})

export class ChatWindowComponent
implements OnInit {

  private chatService =
    inject(ChatService);

  loading =
    signal(true);

  messages =
    computed(() =>

      this.chatService
        .getMessages()

    );

  activeChannel =
    this.chatService
      .activeChannel;

  ngOnInit(): void {

    setTimeout(() => {

      this.loading.set(
        false
      );

    }, 1200);

  }

}