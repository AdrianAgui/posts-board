import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Post } from '../../interfaces/post.interface';
import { BackdropService } from '../../services/backdrop/backdrop.service';
import { UsersService } from '../../services/users/users.service';
import { PostsService } from './../../services/posts/posts.service';
import { LoaderService } from './../../services/loader/loader.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Labels } from '../../enum/labels';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  post: Post;
  userName: string;
  postId: number;
  comments: any;
  Labels = Labels;

  faUser = faUser;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postsService: PostsService,
    private usersService: UsersService,
    private backdropService: BackdropService,
    private loader: LoaderService
  ) {}

  @HostListener('document:keydown.escape', []) onKeydownEsc() {
    this.close();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.postId = +params['postId'];
      if (this.postId) {
        this.setPost(this.postId);
        this.setComments(this.postId);
        this.backdropService.enable();
      }
    });
  }

  close() {
    this.router.navigate([{ outlets: { post: null } }]);
    this.backdropService.disable();
  }

  private setPost(idPost: number) {
    this.post = this.postsService.getById(idPost);
    this.userName = this.usersService.getName(this.post.userId);
  }

  private setComments(idPost: number) {
    this.loader.display();
    this.postsService.getComments(idPost).subscribe((comments) => {
      this.comments = comments;
      this.loader.hide();
    });
  }
}
