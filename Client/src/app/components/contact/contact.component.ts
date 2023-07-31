import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import ValidateForm from 'src/app/validators/validateforms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  postForm!: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router,
    private toast: NgToastService){}

  ngOnInit(): void {

    this.postForm = this.fb.group({
      fname: ['', Validators.required],
      sname: ['', Validators.required],
      email: ['', Validators.required],
      descr: ['', Validators.required],
  });
    
  }

  onPost(){
    if (this.postForm.valid){
      const postObj = this.postForm.value;
      this.api.makePost(postObj).subscribe({
        next: (res => {
          this.toast.success({detail: 'SUCCESS', summary: res.message, duration: 5000})
          this.postForm.reset();
          this.router.navigate(['home']);
        }),
        error: (err) => {
          this.toast.error({detail: 'ERROR', summary: err.error.errors[0], duration: 5000})
          
        }
      });
      

    } else {
      ValidateForm.validateAllFormFields(this.postForm);
      alert('Your form is invalid');
    }
  }

}
