import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import ValidateForm from 'src/app/validators/validateforms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router,
    private toast: NgToastService){}

  isLogged: string | null = this.auth.getToken();
  ngOnInit(): void {
    if (this.isLogged != null) {
      this.router.navigate(['home']);
    }
    this.loginForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
    });
  }
  

  onLogin() {
    if (this.loginForm.valid){
       this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.toast.success({detail: 'SUCCESS', summary: res.message, duration: 5000})
          this.auth.storeToken(res.token);
          this.loginForm.reset();
          this.router.navigate(['cars']);
        },
        error:(err) => {
          // this.toast.error({detail: "ERROR", summary: err.message,duration: 5000});
          
        }

       })
    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
      alert('Your form is invalid');
    }
  }

}
