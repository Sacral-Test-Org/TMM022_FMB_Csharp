import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormInitializationComponent } from './features/form-initialization/form-initialization.component';

const routes: Routes = [
  { path: '', redirectTo: '/form-initialization', pathMatch: 'full' },
  { path: 'form-initialization', component: FormInitializationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
