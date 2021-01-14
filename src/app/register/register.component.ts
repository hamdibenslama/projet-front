import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ImageService} from '../services/image.service';
import {ServiceService} from '../services/service.service';

// import custom validator to validate that password and confirm password fields match

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registrForm1: FormGroup;
  submitted = false;
  choix = '';
  photo;
  filesToUpload: Array<File>;

  constructor(private formBuilder: FormBuilder, private router: Router, private imageservice: ImageService, private registerservice: ServiceService ) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      LastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
    });
    this.registrForm1 = this.formBuilder.group({
      firstName: ['', Validators.required],
      // LastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmitadmin() {
    const data = {
      username: this.registerForm.value.username,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.LastName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
      photo: this.filesToUpload[0].name,
    };
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    this.router.navigate(['/login']);
    console.log(this.registerForm.value);
    this.registerservice.savemedecin(data).subscribe(res => {
      console.log(res);
      this.imageservice.pushFileToStorage(this.filesToUpload[0]).subscribe(rest => {
        console.log(rest);
    });
  });
  }
  onSubmitsec() {
    console.log(this.registrForm1.value)
    const data = {
      username: this.registrForm1.value.username,
      firstName: this.registrForm1.value.firstName,
      email: this.registrForm1.value.email,
      password: this.registrForm1.value.password,
      confirmPassword: this.registrForm1.value.confirmPassword,
      photo: this.filesToUpload[0].name,
    };
    this.submitted = true;

    // stop here if form is invalid
    if (this.registrForm1.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registrForm1.value, null, 4));
    this.router.navigate(['/login']);
    console.log(this.registrForm1.value);
    this.registerservice.savesecretaire(data).subscribe(res => {
      console.log(res);
      this.imageservice.pushFileToStorage(this.filesToUpload[0]).subscribe(rest => {
        console.log(rest);
      });
    });
  }
  recuperFile(file){
    this.filesToUpload = (file.target.files as Array<File>);
    this.photo = file.target.files[0].photo;
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
