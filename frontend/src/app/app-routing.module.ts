import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { ViewPage } from './pages/view/view.page';

const routes: Routes = [
  {
    path: '',
    component:HomePage
  },
  {
    path: 'view/:id',
    component:ViewPage
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
