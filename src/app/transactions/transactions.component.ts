import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-transaction',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionComponent implements OnInit {
  transactions: any[] = [];
  selectedMonth: string = 'all';
  filteredTransactions: any[] = [];
  newTransaction: any = {
    StartTime: '',
    EndTime: '',
    VehicleName: '',
    Department: '',
    VehicleNumber: ''
  };

  constructor(private datePipe: DatePipe,private userService: UsersService) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions(): void {
    this.userService.getTransactions().subscribe(
      (data) => {
        this.transactions = data;
        this.filterTransactions();
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  }

  addTransaction(): void {
    this.userService.addTransaction(this.newTransaction).subscribe(
      (response) => {
        console.log('Transaction added successfully:', response);
        this.getTransactions(); // Refresh the transaction list
      },
      (error) => {
        console.error('Error adding transaction:', error);
      }
    );
  }


  filterTransactions(): void {
    if (this.selectedMonth === 'all') {
      this.filteredTransactions = this.transactions;
    } else {
      this.filteredTransactions = this.transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.StartTime);
        const selectedMonthNumber = +this.selectedMonth;
        return transactionDate.getMonth() + 1 === selectedMonthNumber; // Months are zero-indexed, hence the +1
      });
    }
  }
}
