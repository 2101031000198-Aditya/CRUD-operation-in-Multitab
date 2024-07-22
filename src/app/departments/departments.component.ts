import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { DatePipe } from '@angular/common';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentComponent implements OnInit {
  departments: any[] = [];
  selectedMonth: string = 'all';
  filteredDepartments: any[] = [];  
  months: any[] = [];
  newDepartment: any = {
    Name: '',
    DepartmentNumber: '',
    TotalVehicles: null,
    CompanyName: '',
    DepartmentType: '',
    CreatedDate: ''
  };

  constructor(private datePipe: DatePipe, private userService: UsersService) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments(): void {
    this.userService.getDepartments().subscribe(
      (data) => {
        this.departments = data;
        console.log('Fetched departments:', this.departments);
        this.filterDepartments(); // Initial filtering on load
      },
      (error) => {
        // Handle API errors
        console.error('Error fetching departments:', error);
        // Display an error message to the user
      }
    );
  }

  addDepartment(): void {
    this.userService.addDepartment(this.newDepartment).subscribe(
      (response) => {
        console.log('Department added successfully:', response);
        this.getDepartments(); // Refresh the department list
      },
      (error) => {
        console.error('Error adding department:', error);
      }
    );
  }


  filterDepartments(): void {
    console.log('Selected month:', this.selectedMonth);
    if (this.selectedMonth === 'all') {
      this.filteredDepartments = this.departments;
    } else {
      this.filteredDepartments = this.departments.filter((department) => {
        const departmentDate = new Date(department.CreatedDate);
        const selectedMonthNumber = departmentDate.getMonth() + 1; // Month is zero-based
        console.log('Department date:', departmentDate);
        console.log('Month number:', selectedMonthNumber);
        return selectedMonthNumber === +this.selectedMonth;
      });
    }
    console.log('Filtered departments:', this.filteredDepartments);
  }
  // generateMonthOptions(): void {
  //   const currentMonth = new Date().getMonth() + 1;
  //   const months = [];

  //   for (let i = currentMonth - 3; i <= currentMonth + 3; i++) {
  //     const monthNumber = (i + 12) % 12 || 12; // Ensure months are in the range 1-12
  //     months.push({ value: monthNumber, label: this.getMonthName(monthNumber) });
  //   }

  //   this.months = months;
  // }

  // getMonthName(monthNumber: number): string {
  //   const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  //   return monthNames[monthNumber - 1];
  // }

  
  
}

