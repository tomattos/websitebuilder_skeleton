import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleTemplateComponent } from './containers/single-template/single-template.component';

const routes: Routes = [{ path: '', component: SingleTemplateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingleTemplateRoutingModule { }
