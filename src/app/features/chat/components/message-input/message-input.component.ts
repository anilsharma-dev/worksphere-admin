import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  ChatService
} from '../../../../core/services/chat.service';

import { NotificationService }
from '../../../../core/services/notification.service';

@Component({
    selector: 'app-message-input',
    imports: [FormsModule],
    templateUrl: './message-input.component.html',
    styleUrl: './message-input.component.scss'
})
export class MessageInputComponent {

  messageText = '';

  constructor(
    private chatService: ChatService,
     private notificationService: NotificationService
  ) {}

  sendMessage() {

    if(!this.messageText.trim()) {
      return;
    }

    this.chatService.sendMessage({
      sender: 'Anil',
      text: this.messageText,
      timestamp: new Date()
    });

    this.messageText = '';

    this.notificationService.success(
      'Message sent'
    );
  }

}