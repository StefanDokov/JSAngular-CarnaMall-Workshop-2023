import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { firstValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import ValidateForm from 'src/app/validators/validateforms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm!: FormGroup;
  usera: any = {};

  constructor(private fb: FormBuilder, private toast: NgToastService, private api: ApiService, private auth: AuthService,
    private router: Router) {}

 ngOnInit(): void {
  this.createForm = this.fb.group({
    model: ['', Validators.required],
    image: ['', Validators.required],
    doors: ['', Validators.required],
    seats: ['', Validators.required],
    transmission: ['', Validators.required],
    price: ['', Validators.required],
    year: ['', Validators.required],
    
});

 this.auth.user$.subscribe(
  value => {
    this.usera = value;
  }
 )
  
 }
 
 
 onCreateRent(){
  if(this.createForm.valid){
    let createObj = this.createForm.value;
    createObj = {...createObj, ownerId: this.usera.user._id}
    this.api.createRent(createObj).subscribe({
      next: (res => {
        this.toast.success({detail: 'SUCCESS', summary: res.message, duration: 5000})
        this.createForm.reset();
        this.router.navigate(['cars']);
      }),
      error: (err) => {
        this.toast.error({detail: 'ERROR', summary: err.message, duration: 5000})
        
      }
    });
  } else {
    ValidateForm.validateAllFormFields(this.createForm);
    alert('Your form is invalid');
  }
 }


}
