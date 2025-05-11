import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { CreateTaskComponent } from './create-task/create-task.component';

const routes: Routes = [{ path: '', component: MainComponent }, { path: 'create-task', component: CreateTaskComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
