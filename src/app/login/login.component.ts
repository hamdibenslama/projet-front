import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private router: Router, private userservice: UserService) {
  }

  get f() {
    return this.loginForm.controls;
  }

  loginForm: FormGroup;
  submitted = false;
  // error: a;
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));
    this.router.navigate(['/']);
    console.log(this.loginForm.value);
  }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }
  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.userservice.login(this.loginForm.value).subscribe((res: any) => {
        console.log(res);
        const jwt = res.headers.get('Authorization');
        this.userservice.saveToken(jwt);
        this.router.navigate(['listpatient']);
      }, a => {
        Swal.fire({
          icon: 'error',
          title: 'oops...',
          text: 'nom utilisateur ou mot de passe incorrecte !'
        });
      }
    );
  }
}

//   login() {
//     this.submitted = true;
//
//     // stop here if form is invalid
//     if (this.loginForm.invalid) {
//       return;
//     }
//     this.loginservice.login(this.loginform.value).subscribe((res: any) => {
//       console.log(res);
//     });
//     const jwt = res.headers.get('Authorization');
//     this.loginservice.saveToken(jwt);
//     this.router.navigate(['home']);
//   }
//
//
//
// }
