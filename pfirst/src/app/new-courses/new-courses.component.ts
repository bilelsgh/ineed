import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Courses } from '../models/Courses.model';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-courses',
  templateUrl: './new-courses.component.html',
  styleUrls: ['./new-courses.component.css']
})
export class NewCoursesComponent implements OnInit {

  coursesForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private serviceService: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.coursesForm=this.formBuilder.group({
      user: "", 
      description:"" ,
      liste:[], 
      accompagne : "",
      budget : 32, 
      dispo: "",
    });}

    onSubmitForm() {
      const formValue = this.coursesForm.value;
      const newCourses = new Courses(98, "../../assets/data/menage.png", "service1",'Faire les courses',
        formValue['user'], 
        formValue['description'],
        formValue['accompagne'],
        formValue['liste'],
        formValue['budget'],
        formValue['dispo'],
      );
      this.serviceService.addCourses(newCourses);
      this.router.navigate(['/profil']);
    }
}
