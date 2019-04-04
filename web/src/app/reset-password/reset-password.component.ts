import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  	constructor(private userservice:UserService,private router:Router) { }
	public user:any={}
	public error:any;  
	public emailSent:boolean=false;
	ngOnInit() {
		this.user={
			email:''
		}
		this.emailSent=false;
  	}


  resetPassword(user){
	this.userservice.resetPassword(user).subscribe((data:any) => {
		this.emailSent=true;
	},(error)=>{
		this.error=error.error.email
	});
  }

  redirectHome(){
	this.router.navigateByUrl('/main');
  }
}
