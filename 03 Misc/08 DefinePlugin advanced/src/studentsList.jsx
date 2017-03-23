import * as React from 'react';
import {getStudents} from './studentService';

export class StudentsListComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      students: []
    }
  }

  componentWillMount() {
    getStudents().then((students) => {
      this.setState({students: students});
    });
  }

  render() {
    let students = this.state.students.map((s, index) => {
      return <li key={index}>{s.id} - {s.firstName} - {s.lastName} - {s.trainingUrl}</li>;
    });

    return (
      <ul>
        {students}
      </ul>
    )
  }
}
