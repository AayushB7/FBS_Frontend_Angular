import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminHomeModel } from 'src/app/models/AdminHomeModel';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  name: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";

  constructor(private auth:AuthService, private router:Router, private snackBar: MatSnackBar){}

  onSubmit() {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (this.name.trim() == "" || this.email.trim() == "" || this.password.trim() == "" || this.confirmPassword.trim() == "") {
      alert("Please Enter All The Details!");
      // Swal.fire({
      //   title: 'Error!',
      //   text: "Please Enter All The Details!",
      //   icon: 'error',
      //   confirmButtonText: 'Ok'
      // });
      this.password="";
      this.confirmPassword="";
    }
    else if (!this.email.trim().match(mailformat)) {
       alert("Please Enter a Valid Email ID!");
      // Swal.fire({
      //   title: 'Error!',
      //   text: "Please Enter a Valid Email ID!",
      //   icon: 'error',
      //   confirmButtonText: 'Ok'
      // });
      this.password="";
      this.confirmPassword="";
    }
    else if (this.password.trim() != this.confirmPassword.trim()) {
       alert("Password And Confirm Password Doesn't Match!");
      // Swal.fire({
      //   title: 'Error!',
      //   text: "Password And Confirm Password Doesn't Match!",
      //   icon: 'error',
      //   confirmButtonText: 'Ok'
      // });
      this.password="";
      this.confirmPassword="";
    }
    else if(!this.password.trim().match(passwordFormat)){
       alert("Password Format:\nAt least one lowercase letter\nAt least one uppercase letter\nAt least one digit\nAt least one special character from the set @$!%*?&\nMinimum length of 8 characters");
      // Swal.fire({
      //   title: 'Error!',
      //   text: "Password must be in a below format: At least one lowercase letter, At least one uppercase letter, At least one digit, At least one special character from the set @$!%*?&, Minimum length of 8 characters",
      //   icon: 'error',
      //   confirmButtonText: 'Ok'
      // });
    }
    else {
      console.log(this.name + " " + this.email + " " + this.password + " " + this.confirmPassword);
      this.auth.addAdmin({
        email: this.email.trim(),
        password: this.password.trim()
      }).subscribe({
        next:(res)=>{
          this.name="";
          this.email="";''
          this.password="";
          this.confirmPassword="";
          alert("Admin created success");
          // Swal.fire({
          //   title: 'Success!',
          //   text: "Airline Added Successfully!",
          //   icon: 'success',
          //   confirmButtonText: 'Ok'
          // });
        },
        error:(err)=>{
          alert(err?.error.message);
          // Swal.fire({
          //   title: 'Error!',
          //   text: err?.error.message,
          //   icon: 'error',
          //   confirmButtonText: 'Ok'
          // });
          this.password="";
          this.confirmPassword="";
        }
      });
    }
  }

  addAdmin() {
    // this.emailValid = this.validateEmail();
    // this.passwordsMatch = this.validatePasswords();

    if (true) {
      const userData = new AdminHomeModel(this.email, this.password, this.confirmPassword);

      this.auth.signup(userData)
        .subscribe(response => {
            // Handle successful signup response, e.g., show a success message
            console.log('Signup successful', response);
            this.router.navigate(['login']);
          },
          error => {
            // Handle signup error, e.g., show an error message
            console.error('Signup error', error);
            this.snackBar.open('Sign Up failed. Please follow the format.', 'Close', {
              duration: 10000, // Duration in milliseconds
            });
          }
        );
    }
  }
}
