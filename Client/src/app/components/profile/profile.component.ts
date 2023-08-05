import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{

postsisShown: boolean = false;
theuser: any | undefined;
rentove: any[] = [];
isLoad: boolean = false;



  constructor(private api: ApiService,private location: Location,  private auth: AuthService, private router: Router,
    private toast: NgToastService ) {}


    ngOnInit(): void {
      
      this.getTheUseri();

      setTimeout(() => {
        this.getMyRents();
      }, 1000);
      
      setTimeout(() => { 
        
        this.rentove = this.rentove.filter(x => x.ownerId == this.theuser.user._id);
        
      }, 1500);
      setTimeout(() => { 
        this.isLoad = true;
        
      }, 2000);
      
      
    }

changeSections(){
  this.postsisShown = !this.postsisShown;
}

getTheUseri(){
  this.auth.getProfile().subscribe(
    res => this.theuser = res
   );
  
 }

 getMyRents(){
    this.api.getRents().subscribe(res => {
      this.rentove = res;
     });
    
 }

 reloadPage() {
  
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['profile']);
  })
  
  
    this.toast.success({
      detail: 'SUCCESS',
      summary: 'Reservation Canceled!',
      duration: 5000,
    });
  
 
}
 postDel(infoId: string, userId: string, rentId: string, dateFrom: string){
  const sure = confirm('Are you sure you want to cancel this reservation?');
  if (sure){
    
    this.auth.delPost(userId, infoId).subscribe({
      next: (res) => {},
      error: (err) => {
        this.toast.error({
          detail: 'ERROR',
          summary: err.message,
          duration: 5000,
        });
      },
    });

    this.api.delPost(rentId, dateFrom).subscribe({
      next: (res) => {
        
        // this.router.navigate(['profile']);
        this.reloadPage();
        
      },
      error: (err) => {
        this.toast.error({
          detail: 'ERROR',
          summary: err.message,
          duration: 5000,
        });
      },
    });




  } else {
    return ;
  }
    
 }

}
