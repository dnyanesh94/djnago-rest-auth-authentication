import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

export interface UserInStorage{
    id:number;
    email:string;
    firstName:string;
    lastName:string;
    role:string;
    status:boolean;
    authToken:string;
    photoUrl:string;
}

@Injectable()
export class UserService {
	public currentUserKey:string="cu";
  	public storage:Storage = sessionStorage;

  	authenticated = false;
    user:any;
    userStatus:any;
  
  	constructor(private http: HttpClient) { }

  	//Store userinfo from session storage
    storeUserInfo(userString:any) {
        this.storage.setItem(this.currentUserKey, userString);
    }

     //Remove userinfo from session storage
    removeUserInfo() {
        this.storage.removeItem(this.currentUserKey);
		
	}

        //Get userinfo from session storage
    getUserInfo():UserInStorage|null {
        try{
            let userInfoString:string = this.storage.getItem(this.currentUserKey);
            if (userInfoString) {
                let userObj:UserInStorage = JSON.parse(this.storage.getItem(this.currentUserKey));
                return userObj;
            }
            else{
                return null;
            }
        }
        catch (e) {
            return null;
        }
    }
    
    isLoggedIn():boolean{
        return this.storage.getItem(this.currentUserKey)? true:false;
    }

    //Get User's Display name from session storage
    getUserName():string{
		let userObj:UserInStorage = this.getUserInfo();
		
		if (userObj !== null){
			return userObj.firstName;
			
        }
        return "no-user";
    }

     getPhotoUrl():string{
        let userObj:UserInStorage = this.getUserInfo();
        
        if (userObj !== null){
            return userObj.photoUrl;
            
        }
        return "no-user";
    }


    getStoredToken():string|null {
        let userObj:UserInStorage = this.getUserInfo();
        if (userObj !== null){
            return userObj.authToken;
	        }
        return null;
    }

    // authenticate(credentials, callback) {
    //     const headers = new HttpHeaders(credentials ? {
    //         authorization : 'Basic ' + btoa(credentials.email + ':' + credentials.password)
    //     } : {});

    //     this.http.get('/api/user', {headers: headers}).subscribe(response => {
    //         if (response['email']) {
    //             this.user = response;
    //             this.authenticated = true;
    //         } else {
    //             this.authenticated = false;
    //             this.user = {};
    //         }
    //         return callback && callback();
    //     });

    // }

	// Autherizatin header 


    login(credentials:any) {
		
         return this.http.post('/account/login/', credentials);
    }

    

    logout() {
		this.removeUserInfo();
        return this.http.get('/account/logout/');
	}

	changePassword(data:any) {
		let item = this.storage.getItem(this.currentUserKey)
		var token = "Token"+' '+item.replace(/^"|"$/g, '');  
		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json',
				'Authorization': token
			})
		};
		return this.http.post('/account/password/change/',data,httpOptions);
	}
	
	resetPassword(data:any) {
		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json',
				// 'Authorization': token
			})
		};
		return this.http.post('/account/password/reset/',data,httpOptions);
	}
	
	setPassword(data:any) {
		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json',
				// 'Authorization': token
			})
		};
		return this.http.post('/account/password/reset/confirm/',data);
	}
	
	
	activeUser(){
		let item = this.storage.getItem(this.currentUserKey)
		var token = "Token"+' '+item.replace(/^"|"$/g, '');  
		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json',
				'Authorization': token
			})
		};
	 	return	this.http.get('account/user',httpOptions);
	}
	
	
	//########### student api call ##################### //
	
	getStudents(){
		return this.http.get('/api/student/list/');
	}

	addStudent(student:any){
		return this.http.post('/api/student/list/',student);
	}

	deleteStudent(id:number) {
		return this.http.delete('api/student/detail/'+id+'/')
	}

	getStudent(id:number){
		return this.http.get('/api/student/detail/'+id+'/');
	}

	editStudent(student:any){
		return this.http.put('/api/student/detail/'+student.id+'/',student);
	}


	//########### student address api call ##################### //

	getStudentImage(id:number){
		return this.http.get('/api/student/image/detail/'+id+'/');
	}

	addStudentImage(formData:any){
		return this.http.post('/api/student/image/list/',formData);
	}

	editStudentImage(formData:any,id:number){
		debugger;
		return this.http.put('/api/student/image/detail/'+id+'/',formData);
	}


		


	//########### student address api call ##################### //

	getStudentAddresses(id:number){		
		return this.http.get('/api/student/address/detail/'+id+'/');	
	}

	addStudentAddress(address:any){
		return this.http.post('/api/student/address/list/',address);
	}

	editStudentAddress(address:any){	
		return this.http.put('/api/student/address/detail/'+address.id+'/',address);
	}

	
	deleteStudentAddress(id:number) {
		return this.http.delete('api/student/address/detail/'+id+'/')
	}

	//########### student address api call ##################### //

	getStudentContacts(id:number){		
		return this.http.get('/api/student/contact/detail/'+id+'/');	
	}

	addStudentContact(contact:any){
		return this.http.post('/api/student/contact/list/',contact);
	}

	editStudentContact(contact:any){
		
		return this.http.put('/api/student/contact/detail/'+contact.id+'/',contact);
	}

	deleteStudentContact(id:number) {
		return this.http.delete('api/student/contact/detail/'+id+'/')
	}

	//########### student address api call ##################### //

	getStudentParents(id:number){		
		return this.http.get('/api/student/parent/detail/'+id+'/');	
	}

	addStudentParent(parent:any){
		return this.http.post('/api/student/parent/list/',parent);
	}

	editStudentParent(parent:any){
		
		return this.http.put('/api/student/parent/detail/'+parent.id+'/',parent);
	}

	deleteStudentParent(id:number) {
		return this.http.delete('api/student/parent/detail/'+id+'/')
	}

}
