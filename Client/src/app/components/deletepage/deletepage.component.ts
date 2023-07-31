import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-deletepage',
  templateUrl: './deletepage.component.html',
  styleUrls: ['./deletepage.component.css']
})
export class DeletepageComponent implements OnInit{

  public userr: any | undefined;
  public rent: any = '';
  isLoaded = false;

  deleteForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private activeRoute: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getRentt();
    this.getUserr();

    setTimeout(() => {
      if (this.rent?.ownerId !== this.userr?._id) {
        this.toast.error({
          detail: 'ERROR',
          summary: 'You are not an owner of this rent!',
          duration: 5000,
        });
        this.router.navigate(['home']);
      } else {
        this.isLoaded = true;
      }
    }, 1000);

    this.deleteForm = this.fb.group({
      model: [{value: '', disabled: true}, Validators.required],
      image: [{value: '', disabled: true}, Validators.required],
      doors: [{value: '', disabled: true}, Validators.required],
      seats: [{value: '', disabled: true}, Validators.required],
      transmission: [{value: '', disabled: true}, Validators.required],
      price: [{value: '', disabled: true}, Validators.required],
      year: [{value: '', disabled: true}, Validators.required],
    });

    setTimeout(() => {
    this.deleteForm.patchValue({
      model: this.rent.model,
      image: this.rent.image,
      doors: this.rent.doors,
      seats: this.rent.seats,
      transmission: this.rent.transmission,
      price: this.rent.price,
      year: this.rent.year,
    });

  }, 1100);
  }

  getRentt() {
    const { id } = this.activeRoute.snapshot.params;
    this.api.getOneRent(id).subscribe((res) => {
      this.rent = res.resu;
    });
  }

  getUserr() {
    this.auth.user$.subscribe((res) => (this.userr = res?.user));
  }

  onDeleteClick() {
   const sure = confirm("Are you sure you want to delete this rent?");

   if (sure) {
    const {id} = this.activeRoute.snapshot.params;
    this.api.deleteRent(id).subscribe({
      next: (res => {
        this.toast.success({detail: 'SUCCESS', summary: res.message, duration: 5000})
       this.router.navigate(['cars']);
      }),
      error: (err) => {
        this.toast.error({detail: 'ERROR', summary: err.message, duration: 5000})
        
      }
    })
   } else {
    return;

   }
    
  }

}
