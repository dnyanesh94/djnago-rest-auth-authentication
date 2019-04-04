import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	
	public username:any;
	constructor(private router: Router, 
		private http: HttpClient, 
		private userService:UserService,
		private toastr: ToastrService,
	) {}

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
