import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule],
  exports: [DetailComponent, CreateComponent, EditComponent],
  declarations: [DetailComponent, CreateComponent, EditComponent],
})
export class ModalsModule {}
