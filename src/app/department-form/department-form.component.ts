import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {
  newDepartment: any = {
    Name: '',
    DepartmentNumber: '',
    TotalVehicles: null,
    CompanyName: '',
    DepartmentType: '',
    CreatedDate: null,
    Photo:''
  };
  departments: any[] = []; 

  // @Output() addDepartmentEvent = new EventEmitter<any>();


  constructor(private userService: UsersService) { }

  ngOnInit(): void {
  }

  getDepartments(): void {
    this.userService.getDepartments().subscribe(
      (data) => {
        this.departments = data;
      },
      (error) => {
        console.error('Error fetching departments:', error);
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
    window.alert('Department added successfully!');
  }
}
