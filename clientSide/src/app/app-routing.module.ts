import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { ReviewsComponent } from './components/reviews/reviews.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'leave-review', component: ReviewsComponent },
  { path: 'something-went-wrong', component: ErrorComponent },
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
