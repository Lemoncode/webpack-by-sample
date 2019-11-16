import * as React from 'react';

interface Props {
  label: string;
  type?: string;
  onClick: () => void;
}

export const Button: React.StatelessComponent<Props> = (props) => (
  <button
    type={props.type}
    className="btn btn-lg btn-success btn-block"
    onClick={onClick(props)}
  >
    {props.label}
  </button>
);

Button.defaultProps = {
  type: 'submit',
};

const onClick = (props: Props) => (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  props.onClick();
};
