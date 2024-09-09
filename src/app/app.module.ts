import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule}  from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from './Components/ProdcutsAll/edit-product/edit-product.component';
import { EditdepartmentComponent } from './Components/DepartmentAll/editdepartment/editdepartment.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
