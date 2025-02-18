import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-validation-messages',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.scss']
})
export class ValidationMessagesComponent {
  @Input() messages: string[] = [];

  displayMessages(messages: string[]): void {
    this.messages = messages;
  }
}
