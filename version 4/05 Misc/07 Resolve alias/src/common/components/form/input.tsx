import * as React from 'react';

interface Props {
  name: string;
  label: string;
  onChange: any;
  onBlur?: any;
  placeholder?: string;
  value: string;
  error?: string;
  type?: string;
}

export const Input: React.StatelessComponent<Props> = (props) => (
  <div className="form-group">
    <label htmlFor={props.name}>{props.label}</label>
    <div className="field">
      <input
        type={props.type}
        name={props.name}
        className={`form-control ${buildErrorClass(props.error)}`}
        placeholder={props.placeholder}
        value={props.value}
        onChange={onChange(props)}
        onBlur={props.onBlur}
      />
      {
        Boolean(props.error) &&
        <div className="invalid-feedback">
          {props.error}
        </div>
      }
    </div>
  </div>
);

const buildErrorClass = (error: string): string => (
  Boolean(error) ?
    'is-invalid' :
    ''
);

const onChange = (props: Props) => (e: React.ChangeEvent<HTMLInputElement>) => {
  props.onChange(e.target.name, e.target.value);
};

Input.defaultProps = {
  type: 'text',
};
