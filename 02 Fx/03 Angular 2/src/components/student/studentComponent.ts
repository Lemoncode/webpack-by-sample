import { Component } from '@angular/core';

@Component(
  {
    selector: 'student-component',
    template: require<string>('./template.html'),
  }
)
class StudentComponent {
  message: string;

  constructor() {
    this.message = 'Hello from student component'
  }
}

export {
  StudentComponent
}
