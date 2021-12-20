import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../interfaces/post.interface';
import { PostsService } from './../../services/posts/posts.service';
import { BackdropService } from './../../services/backdrop/backdrop.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { faBroom } from '@fortawesome/free-solid-svg-icons';
import { LoaderService } from './../../services/loader/loader.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  faBroom = faBroom;

  form: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });

  submitted = false;

  constructor(
    private router: Router,
    private postsService: PostsService,
    private backdropService: BackdropService,
    private formBuilder: FormBuilder,
    private loader: LoaderService
  ) {}

  @HostListener('document:keydown.escape', []) onKeydownEsc() {
    this.close();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.initForm();
    this.backdropService.enable();
  }

  close() {
    this.router.navigate([{ outlets: { post: null } }]);
    this.backdropService.disable();
  }

  createPost() {
    this.loader.display();
    if (this.form.valid) {
      this.postsService
        .create({
          title: this.f['title'].value,
          body: this.f['body'].value,
        } as Post)
        .subscribe(() => {
          console.log('finish sub');
          this.close();
          this.loader.hide();
        });
    }
  }

  reset(): void {
    this.submitted = false;
    this.form.reset();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(48),
        ],
      ],
      body: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(256),
        ],
      ],
    });
  }
}
