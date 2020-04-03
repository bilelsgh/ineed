import { Courses } from '../models/Courses.model';
import { Subject } from 'rxjs';

export class CoursesService{
    private courses:Courses[]= [];
    coursesSubject = new Subject<Courses[]>();

    emitCourses(){
        this.coursesSubject.next(this.courses.slice());
    }
    addCourses(courses : Courses){
        this.courses.push(courses);
        this.emitCourses();
    }
}