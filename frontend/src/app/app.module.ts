import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule, ModalModule } from 'ngx-bootstrap';

import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
