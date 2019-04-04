import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { error } from 'util';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {
	
	public pageView:number=1;
	public id:number=0;
	
	public student:any={};

	public studentImage:any={};
	public addresses:any=[];
	public address:any={}
	public editAddress:boolean=false;
	
	public contacts:any=[];
	public contact:any={};
	public editContact:boolean=false;
	
	public parents:any=[];
	public parent:any={};
	public editParent:boolean=false;
	
	public profileImage:any={};
	public deleteRecordType:string=null;

	cropperSettings: CropperSettings;


	@ViewChild('deleteModal') deleteModal: ModalDirective;
	@ViewChild('profileImageModal') profileImageModal: ModalDirective;
	@ViewChild('profilImageCropper') profilImageCropper:ImageCropperComponent;
	
	@ViewChild('f') f: NgForm;
	

	
	
	constructor(private userservice:UserService,private route: ActivatedRoute,private toastr: ToastrService) { 
		this.route.params.subscribe(params => {
			this.id = +params['id'];         
		});
		if( this.id > 0 ){
			this.userservice.getStudent(this.id).subscribe((student:any)=>{
				this.student = student;
				this.getStudentImage(this.student.id);

			},(error:any)=>{

			});
		
		}else{
			this.student = {
				first_name :'',
				middle_name : '', 
				last_name : '',
				mother_name : '',
				birth_date : '',
				birth_place : '',
				gender : '',
				blood_group : '',
				caste : '',
				religion : '',
				identification_mark : ''
			}

		}

		this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 130;
        this.cropperSettings.height = 130;
        this.cropperSettings.croppedWidth = 120;
        this.cropperSettings.croppedHeight = 120;
        this.cropperSettings.canvasWidth = 400;
        this.cropperSettings.canvasHeight = 300;
		this.cropperSettings.noFileInput = true;
		this.cropperSettings.keepAspect = false;
		this.cropperSettings.preserveSize = true;
		
		

	}

	ngOnInit() {
		
	}



	changePageView(num:number){
		
		if(num == 1){
			this.pageView = 1;
		}
		if(num == 2){
			this.getStudentAddresses();
		}
		if(num == 3){
			this.getStudentContacts();

		}
		if(num == 4){
			this.getStudentParents();
		}
	}



	confirmDeletion(record:any,recordName:string){
		
		if(recordName == 'address') {
		
			this.address = record;
			this.deleteRecordType = recordName;
			this.deleteModal.show();	
			return;
		}if(recordName == 'contact'){
			this.contact = record
			this.deleteRecordType = recordName;
			this.deleteModal.show();
			
			return;
		}
		if(recordName == 'parent'){
			this.parent = record
			this.deleteRecordType = recordName;
			this.deleteModal.show();
			
			return;
		}

	}	

	deleteRecord(){
	
		if(this.deleteRecordType == 'address') {
		
			this.deleteStudetAddress(this.address.id);
			return;
		}if(this.deleteRecordType == 'contact'){
		
			this.deleteStudetContact(this.contact.id);
			return;
		}if(this.deleteRecordType == 'parent'){
		
			this.deleteStudetParent(this.parent.id);
			return;
		}

	}
	// ###################### student  functioning ######################## //


	updateStudent(){
		this.userservice.editStudent(this.student).subscribe((student:any)=>{
			this.student = student;
			this.changePageView(2);
			this.toastr.success("Student updated successfully!");

		},(error)=>{

		});
	}


	// ###################### student image functioning ######################## //




	onChangeProfileImage(event:any){

		var image:any = new Image();
		var file:File = event.target.files[0];
		var myReader:FileReader = new FileReader();
		var that = this;
		this.studentImage.image = file;
		myReader.onloadend = function (loadEvent:any) {
			image.src = loadEvent.target.result;
			that.profilImageCropper.setImage(image);
	
		};
		this.profileImageModal.show();
		myReader.readAsDataURL(file);
	}
	
	saveProfileImage(){
		this.updateStudentImage();
	}


	getStudentImage(id:number) {
		this.userservice.getStudentImage(id).subscribe((studentImage:any)=>{
		
			if(studentImage !=null && studentImage !=''){
				this.studentImage = {
					id:studentImage[0].id,
					student_id: studentImage[0].student_id,
					imageUrl:studentImage[0].image
				}
			}else{
				this.studentImage={
					id:0,
					student_id:this.student.id,
					image:'',
					imageUrl:'/static/assets/images/dummy-image.jpg'
				}
			}
		
		},(error:any)=>{

		})
	
	}

	updateStudentImage(){
		debugger;
		let formData: FormData = new FormData(); 
		if(this.studentImage.image !=null && this.studentImage !=''){
			formData.append('image',this.studentImage.image)
		}
		formData.append('id',this.studentImage.id)
		formData.append('student_id',this.studentImage.student_id)
		
		if(this.studentImage.id > 0){
			this.userservice.editStudentImage(formData,this.studentImage.id).subscribe((studentImage:any)=>{
				this.studentImage=studentImage;
				this.profileImageModal.hide();
				this.toastr.success("Student image updated successfully!");
	
			},(error:any)=>{

			})
		}else{
			this.userservice.addStudentImage(formData).subscribe((studentImage:any)=>{
				this.studentImage=studentImage;
				this.profileImageModal.hide();
				this.toastr.success("Student image added successfully!");
	
			},(error:any)=>{

			})
		}
	}
	// ###################### student addresss functioning ######################## //

	cancelEditAddress(){
		this.editAddress = false;
	}

	getStudentAddresses(){
		this.addresses=[];
		this.userservice.getStudentAddresses(this.student.id).subscribe((addresses:any)=>{
			
			if(addresses.length > 0 && addresses != null ){
				this.editAddress = false;
				for(var i=0;i<addresses.length;i++){
					this.addresses.push({
						id:addresses[i].id,
						student_id:addresses[i].student_id,
						address_type:addresses[i].address_type,
						address_line1:addresses[i].address_line1,
						address_line2:addresses[i].address_line2,
						location:addresses[i].location,
						city:addresses[i].city,
						state:addresses[i].state,
						country:addresses[i].country,
						pincode:addresses[i].pincode
					})
				}
			}else{
				this.editAddress = true;
				this.address={
					id:0,
					student_id:this.student.id,
					address_type:'',
					address_line1:'',
					address_line2:'',
					location:'',
					city:'',
					state:'',
					country:'',
					pincode:''
				}
			}

			this.pageView = 2;

		},(error:any)=>{

		});
	}

	newStudentAddress(){
		this.f.resetForm();
		
		this.address={
			id:0,
			student_id:this.student.id,
			address_type:'',
			address_line1:'',
			address_line2:'',
			location:'',
			city:'',
			state:'',
			country:'',
			pincode:''
		}

		this.editAddress = true;
	}

	editStudentAddress(address:any){
		this.address={
			id:address.id,
			student_id:address.student_id,
			address_type:address.address_type,
			address_line1:address.address_line1,
			address_line2:address.address_line2,
			location:address.location,
			city:address.city,
			state:address.state,
			country:address.country,
			pincode:address.pincode
		}
		this.editAddress = true;
	}


	
	updateStudentAddress(){
		if(this.address.id > 0){
			this.userservice.editStudentAddress(this.address).subscribe((address:any)=>{
				this.changePageView(2);
				this.toastr.success("Student address updated successfully!");
			},(error)=>{

			});
		}else{

			this.userservice.addStudentAddress(this.address).subscribe((address:any)=>{
				this.changePageView(3);
				this.toastr.success("Student address added successfully!");
			},(error:any)=>{

			});
			
		}
	}
	
	deleteStudetAddress(id:number){
		this.userservice.deleteStudentAddress(id).subscribe((data:any)=>{
			this.deleteRecordType=null;
			this.getStudentAddresses();
			this.deleteModal.hide();
			this.toastr.success("Student address deleted  successfully!");
		},(error:any)=>{

		});
	}

	// ###################### student contact functioning ######################## //

	cancelEditContact(){

		this.editContact = false;

	}

	getStudentContacts(){
		this.contacts=[];
		this.userservice.getStudentContacts(this.student.id).subscribe((contacts:any)=>{
			if(contacts.length > 0 && contacts != null ){
				this.editContact = false;
				for(var i=0;i<contacts.length;i++){
					this.contacts.push({
						id:contacts[i].id,
						student_id:contacts[i].student_id,
						contact_type:contacts[i].contact_type,
						std_code:contacts[i].std_code,
						number:contacts[i].number
					})
				}
			}else{
				this.editContact = true;
				this.contact={
					id:0,
					student_id:this.student.id,
					contact_type:'',
					std_code:'',
					number:''
				}
			}

			this.pageView = 3;

		},(error:any)=>{

		});
	}

	newStudentContact(){
		this.f.resetForm();
		this.contact={
			id:0,
			student_id:this.student.id,
			contact_type:'',
			std_code:'',
			number:''
		}

		this.editContact = true;
	}

	editStudentContact(contact:any){
		this.contact={
			id:contact.id,
			student_id:contact.student_id,
			contact_type:contact.contact_type,
			std_code:contact.std_code,
			number:contact.number,
		}
		
		this.editContact = true;
	}


	
	updateStudentContact(){
		if(this.contact.id > 0){
			this.userservice.editStudentContact(this.contact).subscribe((contact:any)=>{
				this.changePageView(3);
				this.toastr.success("Student contact updated  successfully!");

			},(error)=>{

			});
		}else{

			this.userservice.addStudentContact(this.contact).subscribe((contact:any)=>{
				this.changePageView(4);
				this.toastr.success("Student contact added  successfully!");

			},(error:any)=>{

			});
			
		}
	}

	deleteStudetContact(id:number){
		this.userservice.deleteStudentContact(id).subscribe((data:any)=>{
			this.deleteRecordType=null;
			this.getStudentContacts();
			this.deleteModal.hide();
			this.toastr.success("Student contact deleted  successfully!");

		},(error:any)=>{

		});
	}


	// ###################### student parent functioning ######################## //


	cancelEditParent(){

		this.editParent = false;

	}

	getStudentParents(){
		this.parents=[];
			this.userservice.getStudentParents(this.student.id).subscribe((parents:any)=>{
				if(parents.length > 0 && parents != null ){
					this.editParent = false;
					for(var i=0;i<parents.length;i++){
						this.parents.push({
							id:parents[i].id,
							student_id:parents[i].student_id,
							parent_type:parents[i].parent_type,
							first_name:parents[i].first_name,
							middle_name:parents[i].middle_name,
							last_name:parents[i].last_name
						})
					}
				}else{
					this.editParent = true;
					this.parent={
						id:0,
						student_id:this.student.id,
						parent_type:'',
						first_name:'',
						middle_name:'',
						last_name:''
					}
				}

				this.pageView = 4;

			},(error:any)=>{

		});
	}

	newStudentParent(){
		this.f.resetForm();
		this.parent={
			id:0,
			student_id:this.student.id,
			parent_type:'',
			first_name:'',
			middle_name:'',
			last_name:''
		}

		this.editParent = true;
	}

	editStudentParent(parent:any){
		this.parent={
			id:parent.id,
			student_id:parent.student_id,
			parent_type:parent.parent_type,
			first_name:parent.first_name,
			middle_name:parent.middle_name,
			last_name:parent.last_name
		}
		
		this.editParent = true;
	}


	
	updateStudentParent(){
		if(this.parent.id > 0){
			this.userservice.editStudentParent(this.parent).subscribe((parent:any)=>{
				this.changePageView(4);
				this.toastr.success("Student parent updated  successfully!");
			},(error)=>{

			});
		}else{

			this.userservice.addStudentParent(this.parent).subscribe((parent:any)=>{
				this.changePageView(4);
				this.toastr.success("Student parent added  successfully!");
			},(error:any)=>{

			});
			
		}
	}

	deleteStudetParent(id:number){
		this.userservice.deleteStudentParent(id).subscribe((data:any)=>{
			this.deleteRecordType=null;
			this.getStudentParents();
			this.deleteModal.hide();
			this.toastr.success("Student parent deleted  successfully!");
			
		},(error:any)=>{

		});
	}

}
