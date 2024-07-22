import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit {
  transactions: any[] = [];
  newTransaction: any = {
    StartTime: '',
    EndTime: '',
    VehicleName: '',
    Department: '',
    VehicleNumber: ''
  }; 
  
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
  }

  getTransactions(): void {
    this.userService.getTransactions().subscribe(
      (data) => {
        this.transactions = data;
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  addTransaction(): void {
    this.userService.addTransaction(this.newTransaction).subscribe(
      (response) => {
        console.log('Department added successfully:', response);
        this.getTransactions(); 
      },
      (error) => {
        console.error('Error adding department:', error);
      }
    );
    window.alert('Transaction added successfully!');
  }
}
