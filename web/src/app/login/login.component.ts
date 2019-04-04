  import { Component, OnInit } from '@angular/core';
  import { HttpClient,HttpXsrfTokenExtractor } from '@angular/common/http';
  import { Router } from '@angular/router';
  import { UserService} from '../services/user.service';
  

  @Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
  export class LoginComponent implements OnInit {

   error:any;

   loginData = {email: '', password: ''};
   
   constructor(private http: HttpClient, private router: Router, private userService: UserService) {
      
   }

   login() {
  	 
  	this.userService.login(this.loginData).subscribe(
      	(data:any) => {
  			var user:any;
			  user = data.key;
  			this.userService.storeUserInfo(JSON.stringify(user));
  			this.router.navigateByUrl('/');

         	},
           error => {
			   	if(error.error.email){
					this.error = error.error.email;
				}else{
				 	this.error = error.error.non_field_errors;
				}	
            }
     	);
   }

   forgotPassword() {
	//    this.router.navigateByUrl('/password/reset')
      window.location.href = window.location.origin + "/password/reset";
      //window.location.href = "http://localhost:8080/forgot-password";
   }


   ngOnInit() {
   
   }

  }
