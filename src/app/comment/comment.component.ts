import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor() {
  }

  comments = [];
  comment = {id: 0, message: ''};
  NewComment = false;

  ngOnInit(): void {
  }

  addcomment() {
    if (this.comment.message !== '') {
      this.comment.id = this.comments.length + 1;
      this.comments.push({id: this.comment.id}, {message: this.comment.message});
      this.comment.message = '';
    }
  }
}
