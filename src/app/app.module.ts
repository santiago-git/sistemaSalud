import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { UtilsService } from './shared/services/utils.service';
import { HttpClientModule } from '@angular/common/http';
import { RutasService } from './shared';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [AuthGuard, UtilsService, RutasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
