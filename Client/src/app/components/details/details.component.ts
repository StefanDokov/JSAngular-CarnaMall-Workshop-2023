import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import ValidateForm from 'src/app/validators/validateforms';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public useri: any | undefined;
  public rent: any = "";
  public isRenting: boolean = false;

  

   constructor(private fb: FormBuilder, private api: ApiService, private activeRoute: ActivatedRoute, private auth: AuthService, private router: Router,
    private toast: NgToastService){}

    isLogged = this.auth.isLogged();
    infoForm!: FormGroup;
    options = [1, 2, 3, 4];
    isLoad = false;

   ngOnInit(): void {

    this.getRenta();
     
     if (this.isLogged) {
      
     this.getUseri();
     } 

    setTimeout(() => {
      this.isLoad = true;
     this.infoForm = this.fb.group({
      dateFrom: ['', Validators.required],
      forDays: [1 , Validators.required],
      cardNum: ['', Validators.required],
      costPrice: [{value: this.rent.price, disabled: true}, Validators.required],
    });
  }, 1050);

    setTimeout(() => {
      this.infoForm.get('forDays')?.valueChanges.subscribe(x => {
        this.infoForm.get('costPrice')?.setValue(x * this.rent.price);
    })
    }, 1100);

      
   }


   getRenta() {
    const {id} = this.activeRoute.snapshot.params;
     this.api.getOneRent(id)
     .subscribe(res => {
      this.rent = res.resu;
     });
   }

   getUseri(){
    this.auth.user$.subscribe(
      res => this.useri = res
     )  
   }
   isRentingClick() {
    return this.isRenting = !this.isRenting;
   }
   
   postInfo() {
    const sure = confirm("Are you sure you want to make this reservation?");
    if (sure) {
      if(this.infoForm.valid){
    const costPrice = this.infoForm.get('costPrice')?.value;
    const {dateFrom, forDays, cardNum} = this.infoForm.value;
    const fullObj = {dateFrom, forDays: parseInt(forDays), cardNum, costPrice};
    const userId = this.useri.user._id;
    const rentId = this.rent._id;
    const update = {...fullObj, reserveId: rentId};
    const updateRent = {...fullObj, resOwner: userId};
    console.log(updateRent)
    this.auth.infoUpdate(userId, update).subscribe({
      next: (res => {
       
       console.log(`success`)
      }),
      error: (err) => {
        this.toast.error({detail: 'ERROR', summary: err.message, duration: 5000})
        
      }
    });

    this.api.infoPost(rentId, updateRent).subscribe({
      next: (res => {
        this.toast.success({detail: 'SUCCESS', summary: 'Reservation Booked!', duration: 5000})
        this.router.navigate(['cars']);
      }),
      error: (err) => {
        this.toast.error({detail: 'ERROR', summary: err.message, duration: 5000})
        
      }
    });

    
  
  } else {
    ValidateForm.validateAllFormFields(this.infoForm);
    alert('Your form is invalid');
  }

    } else {
      return;
    }
   }
   
}
