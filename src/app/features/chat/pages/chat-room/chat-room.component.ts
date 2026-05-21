import { Component } from '@angular/core';
import { ChatSidebarComponent } from '../../components/chat-sidebar/chat-sidebar.component';
import { ChatWindowComponent } from '../../components/chat-window/chat-window.component';
import { MessageInputComponent } from '../../components/message-input/message-input.component';

@Component({
    selector: 'app-chat-room',
    imports: [
        ChatSidebarComponent,
        ChatWindowComponent,
        MessageInputComponent
    ],
    templateUrl: './chat-room.component.html',
    styleUrl: './chat-room.component.scss'
})
export class ChatRoomComponent {

}
