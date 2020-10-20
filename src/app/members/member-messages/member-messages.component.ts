import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css'],
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.userService
      .getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
      .subscribe((response) => {
        console.log(response);
        this.messages = response;
      });
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    console.log(this.recipientId)
    this.userService
      .sendMessage(this.authService.decodedToken.nameid, this.newMessage)
      .subscribe((response: Message) => {
        this.messages.unshift(response);
        this.newMessage = '';
      }, error => {
        this.alertify.error(error);
      });
  }
}
