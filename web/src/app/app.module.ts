import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TypeaheadModule, ModalModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http'; 
import {  ToastrModule } from 'ngx-toastr';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ImageCropperModule} from "ng2-img-cropper/index";




import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { UserService } from './services/user.service';
import { MainComponent } from './main/main.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HeaderComponent } from './header/header.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordConfirmComponent } from './reset-password-confirm/reset-password-confirm.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailsComponent } from './student-details/student-details.component';

@NgModule({
  declarations: [
	AppComponent,
	LoginComponent,
	MainComponent,
	HeaderComponent,
	ChangePasswordComponent,
	ResetPasswordComponent,
	ResetPasswordConfirmComponent,
	StudentListComponent,
	StudentDetailsComponent,
    
  ],
  imports: [
	BrowserModule,
	BrowserAnimationsModule,
	FormsModule ,
	HttpClientModule,
	AppRoutingModule,
	AngularFontAwesomeModule,
	TypeaheadModule.forRoot(),
	ToastrModule.forRoot({
		timeOut: 3000,
		positionClass: 'toast-top-right',
		preventDuplicates: true,
	}),
	NgxDatatableModule,
	ModalModule.forRoot(),
	ImageCropperModule
	
	
  ],
  providers: [UserService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
