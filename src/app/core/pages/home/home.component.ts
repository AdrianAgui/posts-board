import { Component, OnInit } from '@angular/core';
import { Labels } from '../../enum/labels';
import { Post } from '../../interfaces/post.interface';
import { PostsService } from '../../services/posts-service/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  Labels = Labels;

  posts: Post[] = [];
  postsView: Post[] = [];

  constructor(private postsService: PostsService, private router: Router) {}

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

  openCreateModal() {
    this.router.navigate([{ outlets: { post: ['create'] } }]);
  }

  openDetailsModal() {
    this.router.navigate([{ outlets: { post: ['details'] } }]);
  }
}
