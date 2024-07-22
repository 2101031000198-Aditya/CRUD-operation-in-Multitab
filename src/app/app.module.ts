import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { DepartmentComponent } from './departments/departments.component';
import { TransactionComponent } from './transactions/transactions.component';
import { UsersService } from './services/users.service';  
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { AgGridModule } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    DepartmentComponent,
    TransactionComponent,
    DepartmentFormComponent,
    TransactionFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatGridListModule,AgGridModule,ReactiveFormsModule ,CommonModule
  ],
  providers: [UsersService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
