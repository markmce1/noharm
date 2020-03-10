import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'space',
    loadChildren: () => import('./space/space.module').then( m => m.SpacePageModule)
  },
  {
    path: 'rpg',
    loadChildren: () => import('./rpg/rpg.module').then( m => m.RPGPageModule)
  },
  {
    path: 'quiz',
    loadChildren: () => import('./quiz/quiz.module').then( m => m.QuizPageModule)
  },  {
    path: 'flap',
    loadChildren: () => import('./flap/flap.module').then( m => m.FlapPageModule)
  },
  {
    path: 'guide',
    loadChildren: () => import('./guide/guide.module').then( m => m.GuidePageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
