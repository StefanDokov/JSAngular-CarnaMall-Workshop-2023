import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import ValidateForm from 'src/app/validators/validateforms';

@Component({
  selector: 'app-editpage',
  templateUrl: './editpage.component.html',
  styleUrls: ['./editpage.component.css'],
})
export class EditpageComponent implements OnInit {
  public userz: any | undefined;
  public rent: any = '';
  isLoaded = false;

  editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private activeRoute: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getRenta();
    this.getUserz();

    setTimeout(() => {
      if (this.rent?.ownerId !== this.userz?._id) {
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

    this.editForm = this.fb.group({
      model: ['', Validators.required],
      image: ['', Validators.required],
      doors: ['', Validators.required],
      seats: ['', Validators.required],
      transmission: ['', Validators.required],
      price: ['', Validators.required],
      year: ['', Validators.required],
    });

    setTimeout(() => {
    this.editForm.patchValue({
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

  getRenta() {
    const { id } = this.activeRoute.snapshot.params;
    this.api.getOneRent(id).subscribe((res) => {
      this.rent = res.resu;
    });
  }

  getUserz() {
    this.auth.user$.subscribe((res) => (this.userz = res?.user));
  }

  onEditClick() {
    const sure = confirm("Are you sure you want to edit this rent?");
    if (sure){
    if(this.editForm.valid){
      let editObj = this.editForm.value;
      editObj = {...editObj, ownerId: this.rent.ownerId};
      const {id} = this.activeRoute.snapshot.params;
      this.api.editRent(id, editObj).subscribe({
        next: (res => {
          this.toast.success({detail: 'SUCCESS', summary: res.message, duration: 5000})
         
          this.router.navigate(['cars']);
        }),
        error: (err) => {
          this.toast.error({detail: 'ERROR', summary: err.message, duration: 5000})
          
        }
      });
    } else {
      ValidateForm.validateAllFormFields(this.editForm);
      alert('Your form is invalid');
    }
  } else {
    return;
  }
  }
}
