import * as React from 'react';
import { Member } from '../viewModel';
import { Row } from './row';

interface Props {
  members: Member[];
}

export const Body: React.StatelessComponent<Props> = (props) => (
  <tbody>
    {
      props.members.map((member) => (
        <Row
          key={member.id}
          member={member}
        />
      ))
    }
  </tbody>
);
