import * as React from 'react';
import { Member } from '../viewModel';

interface Props {
  member: Member;
}

export const Row: React.StatelessComponent<Props> = (props) => (
  <tr>
    <td>
      <img src={props.member.avatarUrl} style={{ maxWidth: '10rem' }} />
    </td>
    <td>
      <span>{props.member.id}</span>
    </td>
    <td>
      <span>{props.member.name}</span>
    </td>
  </tr>
);
