import { Component } from '@angular/core';
import { ChatService } from './chat.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ChatService]
})
export class AppComponent {
  user: string;
  room: string;
  messageArray:Array<{user: String,message: String}>=[];
  messageText: string;

  constructor(private chatService: ChatService) {
    this.chatService.newUserJoined().subscribe(data=>{
      this.messageArray.push(data);
    });
    this.chatService.userLeftRoom().subscribe(
      data=>{
        this.messageArray.push(data);
      });
      this.chatService.newMessageRecevied().subscribe(data => {
        this.messageArray.push(data);
      });
   }

  join() {
    this.chatService.joinRoom({ user: this.user, room: this.room });
  }
  leave(){
    this.chatService.leaveRoom({ user: this.user, room: this.room });
  }
  sendMessage(){
    this.chatService.sendMessage({ user: this.user, room: this.room, message: this.messageText});
  }
}
