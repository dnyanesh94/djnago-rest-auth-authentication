import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
	user: any = {};
	public error: {};

	constructor(private router: Router,
		private userservice:UserService,
		private toastr: ToastrService,
	){ }

	ngOnInit() {
		this.user = {
			new_password1: '',
			new_password2: ''
		}
	}

	change() {
		if(this.user.new_password1 == this.user.new_password2){
			this.userservice.changePassword(this.user).subscribe((data:any)=>{
				
				this.router.navigate(['main']);
			
			},error=>{
			
				this.error = error.error.new_password2;
			
			});
		}else{
			var err=[];
			this.error = err.push('password does not matched')
		}
		
		
	}
}
