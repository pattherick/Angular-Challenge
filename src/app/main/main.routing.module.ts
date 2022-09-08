import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      { path: 'imprint', loadChildren: () => import('../imprint/imprint.module').then((m) => m.ImprintModule) },
      { path: 'search', loadChildren: () => import('../search/search.module').then((m) => m.SearchModule) },
      { path: '**', redirectTo: '/dashboard' },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
