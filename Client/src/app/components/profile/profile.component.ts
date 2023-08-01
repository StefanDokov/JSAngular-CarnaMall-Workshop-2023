import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private api: ApiService, private activeRoute: ActivatedRoute, private auth: AuthService, private router: Router,
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

}
