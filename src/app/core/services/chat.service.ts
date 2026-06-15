import {
  Injectable,
  signal
}
from '@angular/core';

export interface Message {

  sender: string;

  text: string;

  timestamp: Date;

  channel: string;

}

@Injectable({
  providedIn: 'root'
})

export class ChatService {

  channels =
    signal([
      'General',
      'Development',
      'Design'
    ]);

  activeChannel =
    signal('General');

  unreadCounts =
    signal<Record<string, number>>({

      General: 0,

      Development: 2,

      Design: 1

    });

  private messages =
    signal<Message[]>([

      {
        sender: 'Admin',
        text: 'Welcome to General',
        timestamp: new Date(),
        channel: 'General'
      },

      {
        sender: 'John',
        text: 'API completed',
        timestamp: new Date(),
        channel: 'Development'
      },

      {
        sender: 'Sarah',
        text: 'New design uploaded',
        timestamp: new Date(),
        channel: 'Design'
      }

    ]);

  getMessages() {

    return this.messages()
      .filter(

        message =>

          message.channel ===
          this.activeChannel()

      );

  }

  changeChannel(
    channel: string
  ) {

    this.activeChannel.set(
      channel
    );

    this.unreadCounts.update(
      counts => ({

        ...counts,

        [channel]: 0

      })
    );

  }

  sendMessage(
  message: Omit<Message, 'channel'>
) {

  this.messages.update(
    messages => [

      ...messages,

      {

        ...message,

        channel:
          this.activeChannel()

      }

    ]
  );

}

  getLastMessage(
    channel: string
  ) {

    const messages =
      this.messages()
        .filter(

          message =>

            message.channel ===
            channel

        );

    return messages.length

      ? messages[
          messages.length - 1
        ].text

      : 'No messages';

  }

clearCurrentChannel() {

  const active =
    this.activeChannel();

  this.messages.update(
    messages =>

      messages.filter(
        message =>

          message.channel !==
          active
      )

  );

}

}