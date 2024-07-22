import { Component, Input } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {


  @Input() public passwordToCheck: string = '';
  passwordForm !: FormGroup;
  signupForm !: FormGroup;
  selectedUser: any;
  title = 'angular15api';
  user: any;
  showForm: boolean = false;

  newUser: any = ({
    Password: ""
  })
  strongPassword = false;
  base64Image: string | undefined;
  constructor(private userData:UsersService, private fb: FormBuilder) {
    this.loadUsers();

  }
  loadUsers() {
    this.userData.getUsers().subscribe((data) => {
      console.warn("data", data);
      this.user = data;
    });
  }
  // editUser(id: number) {
  //   this.userData.get(id).subscribe((user) => {
  //     this.selectedUser = user;
  //     console.warn("click", user);
  //   });
  // }
  addUser(data: any) {
    const userFormDatas = {
      ...data,
      Photo: this.base64Image  
    };
    this.userData.addUser(userFormDatas).subscribe((result) => {
      console.warn(result);
      this.loadUsers();

    });
    console.log(userFormDatas)
  }
  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.selectedUser = null;
    }
  }

  closeDetails() {
    this.selectedUser = null;
  }
 
  uploadPic(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        this.base64Image = (reader.result as string).split(',')[1];
        console.warn("img", this.base64Image);

      };
      reader.readAsDataURL(file);
    }
  }

  getPasswordStrengthColor(strength: string, password: string): string {
    const strengthScore = this.calculatePasswordStrength(password);

    if (strength === 'Weak' && strengthScore < 3) {
      return 'red';
    } else if (strength === 'Medium' && strengthScore >= 3 && strengthScore < 5) {
      return 'yellow';
    } else if (strength === 'Strong' && strengthScore >= 5) {
      return 'green';
    } else {
      return '';
    }
  }

  calculatePasswordStrength(password: string): number {
    const lengthScore = password.length >= 8 ? 1 : 0;
    const uppercaseScore = /[A-Z]/.test(password) ? 1 : 0;
    const lowercaseScore = /[a-z]/.test(password) ? 1 : 0;
    const numberScore = /\d/.test(password) ? 1 : 0;
    const specialCharScore = /[@$!%*?&]/.test(password) ? 1 : 0;

    return lengthScore + uppercaseScore + lowercaseScore + numberScore + specialCharScore;
  }

  getPasswordStrength(password: string): string {
    const strengthScore = this.calculatePasswordStrength(password);

    if (strengthScore >= 5) {
      return 'Strong';
    } else if (strengthScore >= 3) {
      return 'Medium';
    } else {
      return 'Weak';
    }
  }

}