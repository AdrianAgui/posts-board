import { Component, OnInit } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { PostsService } from '../../services/posts-service/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  postsView: Post[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postsService.get().subscribe((posts) => {
      this.posts = posts;
      this.postsView = posts;
    });
  }

  filterChange(value: string) {
    this.postsView = this.posts.filter(
      (post) =>
        value === String(post.userId) ||
        post.title.includes(value) ||
        post.body.includes(value)
    );

    if (!value && this.postsView.length === 0) {
      this.postsView = this.posts;
    }
  }
}
