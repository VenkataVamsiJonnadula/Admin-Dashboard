import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BooksComponent } from './books/books.component';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    DashboardComponent,
    BooksComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatTableModule
  ]
})
export class PagesModule { }
