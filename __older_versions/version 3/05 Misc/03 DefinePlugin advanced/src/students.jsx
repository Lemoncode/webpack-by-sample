import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {StudentsListComponent} from './studentsList';

ReactDOM.render(
  <div>
    <h1>List of students</h1>
    <StudentsListComponent />
  </div>,
  document.getElementById('root')
);
