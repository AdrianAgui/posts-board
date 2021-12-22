import { Component, HostListener, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { faBroom } from '@fortawesome/free-solid-svg-icons';
import { Post } from '../../interfaces/post.interface';
import { BackdropService } from '../../services/backdrop/backdrop.service';
import { LoaderService } from '../../services/loader/loader.service';
import { PostsService } from '../../services/posts/posts.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  faBroom = faBroom;
  submitted = false;
  postId: number;

  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),
  });

  constructor(
    private router: Router,
    private postsService: PostsService,
    private backdropService: BackdropService,
    private formBuilder: FormBuilder,
    private loader: LoaderService,
    private route: ActivatedRoute
  ) {}

  @HostListener('document:keydown.escape', []) onKeydownEsc() {
    this.close();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const post = this.postsService.getById(+params['postId']);
      this.postId = post.id;
      this.initForm(post);
      this.backdropService.enable();
    });
  }

  close() {
    this.router.navigate([{ outlets: { post: null } }]);
    this.backdropService.disable();
  }

  updatePost() {
    this.submitted = true;

    if (this.form.valid) {
      this.loader.display();

      this.postsService
        .update({
          id: this.postId,
          title: this.f['title'].value,
          body: this.f['body'].value.replace('\n', ''),
        } as Post)
        .subscribe(() => {
          this.close();
          this.loader.hide();
        });
    }
  }

  reset(): void {
    this.submitted = false;
    this.form.reset();
  }

  private initForm(post: Post) {
    this.form = this.formBuilder.group({
      title: [
        post.title,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(256),
        ],
      ],
      body: [
        post.body,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(256),
        ],
      ],
    });
  }
}
