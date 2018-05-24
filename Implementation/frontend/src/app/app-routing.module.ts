import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {ProfileComponent} from './component/profile/profile.component';
import {ChallengesComponent} from './component/challenges/challenges.component';
import {AdminComponent} from './component/admin/admin.component';
import {ValidationComponent} from './component/validation/validation.component';


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
    path: 'signup',
    component: ProfileComponent,
    data: {signup: true}
  },
  {
    path: 'validation/:token',
    component: ValidationComponent
  },
  {
    path: 'challenges',
    component: ChallengesComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
