import { Component, Input, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Post } from '../../interfaces/post.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  faEdit = faEdit;

  @Input() post: Post;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  openDetailsModal(postId: number) {
    this.router.navigate([{ outlets: { post: ['details', postId] } }]);
  }

  openEditModal(postId: number) {
    this.router.navigate([{ outlets: { post: ['edit', postId] } }]);
  }
}
