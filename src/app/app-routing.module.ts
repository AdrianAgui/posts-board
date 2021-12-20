import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitGuard } from './core/guards/init.guard';
import { CreateComponent } from './core/modals/create/create.component';
import { DetailComponent } from './core/modals/detail/detail.component';
import { EditComponent } from './core/modals/edit/edit.component';
import { HomeComponent } from './core/pages/home/home.component';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';

const modals: Routes = [
  {
    path: 'details/:postId',
    component: DetailComponent,
    outlet: 'post',
  },
  {
    path: 'create',
    component: CreateComponent,
    outlet: 'post',
  },
  {
    path: 'edit/:postId',
    component: EditComponent,
    outlet: 'post',
  },
];

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [InitGuard],
    children: [...modals],
  },
  {
    path: 'posts',
    component: HomeComponent,
    canActivate: [InitGuard],
    children: [...modals],
  },
  { path: '**', component: PageNotFoundComponent },
  ...modals,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
