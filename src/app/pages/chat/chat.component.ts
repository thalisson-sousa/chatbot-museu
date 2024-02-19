import { Component } from '@angular/core';
import { ArrowLeftComponent } from '../../icons/arrow-left/arrow-left.component';
import { MuseumComponent } from '../../icons/museum/museum.component';
import { ChatSugestionsComponent } from '../../components/chat-sugestions/chat-sugestions.component';
import { CommonModule } from '@angular/common';
import { Message } from '../../types/message.type';
import { ChatDialogComponent } from '../../components/chat-dialog/chat-dialog.component';
import { MessageService } from '../../services/message.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    ArrowLeftComponent,
    MuseumComponent,
    ChatSugestionsComponent,
    ChatDialogComponent,
  ],
  providers: [
    MessageService
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  questions: Message[] = JSON.parse(localStorage.getItem("messeges") ?? "[]")

  constructor(private service: MessageService) {}

  updateLocalStorage() {
    localStorage.setItem("message", JSON.stringify(this.questions))
  }

  sendSuggestedQuestion(question: string) {
    this.questions.push({
      type: 'request',
      message: question
    })

    this.updateLocalStorage()
    this.sendMessage(question)
  }

  sendMessage(message: string) {
    this.service.sendData(message).subscribe({
      next: (body) => {
        this.questions.push({
          type: "response",
          message: body.response
        })
        this.updateLocalStorage()
      }
    })
  }

}
