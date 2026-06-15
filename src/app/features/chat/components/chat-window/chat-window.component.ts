import {
  Component,
  OnInit,
  signal,
  computed,
  inject,
  ElementRef,
  ViewChild,
  AfterViewChecked
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
  @ViewChild(
  'messageContainer'
)
messageContainer?:
  ElementRef;
  
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


clearChat() {

  this.chatService
    .clearCurrentChannel();

}

ngAfterViewChecked() {

  this.scrollToBottom();

}

private scrollToBottom() {

  const container =
    this.messageContainer
      ?.nativeElement;

  if(container) {

    container.scrollTop =
      container.scrollHeight;

  }

}

}