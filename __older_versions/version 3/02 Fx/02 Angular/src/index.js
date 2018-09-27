import * as angular from 'angular';
import {studentComponent} from './components/student/studentComponent';

const app = angular.module('myStudentApp', []);
app.component('studentComponent', studentComponent);

console.log(app);
