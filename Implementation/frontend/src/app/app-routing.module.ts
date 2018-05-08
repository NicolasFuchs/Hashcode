import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {ProfileComponent} from './component/profile/profile.component';
import {ConfirmComponent} from './component/confirm/confirm.component';
import {ChallengesComponent} from './component/challenges/challenges.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'confirm',
    component: ConfirmComponent
  },
  {
    path: 'challenges',
    component: ChallengesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
