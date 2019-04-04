import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

	public student:any={};
	
	public students:any[]
	
	rows = [];
	temp = [];
	selected = [];
	
	public studentDelete:boolean=false;

	// public loading:boolean=true;

	config = {
		backdrop: true,
		ignoreBackdropClick: false
	};

	@ViewChild('childModal') childModal: ModalDirective;
	@ViewChild('deleteModal') deleteModal: ModalDirective;
	@ViewChild('f') f: NgForm;
	
	@ViewChild(DatatableComponent) table: DatatableComponent;
	
	constructor(private userservice:UserService,private router:Router,private toastr: ToastrService,) { 


	}

	ngOnInit() {
		
		this.getStudents();

	}


	getStudents(){
		this.userservice.getStudents().subscribe((students:any)=>{
			this.temp = [...students]
			this.students = students;
			this.rows = students;
		},(error:any)=>{

		});
	}

	studentFilter(event:any) {
		const val = event.target.value.toLowerCase();
		// filter our data
		
		const temp = this.temp.filter(function(d) {
		  return d.first_name.toLowerCase().indexOf(val) !== -1 || !val;
		});
		this.rows = temp;
		// Whenever the filter changes, always go back to the first page
		this.table.offset = 0;
	}

	onSelect({selected}:any) {
		if(this.selected[0] == selected[0])
		{
			this.studentDelete=false;
			this.selected=[];
		}else{
			this.selected.splice(0, this.selected.length);
			this.selected.push(...selected);
			this.studentDelete=true;
		}	
	} 

	onDoubleClick({selected}:any){
		
		if (this.selected[0]) {
			this.router.navigate(['/main/student-details/', this.selected[0].id]);
		}
	}
	
	newStudent(){
		this.f.resetForm();
		this.student = {
			first_name:''
		}

		this.childModal.show();
	}

	addStudent(){
		this.userservice.addStudent(this.student).subscribe((student:any)=>{
			this.student=student;
			this.getStudents();
			this.childModal.hide();
			this.toastr.success("Student added successfully!");
			this.router.navigate(['/main/student-details/', this.student.id]);
		},(error:any)=>{

		});
	}

	deleteStudent(){
		if(this.selected[0]){
			this.userservice.deleteStudent(this.selected[0].id).subscribe((data:any)=>{
				this.toastr.success("Student deleted successfully!");
				this.getStudents();
				this.deleteModal.hide();
			},(error:any)=>{

			});
		}
	}
}
