import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

export interface Message {
  sender: string;
  text: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private messagesSubject =
    new BehaviorSubject<Message[]>([]);

  messages$ =
    this.messagesSubject.asObservable();

  sendMessage(message: Message) {

    const currentMessages =
      this.messagesSubject.value;

    this.messagesSubject.next([
      ...currentMessages,
      message
    ]);

  }

}
