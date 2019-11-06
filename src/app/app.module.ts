import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { DataStoreService } from '../shared/services/data-store.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    DataStoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
