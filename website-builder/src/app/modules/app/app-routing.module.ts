import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('../login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'sites',
    loadChildren: () => import('../sites/sites.module').then(m => m.SitesModule)
  },
  {
    path: 'templates',
    loadChildren: () => import('../templates/templates.module').then(m => m.TemplatesModule)
  },
  {
    path: 'template',
    loadChildren: () => import('../single-template/single-template.module').then(m => m.SingleTemplateModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
