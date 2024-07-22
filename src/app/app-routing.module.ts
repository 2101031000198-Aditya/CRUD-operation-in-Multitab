import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { DepartmentComponent } from './departments/departments.component';
import { TransactionComponent } from './transactions/transactions.component';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'departments', component: DepartmentComponent },
  { path: 'transactions', component: TransactionComponent },
  { path: 'department-form', component: DepartmentFormComponent },  // Add this line
  { path: 'transaction-form', component: TransactionFormComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

