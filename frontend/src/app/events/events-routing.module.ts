import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsComponent } from './events.component';
import { MainComponent } from './main/main.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { AuthGuard } from '@app/shared/auth.guard';

const childRoutes = [
  { path: '', component: MainComponent },
  { path: 'create', component: CreateComponent },
  { path: ':id/update', component: UpdateComponent }
];

const routes: Routes = [
  {
    path: '',
    component: EventsComponent,
    children: childRoutes,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {}
