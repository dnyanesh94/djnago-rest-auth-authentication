import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password-confirm',
  templateUrl: './reset-password-confirm.component.html',
  styleUrls: ['./reset-password-confirm.component.scss']
})
export class ResetPasswordConfirmComponent implements OnInit {
	
	public user:any={
		uid:'',
		token:'',
		new_password1:'',
		new_password2:''
	}
	public resetSuccess:boolean=false;
	public error:any;  
	
	
	constructor(private userservice:UserService,private route: ActivatedRoute,private router:Router) { 
	
		this.route.params.subscribe( params => {
			this.user.uid = params['uid'];
			this.user.token = params['token'];
	
		},(error:any) => {
				
		});	
	
	}
	
	ngOnInit() {
	
		
  	}


	setPassword(user){
		if(user.new_password1 == user.new_password2){
			this.userservice.setPassword(user).subscribe((data:any) => {
				this.resetSuccess=true;
			},(error)=>{
			
				this.error=error.error.new_password2
			
			});
		}else{

			var err = [];
			err.push('password does not match');
			this.error = err; 
		}
	}
	redirectLogin(){
		this.router.navigateByUrl('/login')
	}	  

}