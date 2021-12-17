import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../interfaces/post.interface';
import { UsersService } from '../../services/users/users.service';
import { PostsService } from './../../services/posts/posts.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  post: Post;
  userName: string;
  postId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postsService: PostsService,
    private usersService: UsersService
  ) {}

  @HostListener('document:keydown.escape', []) onKeydownEsc() {
    this.close();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.postId = +params['postId'];
      this.setPost(this.postId);
    });
  }

  close() {
    this.router.navigate([{ outlets: { post: null } }]);
  }

  private setPost(idPost: number) {
    if (idPost) {
      this.post = this.postsService.getById(idPost);
      this.userName = this.usersService.getName(this.post.userId);
    }
  }
}
