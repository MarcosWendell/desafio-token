import { EventsComponent } from './events.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';

import { EventsRoutingModule } from './events-routing.module';
import { MainComponent } from './main/main.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    EventsComponent,
    MainComponent,
    CreateComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    EventsRoutingModule,
    BsDatepickerModule.forRoot()
  ]
})
export class EventsModule { }
