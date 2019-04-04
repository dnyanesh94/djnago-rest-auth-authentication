import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  
})
export class MainComponent implements OnInit {
	private _opened: boolean = true;
 
  	
	public username:any;
	constructor(private router: Router, 
		private http: HttpClient, 
		private userService:UserService,
		private toastr: ToastrService,) {

	}
  
	ngOnInit() {
		
		this.userService.activeUser().subscribe((user:any) => {

			this.username = user.username;
		
		},error =>{
			
		});
	}	

	logout() {
		this.userService.logout().subscribe((data:any)=>{
			// this.toastr.success(data);
		},error =>{

		});
		
		this.router.navigateByUrl('/login');
	}

	changePassword(){
		
		this.router.navigateByUrl('main/password/change');
	}
	  
}
  




