import { Component, OnInit } from '@angular/core';
import { Labels } from '../../enum/labels';
import { Post } from '../../interfaces/post.interface';
import { PostsService } from '../../services/posts/posts.service';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  Labels = Labels;

  posts: Post[] = [];
  postsView: Post[] = [];

  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPosts();
    this.getUsers();
  }

  getPosts() {
    console.log(this.postsService.get());
    this.postsService.get().subscribe((posts) => {
      this.posts = posts;
      this.postsView = posts;
    });
  }

  getUsers() {
    this.usersService.get().subscribe();
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
}
