import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './core/shell/shell.component';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: '', loadChildren: () => import('./page-add/page-add.module').then((module) => module.PageAddModule), canActivate: [] },
      { path: 'analytics', loadChildren: () => import('./page-funds/page-funds.module').then((module) => module.PageFundsModule), canActivate: [] },
      { path: 'analytics', loadChildren: () => import('./page-analytics/page-analytics.module').then((module) => module.PageAnalyticsModule), canActivate: [] },
      { path: 'settings', loadChildren: () => import('./page-settings/page-settings.module').then((module) => module.PageSettingsModule), canActivate: [] },
      { path: '**', component: NotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
