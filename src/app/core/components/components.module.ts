import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearcherComponent } from './searcher/searcher.component';
import { PostComponent } from './post/post.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent } from './button/button.component';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  exports: [SearcherComponent, PostComponent, ButtonComponent],
  declarations: [SearcherComponent, PostComponent, ButtonComponent],
})
export class ComponentsModule {}
