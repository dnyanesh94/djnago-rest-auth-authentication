import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { MainComponent } from './main/main.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordConfirmComponent } from './reset-password-confirm/reset-password-confirm.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailsComponent } from './student-details/student-details.component';



const routes: Routes = [
	{
		path: 'main', component: MainComponent,	
	  	canActivate:[AuthGuardService],
  
		
	  	children: [ 	  
			// other childrens here
			{ path: 'password/change', component: ChangePasswordComponent },
		
	  	],
	  
	},
  
	{path: 'login', component: LoginComponent  },
	{path: 'password/reset', component: ResetPasswordComponent  },
	{path: 'password/reset/confirm/:uid/:token', component: ResetPasswordConfirmComponent },
		//default redirect parh
	// {path: '**', redirectTo: '/main/student-list', pathMatch: 'prefix'},
	// {path: '', redirectTo: '/main/student-list', pathMatch: 'prefix'}
	
  ];

@NgModule({
	exports: [ RouterModule ],
	imports: [ 
		RouterModule.forRoot(routes) 
	
	]
})
export class AppRoutingModule { }
