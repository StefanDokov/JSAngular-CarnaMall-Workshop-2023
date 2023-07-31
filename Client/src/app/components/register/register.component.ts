import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { matchPassword } from 'src/app/validators/matchPassword.validator';
import ValidateForm from 'src/app/validators/validateforms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router,
    private toast: NgToastService){}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      rePassword: ['', Validators.required],
  },
  {
    validators: matchPassword
  });
  }

  onRegister() {
    if (this.registerForm.valid){
      const { rePassword, ...regObj} = this.registerForm.value;
      this.auth.register(regObj).subscribe({
        next: (res => {
          this.toast.success({detail: 'SUCCESS', summary: res.message, duration: 5000})
          this.auth.storeToken(res.token);
          this.registerForm.reset();
          this.router.navigate(['cars']);
        }),
        error: (err) => {
          this.toast.error({detail: 'ERROR', summary: err.error.errors[0], duration: 5000})
          
        }
      });
      

    } else {
      ValidateForm.validateAllFormFields(this.registerForm);
      alert('Your form is invalid');
    }
  }

  

  
}
