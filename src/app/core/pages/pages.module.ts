import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, ComponentsModule, SharedModule],
  exports: [HomeComponent, PageNotFoundComponent],
  declarations: [HomeComponent, PageNotFoundComponent],
})
export class PagesModule {}
