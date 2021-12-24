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
import { Labels } from '../../enum/labels';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  faBroom = faBroom;
  Labels = Labels;

  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),
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
    this.submitted = true;

    if (this.form.valid) {
      this.loader.display();

      this.postsService
        .create({
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

  private initForm() {
    this.form = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(256),
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
